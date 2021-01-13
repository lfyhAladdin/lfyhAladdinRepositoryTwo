import router from "./router";
import routeConf from "./route.conf";
/**
 * 路由逻辑处理
 * @description  菜单权限与登录控制
 * @param navType : [navigateTo,redirectTo,reLaunch,switchTab,navigateTo]
 * @param to : 
 * {
 *   url : '',
 *   animationType : '',
 *   animationDuration : '',
 *   success : function
 * }
 */
router.register((navType, to) => {

  if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));
  //routes.config若配置了页面动画，则覆盖pages.json中的动画
  var animation = to.animationType ? {
    animationType: to.animationType,
    animationDuration: to.animationDuration || 150
  } : {};

  if (to.route.path === routeConf.login.path && store.getters.hasLogin) {
    return new Promise((resolve, reject) => {
      uni.reLaunch({
        url: util.getUrlByJson(routeConf.main.path, to.query),
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err);
        }
      })

    })
  }
  //判断打开页面数量
  if(navType=='navigateTo'){
    var len = getCurrentPages().length;
    if(len > appConf.pageNum){
      console.log("********************打开页面数量超限，注意优化**********************");
    }
  }
  
  // 过滤需要权限的页面
  if (to.route.requiresAuth) {

    if (store.getters.hasLogin) {
      // 已经登录
      return new Promise((resolve, reject) => {
        uni[navType]({ ...{
            url: util.getUrlByJson(to.route.path, to.query),
            success: (res) => {
              resolve(res)
            },
            fail: (err) => {
              reject(err);
            }
          },
          ...animation
        })
      })
    } else {
      // 登录成功后的重定向地址和参数
      let query = {
        redirectUrl: to.route.path,
        ...to.query
      }
      // 没有登录 是否强制登录?
      if (store.state.forcedLogin) {
        return new Promise((resolve, reject) => {
          uni.redirectTo({ ...{
              url: util.getUrlByJson(routeConf.login.path, to.query),
              success: (res) => {
                resolve(res)
              },
              fail: (err) => {
                reject(err);
              }
            },
            ...animation
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          uni.navigateTo({ ...{
              url: util.getUrlByJson(routeConf.login.path, to.query),
              success: (res) => {
                resolve(res)
              },
              fail: (err) => {
                reject(err);
              }
            },
            ...animation
          })
        })
      }
    }
  } else {
    return new Promise((resolve, reject) => {
      uni[navType]({ ...{
          url: util.getUrlByJson(to.route.path, to.query),
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            reject(err);
          }
        },
        ...animation
      })
    })
  }
})

export default router;