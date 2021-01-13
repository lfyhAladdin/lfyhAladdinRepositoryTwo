<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="listenerNetchange">监听{{ title }}</button>
      <view class="uni-tips" v-if="payload">当前网络状态{{ payload }}</view>
      <view class="uni-tips" v-if="payload">status：1 无网, 2 网络, 3 wifi</view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '网络发生变化',
        payload: '',
      };
    },
    methods: {
      listenerNetchange() {
        // #ifdef APP-FOX
        foxsdk.events.addEventListener('netchange', ret => {
          this.payload = JSON.stringify(ret.payload);
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });

          console.log('events/addEventListener===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        }, 0);
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
