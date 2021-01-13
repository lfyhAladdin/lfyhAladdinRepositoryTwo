<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="create">create</button>
      <button class="uni-button" type="primary" @click="show">show</button>
      <button class="uni-button" type="primary" @click="open">open</button>
      <button class="uni-button" type="primary" @click="pushNewWeb">pushNewWeb</button>
      <button class="uni-button" type="primary" @click="reload">reload</button>
      <button class="uni-button" type="primary" @click="all">all</button>
      <button class="uni-button" type="primary" @click="close">创建并延迟3秒自动关闭webview</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: 'webview',
        payload: ''
      };
    },
    methods: {
      create() {
        // #ifdef APP-FOX
        foxsdk.webview.create(
          {
            url: 'https://www.baidu.com/',
            id_wvobj: 'id111',
            style: {
              width: '200',
              height: '200'
            }
          },
          ret => {
            this.payload = JSON.stringify(ret.payload);
            if (ret.status != 0) {
              yu.showToast({
                title: `失败：${ret.message}`,
                icon: 'none',
                duration: 2000
              });
            }
            console.log('webview/create===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
      open() {
        // #ifdef APP-FOX
        foxsdk.webview.open(
          {
            url: 'https://www.baidu.com/',
            id_wvobj: 'id112',
            style: {
              width: '200',
              height: '200'
            }
          },
          ret => {
            this.payload = JSON.stringify(ret.payload);
            if (ret.status != 0) {
              yu.showToast({
                title: `失败：${ret.message}`,
                icon: 'none',
                duration: 2000
              });
            }
            console.log('webview/create===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
      show() {
        // #ifdef APP-FOX
        foxsdk.webview.show('id111',
          ret => {
            this.payload = JSON.stringify(ret.payload);
            if (ret.status != 0) {
              yu.showToast({
                title: `失败：${ret.message}`,
                icon: 'none',
                duration: 2000
              });
            }
            console.log('webview/create===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
      pushNewWeb() {
        // #ifdef APP-FOX
        foxsdk.webview.pushNewWeb({url: 'https://www.baidu.com/', animation: '1'},
          ret => {
            this.payload = JSON.stringify(ret.payload);
            if (ret.status != 0) {
              yu.showToast({
                title: `失败：${ret.message}`,
                icon: 'none',
                duration: 2000
              });
            }
            console.log('webview/create===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
      close() {
        // #ifdef APP-FOX
        this.open();
        setTimeout(() => {
          foxsdk.webview.close('id112', ret => {
            this.payload = JSON.stringify(ret.payload);
            if (ret.status != 0) {
              yu.showToast({
                title: `失败：${ret.message}`,
                icon: 'none',
                duration: 2000
              });
            }
            console.log('webview/create===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
          });
        }, 2000)
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      reload() {
        // #ifdef APP-FOX
        foxsdk.webview.reload(ret => {
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('webview/create===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      all() {
        // #ifdef APP-FOX
        foxsdk.webview.all(ret => {
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('webview/create===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
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
