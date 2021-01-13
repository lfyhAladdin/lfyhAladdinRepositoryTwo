<template>
  <view>
    <page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">
			<yu-icons size="16" type="info"></yu-icons>说明: </view>
			<view class="uni-helllo-text">
				<view>在App端可在pages.json里配置buttons，暂不支持动态改变buttons的样式，使用onNavigationBarButtonTap可监听buttons的点击事件。</view>
				<view>在小程序端，不支持配置buttons。</view>
			</view>
		</view>
  </view>
</template>
<script>

export default {
  data() {
    return {
      title: '自定义导航栏'
    };
  },
  // 点击导航栏自定义按钮
  onNavigationBarButtonTap(e) {
    console.log(e)
    if (e.index === 0) {
      yu.navigateTo({ url: `/pages/template/list2product/list2product` });
    } else {
       uni.showToast({
				title: e.index === 1 ? '你点了分享按钮' : '你点了收藏按钮',
				icon: 'none'
			});
    }
  },
  methods: {},
};
</script>

<style></style>