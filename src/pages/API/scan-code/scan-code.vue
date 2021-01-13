<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title" v-if="result">扫码结果：</view>
      <view class="uni-list" v-if="result">
        <view class="uni-cell">
          <!-- #ifdef APP-FOX -->
          <view class="scan-result">{{ result.codeResult }}</view>
          <!-- #endif -->
          <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
          <view class="scan-result">>条码类型：{{ result.scanType }}</view>
          <view class="scan-result">>扫码内容：{{ result.result }}</view>
          <!-- #endif -->
        </view>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="scan">扫一扫</button>
      </view>
       <!-- #ifdef APP-FOX -->
      <view class="tip-text">如调用不成功，请确认是否已开启相机权限。</view>
       <!-- #endif -->
    </view>
  </view>
</template>
<script>
  import permision from '@/common/permission.js';
  export default {
    data() {
      return {
        title: 'scanCode',
        result: ''
      };
    },
    methods: {
      async scan() {
        console.log('scan');
        // #ifdef APP-FOX
        // let status = await this.checkPermission();
        // console.log('status---' + status);
        // if (status !== 1) {
        //   return;
        // }
        // #endif
        // #ifdef H5
        yu.showToast({
          title: `H5端暂不支持`,
          icon: 'none',
          duration: 2000
        });
        // #endif
        // #ifndef H5
        yu.scanCode({
          success: res => {
            console.log(res)
            this.result = res;
          },
          fail: err => {
            console.log(err)
            // 需要注意的是小程序扫码不需要申请相机权限
            yu.showToast({
              title: `失败`,
              icon: 'none',
              duration: 2000
            });
          }
        });
        // #endif
      },
      // #ifdef APP-FOX
      async checkPermission(code) {
        let status = permision.isIOS
          ? await permision.requestIOS('camera')
          : await permision.requestAndroid('android.permission.CAMERA');

        if (status === null || status === 1) {
          status = 1;
        } else {
          yu.showModal({
            content: '需要相机权限',
            confirmText: '设置',
            success: function(res) {
              if (res.confirm) {
                permision.gotoAppSetting();
              }
            }
          });
        }
        console.log(status)
        return status;
      }
      // #endif
    }
  };
</script>

<style>
  .scan-result {
    min-height: 50rpx;
    line-height: 50rpx;
    word-break: break-all;
  }
  .tip-text {
    text-align: center;
    color: #999;
  }
</style>
