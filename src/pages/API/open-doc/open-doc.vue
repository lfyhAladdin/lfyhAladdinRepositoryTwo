<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<!-- <view class="uni-tips">{{ payload }}</view> -->
			<button class="uni-button" type="primary" @click="openDoc">点击查看在线文档</button>
			<!-- <view class="uni-tips" v-if="payload">
        <view>Tips</view>
        <view class="uni-tips-text">调用第三方程序打开指定的文件(ios可以直接打开)</view>
      </view> -->
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: '文档在线查看',
				url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/helloworld.pdf',
				payload: ''
			};
		},
		methods: {
			openDoc() {
				// #ifdef APP-FOX
				foxsdk.runtime.openDoc(this.url, ret => {
					this.payload = JSON.stringify(ret.payload);
					if (ret.status != 0) {
						yu.showToast({
							title: `打开失败：${ret.message}`,
							icon: 'none',
							duration: 2000
						});
					}
					console.log('runtime/getLauncherPram===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
				});
				// #endif
				// #ifdef MP-WEIXIN
				yu.downloadFile({
					url: this.url,
					success: res => {
						console.log(res);
						yu.openDocument({
							filePath: res.tempFilePath,
							success: () => {
								console.log('打开文档成功');
							}
						});
					}
				});
				// #endif
				// #ifdef H5
				yu.showToast({
					icon: 'none',
					title: 'H5端暂不支持！',
					duration: 1500
				});
        // #endif
        // #ifdef MP-ALIPAY
				yu.showToast({
					icon: 'none',
					title: '支付宝小程序暂不支持！',
					duration: 1500
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
