<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ payload }}</view>
      <button class="uni-button" type="primary" @click="createMessage">创建本地消息</button>
    </view>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="getAllMessage">获取所有消息</button>
    </view>
    <view v-for="(msg, index) in messages" :key="index">
      <text>消息id：{{ msg.notificationId }}，内容：{{ msg.content }}</text>
      <button class="mini-btn" type="default" size="mini" @click="removeMessage(msg.notificationId)">删除此消息</button>
    </view>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="clearMessage">清除通知中心的消息</button>
    </view>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ clientInfoPayload }}</view>
      <button class="uni-button" type="primary" @click="getClientInfo">获取客户端推送标识信息</button>
    </view>
    <view class="uni-padding-wrap">
      <button class="uni-button" type="primary" @click="setAutoNotification">设置是否将消息显示在系统消息中心</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '推送',
        payload: '',
        clientInfoPayload: '',
        messages: [],
        isnotify: true, // 是否将消息显示在系统消息中心
      };
    },
    methods: {
      createMessage() {
        // #ifdef APP-FOX
        var data = {
          "content": "您好,这是一条本地创建的消息",
          "payload": "",
          "notificationId": "100000000",
          "options" : {
            "delay": 10,
            "sound": "system",
            "title": "消息标题",
            "subtitle": "消息副标题"
          }
        }
        foxsdk.push.createMessage(data, ret => {
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
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
      getAllMessage() {
        // #ifdef APP-FOX
        foxsdk.push.getAllMessage(ret => {
          if (ret.status == 0) {
            this.messages = ret.payload;
          }
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
          console.log('push/getAllMessage===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      removeMessage(notificationId) {
        // #ifdef APP-FOX
        foxsdk.push.remove(notificationId, ret => {
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
          console.log('push/remove===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
          this.getAllMessage();
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      clearMessage() {
        // #ifdef APP-FOX
        foxsdk.push.clear(ret => {
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
          console.log('push/clear===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
          this.getAllMessage();
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      getClientInfo() {
        // #ifdef APP-FOX
        foxsdk.push.getClientInfo(ret => {
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
          this.clientInfoPayload = JSON.stringify(ret.payload); 
          console.log('push/getClientInfo===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      setAutoNotification() {
        // #ifdef APP-FOX
        this.isnotify = !this.isnotify;
        foxsdk.push.setAutoNotification(this.isnotify, ret => {
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
          console.log('push/setAutoNotification===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
