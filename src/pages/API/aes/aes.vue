<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
 			<yu-input placeholder="请输入要加密的内容" type="number" v-model="content"></yu-input>
      <button class="uni-button" type="primary" @click="encrypt">点击加密</button>
      <view class="uni-tips" v-if="payload">加密后返回的内容{{ payload }}</view>
      <button class="uni-button" type="primary" @click="decrypt">点击解密</button>
      <view class="uni-tips" v-if="decryptPayload">解密后返回的内容{{ decryptPayload }}</view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: 'aes加解密',
        content: '',
        payload: '',
        decryptPayload: '',
      };
    },
    methods: {
      encrypt() {
        // #ifdef APP-FOX
        // aes加密
        if (!this.content) {
          yu.showModal({
            content: '请先输入要加密的内容！',
            showCancel: false
          });
          return;
        }
        foxsdk.encryptDescrypt.aes({
            originData: this.content,
            key: 'OS*Upai@00',
            encrypt: '1'
          }, ret => {
            this.payload = JSON.stringify(ret.payload);
            if (ret.status != 0) {
              yu.showToast({
                title: `${ret.message}`,
                icon: 'none',
                duration: 2000
              });
            }
            console.log('runtime/getLauncherPram===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
          }
        );
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      decrypt() {
        // #ifdef APP-FOX
        //aes解密
        foxsdk.encryptDescrypt.aes({
            originData: 'uvLc/ut6JLCYsVj26Q3vWjL9bve07h8P0uqTkCJadoCG3onLWUWvqcCDUYWZNAjvrEgntO/Yk7aDpDr8sdpTI2xFzXqi9vM2u7VuGaTRa+E=',
            key: 'OS*Upai@00',
            encrypt: '0'
          }, ret => {
            this.decryptPayload = JSON.stringify(ret.payload);
            if (ret.status != 0) {
              yu.showToast({
                title: `${ret.message}`,
                icon: 'none',
                duration: 2000
              });
            }
            console.log('runtime/getLauncherPram===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
          }
        );
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
