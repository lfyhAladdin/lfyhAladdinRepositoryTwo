/**
 * @created by helin3 2019-04-10
 * @updated by
 * @description 认证相关工具
 */
/* eslint camelcase: 0 */
import store from '@/store'
import router from '@/router'
import { refreshTokenFn, logoutFn } from '@/api/common/oauth'

import utils from 'xy-utils'
const { sessionStore, looseEqual, toMappingFn } = utils

const XIAO_YU_TOKEN = 'XiaoYuToken' // token存储key值
const USER_STORE_KEY = 'YUFP-SESSION-USER' // 会话存储前缀
const MENU_ROOT_PID = '0' // 菜单根节点父级Id
const MENU_STOREOG_KEY = 'YUFP-SESSION-MENUS-OG'
const MENU_STORE_KEY = 'YUFP-SESSION-MENUS' // 菜单存储前缀
const CTRL_STOREOG_KEY = 'YUFP-SESSION-STRLS-OG'
const CTRL_STORE_KEY = 'YUFP-SESSION-STRLS'
export const USER_JSON_ROOT = '' // 用户返回数据节点,如：'data.user'
export const MENU_JSON_ROOT = 'menu' // 菜单返回数据节点,如：'data.menus'
export const CTRL_JSON_ROOT = 'contr' // 控制点返回数据节点,如：'data.ctrls'，控制点数据，查询需按菜单ID、功能ID排序返回

export const USER_MAPPING = { // 用户后端数据模型映射
  userId: 'userId', // 用户ID
  userName: 'userName', // 用户姓名
  userCode: 'loginCode', // 用户登录码
  userAvatar: 'userAvatar', // 用户头像
  logicSys: 'logicSys', // 逻辑系统Object
  roles: 'roles', // 角色数组Object
  org: 'org', // 机构Object
  dpt: 'dpt', // 部门Object
  instu: 'instuOrg', // 金融机构Object
  upOrg: 'upOrg', // 上级机构Object
  upDpt: 'upDpt' // 上级部门Object
}

export const MENU_MAPPING = { // 菜单后端数据模型映射
  mId: 'menuId', // 菜单ID
  mText: 'menuName', // 菜单名称
  mPid: 'upMenuId', // 上级菜单ID
  yuIcon: 'menuIcon', // 菜单图标
  routeId: 'funcId', // 菜单功能ID
  routeUrl: 'funcUrl', // 菜单功能URL
  mType: 'menuType' // 菜单类型
}

export const CONTRL_MAPPING = { // 控制点数据模型映射
  mId: 'menuId', // 菜单ID
  rId: 'funcId', // 菜单功能ID
  cId: 'contrCode', // 控制点CODE
  cText: 'contrName' // 控制点名称
}

export const refreshToken = async function () {
  const tokenObj = sessionStore.get(XIAO_YU_TOKEN) || {};
  const currentTime = new Date().getTime(); // 当前时间
  if (tokenObj.expires_in && (currentTime - tokenObj.lastRefreshTime) / 1000 > tokenObj.expires_in) {
    // access_token 已失效，重新获取；
    const data = {
      'grant_type': 'refresh_token',
      'refresh_token': tokenObj.refresh_token
    };
    const { access_token, expires_in, refresh_token } = await refreshTokenFn(data);
    // 记录 access_token 时间（相对于浏览器客户端来说），默认减去1min中
    const lastRefreshTime = new Date().getTime() - 60000; // 单位：毫秒
    const refreshtokenObj = { access_token, expires_in, refresh_token, lastRefreshTime };
    if (refreshtokenObj) {
      sessionStore.set(XIAO_YU_TOKEN, refreshtokenObj);
    } else {
      // 清除用户信息
      await store.dispatch('oauth/logout')
      /**
       * 在 src/utils/permission.js 中，有以下逻辑
       *  1.获取Token信息，判定是否已登录
       *  2.不存在token信息，当前状态是未登录
       *   2-1.当前访问路由，在免登录白名单中，直接访问当前
       *   2-2.当前访问路由，不在免登录白名单中，重定向跳转登录路由（页面），并附带参数存储当前路由信息
       */
      sessionStore.set(XIAO_YU_TOKEN, '');
    }
  }
}

export function getToken () {
  refreshToken();
  return sessionStore.get(XIAO_YU_TOKEN);
}

export function setToken (token) {
  return sessionStore.set(XIAO_YU_TOKEN, token)
}

export function removeToken () {
  return sessionStore.remove(XIAO_YU_TOKEN)
}
