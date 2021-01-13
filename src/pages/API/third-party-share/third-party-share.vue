<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="getShareServices">获取分享服务</button>
    </view>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="sendByWechat">微信分享</button>
    </view>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="sendByMoments">朋友圈分享</button>
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
      getShareServices() {
        // #ifdef APP-FOX
        foxsdk.share.getShareServices({sdkType: 'Mob'}, ret => {
          this.payload = JSON.stringify(ret.payload);
          if (ret.status != 0) {
            yu.showToast({
              title: `获取失败：${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('share/getShareServices===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      sendByWechat() {
        // #ifdef APP-FOX
        var options = {
          text: '分享测试',
          url: 'https://www.baidu.com',
          images:[],
          type: 'text',
          title: '',
          provider: 'webchat',
          // channel,
          sourceFileData:'',
          sourceFileExtension:''
        }
        foxsdk.share.sendByWechat(options, ret => {
          console.log('share/sendByWechat===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      sendByMoments() {
        // #ifdef APP-FOX
        var options = {
            text: '分享测试',
            url: 'https://www.baidu.com',
            images: [],
            type: 'text',
            title: '',
            provider: 'timeline',
            // channel,
            sourceFileData:'',
            sourceFileExtension:''
        }
        foxsdk.share.sendByMoments(options, ret => {
          console.log('share/sendByMoments===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      }
    },
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
