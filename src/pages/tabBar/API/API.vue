<template>
  <view class="uni-container">
    <template v-if="showSetTabBarPage">
      <set-tab-bar @unmount="leaveSetTabBarPage"></set-tab-bar>
    </template>
    <template v-else>
      <!-- <view class="uni-hello-text">
        <text class="hello-text">以下将演示yu-app接口能力，详细文档见：</text>
        <u-link class="hello-link" href="http://192.168.251.163:9527/yu-app-guide/api/" text="http://192.168.251.163:9527/yu-app-guide/api/" :inWhiteList="true"></u-link>
      </view> -->
      <view class="uni-panel" v-for="(item, index) in list" :key="item.id">
        <view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index)">
          <text class="uni-panel-text">{{item.name}}</text>
          <text class="uni-panel-icon uni-icon" :class="item.open ? 'uni-panel-icon-on' : ''">{{item.pages ? '&#xe581;' : '&#xe470;'}}</text>
        </view>
        <view class="uni-panel-c" v-if="item.open">
          <view class="uni-navigate-item" v-for="(item2,key) in item.pages" :key="key" :url="item.url" @click="goDetailPage(item2.url)">
            <text class="uni-navigate-text">{{item2.name ? item2.name : item2}}</text>
            <text class="uni-navigate-icon uni-icon">&#xe470;</text>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>
