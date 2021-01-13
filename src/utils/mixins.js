/**
 * @created by anonymous 2019-12-14
 * @updated by
 * @description 全局混入配置
 */
export default {
  methods: {
    //判断是否是数组
    judgeArray (arr) {
      return Object.prototype.toString.call(arr) === '[object Array]';
    },
    timeDown (key, time) {
      let result = setInterval(() => {
        --this[key];
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          this.disabled = false;
          if (time) this[key] = time;
        }
      }, 1000);
    },

    // 跳转页面
    go2Url (url, type) {
      // if (url) {
      //   if (type) {
      //     yu[type]({
      //       url: url
      //     });
      //   } else {
      //     yu.navigateTo({
      //       url: url
      //     })
      //   }
      // } else {
      //   this.go2Dev();
      // }
    },
    /**
     * 
     * @param {*} pageObj  {
     * page:请求起始
     * total:数据总条数
     * loadingType：加载状态
     * size使用公共的
     * }
     * 
     */
    // 判断不是tabBar页面
    isNotTabBar () {
      let page = getCurrentPages();
      let currTabBar = page[0].route;
      let allTabBar = ['pages/ebank/main/main', 'pages/ebank/financial/main/financial', 'pages/ebank/loan/main/main', 'pages/ebank/user/user'];
      if (allTabBar.indexOf(currTabBar) == -1) {
        return true;
      }
      return false;
    }
  },
  data () {
    return {}
  },
  computed: {
    px () {
      return getApp().globalData.appWidth / 375;
    },
    screenHeight () {
      return getApp().globalData.appHeight;
    },
    screenWidth () {
      return getApp().globalData.appWidth;
    },
    immergeTop () {
      return getApp().globalData.immergeTop;
    },
    immergeBottom () {
      return getApp().globalData.immergeBottom;
    },
    // 底部安全距离  苹果xr 等手机
    bottomSafe() {
      return {
        bottom: this.immergeBottom + 'px'
      }
    },
  },
};