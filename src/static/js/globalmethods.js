/**
 * @created by anonymous 2020-11-19
 * @updated by
 * @description 全局公用方法封装（页面跳转，接口请求，字典查询）
 */
import { appEnv } from '@/config/app.config';
let baseurl = appEnv.host;

export default {
  install(Vue) {
    /**
     * 页面跳转
     * 两种情况：1：路径带参数，2：路径不带参数
     */
    Vue.prototype.pageJump = function (posturl) {
      posturl = '/pages/ebank/' + posturl;
      //判断是否登录
      let hasLogin = true;
      if (!hasLogin) {
        yu.showToast({
          icon: 'none',
          title: '您还未登录，请先登录！',
          duration: 1500
        });
        setTimeout(() => {
          uni.navigateTo({ url: '/pages/ebank/login/login' });
        }, 1500);
      } else {
        uni.navigateTo({ url: posturl });
      }
    };

    /**
     * 接口请求
     * 参数：接口名，参数，请求类型（get/post），成功方法，失败方法
     */
    Vue.prototype.interfaceRequest = function (url, data, method, success, error) {
      this.$http.request({
        url: baseurl + url,
        header: {
          'Content-Type': 'application/json;charset=UTF-8',
          'custom-header': 'aldapp',
          'Access-Control-Allow-Origin': '*'
        },
        custom:{oauth:1},
        method: method,
        changeOrigin: true,
        data: data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", datatoken);
        },
      }).then(
        res => {
          success(res);
        },
        err => {
          error(err)
        }
      )
    };

    /**
     * 数据字典查询
     * 三种情况：1：只传一个参数，2：传列表值的参数，3：传列表集合参数
     * 参数例子
     * paramone={"dictionaryName":"businessType"}
     * paramtwo={"dictionaryName":"businessType","key":"1140010"}
     * paramthree=[{ "dictionaryName": "businessType", "key": "1140010"},{"dictionaryName": "certType", "key": "Ind01"}] 
     */
    Vue.prototype.queryDictionaryList = function (paramone, success) {
      this.$http.request({
        url: appEnv.host + '/api/dictionary/queryDictionaryList',
        header: {
          'Content-Type': 'application/json;charset=UTF-8',
          'custom-header': 'demo',
          'Access-Control-Allow-Origin': '*'
        },
        method: 'get',
        custom:{oauth:1},
        changeOrigin: true,
        data: paramone
      }).then(
        res => {
          success(res);
        },
        err => {
          console.log('失败');
        }
      )
    };
    Vue.prototype.queryDictionaryValue = function (paramtwo, success) {
      this.$http.request({
        url: appEnv.host + '/api/dictionary/queryDictionaryValue',
        header: {
          'Content-Type': 'application/json;charset=UTF-8',
          'custom-header': 'demo',
          'Access-Control-Allow-Origin': '*'
        },
        method: 'get',
        custom:{oauth:1},
        changeOrigin: true,
        data: paramtwo
      }).then(
        res => {
          success(res);
        },
        err => {
          console.log('失败');
        }
      )
    };
    Vue.prototype.queryDictionaryListValue = function (paramthree, success) {
      this.$http.request({
        url: appEnv.host + '/api/dictionary/queryDictionaryListValue',
        header: {
          'Content-Type': 'application/json;charset=UTF-8',
          'custom-header': 'demo',
          'Access-Control-Allow-Origin': '*'
        },
        method: 'get',
        custom:{oauth:1},
        changeOrigin: true,
        data: paramthree
      }).then(
        res => {
          success(res);
        },
        err => {
          console.log('失败');
        }
      )
    };
    Vue.prototype.loginRelatedPostUrl="https://boltest2.lccb.com.cn:280/chdcinner/";
    Vue.prototype.loginPostUrl="https://boltest2.lccb.com.cn:280/yusp-uaa/";
  }


};

