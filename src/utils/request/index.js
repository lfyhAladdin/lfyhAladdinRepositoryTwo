/**
 * @created by anonymous 2019-12-10
 * @updated by
 * @description request配置说明
 */
import Request from './request';
import { appEnv } from '@/config/app.config';
import store from '@/store';

//是否需要拦截响应状态
const ERRMSG = {
  '400': true,
  //'401': true,
  '500': true
}

/* 创建默认http实例 */
const http = new Request();

/* 设置全局配置 */
http.setConfig((conf) => {
  let config = {};
  config.baseUrl = appEnv.host || ''; /* 根域名不同 */
  config.method = 'POST';
  let extendConf = {};
 // #ifdef H5
  extendConf = {
    deviceId: 'aaaa', // 设备号，
    //channelId: '1001', // 渠道号
    appId: 'chdcebankapp', // 应用ID ''
    //appVer: '1.0.0.1', // 版本号，APP包含外壳、资源包版本号
    //platform: '', // 平台信息
    //signature: '', // 签名，APP原生去计算
    timestamp: new Date().getTime(), // 请求时间戳，APP原生去添加
    timeout: 90000//超时时间
  }
  // #endif
  // 自定义头
  config.header = {
    ...conf.header,
    ...extendConf,
    timeout: 600000,//超时时间
    appId: 'chdcebankapp', // 应用ID ''
    /* 'X-requested-With': 'XMLHttpRequest', */
    'Content-Type': 'application/json; charset=UTF-8',
    appLang: '', // 语言信息，如zh-CN
    //consult: '1', // 协商工作密钥
    //isEncrypt: '1',
    Authorization: 'Basic d2ViX2FwcDo=' // 业务TOKEN, Basic d2ViX2FwcDo=  Bearer d2ViX2FwcDo
  };

  // 自定义字段
  config.custom = {
    ...conf.custom,
    // 0: 不传递token值
    // 1: 传递token值
    // 2: 有token就送，没有就不送
    oauth: 0,
    loading: false, // 添加遮罩
    loadingText: '加载中...' // 遮罩文字
  };

  return config;
});

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200;
};

/**
 * 获取token信息，可能会触发refreshToken方法
 * refresh_token无效时，access_token返回空串
 */
http.getToken = (oauth) => {
  return new Promise(async(resolve, reject) => {
      await store.dispatch('oauth/token').catch((err)=>{
        reject(err);
      })
      resolve(store.getters.getAccessToken);
  });
}

function takeLongTime(config) {
  return new Promise(resolve => {
      setTimeout(() => {
        console.log('成功获取token')
        resolve(config);
      }, 5000);
  });
}
/* 请求之前拦截器 */
 http.interceptor.request((config, cancel) => {
  let custom = config.custom;
  config.header = {
    ...config.header,
    'Content-Type': 'application/json; charset=UTF-8',
  }
  let accessToken='';
  //20201127
  const CURR_TIME = new Date().getTime(); // 当前时间
  const EXPRIRES_IN = store.getters.getExpiresIn;// 获取会话有效期
  const LAST_REFRESH_TIME = store.getters.lastRefreshTime;// 上次刷新时间  
  const REFRESH_TOKEN = store.getters.getRefreshToken;//获取刷新token
  //如果没有刷新token && 需要登陆的接口 请求 则跳转至登陆
  if (config.type == 'post' && (custom.oauth == 1 && (!accessToken || !REFRESH_TOKEN))) {
    store.dispatch('oauth/token', location.hash.replace('#', '')).catch((err) => {
      reject(err);
    })
  }
  //刷新token
  if (custom.oauth != 0 && ((EXPRIRES_IN && (CURR_TIME - LAST_REFRESH_TIME) / 1000 > EXPRIRES_IN))) {
    http.getToken().then((res) => {
      accessToken = res;
      
  
    }).catch((res) => {
      cancel('刷新token请求失败')
      store.dispatch('oauth/token', location.hash.replace('#', '')).catch((err) => {
        reject(err);
      })
    });
  }
  accessToken=store.getters.getAccessToken
 // 根据业务不同 拦截器逻辑不同
  switch (custom.oauth) {
    case 0:
      // 不设置Authorization,由业务代码自己搞定
      break;
    case 1:
      // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
      // cancel: 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
      // fixed ios9/10 http请求头最后一位不允许是空格，否则请求报错，走不到后端。。故getAccessToken为''时添加'NOLOGIN'
      //!!accessToken ? config.header.Authorization = 'Bearer ' + (accessToken || 'NOLOGIN') : cancel('AccessToken 不存在');
      //if (!!accessToken) {
        config.header.Authorization = 'Bearer ' + (accessToken || 'NOLOGIN');
      /* } else {
        cancel('AccessToken 不存在');
        uni.showModal({
          title: '提示',
          content: '登录失效,请重新登录',
          success: function (res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/ebank/login/login'
              })
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      } */
      break;
    case 2:
      !!accessToken ? config.header.Authorization = 'Bearer ' + (accessToken || 'NOLOGIN') : void 0;
      break;
  }
    // 显示loading, mask防止点击穿透
    custom.loading && uni.showLoading({ title: custom.loadingText, mask: true });
    // 模拟请求token
    let needRefreshToken = false
    if(needRefreshToken){
      return takeLongTime(config)
    }
    return config

});

/* 请求之后拦截器 */
http.interceptor.response((response) => {
  let custom = response.config.custom;
  // 隐藏loading
  custom.loading && uni.hideLoading();
  let header = response.header;
  // if (header.code !== '0') {
  //   // TODO: 后台接口错误码统一处理
    
  //   return Promise.reject(response);
  // }
  return response;
}, (response) => { // 请求错误回调
  let custom = response.config.custom;
  // 隐藏loading
  custom.loading && uni.hideLoading();
  let header = response.header;
  try {
    console.log(response);
    if (header) {
      header.msg = decodeURIComponent(header.msg);
    }
  } catch (error) {
    if (header) {
      console.error( 'fail: response.header.msg解析失败:' + `${header.msg}` );
    }
  }
  return response;
});

export default http;