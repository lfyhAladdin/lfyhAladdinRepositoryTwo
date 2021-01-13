/**
 * @created by helin3 2019-04-09
 * @updated by
 * @description 系统公共 en语言包
 */
import frameworkZhTwLocale from '@yump/uni-app-fox/lib/locale/zh-TW'

export default {
  ...frameworkZhTwLocale,
  login: {
    title: '系統登錄',
    logIn: '登錄',
    username: '賬號',
    password: '密碼',
    album: '相冊',
    welcome: '歡迎來到宇信移動平臺'
  },
  navbar: {
    logOut: '退出登錄',
    dashboard: '首頁',
    github: '項目地址',
    theme: '換膚',
    size: '布局大小'
  },
  tagsView: {
    refresh: '刷新',
    close: '關閉',
    closeOthers: '關閉其它',
    closeAll: '關閉所有'
  },
  settings: {
    title: '系統布局配置',
    theme: '主題色',
    tagsView: '開啟 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '側邊欄 Logo'
  },
  i18nSwitch: {
    success: '切換語言成功'
  }
}
