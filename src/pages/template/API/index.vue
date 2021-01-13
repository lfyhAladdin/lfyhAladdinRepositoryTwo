<template>
  <view>
    <button @tap="setStorage">存储</button>
    <button @tap="getStorage">获取存储</button>
    <button @tap="sendHttp">网络请求</button>
    <text class="tips">此页面的API可以运行在所有平台上</text>
  </view>
</template>
<script>
export default {
  methods: {
    setStorage() {
      uni.setStorage({
        key: 'storage_key',
        data: 'hello',
        complete: function() {
          alert('存储成功')
        },
        fail:function(e){
          console.log(e)
        }
      })
    },
    sendHttp() {
      this.$http
        .request({
          method: 'POST',
          url: this.$backend.ebankService + '/T07001', //仅为示例，并非真实接口地址。
          data: {},
        })
        .then((res) => {
          alert('请求成功')
        })
    },
    getStorage() {
      uni.getStorage({
        key: 'storage_key',
        success: function(res) {
          alert(res.data)
        },
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
