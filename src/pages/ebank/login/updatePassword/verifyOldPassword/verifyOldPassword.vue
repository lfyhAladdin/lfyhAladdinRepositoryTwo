<template>
  <view class="incoming">
    <view :class="phoneSystem ? 'pf-title pf-title-ios pf-titleTwo pf-titleTwo-ios':'pf-title pf-titleTwo'">
      <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
      <text>{{identity}}</text>
    </view>
    <view class="customize-content-form">
      <view class="person-infor">
        <view class="person-infor-one">
          <text>原登陆密码</text>
          <input placeholder="请输入原来的登录密码" v-model="oldPassword" />
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
import { mapGetters } from "vuex";
import pageHead from "@/components/page-head.vue";
import updatePasswordVue from "../updatePassword.vue";
import jsencrypt from "@/static/js/jsencrypt.min.js";
const Base64 = require('js-base64').Base64;
export default {
  data() {
    return {
      identity: "验证原密码",
      navigateFlag: false,
      see: true,
      oldPassword: "",
      updatePasswordurl: "login/updatePassword/updatePassword?from=v",
      username:"",
      loginCode:"",
      userOrgId:"",
    };
  },
  onLoad(option) {
    console.log(this.userInfor)
    let _this=this;
    /* 获取当前用户登录信息 */
    _this.username = _this.userInfor.userName;
    _this.loginCode = _this.userInfor.loginCode;
    _this.userOrgId = _this.userInfor.orgId;
  },
  onShow() {},
  onUnload() {},
  computed: {
    ...mapGetters(['userInfor'])
  },
  methods: {
    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },
    // 下一步
    nextStep() {
      let _this = this;
      /* 判断提示 */
      if (_this.oldPassword==='') {
        yu.showToast({
          icon: "none",
          title: "原密码不能为空！"
        });
        return ;
      }
      /* 获取当前用户登录信息 */
      let loginCode = _this.loginCode;
      let mdpassword = Base64.encode(_this.oldPassword);
      let data = {
        loginCode: loginCode,
        oldPwd: mdpassword
      };
      this.$http
        .request({
          method: "post",
          // method: "get",
          url: this.loginRelatedPostUrl+"api/adminsmuser/checkpwd",
          header: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          },
          custom:{oauth:1},
          data: data
        })
        .then(
          res => {
            let result = res.data.data;
            if (result) {
              //原密码验证成功
              _this.pageJump(_this.updatePasswordurl);
            } else {
              yu.showToast({
                icon: "none",
                title: "原密码输入错误，请重新输入",
                duration: 2000
              });
              _this.oldPassword = "";
            }
          },
          err => {}
        );
    },
    getRSAPublicKey: function() {
      return "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrDUHc85ADQVxXRP4M90nqttWoZctV6JJVVdPjIle5vd9G2/4kgIhNc78Jd+ENxg+n4Gj9UMwNhJmb2jnMaW3zyGB+qi/ZrMO5dEUhW8salirzRgGg/4Arz4ObPmCWlZsws3Ij/3IEsFD3vMdIZD2j8b33DAbj47PjcCcMbtHYuQIDAQAB";
    },
    //密码加密
    encodePassword: function(pwd) {
      let _this = this;
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(_this.getRSAPublicKey());
      let encodePwd = encrypt.encrypt(pwd);
      return encodePwd;
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
          .uni-input-input {
            font-size: 32rpx !important;
            color: #333435 !important;
          }
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
  margin: 213rpx auto 0rpx auto;
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
