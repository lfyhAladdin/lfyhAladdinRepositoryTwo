<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt" v-if="showVideo">
			<view>
				<video id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v"
				 @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls poster="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/poster.png"></video>
			</view>
			<!-- #ifndef MP-ALIPAY || MP-TOUTIAO -->
      <!--videoContext.sendDanmu 方法存在兼容性问题, 故先屏蔽输入弹幕内容再发送弹幕的功能展示-->
			<!--<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view>
						<view class="uni-label">弹幕内容</view>
					</view>
					<view class="uni-list-cell-db">
						<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button @click="sendDanmu" class="page-body-button">发送弹幕</button>
			</view>-->
			<!-- #endif -->
		</view>
	</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'video',
				src: '',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
        showVideo: false,
        colors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#20C098', '#F52C36', '#28a745']
			}
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY || MP-TOUTIAO
			this.videoContext = yu.createVideoContext('myVideo')
			// #endif
      // #ifdef APP-PLUS || MP-BAIDU
      setTimeout(()=>{
      	this.showVideo = true
      },350)
      // #endif
      // #ifndef APP-PLUS || MP-BAIDU
      this.showVideo = true
      // #endif
		},
		methods: {
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getcolor()
				});
        this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				yu.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
      },
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
      },
      getcolor() {
        const index = Math.floor(Math.random() * 7);
        return this.colors[index];
      },
		}
	}
</script>

<style>
	video {
		width: 690rpx;
    /* color: #409EFF, */
    /* color: #67C23A, */
    /* color: #E6A23C, */
    /* color: #F56C6C, */
    /* color: #20C098, */
    /* color: #F52C36, */
    /* color: #28a745, */
  }
</style>
