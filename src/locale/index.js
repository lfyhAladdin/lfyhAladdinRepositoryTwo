/*
 * @Author: Aleyn He
 * @Date: 2020-07-03 10:44:26
 * @LastEditors: Aleyn He
 * @LastEditTime: 2020-07-07 18:00:40
 * @Description: 多语言配置入口
 * 必须要在main.js中注入下述代码，否则微信小程序多语言页面加载出错，找不到i18n
 *   Vue.prototype._i18n = i18n;
 */ 
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './messages';

Vue.use(VueI18n);

// 客户端支持的语言列表，
// 注App端要根据foxsdk.language.getSupportLanguageList获取原生实际支持的语言列表
const supportLocale = ['zh-CN', 'zh-TW', 'en'];

const LOCALE_KEY = 'LOCALE_KEY';

// 实例化vue i18n
const i18n = new VueI18n({
  // options: zh_CN | zh_TW | en | ...
  locale: supportLocale[0],
  fallbackLocale: supportLocale[0],
  messages
});

/**
 * 设置语言
 * @param {*} language 语言类型
 * @param {Function} callback 语言设置成功回调
 */
export function setLanguage(language, callback) {
  // 不支持的语言，直接返回
  if (supportLocale.indexOf(language) < 0) {
    return;
  }
  // #ifdef APP-FOX
  foxsdk.language.setAppLanguage({ language: language, langMode: '3' }, ret => {
    i18n.locale = language;
    callback()
  })
  // #endif
  // #ifndef APP-FOX
  yu.setStorage({
    key: LOCALE_KEY,
    data: language,
    success: function () {
      i18n.locale = language;
      callback();
    }
  });
  // #endif
}

/**
 * 获取当前系统语言
 */
export async function getLanguage(callback) {
  // #ifdef APP-FOX
  foxsdk.language.getAppLanguage(ret => {
    let language = ret.payload.value;
    callback(language);
  });
  // #endif
  // #ifndef APP-FOX
  let ret = await yu.getStorage({ key: LOCALE_KEY });
  let language = ret.length == 2 ? ret[1].data : supportLocale[0];
  callback(language);
  // #endif
}

// 设置默认语言
getLanguage(language => {
  if (i18n.locale !== language) {
    i18n.locale = language;
  }
});

export default i18n;
