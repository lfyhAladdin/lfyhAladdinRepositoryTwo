<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="idcardVerify">点击{{ title }}</button>
      <view class="uni-tips">{{ payload }}</view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '二代证识别',
        payload: '',
      };
    },
    methods: {
      idcardVerify() {
        // #ifdef APP-FOX
        foxsdk.face.idcard({ScreenOrientation: '1', IDCardShootPage: '0'}, ret => { // ScreenOrientation String  0竖屏；1横屏 coIDCardShootPage String  身份证人像 0 ， 国徽面：1 
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `验证失败：${ret.message}`,
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
