<template>
  <view class="incoming">
    <view class="customize-head">
      <view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
      <view class="ch-title">{{identity}}</view>
    </view>
    <view class="customize-content-form">
      <view class="person-infor">
        <view class="person-infor-one">
          <text>新登陆密码</text>
          <input placeholder="8-20位，包含数字和字母" v-model="newPasswordFirst" />
        </view>
      </view>
      <view class="person-infor">
        <view class="person-infor-one">
          <text>再次输入</text>
          <input placeholder="请再次输入以确认" v-model="newPasswordSecond" />
        </view>
      </view>
      <view class="infor-tips">
        <text>1. 请设置8-20位包含数字、字母的登录密码</text>
        <text>2. 请不要设置与常用软件（如社交软件）、网站（论坛）等相同 或相似的密码</text>
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
import { mapGetters,mapActions } from "vuex";
import pageHead from "@/components/page-head.vue";
import jsencrypt from "@/static/js/jsencrypt.min.js";
export default {
  data() {
    return {
      identity: "重置登录密码",
      navigateFlag: false,
      see: true,
      newPasswordFirst: "",
      newPasswordSecond: "",
      updateSucessUrl: "",
      pageFrom: "",
      hasOrginNum:false,
      username: "",
      logincode: "",
      userOrgId:"",
    };
  },
  computed: {
    ...mapGetters(['userInfor'])
  },
  onLoad: function(option) {
    let _flag = option.from;
    this.pageFrom = _flag;
    let _this = this;
    this.hasOrginNum = option.hasOrginNum;
    console.log(_this.userInfor);
    /* 获取当前用户登录信息 */
    _this.username = _this.userInfor.userName;
    _this.logincode = _this.userInfor.loginCode;
    _this.userOrgId = _this.userInfor.orgId;
    if (_flag == "firstlogin") {
      if(this.hasOrginNum){
        _this.updateSucessUrl = "/pages/ebank/index/index";
      }else{
        _this.updateSucessUrl = "mine/switchingMechanism/switchingMechanism";
      }
    } else {
      _this.updateSucessUrl = "/pages/ebank/mine/mine";
    }
  },
  onShow() {},
  onUnload() {},
  methods: {
    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },
    // 下一步
    nextStep() {
      let _this = this;
      /* 判断提示 */
      if (_this.newPasswordFirst==='') {
        yu.showToast({
          icon: "none",
          title: "新密码不能为空！"
        });
        return ;
      }
      if (_this.newPasswordSecond === '') {
        yu.showToast({
          icon: "none",
          title: "再次输入不能为空！"
        });
        return ;
      }
      if (_this.newPasswordFirst !== _this.newPasswordSecond) {
        yu.showToast({
          icon: "none",
          title: "两次输入密码不一致！"
        });
        _this.newPasswordSecond="";
        return ;
      }
      /* 获取当前用户登录信息 */
      
      let logincode = _this.logincode;
      let mdpassword = _this.newPasswordFirst;
      let data = {
        loginCode: logincode,
        userPassword: mdpassword
      };
      this.$http
        .request({
          method: "GET",
          url: this.loginRelatedPostUrl+"api/adminsmuser/updatepwd",
          header: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          },
          custom:{oauth:1},
          data: data
        })
        .then(
          res => {
            //密码修改成功
            /* 跳转到登陆页面，清空缓存 */
            let result = res.data.data;
            if (result == 0) {
              yu.showToast({
                icon: "none",
                title: "密码修改失败，请重新修改",
                duration: 2000
              });
              return;
            } else if (result == -1) {
              yu.showToast({
                icon: "none",
                title: "新密码与旧密码相同，请重新修改",
                duration: 2000
              });
              return;
            } else {
              yu.showToast({
                icon: "none",
                title: "密码修改成功",
                duration: 1500
              });
              //yu.clearStorage();
              setTimeout(() => {
                let _this = this;
                if (_this.pageFrom == "firstlogin") {
                  if(_this.hasOrginNum){
                    yu.switchTab(_this.updateSucessUrl);
                  }else{
                    _this.pageJump(_this.updateSucessUrl);
                  }
                } else {
                  yu.switchTab({ url: _this.updateSucessUrl });
                }
              }, 1500);
            }
          },
          err => {}
        );
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
    .infor-tips {
      margin-top: 43rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      padding-left: 40rpx;
      padding-right: 12rpx;
      text {
        line-height: 33rpx;
        margin-bottom: 10rpx;
        font-size: 24rpx;
        text-align: left;
        display: block;
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
  margin: 186rpx auto 518rpx auto;
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
