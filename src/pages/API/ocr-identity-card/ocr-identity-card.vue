<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="startOCR1">{{ title }}正面识别</button>
      <button class="uni-button" type="primary" @click="startOCR2">{{ title }}反面识别</button>
      <view class="uni-tips">{{ payload }}</view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '身份证',
        payload: '',
      };
    },
    methods: {
      startOCR1() {
        // #ifdef APP-FOX
        foxsdk.ocr.startOCR('2', ret => {
          this.payload = JSON.stringify(ret.payload);
          console.log('ocr/startOCR===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      startOCR2() {
        // #ifdef APP-FOX
        foxsdk.ocr.startOCR('3', ret => {
          this.payload = JSON.stringify(ret.payload);
          console.log('ocr/startOCR===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
  .uni-input {
    margin-bottom: 30rpx;
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
