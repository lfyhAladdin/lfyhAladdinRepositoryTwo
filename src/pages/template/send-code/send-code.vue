<!-- 
  @created by taoting1
  @description 修改密码-填写验证码
 -->
<template>
  <view class="wrapper">
    <view class="top-title">
      <view>验证码已经发送到您的手机 {{ pageParam.phone }}</view>
    </view>
    <!-- 数字输入框 -->
    <view class="personalize-num-input">
      <view class="input-desc">
        <view>6位数字验证码</view>
        <view>
          <view class="flex-box" v-show="countShow">
            <yu-countdown ref="countdown" :second="time" :show-colon="false" :show-day="false" @timeup="timeupFn"></yu-countdown>
            <view class="countdown-tip">后重新获取验证码</view>
          </view>
          <text v-if="!countShow" class="re-get" @click="sendCheckCode">重新获取</text>
        </view>
      </view>
      <view class="input-wrapper">
        <yu-validcode v-model="code"></yu-validcode>
      </view>
    </view>
    <!-- 数字键盘 -->
    <yu-cwx-keyboard :style="{bottom: `${immergeBottom}px`}" :num.sync="code" @confirmEvent="handleConfirm"></yu-cwx-keyboard>
  </view>
</template>
<script>
import YuValidcode from '@/components/yu-validcode/yu-validcode.vue';
import YuCountdown from "@/components/yu-countdown/yu-countdown";
import YuCwxKeyboard from "@/components/yu-cwx-keyboard/yu-cwx-keyboard";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("marketOauth");

export default {

  components: {
    YuValidcode,
    YuCwxKeyboard,
    YuCountdown
  },
  data: function () {
    return {
      code: '',
      time: 59, // 倒计时时间设置
      countShow: true, // 是否展示倒计时
      // 忘记密码页传递的参数
      pageParam: {
        account: '', // 账号
        phone: ''
      }
    }
  },

  watch: {
    code(val) {
    }
  },

  mounted() {
    this.$refs.countdown.startData();
  },

  onLoad(option) {
    this.pageParam.account = option.account || '';
    this.pageParam.phone = option.phone || '';
  },

  methods: {
    // 点击确认按钮
    handleConfirm() {
      // 验证验证码
      this.$http
        .request({
          url: this.$backend.mockExampleService + '/T01012',
          method: "POST",
          data: {
            userId: 1,
            code: this.code // 验证码
          }
        })
        .then(res => {
          if(res.data.code === 0) {
            yu.showToast({
              icon: 'none',
              title: '验证成功',
              duration: 2000
            });
          }

        }).catch(err =>  {
          console.log(err);
        }) 
    },
    // 倒计时结束，显示重新发送按钮
    timeupFn() {
      var _this = this;
      this.countShow = false;
    },
    // 发送验证码
    sendCheckCode() {
      // 发送验证码
      // this.$http.request({
      //   method: 'POST',
      //   url: this.$backend.mockExampleService + '/T01011',
      //   data: {
      //     userId: this.userId,
      //     // TODO: 测试
      //     // userId: 9641,
      //     status: '1' // 登录后，传递userId时，status传1
      //   }
      // })
      // .then(
      //   (res) => {
      //     uni.hideLoading();
      //     // if (res.data.code.toString().toLocaleLowerCase() == 'false') {
      //     //   yu.showToast({
      //     //     icon: 'none',
      //     //     title: res.data.message || '账号不存在',
      //     //     duration: 2000
      //     //   });
      //     //   return;
      //     // }
      //     yu.showToast({
      //       icon: 'none',
      //       title: '验证码已发送',
      //       duration: 2000
      //     });
      //     // let resData = {};
      //     // (res.data &&  (resData= res.data.data || {}));
      //     this.countShow = true;
      //     // 倒计时组件开始倒计时
      //     this.$refs.countdown.startData();
      //   }, // 成功
      //   (err) => {
      //     uni.hideLoading();
      //     console.log(err);
      //   } // 失败
      // );

      yu.showToast({
        icon: 'none',
        title: '验证码已发送',
        duration: 2000
      });
      this.countShow = true;
      // 倒计时组件开始倒计时
      this.$refs.countdown.startData();
    }
  }
};
</script>
<style lang="scss" scoped>
.top-title {
  margin-top: 30rpx;
  padding-left: 30rpx;
}
.wrapper {
  padding: 0;
}
.personalize-num-input {
  padding-left: 30rpx;
  padding-right: 30rpx;

  .input-desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30rpx;;
    margin-top: 37rpx;
    font-size: 24rpx;
    color: #999999;

    .re-get {
      color: #E52B22;
    }

    /deep/ .uni-countdown__number {
      margin-left: 0;
      margin-right: 0;
      color: #E52B22;
    }

    /deep/ .uni-countdown__splitor {
      padding-left: 0;
      padding-right: 0;
      color: #E52B22;
    }
  }

  .input-wrapper {
    display: flex;
    margin-top: 33rpx;

    /deep/ .code-area{
      width: 100%;

      .flex-box {
        justify-content: space-between;
      }
    }

    .input-item {
      width: 98rpx;
      height: 98rpx;
      border: 1rpx solid #DDDDDD;
      border-radius: 6rpx;

      &+.input-item {
        margin-left: 11rpx;
      }
    }
  }
}
.countdown-tip {
  height: 24px;
  line-height: 24px;
  margin: 2px;
  font-size: 24rpx;
}
</style>