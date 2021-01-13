<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-tips">{{ content }}</view>
      <button class="uni-button" type="primary" @click="speaking">{{ title }}</button>
      <view class="uni-tips">{{ payload }}</view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '语音合成',
        payload: '',
        content: '西湖春色归，春水绿于染。群芳烂不收，东风落如糁。参军春思乱如云，白发题诗愁送春；遥知湖上一樽酒，能忆天涯万里人。万里思春尚有情，忽逢春至客心惊；雪消门外千山绿，花发江边二月晴。少年把酒逢春色，今日逢春头已白。异乡物态与人殊，惟有东风旧相识。'
      };
    },
    methods: {
      speaking() {
        // #ifdef APP-FOX
        var data = { 'content': this.content };
        foxsdk.voice.speaking(data, ret => {
          this.payload = JSON.stringify(ret.payload);
          foxsdk.logger.info('voice/speechText===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
