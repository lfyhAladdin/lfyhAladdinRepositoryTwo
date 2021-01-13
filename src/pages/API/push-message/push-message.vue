<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @tap="listenerPushMessage">监听{{ title }}</button>
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="default" @tap="createMessage">创建本地消息</button>
      <view class="uni-tips">
        <view>Tips</view>
        <view class="uni-tips-text">IOS创建消息后需要切换到后台才能收到推送的消息。</view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '推送消息事件',
        payload: '',
      };
    },
    methods: {
      listenerPushMessage() {
        // #ifdef APP-FOX
        foxsdk.events.addEventListener('pushMessage', ret => {
          yu.showToast({
            title: `推送消息：${JSON.stringify(ret.payload)}`,
            icon: 'none',
            duration: 2000
          });
          this.payload = JSON.stringify(ret.payload);
          console.log('events/addEventListener===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      createMessage() {
        // #ifdef APP-FOX
        var data = {
          "content": "您好,本地推送内容",
          "payload": "",
          "notificationId":"100000000",
          "options" : {
            "delay": 10,
            "sound": "system",
            "title": "推送标题",
            "subtitle": "推送副标题"
          }
        }
        foxsdk.push.createMessage(data, ret => {
          console.log('push/createMessage===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
