<!--
 * @Author: chencm@yusys.com.cn
 * @Date: 2019-12-09 17:21:08
 * @LastEditors  : chencm@yusys.com.cn
 * @LastEditTime : 2019-12-20 18:18:04
 * @Description: 描述信息
 * @FilePath: \p-yu-app\src\App.vue
 -->
 
<script>
  import { appEnv } from '@/config/app.config';
 	export default {
    //全局属性
    globalData: {
      appHeight: uni.getSystemInfoSync().screenHeight,
      appWidth: uni.getSystemInfoSync().screenWidth,
      isConsult: false, // 是否已经协商了工作秘钥
      platform: '',
      immergeTop: 0,
      immergeBottom: 0,
      hideTime: 0,
      showTime: 0,
      phoneSystem: true,  //ios true，安卓 false
    },
    onLaunch: function(query) {
      this.initApp();
      getApp() && getApp().$router && getApp().$router.beforeEach((to, from, next) => {
        if (to && to.meta && JSON.parse(to.meta.needAuth || 'false')) {
          next();
        } else {
          next();
        }
      });
    },
    onShow: function() {
      this.showTime = new Date();
      let _this = this;
    },
    onHide: function() {
      this.hideTime = new Date();
    },
    onError: function(stackInfo) {
      // console.log("全局错误信息:\n" + stackInfo);
    },
    onuniNViewMessage: function() {
      console.log('原生weex页面通讯');
    },
    onPageNotFound: function() {
      console.log('页面加载失败');
    },
    onUnLaunch: function() {
      console.log('退出APP');
    },
    beforeDestroy() {
      if (window.globalCbId) {
        Object.keys(window.globalCbId).forEach((v, i) => {
          foxsdk.events.removeEventListener(v, res => {});
        });
      }
    },
    methods: {
      initApp() {
        let _this = this;
        // 获取设备信息 沉浸式处理
        // #ifdef APP-FOX
        foxsdk.device.getSystemInfo(ret => {
          console.log(
            'runtime/getSystemInfo===status: ' +
              ret.status +
              ',message: ' +
              ret.message +
              ',payload: ' +
              JSON.stringify(ret.payload)
          );
          if (ret.status == 0) {
            let payload = ret.payload;
            let platform = payload.name.toUpperCase();
            // 手机屏幕高度
            let screenHeight = payload.resolutionHeight;
            let screenWidth = payload.resolutionWidth;
            _this.globalData.platform = payload.name.toUpperCase();
            let area = payload.safeAreaInsets;
            // 状态栏高度
            let top = payload.statusbarHeight || area.top;
            let bottom = area.bottom;
            let isBottomBarShow = area.isBottomBarShow || false; // 底部虚拟按键是否存在，仅android支持，补充安全区域高度获取不到的问题
            if (platform == 'ANDROID' && !isBottomBarShow) {
              bottom = 0;
            }

            if (top > 0) {
              _this.globalData.immergeTop = top;
            }
            if (bottom > 0) {
              _this.globalData.immergeBottom = bottom;
              if(platform!='ANDROID'){
                document.getElementById('device-status').classList.add('iphone-x')
              }
            }
            let styleElem = document.createElement('style');
            // uni-page-body 的高度 = 屏幕高度 - 沉浸式状态栏高度 - header的高度
            styleElem.innerHTML =
              `#device-status{height:` +
              top +
              `px;}
                                    #device-bottom{height:` +
              bottom +
              `px;}
                                    uni-tabbar, uni-tabbar .uni-tabbar{bottom:` +
              bottom +
              `px;}
                                    uni-app{height:` +
              (screenHeight - top) +
              `px}
                                    uni-page-body{height:` +
              (screenHeight - top - bottom - 44) +
              `px;position:relative;}
                                    uni-page-body>uni-view{padding-bottom:` +
              bottom +
              `px;}
                                    #__vconsole .vc-panel, 
                                    .position-bottom{bottom:` +
              bottom +
              `px!important;}
                                    .position-top{top:` +
              top +
              `px!important;}
                                    .immerge-mt{margin-top:-` +
              top +
              `px!important;}
                                    .immerge-pt{padding-top:` +
              top +
              `px!important;}
                                    .immerge-tab-mb{padding-bottom:` +
              (bottom + 50 + (15 * screenWidth) / 375) +
              `px!important;}
                                    .main-menu{top:` +
              (top + 44 + (40 * screenWidth) / 375) +
              `px!important;}
                                    `;
            document.body.appendChild(styleElem);
          } else {
            console.log('获取系统信息失败');
          }
        });
        // #endif
        // #ifdef MP-WEIXIN || H5
        // http://192.168.251.163:9527/yu-app-guide/api/system/info.html
        uni.getSystemInfo({
        	success: function (res) {
            // iphoneX 的safeArea为 {bottom: 812, height: 768, right: 375, left: 0, top: 44, width: 375}
        		console.log(res);
            if (res.safeArea.top > 0) {
              _this.$scope.globalData.immergeTop = res.safeArea.top;
            }
            if (res.model === 'iPhone X' || res.model === 'iPhone XR' || res.model === 'iPhone XS Max') { // iPhone X, iPhone XR, iPhone XS Max 底部小黑条
              _this.$scope.globalData.immergeBottom = 34;
            }
        	}
        });
        // #endif
      }
    },
  };
</script>

<style lang='scss'>
  @import './assets/styles/uni.css';
  @import '@styles/common.scss';
  @import '@/static/css/professionwf.less';
  *{
    font-family: 'PingFangSC-Medium' !important;
  }
  uni-page-head{display: none}
  uni-app{background: #ffffff}

  uni-tabbar{
    .uni-tabbar{
      border:0;
      background: #ffffff;
		  box-shadow:0rpx -1rpx 4rpx 0rpx rgba(0, 0, 0, 0.25);
      .uni-tabbar-border{
        height: 0;
      }
    }
  }
  uni-page-head[uni-page-head-type=default]~uni-page-wrapper{
    height: 100%;
  }
  body.pages-ebank-personInformation-personInformation uni-page-body{
    height: 100%!important;
  }
  .outermost{
    height: 100%;
  }
</style>
