<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="appFinish">点击{{ title }}</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '退出app',
        style: 'default',
        payload: ''
      };
    },
    methods: {
      appFinish() {
        foxsdk.device.appFinish(ret => {
          console.log(ret)
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `退出失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log(
            'device/version===status: ' +
              ret.status +
              ',message: ' +
              ret.message +
              ',payload: ' +
              JSON.stringify(ret.payload)
          );
        });
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
