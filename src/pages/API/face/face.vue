<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap">
      <input class="uni-input" type="text" placeholder="请输入验证者名称" v-model="username"/>
      <input class="uni-input" type="text" placeholder="请输入验证者身份证" v-model="idcard"/>
      <button class="uni-button" type="primary" @click="faceVerify">点击验证</button>
      <view class="uni-tips">{{ payload }}</view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '人脸识别',
        payload: '',
        username: '',
        idcard: '',
      };
    },
    methods: {
      faceVerify() {
        // #ifdef APP-FOX
        if (!this.username || !this.idcard) {
          yu.showToast({
            title: '请输入验证者姓名和身份证号',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        foxsdk.face.face({liveness_type: 'meglive', username: this.username, idcard: this.idcard}, ret => { // liveness_type: meglive（动作活体)，still(静默活动)，flash(炫彩活体) 
          this.payload = JSON.stringify(ret.payload);
          var title = '验证成功！';
          if (ret.status != 0) {
            title = `验证失败：${ret.message}`;
          }
          yu.showToast({
            title: title,
            icon: 'none',
            duration: 2000
          });
          console.log('face/face===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