<script>
  import uLink from '@/components/uLink.vue';
  import setTabBar from '@/components/api-set-tabbar.vue';
  export default {
    components: {
      uLink,
      setTabBar
    },
    data() {
      const list = [
        {
          id: 'page',
          name: '界面',
          open: false,
          pages: [
            {
              name: '设置导航条',
              url: 'set-navigation-bar-title'
            },
            //#ifdef APP-PLUS
            {
              name: '原生子窗体',
              url: 'subnvue'
            },
            //#endif
            {
              name: '页面跳转',
              url: 'navigator'
            },
            //#ifndef MP-TOUTIAO
            {
              name: '设置TabBar',
              url: 'set-tabbar'
            },
            //#endif
            {
              name: '下拉刷新',
              url: 'pull-down-refresh'
            },
            {
              name: '创建动画',
              url: 'animation'
            },
            // #ifndef MP-ALIPAY || QUICKAPP-WEBVIEW-UNION
            {
              name: '创建绘画',
              url: 'canvas'
            },
            // #endif
            {
              name: '节点信息',
              url: 'get-node-info'
            },
            // #ifndef MP-ALIPAY
            // 节点布局交互状态示例中使用的uni.createIntersectionObserver方法在支付宝小程序上存在问题
            {
              name: '节点布局交互状态',
              url: 'intersection-observer'
            },
            // #endif
            {
              name: '显示操作菜单',
              url: 'action-sheet'
            },
            {
              name: '显示模态弹窗',
              url: 'modal'
            },
            {
              name: '显示加载提示框',
              url: 'show-loading'
            },
            {
              name: '显示消息提示框',
              url: 'toast'
            }
          ]
        },
        {
          id: 'device',
          name: '设备',
          open: false,
          pages: [
            // #ifndef H5
            // H5端部分机型无法准确识别
            { name: '获取手机网络状态', url: 'get-network-type' },
            // #endif
            { name: '获取手机系统信息', url: 'get-system-info' },
            { name: '获取系统版本信息', url: 'version' },
            { name: '获取应用横竖屏状态', url: 'get-orientation' },
            { name: '获取应用的安全区域信息', url: 'get-safe-areaInsets' },
            { name: '获取应用的状态栏高度信息', url: 'get-statusbar-height' },
            { name: '获取应用的状态栏样式信息', url: 'get-statusbar-style' },
            { name: '获取应用的设备指纹', url: 'get-UUID' },
            { name: '获取应用的wifi开启状态', url: 'get-wifi-open-status' },
            { name: '设置程序快捷方式图标上显示的角标数字', url: 'set-badge-number' },
            { name: '设置状态栏样式', url: 'set-statusbar-style' },
            { name: '获取底部高度', url: 'set-navigationbar-height' },
            { name: '通讯录', url: 'get-address-book' },
            { name: '打电话', url: 'make-phone-call' },
            // #ifndef H5 || MP-ALIPAY
            // { name: '震动', url: 'vibrate' }, // 部分手机无效 暂时屏蔽入口
            {
              name: '添加手机联系人',
              url: 'add-phone-contact'
						},
						// #endif
						// #ifndef H5
            {
              name: '扫码',
              url: 'scan-code'
            },
            // #endif
            // #ifndef MP-ALIPAY
            // 支付宝小程序的剪贴板 暂仅支持企业支付宝账户使用
            {
              name: '剪贴板',
              url: 'clipboard'
            },
            // #endif
            // #ifndef H5 || MP-ALIPAY
            {
              name: '屏幕亮度',
              url: 'brightness'
            },
            // #endif
            // #ifdef APP-FOX|| MP-WEIXIN || MP-QQ
            // 蓝牙的功能还不太成熟, 存在问题 故先屏蔽入口 - 禅道bug - 4548 【示例工程】微信小程序-Android，接口-设备-蓝牙，选择设备列表显示很多的未知设备，和手机蓝牙搜索结果不一致
            //{
            //  name: '蓝牙',
            //  url: 'bluetooth'
            //},
            // #endif
            // #ifdef APP-PLUS || MP-WEIXIN
            // {
            //   name: 'iBeacon',
            //   url: 'ibeacon'
            // },
            // #endif
            // 监听罗盘数据是uni提供的方法 ios 手机不生效 暂时屏蔽入口
            // {
            //   name: '监听罗盘数据',
            //   url: 'on-compass-change'
            // },
             // #ifdef APP-FOX
            { name: '监听加速度传感器', url: 'on-accelerometer-change' },
            { name: '退出app', url: 'app-finish' }
            // #endif
          ]
        },
        {
          id: 'network',
          name: '网络',
          open: false,
          pages: [
            { name: '发起一个请求', url: 'request' },
            { name: '上传文件', url: 'upload-file' },
            { name: '下载文件', url: 'download-file' },
          ]
        },
        {
          id: 'location',
          name: '位置',
          open: false,
          pages: [
            // #ifndef H5
            {
              name: '获取当前位置',
              url: 'get-location'
            },
            // #endif
            {
              name: '使用地图查看位置',
              url: 'open-location'
            },
            // #ifndef MP-TOUTIAO
            {
              name: '使用地图选择位置',
              url: 'choose-location'
            },
            // #endif
            // #ifndef MP-QQ || MP-TOUTIAO
            {
              name: '地图控制',
              url: 'map'
            },
            // #endif
            // #ifdef APP-PLUS
            {
              name: '地图搜索',
              url: 'map-search'
            }
            // #endif
          ]
        },
        {
          id: 'storage',
          name: '数据',
          open: false,
          pages: [
            {
              name: '数据存储（key-value）',
              url: 'storage'
            },
            // #ifdef APP-PLUS
            {
              name: 'SQLite',
              url: 'sqlite'
            }
            // #endif
          ]
        },
        {
          id: 'runtime',
          name: '新增应用模块',
          open: false,
          pages: [
            { name: '打开url', url: 'open-url' },
            { name: '打开指定的文件', url: 'open-file' },
            { name: '文档在线查看', url: 'open-doc' },
            { name: '获取应用启动来源', url: 'get-launcher-pram' },
          ]
        },
        {
          id: 'pwdkey',
          name: '键盘',
          open: false,
          pages: [
            { name: '安全键盘', url: 'pwdkey' },
            { name: '系统键盘', url: 'softkey' },
          ]
        },
        {
          id: 'face',
          name: '人脸识别/活体检测',
          open: false,
          pages: [
            { name: '人脸识别', url: 'face' },
            { name: '二代证识别', url: 'idcard' },
          ]
        },
        // {
        //   id: 'aes',
        //   name: 'aes加解密',
        //   open: false,
        //   url: 'aes'
        // },  // 部分手机无效 暂时屏蔽入口
        {
          id: 'webview',
          name: 'webview',
          open: false,
          url: 'webview'
        },
        {
          id: 'events',
          name: '事件监听',
          open: false,
          pages: [
            { name: '应用前后台', url: 'foreground-background' },
            { name: '推送消息事件', url: 'push-message' },
            { name: '位置信息变化', url: 'location-changed' },
            { name: '网络发生变化', url: 'netchange' },
            { name: '安卓返回物理按钮被按下', url: 'backbutton' },
            { name: '系统键盘高度变化', url: 'keyboard-height-change' },
          ]
        },
        {
          id: 'voice-speaking',
          name: '语音合成',
          open: false,
          url: 'voice-speaking'
        },
        {
          id: 'gesture',
          name: '手势管理',
          open: false,
          url: 'gesture'
        },
        {
          id: 'ocr',
          name: 'ocr',
          open: false,
          pages: [
            { name: '银行卡识别', url: 'ocr-bank-card' },
            { name: '营业执照识别', url: 'ocr-business-license' },
            { name: '身份证正反面识别', url: 'ocr-identity-card' },
          ]
        },
        {
          id: 'file',
          name: '文件',
          open: false,
          pages: [
            { name: '创建、打开或删除文件', url: 'get-file' },
            { name: '保存文件到本地', url: 'save-file' },
            { name: '获取文件信息', url: 'get-saved-file-info' },
            { name: '删除本地存储的文件', url: 'remove-saved-file' },
            { name: '文件压缩、解压', url: 'compress' },
          ]
        },
        {
          id: 'third-party',
          name: '调用第三方API',
          open: false,
          pages: [
            { name: '分享', url: 'third-party-share' },
            { name: '推送', url: 'third-party-push' },
          ]
        },
        {
          id: 'media',
          name: '媒体',
          open: false,
          pages: [
            { name: '选择图片并预览', url: 'image' },
            { name: '选视频并预览播放', url: 'video' },
            // #ifndef MP-ALIPAY
            { name: '播放音频', url: 'inner-audio' },
            // #endif
            { name: '图片压缩', url: 'compress-image' },
            { name: '图片剪裁并转base64', url: 'edit-image' },
          ]
        }
      ];
      return {
        showSetTabBarPage: false,
        list: list,
        navigateFlag: false
      };
    },
    onShareAppMessage() {
      return {
        title: '欢迎体验yu-app',
        path: '/pages/tabBar/API/API'
      };
    },
    onLoad() {},
    onReady() {},
    onShow() {
      this.navigateFlag = false;
      this.leaveSetTabBarPage();
    },
    onHide() {
      this.leaveSetTabBarPage();
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
        console.log(e);
        if (this.navigateFlag) {
          return;
        }
        this.navigateFlag = true;
        if (e === 'set-tabbar') {
          this.showSetTabBarPage = true;
          return;
        }
        let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
        yu.navigateTo({
          url: url
        });
      },
      leaveSetTabBarPage() {
        setTimeout(() => {
          this.navigateFlag = false;
        }, 200);
        this.showSetTabBarPage = false;
      }
    }
  };
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
</style>
