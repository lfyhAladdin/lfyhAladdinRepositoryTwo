<template>
  <view class="incoming">
    <view :class="phoneSystem ? 'pf-title pf-title-ios pf-titleTwo pf-titleTwo-ios':'pf-title pf-titleTwo'">
      <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
      <text>{{identity}}</text>
    </view>
    <view class="customize-content-form">
      <view class="person-infor">
        <view class="person-infor-one" @click="pageJump(verifyOldPassword)">
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
          <text>验证原登陆密码</text>
        </view>
        <view class="person-infor-one" @click="pageJump(verifyIdentidy)">
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
          <text>验证身份信息</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>

export default {
  data() {
    return {
      identity: "选择验证方式",
      navigateFlag: false,
      see: true,
      verifyIdentidy:'login/updatePassword/verifyIdentidy/verifyIdentidy',
      verifyOldPassword:'login/updatePassword/verifyOldPassword/verifyOldPassword'
    };
  },
  onLoad(option) {},
  onShow() {},
  onUnload() {},
  computed: {},
  methods: {
    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },
    // 下一步
    nextStep() {
      let that = this;
      that.pageJump("");
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
uni-page-wrapper {
  height: 100% !important;
}
uni-page-wrapper:after {
  display: block;
  content: "";
  clear: both;
}
uni-page-body {
  height: 100% !important;
}
uni-page-body:after {
  display: block;
  content: "";
  clear: both;
}
.incoming {
  background: #f6f8f9 !important;
  width: 100%;
  height: 100%;
  .customize-content-form {
    background: #f6f8f9 !important;
    width: 100%;
    height: 100%;
    padding-top: 130rpx;

    .person-infor{
        margin-top: 20rpx;
        background: #ffffff;
        padding-left: 30rpx;
        .person-infor-one{
          height: 105rpx;
          line-height: 105rpx;
          border-bottom: 1rpx solid #E5E5E5;
          padding-left: 10rpx;
          position: relative;
          text{
            float: left;
            color: #333333;
            font-size: 32rpx;
          }
          .choose-arrow{
            width: 15rpx;
            height: 26rpx;
            position: absolute;
            top: 50%;
            right: 32rpx;
            margin-top: -13rpx;
            margin-right: -7.5rpx;
          }
        }
        .person-infor-one:last-child{border:0;}
      }
  }
  .customize-content-form:after {
    display: block;
    content: "";
    clear: both;
  }
}

.incoming:after {
  display: block;
  content: "";
  clear: both;
}
.customize-head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 62rpx 36rpx 18rpx 0;
  height: 50rpx;
  line-height: 50rpx;
  background: #ffffff;
  display: flex;
  vertical-align: middle;
  align-items: center;
  border-bottom: 1rpx solid #e5e5e5;
  .ch-img {
    position: absolute;
    left: 0;
    top: 69rpx;
    width: 20rpx;
    height: 36rpx;
    margin-left: 36rpx;
    img {
      width: 20rpx;
      height: 36rpx;
    }
  }
  .ch-title {
    font-size: 36rpx;
    height: 50rpx;
    line-height: 50rpx;
    margin: 0 auto;
    text-align: center;
    color: #333333;
  }
}
.cbutton {
  width: 620rpx;
  padding: 0;
  margin: 41rpx auto 190rpx auto;
  font-size: 36rpx;
  color: #edf6fe;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 50rpx;
  background: #3b86f7;
  border: 0rpx;
  text-align: center;
  box-shadow: 0rpx 10rpx 23rpx 0rpx rgba(#3b86f7, 0.4);
}
.cbutton:after {
  display: block;
  content: "";
  clear: both;
}
</style>
