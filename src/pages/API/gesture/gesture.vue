<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="openUnlock('2')">设置手势</button>
      <button class="uni-button" type="primary" @click="openUnlock('1')">校验手势</button>
      <button class="uni-button" type="primary" @click="currentGesture">获取手势</button>
      <view class="uni-tips" v-if="payload">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="clearGestureInfo">删除手势</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '手势管理',
        payload: '',
        userIdentify: '9527'
      };
    },
    methods: {
      openUnlock(type) {
        // #ifdef APP-FOX
        var data = {unlockType: type, userIdentify: this.userIdentify, maxErrorTimes: '6', gesturePswd: 'xxxxx'};
        foxsdk.gesture.openUnlock(data, ret => {
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
          console.log('gesture/openUnlock---status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },

      currentGesture() {
        // #ifdef APP-FOX
        var data = {userIdentify: this.userIdentify};
        foxsdk.gesture.currentGesture(data, ret => {
          this.payload = JSON.stringify(ret.payload);
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
          console.log('gesture/currentGesture---status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },

      clearGestureInfo() {
        // #ifdef APP-FOX
        var data = {userIdentify: this.userIdentify};
        foxsdk.gesture.clearGestureInfo(data, ret => {
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
          this.payload = '';
          console.log('gesture/clearGestureInfo---status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
