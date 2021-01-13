<template>
  <view class="uni-container">
    <!-- <view class="uni-hello-text">
      <text class="hello-text">以下是部分模板示例，更多模板见插件市场：</text>
      <u-link class="hello-link" href="https://ext.dcloud.net.cn" :text="'https://ext.dcloud.net.cn'" :inWhiteList="true"></u-link>
    </view> -->
    <view class="uni-panel" v-for="(item, index) in list" :key="item.id">
      <view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index)">
        <text class="uni-panel-text">{{item.name}}</text>
        <text class="uni-panel-icon uni-icon" :class="item.open ? 'uni-panel-icon-on' : ''">{{item.pages ? '&#xe581;' : '&#xe470;'}}</text>
      </view>
      <view class="uni-panel-c" v-if="item.open">
        <view class="uni-navigate-item" v-for="(item2,key) in item.pages" :key="key" @click="goDetailPage(item2)">
          <text class="uni-navigate-text">{{item2.name ? item2.name : item2}}</text>
          <text class="uni-navigate-icon uni-icon">&#xe470;</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import { createNamespacedHelpers } from "vuex";
  const { mapState } = createNamespacedHelpers("oauth");

  export default {
    data() {
      return {
        list: [
          // #ifdef APP-FOX || H5
          {
            id: 'navbar',
            name: '顶部原生导航标题栏',
            open: false,
            pages: [
              // #ifdef APP-FOX || H5
              {
                name: '导航栏带自定义按钮',
                url: 'nav-button'
              },
              {
                name: '导航栏带红点和角标',
                url: 'nav-dot'
              },
              // #endif
              // #ifdef H5
              {
                name: '导航栏带城市选择',
                url: 'nav-city-dropdown'
              },
              // #endif
              // #ifdef APP-FOX || H5
              {
                name: '导航栏带搜索框',
                url: 'nav-search-input'
              },
              // #endif
              // #ifdef APP-FOX || H5
              // 支付宝小程序上透明渐变不生效的问题是由于编译时 页面的配置属性 "transparentTitle": "auto" 丢失导致
              {
                name: '透明渐变样式',
                url: 'nav-transparent'
              },
              {
                name: '导航栏带图片',
                url: 'nav-image'
              }
              // #endif
            ]
          },
          // #endif
          // #ifdef MP-ALIPAY
          {
            name: '导航栏带图片',
            url: 'nav-image'
          },
          // #endif
          // #ifndef QUICKAPP-WEBVIEW
          {
            name: '选项卡',
            url: 'tabbar'
          },
          // #endif
          {
            name: '组件通讯',
            url: 'component-communication'
          },
          // #ifndef MP-QQ || QUICKAPP-WEBVIEW
          {
            name: 'uCharts 图表',
            url: 'ucharts'
          },
          // #endif
          // #ifndef QUICKAPP-WEBVIEW
          {
            name: '列表到详情示例',
            url: 'list2detail-list'
          },
          // #endif
          // #ifdef APP-FOX || MP-WEIXIN  || MP-QQ
          // H5端存在兼容性问题,故在H5端取消展示, uni-app官方示例 （https://uniapp.dcloud.io/README）也存在同样的问题，在微信里直接打开H5连接是可以播放的，在手机内置浏览器无法播放
          {
            name: '上下滑动切换视频',
            url: 'swiper-vertical'
          },
          // #endif
          {
            name: '发送短信验证码',
            url: 'send-code'
          },
          { name: '商品列表', url: 'list2product' },
          { name: '会员等级', url: 'member-level' },
          { name: '登录', url: 'login' },
          { name: '用户信息', url: 'user-info' },
          {
            name: '多语言',
            url: 'language'
          }
        ],
        navigateFlag: false
      };
    },

    computed: {
      ...mapState(['hasLogin', 'userInfo']),
    },

    onLoad() {},

    onReady() {},

    onShareAppMessage() {
      return {
        title: '欢迎体验yu-app',
        path: '/pages/tabBar/template/template'
      };
    },

    mounted() {
      // console.log(this.hasLogin)
      // console.log(this.userInfo)
    },

    methods: {
      triggerCollapse(e) {
        if (!this.list[e].pages) {
          this.goDetailPage(this.list[e].url);
          return;
        }
        for (var i = 0; i < this.list.length; ++i) {
          if (e === i) {
            this.list[i].open = !this.list[e].open;
          } else {
            this.list[i].open = false;
          }
        }
      },

      goDetailPage(e) {
        if (this.navigateFlag) {
          return;
        }
        let path = e.url ? e.url : e;
        let url = ~path.indexOf('platform') ? path : '/pages/template/' + path + '/' + path;
        if (path === 'user-info' && !this.hasLogin) {
          yu.showToast({
            icon: 'none',
            title: '您还未登录，请先登录！',
            duration: 1500
          });
          setTimeout(() => {
            yu.navigateTo({ url: '/pages/template/login/login' });
          }, 1500);
        } else {
          this.navigateFlag = true;
          yu.navigateTo({ url: url });
          setTimeout(() => {
            this.navigateFlag = false;
          }, 200);
        }
      }
    }
  };
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
</style>
