<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">键盘高度：{{ keyHeight }}</view>
      <button class="uni-button" type="primary" @click="showSoftKeybord">显示系统键盘</button>
      <button class="uni-button" type="default" @click="pwdkeyHide">隐藏系统键盘</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '系统键盘',
        keyHeight: 0,
        payload: ''
      };
    },
    created() {
      this.getSystemInfo();
      this.onKeyboardHeightChange();
    },
    destroyed() {
      this.offKeyboardHeightChange();
    },
    methods: {
      getSystemInfo: function () {
				yu.getSystemInfo({
					success: (res) => {
            console.log(res)
						this.systemInfo = res;
					}
				})
      },
      onKeyboardHeightChange: function() {
        foxsdk.key.onKeyboardHeightChange(ret => {
          this.keyHeight = ret.payload.height;
          console.log('key/onKeyboardHeightChange===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        }, 1);
      },
      offKeyboardHeightChange: function() {
        foxsdk.key.offKeyboardHeightChange(ret => {
            console.log('key/offKeyboardHeightChange===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        }, 1);
      },
      showSoftKeybord() {
        // #ifdef APP-FOX
        if (this.systemInfo.platform === 'iOS') {
          yu.showToast({
            title: `foxsdk.key.showSoftKeybord暂不支持IOS`,
            icon: 'none',
            duration: 2000
          });
          return;
        }
        foxsdk.key.showSoftKeybord(ret => {
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `打开失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('key/showSoftKeybord===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
        foxsdk.key.hideSoftKeybord(ret => {
           if (ret.status != 0) {
            yu.showToast({
              title: `隐藏失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('key/hideSoftKeybord===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
