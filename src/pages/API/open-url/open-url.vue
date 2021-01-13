<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="openURL">点击{{ title }}</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '打开url',
        href: 'https://www.baidu.com'
      };
    },
    methods: {
      openURL() {
        // #ifdef APP-FOX
        foxsdk.runtime.openURL(this.href, ret => {
          if (ret.status != 0) {
            yu.showToast({
              title: `打开失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('runtime/openURL===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
				// #endif
				// #ifdef H5
				window.open(this.href)
				// #endif
				// #ifdef MP-WEIXINV
				yu.setClipboardData({
					data: this.href
				});
				yu.showModal({
					content: '已自动复制网址，请在手机浏览器里粘贴该网址',
					showCancel: false
				});
				// #endif
				// #ifdef MP-ALIPAY
				yu.showModal({
					content: '设置剪贴板数据，暂仅支持企业支付宝账户使用',
					showCancel: false
				});
				// #endif
			}
		}
	};
</script>

<style>
  .uni-padding-wrap {
    margin-top: 50rpx 0;
  }
  .uni-button {
    margin: 30rpx 0;
  }
  .uni-tips {
    color: #666;
    font-size: 30rpx;
    word-break: break-all;
  }
  .uni-tips-text {
    margin-top: 15rpx;
    line-height: 1.2;
    font-size: 24rpx;
  }
</style>
