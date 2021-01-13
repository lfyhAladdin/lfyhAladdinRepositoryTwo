/**
 * @created by helin3 2019-04-09
 * @updated by
 * @description 系统公共（登录、页签、Header） zh_CN语言包
 */
import frameworkZhLocale from '@yump/uni-app-fox/lib/locale/zh-CN'

export default {
  ...frameworkZhLocale,
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    album: '相册',
    welcome: '欢迎来到宇信移动平台'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    theme: '换肤',
    size: '布局大小'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  i18nSwitch: {
    success: '切换语言成功'
  }
}
