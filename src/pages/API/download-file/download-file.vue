<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<image class="img" v-if="imageSrc" :src="imageSrc" mode="center" />
			<block v-else>
				<view class="uni-hello-text">
					点击按钮下载服务端示例图片（下载网络文件到本地临时目录）
				</view>
				<view class="uni-btn-v">
					<button type="primary" @tap="downloadImage">下载</button>
				</view>
			</block>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'downloadFile',
				imageSrc: ''
			}
		},
		onUnload() {
			this.imageSrc = '';
		},
		methods: {
			downloadImage: function () {
        // const _this = this;
				yu.showLoading({ title:'下载中' });
				yu.downloadFile({
          // #ifndef MP-WEIXIN
				  url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594897605925&di=f4cc79a00dd5ef91f8f65d155b7bea7a&imgtype=0&src=http%3A%2F%2Fdingyue.nosdn.127.net%2FlkzCTiFcbU6KsHZlMmDreU8rTn8kElMWPwaCmNV6lXWpV1539596751844.jpeg",
	        // #endif
          // #ifdef MP-WEIXIN
          // 微信小程序上 上面宇信logo的图片无法显示
	        url: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
	        // #endif
          success: (res) => {
            console.log('downloadFile success, res is', res);
            // #ifdef APP-FOX
            this.imageToBase64(res.tempFilePath);
	          // #endif
	          // #ifndef APP-FOX
            this.imageSrc = res.tempFilePath;
            yu.hideLoading();
	          // #endif
					},
					fail: (err) => {
						console.log('downloadFile fail, err is:', err);
					}
				})
      },
      imageToBase64(url) {
        console.log(url)
        foxsdk.logger.level.debug = false;
        foxsdk.gallery.imageBase64(url, ret => {
          yu.hideLoading();
          console.log(ret)
          if (ret.status == 0) {
            this.imageSrc = 'data:image/png;base64,' + ret.payload.imageBase64;
          } else {
            yu.showToast({
              icon: 'none',
              title: ret.message,
              duration: 3000
            });
          } 
          foxsdk.logger.level.debug = true;
        });
      }
		}
	}
</script>

<style>
.img {
	width: 500rpx;
	height: 500rpx;
	margin: 0 95rpx;
}
</style>
