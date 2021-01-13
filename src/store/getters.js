/**
 * @created by anonymous 2019-12-17
 * @updated by
 * @description 根级别的 getters
 */


const getters = {
  language: state => state.app.language, // 默认语言包

  getAccessToken: state => state.oauth.accessToken, // 获取访问token
  getTokenType: state => state.oauth.tokenType, // 获取token-type
  getRefreshToken: state => state.oauth.refreshToken, // 获取刷新token
  getExpiresIn: state => state.oauth.expiresIn, // 获取会话有效期
  lastRefreshTime: state => state.oauth.lastRefreshTime, // 上次刷新时间
  loginType: state => state.oauth.loginType,//登录类型
  hasLogin: state => state.oauth.hasLogin,//是否已登录
  deviceId: state => state.oauth.deviceId,//设备ID

  //用户信息
  userId: state => state.oauth.userId,
  userInfo: state => state.oauth.userInfo,
  // // 获取所有账户信息列表
  getAccoList: state => state.oauth.accoList
};

export default getters;