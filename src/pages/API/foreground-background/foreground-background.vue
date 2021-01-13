<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="listenerForegroundAndbackground">监听{{ title }}</button>
      <view class="uni-tips">{{ payload }}</view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '应用前后台',
        payload: '',
      };
    },
    methods: {
      listenerForegroundAndbackground() {
        // #ifdef APP-FOX
        foxsdk.events.addEventListener('foreground', ret => {
          yu.showToast({
            title: '应用已切换到前台',
            icon: 'none',
            duration: 2000
          });
          console.log('events/addEventListener===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        foxsdk.events.addEventListener('background', ret => {
          yu.showToast({
            title: '应用已切换到后台',
            icon: 'none',
            duration: 2000
          });
          this.payload = JSON.stringify(ret.payload);
          console.log('events/addEventListener===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
