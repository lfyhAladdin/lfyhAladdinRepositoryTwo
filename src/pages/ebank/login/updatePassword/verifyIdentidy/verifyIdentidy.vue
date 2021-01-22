<template>
  <view class="incoming">
    <view :class="phoneSystem ? 'pf-title pf-title-ios pf-titleTwo pf-titleTwo-ios':'pf-title pf-titleTwo'">
      <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
      <text>{{identity}}</text>
    </view>
    <view class="customize-content-form">
      <view class="person-infor">
        <view class="person-infor-one">
          <text>姓名</text>
          <input placeholder="请输入" v-model="person.username" />
        </view>
        <view class="person-infor-one">
          <text>身份证号</text>
          <input placeholder="请输入" v-model="person.idcard" />
        </view>
      </view>

      <view class="person-infor">
        <view class="person-infor-one">
          <text>手机号码</text>
          <input placeholder="请输入" v-model="phoneFormdata.phoneNo" />
        </view>
        <view class="person-infor-one">
          <text>短信验证码</text>
          <input class="code-input" placeholder="请输入验证码"  v-model="phoneFormdata.verifyCode" :disabled="disabledVerifyCode" />
          <button class="send-btn smslogin-send-btn" :type="sendCodeType" size="mini" @click="sendCode" :disabled="disabledSendCodeBtn">
						<text v-if="disabledSendCodeBtn">重新获取({{ sendCodeBtnText }}s)</text>
						<text v-else>{{ sendCodeBtnText }}</text>
					</button>
        </view>
      </view>

      <view class="" @click="nextStep">
        <view class="cbutton">
          <text>下一步</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import pageHead from "@/components/page-head.vue";
