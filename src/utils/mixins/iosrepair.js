/**
 * @created by anonymous 2020-03-02
 * @updated by gaoxin5
 * @description ios修复ios12软键盘顶起页面后隐藏不回弹混入配置
 */
export default {
  methods: {
    // 修复ios12软键盘顶起页面后隐藏不回弹
    temporaryRepair() {
      let platform = getApp().globalData.platform;
      if (platform == 'IOS') {
        let windowFocusHeight = window.innerHeight
        if (this.windowHeight == windowFocusHeight) {
          return
        }
        let currentPosition;
        let speed = 1; //页面滚动距离
        currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition -= speed;
        window.scrollTo(0, currentPosition); //页面向上滚动
        currentPosition += speed; //speed变量
        window.scrollTo(0, currentPosition); //页面向下滚动
      }
    }
  },
  data() {
    return {
      windowHeight: getApp().globalData.appHeight
    }
  }
};