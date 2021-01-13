<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="getVersion">点击{{ title }}</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '获取系统版本信息',
        payload: ''
      };
    },
    methods: {
      getVersion() {
        // #ifdef APP-FOX
        foxsdk.device.version(ret => {
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `获取失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('device/version===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
</style>
