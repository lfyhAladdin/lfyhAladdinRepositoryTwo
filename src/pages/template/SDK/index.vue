<template>
  <view>
    <button @tap="scanFn">扫码</button>
    <button @tap="cameraFn">拍照</button>
    <button @tap="showPwdKey">密码键盘</button>
    <text class="tips">此页面的API需要运行在宇信外壳上</text>
  </view>
</template>
<script>
export default {
  methods: {
    scanFn() {
      foxsdk.barcode.scan((ret) => {
        console.log(
          'barcode/scan===status: ' +
            ret.status +
            ',message: ' +
            ret.message +
            ',payload: ' +
            ret.payload
        )
      })
    },
    cameraFn() {
      let options = {
        filename: '_doc/yuapp_temp_0000001/camera/',
        format: 'JPG',
        index: '2',
        videoMaximumDuration: '',
      }
      foxsdk.camera.captureImage(options, (ret) => {
        console.log(
          'camera/captureImage===status: ' +
            ret.status +
            ',message: ' +
            ret.message +
            ',payload: ' +
            JSON.stringify(ret.payload)
        )
      })
    },
    showPwdKey() {
      foxsdk.pwdkey.show({ type: 'md5' }, (ret) => {
        console.log(
          'keybord/show===status: ' +
            ret.status +
            ',message: ' +
            ret.message +
            ',payload: ' +
            JSON.stringify(ret.payload)
        )
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/entry.scss';
button {
  margin: 20rpx;
}
.tips {
  margin: 20rpx;
  @extend .font-12;
}
</style>
