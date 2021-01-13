<template>
	<view>
		<page-head :title="title"></page-head>
    <view class="video-src">{{ src }}</view>
		<view class="uni-common-mt">
			<view class="uni-list" style="display: block;">
				<view class="uni-list-cell" v-if="!src">
					<view class="uni-list-cell-left">
						<view class="uni-label">视频来源</view>
					</view>
					<view class="uni-list-cell-right">
						<picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex">
							<view class="uni-input">{{sourceType[sourceTypeIndex]}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<view class="uni-title uni-common-mt uni-common-pl">摄像头位置</view>
		<view class="uni-hello-text camera-tips">注意：部分 Android 手机下由于系统 ROM 不支持无法生效，打开拍摄界面后可操作切换</view>
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in cameraList" :key="item.value">
					<radio :value="item.value" :checked="index === cameraIndex">{{item.name}}</radio>
				</label>
			</radio-group>
		</view>
		<!-- #endif -->
		<template v-if="!src">
			<view class="uni-hello-addfile" @tap="chooseVideo">+ 添加视频</view>
		</template>
		<template v-else>
			<video :src="src" class="video"></video>
		</template>
	</view>
</template>
<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	export default {
		data() {
			return {
				title: 'chooseVideo',
				sourceTypeIndex: 2,
				sourceType: ['拍摄', '相册', '拍摄或相册'],
				src: '',
				cameraList: [{
						value: 'back',
						name: '后置摄像头',
						checked: 'true'
					},
					{
						value: 'front',
						name: '前置摄像头'
					},
				],
				cameraIndex: 0
			}
		},
		onUnload() {
			this.src = '';
			this.sourceTypeIndex = 2;
			this.sourceType = ['拍摄', '相册', '拍摄或相册'];
		},
		methods: {
			radioChange(evt) {
				for (let i = 0; i < this.cameraList.length; i++) {
					if (this.cameraList[i].value === evt.detail.value) {
						this.cameraIndex = i;
						break;
					}
				}
			},
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = parseInt(e.detail.value)
			},
			chooseVideo: function() {
				yu.chooseVideo({
					camera: this.cameraList[this.cameraIndex].value,
					sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
            // #ifdef APP-FOX
            // this.src = 'file://' + res.tempFilePath;
            foxsdk.io.convertLocalFileSystemURL(res.tempFilePath, url => {
              this.src = 'file://' + url;
              console.log(this.src);
            }, ret => {
            // sdkError
              console.log(ret);
            });
            // #endif
            // #ifndef APP-FOX
            this.src = res.tempFilePath;
            console.log(this.src);
            // #endif
					},
					fail: (err) => {
						// #ifdef MP
						yu.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									//yu.showModal({
									//	title: '授权失败',
									//	content: 'Hello yu-app需要从您的相机或相册获取视频，请在设置界面打开相关权限',
									//	success: (res) => {
									//		if (res.confirm) {
									//			yu.openSetting()
									//		}
									//	}
									//})
								}
							}
						})
						// #endif
					}
				})
			}
		}
	}
</script>

<style>
	.video {
		width: 100%;
	}
  .video-src {
    padding: 0 10px;
    word-break: break-all;
    font-size: 26rpx;
    color: #666;
  }
	.camera-tips {
		padding: 10rpx 30rpx;
	}
  .uni-hello-addfile {
    text-align: center;
    line-height: 150px;
    background: #FFF;
    padding: 25px;
    margin-top: 10px;
    font-size: 19px;
    color: #808080;
  }
</style>
