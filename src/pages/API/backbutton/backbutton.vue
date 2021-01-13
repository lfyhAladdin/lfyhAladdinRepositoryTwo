<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="listenerBackbutton">监听{{ title }}</button>
      <view class="uni-tips">{{ payload }}</view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '安卓返回物理按钮被按下',
        payload: '',
      };
    },
    methods: {
      listenerBackbutton() {
        // #ifdef APP-FOX
        foxsdk.events.addEventListener('backbutton', ret => {
          this.payload = JSON.stringify(ret.payload);
          alert('安卓返回物理按钮被按下')
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
