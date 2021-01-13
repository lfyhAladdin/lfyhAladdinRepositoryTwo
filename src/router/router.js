class Router {
  constructor (arg) {
		this.callBack = () => {};
		this.navTo = yu.navigateTo;
		this.redTo = yu.redirectTo;
		this.relTo = yu.reLaunch;
		this.swhTo = yu.switchTab;
		this.navBk = yu.navigateBack;
  }
  // 注册逻辑处理
  register (callBack) {
    if (callBack instanceof Function) {
      this.callBack = callBack;
    }
  }
  // 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面
  navigateTo (to) {
    return this.callBack('navigateTo', to);
  }
  // 关闭当前页面，跳转到应用内的某个页面,不能跳转到tabbar页面
  redirectTo (to) {
    return this.callBack('redirectTo', to);
  }
  // 关闭所有页面，打开到应用内的某个页面。
  reLaunch (to) {
    return this.callBack('reLaunch', to);
  }
  // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
  switchTab (to) {
    return this.callBack('switchTab', to);
  }

  /**
   * 关闭当前页面，返回上一页面或多级页面
   * @param {Object} delta 返回的页面数
   */
  navigateBack (delta = 1) {
    uni.navigateBack({
      delta
    });
  }
  /**
   * 打开本地html页面或者打开外网HTML页面
   * @param {type} url 访问地址
   * @param {type}  params 传递的JSON参数
   */
  openWin (url, params = {}) {
    var paramsStr = JSON.stringify(params);
    uni.navigateTo({
      url: `/components/yu-webview?url=${url}&params=${paramsStr}`
    });
  }
}

export default new Router();