<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="setBadgeNumber">点击设置</button>
      <view class="uni-tips" v-if="payload">
        <view>Tips</view>
        <view class="uni-tips-text">设置程序快捷方式图标上显示的角标数字，android 仅支持小米，华为，部分支持oppo，vivo</view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '设置程序快捷方式图标上显示的角标数字',
        payload: ''
      };
    },
    methods: {
      setBadgeNumber() {
        // #ifdef APP-FOX
        var options = {number: 3, options: { title: '消息的标题', content: '消息的内容' }};
        foxsdk.device.setBadgeNumber(options, ret => {
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `设置失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('device/setBadgeNumber===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
