/**
 * @created by helin3 2019-11-22
 * @updated by
 * @description Mock Express 热更新注册
 */
/* global process, module */
/* eslint no-console: 0 */
const chokidar = require('chokidar');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');

const mockDir = path.join(process.cwd(), 'mocks');
const mockEnable = process.env.NODE_ENV === 'development'; // Mock是否启用
const mockMode = process.env.NODE_ENV === 'development'; // 模拟模式，true真实express服务，false XHR拦截方式

/**
 * 通过express 路由方式注册mocks api
 * @param {*} app express实例
 * @returns {object}
 *  mockStartIndex mock路由开始索引位置
 *  mockLastIndex  mocks api 最后索引位置
 */
function registerRoutes (app) {
  let stackLength;
  // 读取注册路由
  const { default: mocks } = require('./index.js');
  console.log('\n Mocks Server Register Routes : ');
  for (const mock of mocks) {
    let url = mock.url ? mock.url.source || mock.url : '';
    url = url.replace(/\\\//g, '/');
    console.log(' - ' + mock.type + ' - ' + url);
    app[mock.type](mock.url, mock.response);
  }
  stackLength = app._router.stack.length;
  const mockRoutesLength = Object.keys(mocks).length;
  return {
    mockStartIndex: stackLength - mockRoutesLength,
    mockLastIndex: stackLength - 1
  };
}

/**
 * 清除/mocks目录require缓存
 * TODO: 待调试
 */
function unregisterRoutes () {
  Object.keys(require.cache).forEach(i => {
    // 清除/mocks目录require缓存
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

module.exports = app => {
  // es6 polyfill
  require('@babel/register');

  // Mock启用，则在开发模式添加mock api拦截
  // 此处必须得是字符串方式判断，因其不在浏览器中
  if (!mockEnable || !mockMode) {
    return;
  }
  // 开发模式，没有统一前缀，如何区分API是Mock服务
  app.all('*', function (req, res, next) {
    res.header('X-Mock-Api', 'xyMock');
    next();
  });
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  let lastRegReturn = registerRoutes(app);
  let mockLastIndex = lastRegReturn.mockLastIndex;
  let mockStartIndex = lastRegReturn.mockStartIndex;

  // 监听/mocks文件（忽略/mocks/mocks-server.js)，热加载Mocks Server
  chokidar.watch(mockDir, {
    ignored: /mocks-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      // 暂存 Express路由中间件堆栈，避免mock api 放在404之后无法路由过去
      let routers = app._router.stack.splice(mockLastIndex + 1);
      // 移除 mock api Express路由堆栈
      app._router.stack.splice(mockStartIndex);
      // 清除路由文件缓存
      unregisterRoutes();
      // 重新注册Mocks api路由
      lastRegReturn = registerRoutes(app);
      [].push.apply(app._router.stack, routers);
      mockLastIndex = lastRegReturn.mockLastIndex;
      mockStartIndex = lastRegReturn.mockStartIndex;

      console.log(chalk.magentaBright(`\n > Mocks Server hot reload success! changed ${path}`));
    }
  });
};
