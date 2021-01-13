<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="openFile">点击{{ title }}</button>
       <view class="uni-tips" v-if="payload">
        <view>Tips</view>
        <view class="uni-tips-text">调用第三方程序打开指定的文件(ios可以直接打开)</view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '打开指定的文件',
        payload: ''
      };
    },
    methods: {
      openFile() {
        // #ifdef APP-FOX
        foxsdk.runtime.openFile("_downloads/demo.pdf", ret => {
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
				// #ifndef APP-FOX
				yu.showModal({
					content: '此功能目前仅限于APP端使用！',
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