export default {
  data() {
    return {
      identity: "选择验证方式",
      navigateFlag: false,
      see: true,
      person: {
        username: "",
        idcard: "",
        phone: "",
      },
      phoneFormdata: {
        phoneNo: "",
        verifyCode: ""
      },
      sendcode: "",
      disabledSendCodeBtn: false,
      disabledVerifyCode: true,
      sendCodeType: "primary",
      sendCodeBtnText: "发送验证码",
      count: 60,
      timer: "",
    };
  },
  onLoad(option) {},
  onShow() {},
  onUnload() {},
  computed: {
    phoneNoLoginClickable() {
      return this.phoneFormdata.phoneNo && this.phoneFormdata.verifyCode;
    }
  },
  methods: {
    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },
    // 下一步
    nextStep() {
      /* 判断提示 */
      if (this.person.username==='') {
        yu.showToast({
          icon: "none",
          title: "姓名不能为空！"
        });
        return ;
      }
      if (this.person.idcard==='') {
        yu.showToast({
          icon: "none",
          title: "身份证号不能为空！"
        });
        return ;
      }
      if (this.phoneFormdata.phoneNo==='') {
        yu.showToast({
          icon: "none",
          title: "电话号码不能为空！"
        });
        return ;
      }
      if (this.phoneFormdata.verifyCode==='') {
        yu.showToast({
          icon: "none",
          title: "验证码不能为空！"
        });
        return ;
      }
      /* 获取当前用户登录信息 */
      let result = {};
      yu.getStorage({
        key: "userInfo",
        success: res => {
          result = res.data;
        }
      });
      let userName = result.userName;
      let data = {
        userName: userName == undefined ? this.person.username : userName,
        // userName: userName =='' ? this.person.username : userName,
        certNo: this.person.idcard,
        userMobilephone: this.phoneFormdata.phoneNo,
        vcode:this.phoneFormdata.verifyCode
      };
      yu.showLoading();
      this.$http
        .request({
          method: "GET",
          url:this.loginRelatedPostUrl+"api/nosession/adminsmuser/checkinformation",
          header: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          },
          custom:{oauth:0},
          data: data
        })
        .then(
          res => {
            yu.hideLoading();
            let result = res.data.data;
            if (result) {
              //原密码验证成功
              this.pageJump("login/updatePassword/updatePassword?from=v&iphoneVal="+ this.phoneFormdata.phoneNo);
            } else {
              yu.showToast({
                icon: "none",
                title: "身份信息填写错误，请重新输入",
                duration: 2000
              });
              this.oldPassword = "";
            }
          },
          err => {
            yu.hideLoading();
          }
        );
    },
    // 发送验证码
    sendCode() {
      if (this.phoneFormdata.phoneNo == "") {
        yu.showToast({
          icon: "none",
          title: "请输入手机号",
          duration: 2000
        });
        return;
      }
      const reg = /^1[3-9][0-9]\d{8}$/;
      if (reg.test(this.phoneFormdata.phoneNo)) {
        
        let datas = {
          mobiles: this.phoneFormdata.phoneNo,
          jiaoyigy: "601101",
          jiaoyijg: "GD0456"
        };
        this.$http
          .request({
            method: "post",
            url:this.loginRelatedPostUrl+ "api/nosession/sms/sendSMS",
            header: {
              "Content-Type": "application/json; charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
            data: datas
          })
          .then(
            res => {
              //console.log(res);
              //this.selectORG(res);
              this.disabledSendCodeBtn = true;
              this.disabledVerifyCode = false;
              this.sendCodeBtnText = 60;
              this.sendCodeType = "default";
              this.countDown();
            },
            err => {}
          );
      } else {
        yu.showToast({
          icon: "none",
          title: "请输入正确的手机号码"
        });
      }
    },

    // 倒计时
    countDown() {
      this.timer = setInterval(() => {
        this.sendCodeBtnText -= 1;
        if (this.sendCodeBtnText <= 0) {
          this.disabledSendCodeBtn = false;
          this.sendCodeBtnText = "发送验证码";
          this.sendCodeType = "primary";
          clearInterval(this.timer);
        }
      }, 1000);
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
    // height: 100%;
    // padding-top: 170rpx;
    padding-top: 100rpx;
    .person-infor {
      margin-top: 24rpx;
      background: #ffffff;
      padding-left: 30rpx;
      .person-infor-one {
        height: 105rpx;
        line-height: 105rpx;
        border-bottom: 1rpx solid #e5e5e5;
        padding-left: 10rpx;
        position: relative;
        text {
          float: left;
          color: #333333;
          font-size: 32rpx;
        }
        text:last-child {
          float: right;
          color: #999999;
          margin-right: 40rpx;
        }
        input {
          float: right;
          font-size: 32rpx;
          margin-right: 40rpx;
          height: 45rpx;
          line-height: 45rpx;
          text-align: right;
          padding: 30rpx 0;
          .uni-input {
            color: #333435;
          }
          .uni-input-placeholder {
            color: #c7c9cd;
          }
        }
        input.code-input {
          float: left;
          width: 200rpx;
          margin-left: 89rpx;
        }
        picker {
          float: right;
          color: #c7c9cd;
          font-size: 32rpx;
          margin-right: 63rpx;
          height: 45rpx;
          line-height: 45rpx;
          padding: 30rpx 0;
          display: block;
          .uni-input {
            font-size: 32rpx;
            padding: 0;
            height: 45rpx;
            line-height: 45rpx;
          }
        }
        .choose-arrow {
          width: 15rpx;
          height: 26rpx;
          position: absolute;
          top: 50%;
          right: 32rpx;
          margin-top: -13rpx;
          margin-right: -7.5rpx;
        }
      }
      .person-infor-one:last-child {
        border: 0;
      }
    }
  }
  .customize-content-form:after {
    display: block;
    content: "";
    clear: both;
  }
}
.uni-input-input {
  color: #333435 !important;
  font-size: 32rpx !important;
}
.smslogin-send-btn {
  width: 220rpx;
  border: 0;
  border-radius: 0;
  background: transparent !important;
  margin: 0;
  float: left;
  padding: 0 40rpx 0 0;
  height: 104rpx;
  line-height: 104rpx;
  text-align: right;
  text {
    font-size: 28rpx !important;
    color: #3b86f7 !important;
    height: 40rpx;
    line-height: 40rpx;
    padding: 32rpx 0;
    text-align: right;
    margin: 0 !important;
  }
}
.smslogin-send-btn:after {
  border: 0;
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
