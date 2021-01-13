<template>
  <view class="uni-container">
    <!-- <view class="uni-hello-text">
      <text class="hello-text">以下是yu-app扩展组件示例，更多组件见插件市场：</text>
      <u-link class="hello-link" :href="'https://ext.dcloud.net.cn/'" :text="'https://ext.dcloud.net.cn'" :inWhiteList="true"></u-link>
    </view> -->
    <view class="uni-panel" v-for="item in lists" :key="item.url">
      <view class="uni-panel-h" @click="goDetailPage(item.url)">
        <text class="uni-panel-text">{{item.name}}</text>
        <text class="uni-panel-icon uni-icon">&#xe470;</text>
      </view>
    </view>
  </view>
</template>
<script>
  import uLink from '@/components/uLink.vue';
  export default {
    components: {
      uLink
    },
    data() {
      return {
        navigateFlag: false,
        lists: [
          {
            name: 'Badge 数字角标',
            url: 'badge'
          },
          {
            name: 'Calendar 日历',
            url: 'calendar'
          },
          {
            name: 'Card 卡片',
            url: 'card'
          },
          {
            name: 'Collapse 折叠面板',
            url: 'collapse'
          },
          // Combox组件存在问题, 屏蔽入口, 若有类似需求 可用picker组件代替 - 禅道bug-4570 【示例工程】微信小程序-Android,扩展组件-Combox组合框，关闭键盘后，弹出的下拉列表也关闭了
          //{
          //  name: 'Combox 组合框',
          //  url: 'combox'
          //},
          {
            name: 'Countdown 倒计时',
            url: 'countdown'
          },
          {
            name: 'Drawer 抽屉',
            url: 'drawer'
          },
          {
            name: 'Fab 悬浮按钮',
            url: 'fab'
          },
          {
            name: 'Fav 收藏按钮',
            url: 'fav'
          },
          {
            name: 'GoodsNav 商品导航',
            url: 'goods-nav'
          },
          {
            name: 'Grid 宫格',
            url: 'grid'
          },
          {
            name: 'Icons 图标',
            url: 'icons'
          },
          {
            name: 'IndexedList 索引列表',
            url: 'indexed-list'
          },
          {
            name: 'Link 超链接',
            url: 'link'
          },
          {
            name: 'List 列表',
            url: 'list'
          },
          {
            name: 'LoadMore 加载更多',
            url: 'load-more'
					},
					// #ifndef MP-ALIPAY
          {
            name: 'NavBar 自定义导航栏',
            url: 'nav-bar'
					},
					// #endif
          // #ifndef QUICKAPP-WEBVIEW
          {
            name: 'NoticeBar 通告栏',
            url: 'notice-bar'
          },
          // #endif
          { name: 'NumberBox 数字输入框', url: 'number-box' },
          { name: 'YuInout 输入框', url: 'input-box' },
          {
            name: 'Pagination 分页器',
            url: 'pagination'
          },
          // #ifndef QUICKAPP-WEBVIEW-HUAWEI
          {
            name: 'PopUp 弹出层',
            url: 'popup'
          },
          // #endif
          {
            name: 'Rate 评分',
            url: 'rate'
          },
          {
            name: 'SearchBar 搜索栏',
            url: 'search-bar'
          },
          {
            name: 'SegmentedControl 分段器',
            url: 'segmented-control'
          },
          {
            name: 'Steps 步骤条',
            url: 'steps'
          },
          {
            name: 'SwipeAction 滑动操作',
            url: 'swipe-action'
          },
          {
            name: 'SwiperDot 轮播图指示点',
            url: 'swiper-dot'
          },
          {
            name: 'Tag 标签',
            url: 'tag'
          },
          {
            name: 'Transition 过渡动画',
            url: 'transition'
          },
          { name: 'YuImage 图片', url: 'yu-image' },
          { name: 'UploadImage 上传图片', url: 'upload-image' },
          { name: 'YuUploadOcr OCR识别+上传', url: 'upload-ocr' },
          { name: 'YuPicker 选择器', url: 'yu-picker' },
          { name: 'YuPullScroll 上拉加载下拉刷新', url: 'yu-pull-scroll-demo' },
        ]
      };
    },
    onLoad() {},
    onReady() {
      // #ifdef APP-NVUE
      uni.preloadPage({
        url: '/pages/extUI/calendar/calendar',
        success() {
          console.log('preloadPage /pages/extUI/calendar/calendar');
        },
        fail() {}
      });
      // #endif
    },
    onShareAppMessage() {
      return {
        title: '欢迎体验yu-app',
        path: '/pages/tabBar/extUI/extUI'
      };
    },
    methods: {
      goDetailPage(path) {
        if (this.navigateFlag) {
          return;
        }
        this.navigateFlag = true;
        uni.navigateTo({
          url: '/pages/extUI/' + path + '/' + path
        });
        setTimeout(() => {
          this.navigateFlag = false;
        }, 200);
      }
    }
  };
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
</style>
