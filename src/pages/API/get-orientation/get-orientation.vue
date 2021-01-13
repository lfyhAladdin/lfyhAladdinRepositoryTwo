<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="getOrientation">点击{{ title }}</button>
      <view class="uni-tips" v-if="payload">
        <view>Tips</view>
        <view class="uni-tips-text">orientation：0: 未知; 1,2: 竖屏; 3,4: 横屏 </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '获取应用横竖屏状态',
        payload: ''
      };
    },
    methods: {
      getOrientation() {
        // #ifdef APP-FOX
        foxsdk.device.getOrientation(ret => {
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `获取失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('device/getOrientation===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
  }
  .uni-tips-text {
    margin-top: 15rpx;
    line-height: 1.2;
    font-size: 24rpx;
  }
</style>
