<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-btn-v">
        <button @tap="navigateTo">跳转新页面，并传递数据</button>
        <button @tap="navigateBack">返回上一页</button>
        <button @tap="redirectTo">在当前页面打开</button>
        <button @tap="switchTab">切换到模板选项卡</button>
        <button @tap="reLaunch">关闭所有页面，打开首页</button>
        <!-- #ifdef APP-FOX -->
        <button @tap="customAnimation">使用自定义动画打开页面</button>
        <!-- #endif -->
        <!-- #ifdef APP-FOX || H5 -->
        <button @tap="navigateToPreloadPage">打开复杂页面</button>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>
<script>
  const preloadPageUrl = '/pages/extUI/calendar/calendar';
  export default {
    data() {
      return {
        title: 'navigate'
      };
    },
    methods: {
      navigateTo() {
        yu.navigateTo({
          url: 'new-page/new-vue-page-1?data=Hello'
        });
      },
      navigateBack() {
        yu.navigateBack();
      },
      redirectTo() {
        yu.redirectTo({
          url: 'new-page/new-vue-page-1'
        });
      },
      switchTab() {
        yu.switchTab({
          url: '/pages/tabBar/template/template'
        });
      },
      reLaunch() {
        yu.reLaunch({
          url: '/pages/tabBar/component/component'
        });
      },
      customAnimation() {
        yu.navigateTo({
          url: 'new-page/new-vue-page-1?data=使用自定义动画打开页面',
          animationType: 'slide-in-bottom',
          animationDuration: 200
        });
      },
      navigateToPreloadPage() {
        console.log('navigateToPreloadPage')
        yu.navigateTo({
          url: preloadPageUrl
        });
      }
    }
  };
</script>
