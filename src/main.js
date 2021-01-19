/**
 * @created by anonymous 2019-12-09
 * @updated by
 * @description Vue初始化入口文件
 */
import Vue from 'vue';
import App from './App';

import store from './store';
import i18n from './locale';
import install  from './utils/install';
import formverify from './static/js/formverify';
import globalMethod from './static/js/globalmethods';
import svgProgressBar from './static/js/svg-progress-bar';


Vue.use(formverify);
Vue.use(globalMethod);
Vue.use(svgProgressBar,{componentName: 'svg-bar'});
//支持手机调试
// #ifndef MP-WEIXIN || MP-ALIPAY
import VConsole from 'VConsole';
if(process.env.NODE_ENV === 'development' && process.env.VUE_APP_PLATFORM === 'app-fox') {
  new VConsole();  
}
// #endif

// 全局引入SVG图标（/assets/icons）
const reqc = require.context('@/assets/icons', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(reqc);

import yuIcons from '@/components/yu-icons/yu-icons.vue';
import YuSvgIcon from '@/components/yu-svg-icon';
//import pageHead from '@/components/page-head.vue';
import uLink from '@/components/uLink.vue';
import uniLink from '@/components/uni-link/uni-link.vue';

Vue.component('yu-icons', yuIcons);
Vue.component('yu-svg-icon', YuSvgIcon);
//Vue.component('page-head', pageHead);
Vue.component('u-link', uLink);
Vue.component('uni-link', uniLink);

import { dateToZh, encrypteMobile, formatDate } from '@/common/filter';
// 全局过滤器
Vue.filter('dateToZh', dateToZh);
Vue.filter('encrypteMobile', encrypteMobile);
Vue.filter('formatDate', formatDate);


// 设置状态栏字体  dark：黑色字 light：白色字
let statusFontColor = '';// 状态栏字体颜色
Vue.prototype.setStatusFontColor =(fontColor)=>{
  // #ifdef APP-FOX
  if(fontColor==statusFontColor){
    return 
  }
  statusFontColor = fontColor
  foxsdk.device.setStatusBarStyle({ "style": fontColor }, ret => {
    console.log('device/getStatusBarStyle===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
  });
  // #endif
}
// 在请求头中加token
//axios.interceptors.request.use(
  //config => {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
    //let token = sessionStorage.getItem('Authorization')
    //if (!config.headers.hasOwnProperty('Authorization') && token) {
      //config.headers.Authorization = token;
    //}
   // return config;
  //},
 //error => {
    //return Promise.reject(error);
  //});
// false 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;
Vue.prototype._i18n = i18n;
App.mpType = 'app';

//phoneSystem ios true，安卓 false
if(uni.getSystemInfoSync().platform == 'ios'){
  Vue.prototype.phoneSystem = true;
}else{
  Vue.prototype.phoneSystem = false;
}
// APP全局插件（组件、图标、过滤器、工具方法等）安装
install(Vue);

const app = new Vue({
  store,
  i18n,
  ...App
});
app.$mount();
