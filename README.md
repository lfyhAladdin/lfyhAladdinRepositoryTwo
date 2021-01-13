# p-yu-app

Yusys Technology Front-end Platform.

## 项目依赖软件安装
```
yarn config set registry http://192.168.251.162:8081/repository/yx-npm-mirrors/
yarn install
```
```
   若使用nrm管理registry时,yarn config set registry不生效
   nrm add yump http://192.168.251.162:8081/repository/yx-npm-mirrors/
   nrm use yump
   yarn config list
   yarn install

```

### 编译和热加载开发
```
yarn run serve
```

### 编译和打包生产版本
```
yarn run build
```

# 工程目录结构

```js
┌─.setting                // IDE设置目录
├─node_modules            // NPM包依赖
├─mocks                   // 接口模拟
├─public                  // 页面入口HTML模板
├─src                     // 源文件
│  ├─assets               // 全局配置
│  │  ├─icons             // App环境参数配置
|  |  └─styles            // base/common/variables.scss
│  ├─config               // 全局配置
│  │  ├─app.config.js     // App环境参数配置
|  |  ├─dict.config.js    // 静态数据字典配置
│  ├─components           // 组件目录
│  │  └─yu-x.vue          // 可复用的X组件
│  ├─hybrid               // 存放本地网页的目录
│  ├─platforms            // 存放各平台专用页面的目录
│  ├─pages                // 业务页面文件存放的目录
│  │  ├─ebank             // 手机银行应用
│  │  │  ├─index          // 首页模块
│  │  │  │  └─index.vue   // 默认首页
│  │  │  └─login          // 登录模块
│  │  │     └─login.vue   // 登录页面
│  │  └─oa                // 移动OA应用模块
│  │     ├─index          // 首页模块
│  │     │  └─index.vue   // 默认首页
│  │     └─login          // 登录页面
│  │        └─login.vue   // 登录页面
│  ├─static               // 存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
│  ├─locale               // 多语言配置
│  ├─router               // 路由配置
│  ├─store                // vuex状态
│  ├─main.js              // Vue初始化入口文件
│  ├─App.vue              // 应用配置，用来配置App全局样式以及监听 应用生命周期
│  ├─manifest.json        // 配置应用名称、appid、logo、版本等打包信息，详见
│  └─pages.json           // 配置页面路由、导航条、选项卡等页面类信息，详见
├─.gitignore              // git忽略提交配置
├─babel.config.js         // babel配置
├─postcss.config.js       // postcss配置
├─svgo.yml                // svgo优化配置
├─tsconfig.json           // ts配置
├─vue.config.js           // vue-cli配置 
└─package.json            // NPM包管理配置
```

### FAQ

1. 执行`yarn run build:h5`报错误：Thread Loader (Worker X) compiler.parseComponent is not a function

若出现该错误，请多试几次，通常并不是每次都出现的。主要引发原因在main.js安装install.js

2.若安装依赖包，遇到如下错误：
gyp verb which failed Error:not found: python2

请执行下述命令后，重新安装：
$ npm set SKIP_SASS_BINARY_DOWNLOAD_FOR_CI = true 
$ npm set SKIP_NODE_SASS_TESTS = true
$ npm cache clean --force
