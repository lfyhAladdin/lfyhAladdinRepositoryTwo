<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="pwdkeyShow('md5')">显示md5加密的安全键盘</button>
      <button class="uni-button" type="primary" @click="pwdkeyShow('aes')">显示aes加密的安全键盘</button>
      <button class="uni-button" type="primary" @click="pwdkeyShow('rsa')">显示rsa加密的安全键盘</button>
      <button class="uni-button" type="primary" @click="pwdkeyShow('sm2')">显示sm2加密的安全键盘</button>
      <button class="uni-button" type="primary" @click="pwdkeyShow('sm4')">显示sm4加密的安全键盘</button>
      <view class="uni-tips" v-if="payload">
        <view>Tips</view>
        <view class="uni-tips-text">使用{{ type }}加密的密码键盘</view>
      </view>
      <button class="uni-button" type="default" @click="pwdkeyHide">隐藏键盘</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '安全键盘',
        type: 'md5',
        payload: ''
      };
    },
    methods: {
      pwdkeyShow(type) {
        // #ifdef APP-FOX
        this.type = type;
        foxsdk.pwdkey.show({type: type}, ret => { // 加密方式值：“md5”，“aes”，“rsa”，“sm2”，“sm4”
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `打开失败：${ret.message}`,
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
      },
      pwdkeyHide() {
        // #ifdef APP-FOX
        foxsdk.pwdkey.hide(ret => {
          if (ret.status != 0) {
            yu.showToast({
              title: `隐藏失败：${ret.message}`,
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
