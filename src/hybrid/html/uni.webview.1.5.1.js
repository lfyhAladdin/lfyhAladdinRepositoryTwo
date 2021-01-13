!(function (e, i) {
  typeof exports == 'object' && typeof module != 'undefined' ? module.exports = i() : typeof define == 'function' &&
		define.amd ? define(i) : e.uni = i();
}(this, function () {
  'use strict';
  var e = {},
    o = [],
    s = /uni-app/i.test(navigator.userAgent),
    d = '__uniapp__service',
    w = 'WEB_INVOKE_APPSERVICE',
    i = function (e, i) {
      if (o.length === 0 && s) {
        var n = plus.webview.currentWebview();
        if (!n) {
          throw new Error('plus.webview.currentWebview() is undefined');
        }
        var t = n.parent();
        if (!t) {
          throw new Error('plus.webview.currentWebview().parent() is undefined');
        }
        o.push(t.id);
      }
      var a = {
        options: {
          timestamp: +new Date()
        },
        name: e,
        arg: i
      };
      if (s) {
        var r = JSON.stringify(a);
        plus.webview.getWebviewById(d) ? plus.webview.postMessageToUniNView({
          type: w,
          args: {
            data: a,
            webviewIds: o
          }
        }, d) : plus.webview.getLaunchWebview().evalJS('UniPlusBridge.subscribeHandler("' + w + '",' + r + ',' + JSON.stringify(
          o) + ');');
      } else {
        window.parent.postMessage({
          type: w,
          data: a,
          pageId: ''
        }, '*');
      }
    };
  e.navigateTo = function () {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).url;
    i('navigateTo', {
      url: encodeURI(e)
    });
  }, e.navigateBack = function () {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).delta;
    i('navigateBack', {
      delta: parseInt(e) || 1
    });
  }, e.switchTab = function () {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).url;
    i('switchTab', {
      url: encodeURI(e)
    });
  }, e.reLaunch = function () {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).url;
    i('reLaunch', {
      url: encodeURI(e)
    });
  }, e.redirectTo = function () {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).url;
    i('redirectTo', {
      url: encodeURI(e)
    });
  }, e.getEnv = function (e) {
    e(s ? {
      plus: !0
    } : {
      h5: !0
    });
  }, e.postMessage = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    i('postMessage', e.data || {});
  };
  var n = {};
  typeof wx != 'undefined' && wx.miniProgram && (n.navigateTo = wx.miniProgram.navigateTo, n.navigateBack = wx.miniProgram
    .navigateBack, n.switchTab = wx.miniProgram.switchTab, n.reLaunch = wx.miniProgram.reLaunch, n.redirectTo = wx.miniProgram
    .redirectTo, n.postMessage = wx.miniProgram.postMessage, n.getEnv = wx.miniProgram.getEnv);
  var t = {}; navigator.userAgent.indexOf('AlipayClient') > -1 && typeof my != 'undefined' && (t.navigateTo = my.navigateTo,
  t.navigateBack = my.navigateBack, t.switchTab = my.switchTab, t.reLaunch = my.reLaunch, t.redirectTo = my.redirectTo,
  t.postMessage = my.postMessage, t.getEnv = my.getEnv);
  var a = {};
  typeof swan != 'undefined' && swan.webView && (a.navigateTo = swan.webView.navigateTo, a.navigateBack = swan.webView.navigateBack,
  a.switchTab = swan.webView.switchTab, a.reLaunch = swan.webView.reLaunch, a.redirectTo = swan.webView.redirectTo, a
    .postMessage = swan.webView.postMessage, a.getEnv = swan.webView.getEnv);
  var r = {};
  typeof tt != 'undefined' && tt.miniProgram && (r.navigateTo = tt.miniProgram.navigateTo, r.redirectTo = tt.miniProgram
    .redirectTo, r.reLaunch = tt.miniProgram.reLaunch, r.switchTab = tt.miniProgram.switchTab, r.navigateBack = tt.miniProgram
    .navigateBack);
  var g = navigator.userAgent,
    c = /uni-app/i.test(g),
    v = /micromessenger/i.test(g),
    u = /AlipayClient/.test(g),
    p = /swan/i.test(g),
    m = /toutiaomicroapp/i.test(g),
    l = {},
    b = function () {
      window.UniAppJSBridge = !0, document.dispatchEvent(new CustomEvent('UniAppJSBridgeReady', {
        bubbles: !0,
        cancelable: !0
      }));
    };
  return c ? (l = e, window.plus && /complete|loaded|interactive/.test(document.readyState) ? b() : document.addEventListener(
    'plusready', b)) : v ? (l = n, window.WeixinJSBridge && WeixinJSBridge.invoke ? b() : document.addEventListener(
    'WeixinJSBridgeReady', b)) : (l = u ? t : p ? a : m ? r : e, document.addEventListener('DOMContentLoaded', b)), l;
}));
