<template>
	<view class="wrapper" :style="{ height: screenHeight - immergeBottom - 44 + 'px' }">
		<view class="login-box" v-show="!showSmsLogin">
			<view class="page-title">
				<view class="login-logo">
					<img src="@/static/images/login-logo.svg">
				</view>
				<view class="login-welcome">
					<view class="login-welcome-word">你好，</view>
					<view class="login-welcome-word">欢迎来到阿拉丁</view>
				</view>
			</view>
			<view class="login-form form-wrapper">
				<view class="input-box">
					<img class="input-flag-img" src="@/static/images/login-user.svg">
					<input class="default-input login-input" :value="pwdFormdata.account" v-model="pwdFormdata.account"  placeholder="请输入工号" :type="phonetype" maxlength="13"/>
					<img v-show="ifshowPasswordClear" class="login-clear-cross" @click="clearInput('logincode')" id="clearLoginCode" src="@/static/images/login-clear.svg">
        </view>
				<view class="input-box">
					<img class="input-flag-img" src="@/static/images/login-pass.svg">
					<input class="default-input login-input" id="password" :value="pwdFormdata.password" v-model="pwdFormdata.password" placeholder="请输入密码" :type="passwordtype" />
					
          <!--<view class="info-box">
              <view contenteditable="true" @focusin="getPasswordElement('password')" ref="password" id="password" class="link-textarea user-name" data-form-type="name"></view>
          </view>-->
          <!--<label class="ifshow-password">
						<img @click="hiddenpassword" :src="ifshowpasswordimg">
					</label>-->
				</view>
				<view class="yu-btn-group">
					<button class="submit-btn login-submit" :class="clickable ? 'click-able' : ''" @click="pwdLogin">
						登 录
					</button>
				</view>
				<view class="title forget-password-box">
					<text class="forget-password" @click="forgetPassword">忘记密码</text>
				</view>
			</view>
			<view class="login-style">
				<view class="title" @click="showSmsLogin = true">
					<text class="login-point-left"></text>
					<text>短信验证码登录</text>
					<text class="login-point-right"></text>
				</view>
				<!--<view class="flex-box flex-ac flex-pa">
					<view v-for="(value, typeKey) in loginTypeObj" @tap.stop="switchLoginType(1)" :key="typeKey">
						<view class="white">{{ value }}</view>
					</view>
				</view>-->
			</view>
		</view>
		<view class="smslogin-box"  v-show="showSmsLogin">
			<view class="login-form form-wrapper smsLogin">
				<view class="close-smslogin" @click="showSmsLogin = false"><img src="@/static/images/login-cross.png"></view>
				<view class="smslogin-title">
					<text>验证码登录</text>
				</view>
				<view class="input-box">
					<view class="uni-form-item uni-column select-areacode">
						<label class="">{{ examinationTypeArrayType }}</label>
  				</view>
					<input class="default-input" :value="phoneFormdata.phoneNo" v-model="phoneFormdata.phoneNo" placeholder="请输入手机号" maxlength="11"/>
					<img v-show="ifshowPhoneClear" class="login-clear-cross" @click="clearInput('phone')" id="clearPhoneButton" src="@/static/images/login-clear.svg">
				</view>
				<view class="input-box">
					<view class="title sms-box">
						<text>验证码</text>
					</view>
					<input class="default-input" :value="phoneFormdata.verifyCode" v-model="phoneFormdata.verifyCode" :disabled="disabledVerifyCode" type="number" placeholder="请输入验证码" maxlength="6" />
					<button class="send-btn smslogin-send-btn" :type="sendCodeType" size="mini" @click="sendCode" :disabled="disabledSendCodeBtn">
						<text v-if="disabledSendCodeBtn">重新获取({{ sendCodeBtnText }}s)</text>
						<text v-else>{{ sendCodeBtnText }}</text>
					</button>
				</view>
				<view class="yu-btn-group">
					<button class="submit-btn login-submit" :class="phoneNoLoginClickable ? 'click-able' : ''" @click="phoneNoLogin">
						登 录
					</button>
					<view class="title forget-password-box">
						<text class="forget-password" @click="forgetPassword">忘记密码</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { createNamespacedHelpers, mapGetters, mapActions, mapMutations } from "vuex";
const { mapState } = createNamespacedHelpers("oauth");
import iosrepair from "@/utils/mixins/iosrepair.js";
import jsencrypt from "@/static/js/jsencrypt.min.js";
export default {
  components: {},
  mixins: [iosrepair],
  data: function() {
    return {
      imgPath: '',
      files: null,
      passwordtype: "password",
      phonetype: "text",
      ifshowpasswordimg: "./static/images/eyecolse.svg",
      cfid:0,
      pwdFormdata: {
        account: "",
        password: ""
      },
      phoneFormdata: {
        phoneNo: "",
        verifyCode: ""
      },
      disabledSendCodeBtn: false,
      disabledVerifyCode: true,
      sendCodeType: "primary",
      sendCodeBtnText: "发送验证码",
      showSmsLogin: false,
      count: 60,
      timer: "",
      loginType: "0",
      loginTypeObj: {
        "0": "密码",
        "1": "短信",
        "2": "指纹",
        "3": "手势"
      },
      uuid: "", // 设备id
      currentGesturePayload: {},
      examinationTypeArray: ["+86", "+886", "+852", "+853"],
      examinationTypeIndex: 0,
      examinationTypeArrayType: "+86",
      hasOrginNum: false,
      ifshowPasswordClear:false,//是否显示密码登陆中  账号清除功能
      ifshowPhoneClear:false//是否显示手机号登陆中  手机号清除功能
    };
  },
  created(){
    let userLoginCode=sessionStorage.getItem('userLoginCode');
    if(userLoginCode != '' && userLoginCode != undefined){
      this.pwdFormdata.account=userLoginCode;
    }
    /* let userLoginPassword=localStorage.getItem('userLoginPassword');
    if(userLoginPassword != '' && userLoginPassword != undefined){
      this.pwdFormdata.password=userLoginPassword;
    } */
    let userLoginPhone=sessionStorage.getItem('userLoginPhone');
    if(userLoginPhone != '' && userLoginPhone != undefined){
      this.phoneFormdata.phoneNo=userLoginPhone;
    }
  },
  computed: {
    clickable: function() {
      return this.pwdFormdata.account && this.pwdFormdata.password;
    },

    phoneNoLoginClickable() {
      return this.phoneFormdata.phoneNo && this.phoneFormdata.verifyCode;
    },
    ...mapState(["userInfo"])
  },
  onShow() {
    // #ifdef APP-FOX
    this.setStatusFontColor("dark");
    this.getLocalName();
    this.getUUID();
    // #endif
  },
  onLoad() {
  },
  methods: {
    ...mapActions(["businessNumCommit",'businessTypeListCommit']),
    ...mapMutations(["userInfor",'userInforReplace']),

    // 获取local用户名和用户id
    async getLocalName() {
      let _this = this;
      await yu.getStorage({
        key: "userInfo",
        complete: function(res) {
          if (res.errMsg == "getStorage:ok") {
            let userInfo = res.data || {};
            _this.userId = userInfo.userId;
            //_this.pwdFormdata.account = userInfo.account || "";
          }
        }
      });
    },
    switchLoginType(type) {
      this.loginType = type;
      if (type === "2") {
        this.fingerPrintVerification();
      } else if (type === "3") {
        this.openUnlock();
      }
    },
    //密码隐藏显示
    hiddenpassword() {
      let _this = this;
      _this.passwordtype =
        _this.passwordtype === "password" ? "text" : "password";
      _this.ifshowpasswordimg =
        _this.ifshowpasswordimg === "./static/images/eyecolse.svg"
          ? "./static/images/eyeopen.svg"
          : "./static/images/eyecolse.svg";
    },
    // 密码登录
    pwdLogin(e) {
      if (!this.pwdFormdata.account) {
        yu.showToast({
          icon: "none",
          title: "请输入账号",
          duration: 2000
        });
        return;
      } else if (!this.pwdFormdata.password) {
        yu.showToast({
          icon: "none",
          title: "请输入密码",
          duration: 2000
        });
        return;
      }
      sessionStorage.setItem('userLoginCode',this.pwdFormdata.account);
      /* localStorage.setItem('userLoginPassword',this.pwdFormdata.password); */
      let mdpassword = this.encodePassword(this.pwdFormdata.password);
      //let mdpassword = this.pwdFormdata.password;
      let data = {
        username: this.pwdFormdata.account,
        password: mdpassword,
        grant_type: "password",
        passwordType: "2",
        sysId: "1cab27def8fb4c0f9486dcf844b783c0",
        loginType: "0"
      };
      yu.showLoading({ title: "" });
      this.$store
        .dispatch("oauth/login", data)
        .then(res => {
          yu.hideLoading();
          if(res.code === '100001'){
            yu.showToast({
              icon: "none",
              title: "用户名或密码错误！",
              duration: 2000
            });
            return;
          }else{
            this.selectORG(res,this.pwdFormdata.account);
          }
          
          
        })
        .catch(error => {
          yu.hideLoading();
          yu.showToast({
            icon: "none",
            title: "用户名或密码错误！",
            duration: 2000
          });
          return;
        });
    },
    getRSAPublicKey: function() {
      return "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrDUHc85ADQVxXRP4M90nqttWoZctV6JJVVdPjIle5vd9G2/4kgIhNc78Jd+ENxg+n4Gj9UMwNhJmb2jnMaW3zyGB+qi/ZrMO5dEUhW8salirzRgGg/4Arz4ObPmCWlZsws3Ij/3IEsFD3vMdIZD2j8b33DAbj47PjcCcMbtHYuQIDAQAB";
    },
    // 登录密码加密
    encodePassword: function(pwd) {
      let _this = this;
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(_this.getRSAPublicKey());
      let encodePwd = encrypt.encrypt(pwd);
      return encodePwd;
    },
    // 匹配密码加密
    matchPassword: function(pwd) {
      var encrypt = new window.JSEncrypt();
      encrypt.setPublicKey(yufp.util.getRSAPublicKey());
      var encryptPwd = encrypt.encrypt(pwd);
      return encryptPwd;
    },
    // 登录成功
    loginSucceed(param, userInfo) {
      // 存储登录账号和用户id到storage
      let userInfos = userInfo.data.data;
      this.userInforReplace(userInfos)
      uni.setStorage({
        key: "userInfo",
        data: userInfos,
        fail: function(error) {
          console.error("用户信息储存异常");
        }
      });
      uni.setStorage({
        key: "userOrgId",
        data: userInfos.orgId,
        fail: function(error) {
          console.error("用户信息储存异常");
        }
      });
      //是否可以登录app  判断
      let ifLoginApp = userInfos.organList;
      if (ifLoginApp == null || ifLoginApp == [] || ifLoginApp == "") {
        yu.showToast({
          icon: "none",
          title: "用户无权限，请重新输入",
          duration: 1500
        });
        this.pwdFormdata.password = "";
        this.pwdFormdata.account = "";
        this.phoneFormdata.phoneNo = "";
        this.phoneFormdata.verifyCode = "";
        yu.clearStorage();
        return;
      } else if (ifLoginApp.length == 1) {
        //只有一个权限机构
        this.hasOrginNum = true;
      }
      let firstLogin = userInfos.lastLoginTime;
      if (firstLogin == "" || firstLogin == null || firstLogin == undefined) {
        //首次登陆，强制修改密码
        yu.showToast({
          icon: "none",
          title: "首次登录，请修改密码",
          duration: 1500
        });
        setTimeout(() => {
          this.pageJump(
            "login/updatePassword/updatePassword?from=firstlogin&hasOrginNum=" +
              this.hasOrginNum
          );
        }, 1500);
      } else {
        yu.showToast({
          icon: "none",
          title: "登录成功",
          duration: 1500
        });
        let userID = userInfos.loginCode;
        let orgID=userInfos.orgId;
        let data = {
          "userID": userID, //客户经理编号
          "orgID": orgID, //客户经理所属机构编号
        };
        this.businessNumCommit(data);
        this.businessTypeListCommit();
        setTimeout(() => {
          if (this.hasOrginNum) {
            yu.switchTab({ url: "/pages/ebank/index/index" });
          } else {
            this.pageJump("mine/switchingMechanism/switchingMechanism");
          }
        }, 3000);
      }
    },
    //选择机构
    selectORG(param,loginCodes) {
      let data = {
        loginCode: loginCodes
      };
      this.$http
        .request({
          method: "GET",
          url: this.loginRelatedPostUrl + "api/adminsmuser/logininf",
          header: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          },
          custom: { oauth: 1 },
          data: data
        })
        .then(
          res => {
            /* res机构返回结果   param 登陆成功返回结果 */
            this.loginSucceed(param, res);
          },
          err => {}
        );
    },
    // 发送验证码
    sendCode() {
      let _this = this;
      if (this.pwdFormdata.phoneNo == "") {
        yu.showToast({
          icon: "none",
          title: "请输入手机号",
          duration: 2000
        });
        return;
      }
      const reg = /^1[3-9][0-9]\d{8}$/;
      if (reg.test(_this.phoneFormdata.phoneNo)) {
        let datas = {
          mobiles: _this.phoneFormdata.phoneNo,
          jiaoyigy: "601101",
          jiaoyijg: "GD0456"
        };
        this.$http
          .request({
            method: "post",
            url: this.loginRelatedPostUrl + "api/nosession/sms/sendSMS",
            header: {
              "Content-Type": "application/json; charset=UTF-8",
              "Access-Control-Allow-Origin": "*"
            },
            custom: { oauth: 0 },
            data: datas
          })
          .then(
            res => {
              this.disabledSendCodeBtn = true;
              this.disabledVerifyCode = false;
              this.sendCodeBtnText = 60;
              this.sendCodeType = "default";
              this.countDown();
              //console.log(res);
              //this.selectORG(res);
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
    },

    // 手机号 短信登录
    phoneNoLogin() {
      if (!this.phoneFormdata.verifyCode) {
        yu.showToast({
          icon: "none",
          title: "请输入验证码"
        });
      } else {
        sessionStorage.setItem('userLoginPhone',this.phoneFormdata.phoneNo);
        let data = {
          username: this.phoneFormdata.phoneNo,
          vcode: this.phoneFormdata.verifyCode,
          grant_type: "password",
          passwordType: "2",
          sysId: "1cab27def8fb4c0f9486dcf844b783c0",
          loginType: "1"
        };
        yu.showLoading({ title: "" });
        this.$store
          .dispatch("oauth/login", data)
          .then(res => {
            yu.hideLoading();
            if(res.code === '100001'){
              yu.showToast({
                icon: "none",
                title: "手机号或验证码错误！",
                duration: 2000
              });
              return;
            }else{
              this.selectORG(res,this.phoneFormdata.phoneNo);
            }
          })
          .catch(error => {
            yu.hideLoading();
            yu.showToast({
              icon: "none",
              title: "手机号或验证码错误！",
              duration: 2000
            });
            return;
            console.log(error);
          });
      }
    },
    // 获取设备id
    getUUID() {
      // #ifdef APP-FOX
      foxsdk.device.getUUID(ret => {
        if (ret.status != 0) {
          this.uuid = ret.uuid;
        }
        console.log(
          "device/getUUID===status: " +
            ret.status +
            ",message: " +
            ret.message +
            ",payload: " +
            JSON.stringify(ret.payload)
        );
      });
      // #endif
    },

    //忘记密码页面跳转
    forgetPassword() {
      let _this = this;
      /* _this.pwdFormdata.account= "";
      _this.pwdFormdata.password="";
      _this.phoneFormdata.phoneNo="";
      _this.phoneFormdata.verifyCode=""; */
      _this.pageJump("login/updatePassword/verifyIdentidy/verifyIdentidy");
    },
    //清空输入框信息   start
    showClearButton(param) {
      let _this = this;
      if (param == "logincode") {
        //$("#clearLoginCode").show();
        _this.ifshowPasswordClear=true;
      } else if (param == "phone") {
        //$("#clearPhoneButton").show();
        _this.ifshowPhoneClear=true;
      }
    },
    hideClearButton(param) {
      let _this = this;
      if (param == "logincode") {
        //$("#clearLoginCode").hide();
        _this.ifshowPasswordClear=false;
      } else if (param == "phone") {
        //$("#clearPhoneButton").hide();
        _this.ifshowPhoneClear=false;
      }
    },
    clearInput(param) {
      event.stopPropagation();
      let _this = this;
      if (param == "logincode") {
        _this.pwdFormdata.account = "";
        _this.ifshowPasswordClear=false;
      } else if (param == "phone") {
        _this.phoneFormdata.phoneNo = "";
        _this.ifshowPhoneClear=false;
      }
    },
    //清空输入框信息   end
    /* 密码键盘的相关操作  start */
    getPasswordElement(id){
      let _this=this;
      //隐藏系统键盘
      uni.hideKeyboard();
      foxsdk.key.hideSoftKeybord(ret => {}); 
      //展示密码键盘  获取密码输入结果值
      _this.showKeyboard(id);
    },
    showKeyboard(id){
      let _this=this;
      //console.log("进入展示安全键盘方法");
      //console.log(id);
      let options={
        id:id,
        random:'NjI1MTcxMjEyMjE4ODk0Mw=='

      };
      foxsdk.cfcakeyboard.show(options, ret => {
        let text=ret.payload.text;
        let cipherText=ret.payload.cipherText;
        //_this.$refs.password.$el.innerText= text;
        // _this.pwdFormdata.password= cipherText;
        let u = navigator.userAgent;　　// 获取当前设备信息
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          let reg=new RegExp('#','g')//g代表全部
          let newMsg=JSON.stringify(text).replace(reg,'●');
          _this.$refs.password.$el.innerText= JSON.parse(newMsg);
          _this.pwdFormdata.password = cipherText;
        }else if (isAndroid) { 
          _this.$refs.password.$el.innerText= text;
          _this.pwdFormdata.password = cipherText;
        }
      }) 
    },
    //隐藏安全键盘
    hideKeyboard(id) {
      foxsdk.cfcakeyboard.hide(id,ret => {});
    },  
    /* 密码键盘的相关操作  end */
  },
  watch: {
    //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
    pwdFormdata: {
      handler: function(e) {
        if (e.account === '') {
          //$("#clearLoginCode").hide();
          this.ifshowPasswordClear=false;
        } else {
          //$("#clearLoginCode").show();
          this.ifshowPasswordClear=true;
        }
      },
      deep: true
    },
    phoneFormdata: {
      handler: function(e) {
        if (e.phoneNo === '') {
          //$("#clearPhoneButton").hide();
          this.ifshowPhoneClear=false;
        } else {
          //$("#clearPhoneButton").show();
          this.ifshowPhoneClear=true;
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>

@import "./authenCommon.scss";
input {
  font: 0;
}
.wrapper {
  padding: 0;
  width: 750rpx;
}
.page-title {
  height: 62rpx;
  padding-top: 111rpx;
  padding-left: 43rpx;
  padding-bottom: 285rpx;
  display: flex;
  vertical-align: middle;
  align-items: center;
  background: url("~@/static/images/login-bg.svg") no-repeat left top;
  background-size: 100%;
  .login-logo {
    width: 100rpx;
    height: 100rpx;
    img {
      width: 100rpx;
      height: 100rpx;
    }
  }
  .login-welcome {
    margin-left: 27rpx;
    .login-welcome-word {
      color: #fff;
      font-size: 44rpx;
      line-height: 62rpx;
    }
  }
}
.login-form {
  padding: 0 65rpx;
  margin-top: 0;
  .login-input {
    height: 50rpx;
    font-size: 36rpx;
    font-weight: 400;
    color: #333435;
    line-height: 50rpx;
  }

  .default-input {
    width: 400rpx;
    padding: 0;
    height: 50rpx;
    font-size: 36rpx;
    color: #333435 !important;
    line-height: 50rpx;
    border: 0 !important;
    outline: none;
  }
  .default-input:focus {
    border: 0 !important;
    color: #333435 !important;
    font-size: 36rpx;
    line-height: 50rpx;
    outline: none;
  }
  .default-input::-webkit-input-placeholder {
    color: #c7c9cd;
    font-size: 36rpx;
  }
  .default-input::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #c7c9cd;
    font-size: 36rpx;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #c7c9cd;
    font-size: 36rpx;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c7c9cd;
    font-size: 36rpx;
  }
  .default-input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #c7c9cd;
    font-size: 36rpx;
  }
  .default-input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #c7c9cd;
    font-size: 36rpx;
  }
}
uni-textarea{
  height: 50rpx;
  color: #c7c9cd;
  font-size: 36rpx;
  line-height: 50rpx;
}
.uni-input-placeholder {
  height: 50rpx;
  color: #c7c9cd;
  font-size: 36rpx;
  line-height: 50rpx;
}
.uni-input-input {
  color: #333435 !important;
  font-size: 36rpx;
  line-height: 50rpx;
  outline: none;
}
.uni-input-input:focus {
  border: 0 !important;
  color: #333435 !important;
  font-size: 36rpx;
  line-height: 50rpx;
  outline: none;
}
.input-placeholder {
  padding-left: 10rpx;
  color: #333435;
  font-weight: normal;
}
.yu-input {
  .input-placeholder {
    color: #333435;
  }
}
.input-box {
  height: 132rpx;
  line-height: 132rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 110rpx;
  border-bottom: 1rpx solid #e5e5e5;
  padding-top: 20rpx;
  .default-input {
    flex: 1;
    height: 109rpx;
    text-indent: 0;
    padding: 20rpx 0;
    box-sizing: border-box;
  }
  .uni-eye-active {
    color: #007aff;
  }
  .input-flag-img {
    width: 40rpx;
    height: 42rpx;
    margin-right: 36rpx;
    margin-left: 18rpx;
  }
  .ifshow-password {
    height: 109rpx;
    line-height: 109rpx;
    img {
      width: 41rpx;
      height: auto;
    }
  }
}

.yu-btn-group {
  .text-btn {
    margin-top: 48rpx;
    padding-bottom: 48rpx;
    text-align: center;
    font-size: 28rpx;
    color: #676767;
  }
  .login-submit {
    width: 620rpx;
    padding: 0;
    font-size: 40rpx;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 50rpx;
    background: #bfddfc;
    border: 0rpx;
    box-shadow: 0rpx 10rpx 23rpx 0rpx rgba(59, 134, 247, 0.24);
  }
  .login-submit:after {
    border: 0;
  }
  .login-submit.click-able {
    background: #3b86f7;
    border: 0rpx;
    box-shadow: 0rpx 10rpx 23rpx 0rpx rgba(59, 134, 247, 0.4);
  }
}
.forget-password-box {
  margin-top: 45rpx;
  .forget-password {
    height: 40rpx;
    line-height: 40rpx;
    text-align: left;
    font-size: 28rpx;
    color: #999999;
  }
}
.login-style {
  margin: 0 auto;
  margin-top: 120rpx;
  margin-bottom: 80rpx;
  bottom: 0rpx;
  text-align: center;
  .title {
    position: relative;
    width: 620rpx;
    height: 38rpx;
    margin: 0 auto 20rpx;
    font-size: 26rpx;
    line-height: 38rpx;
    border-top: 2rpx solid #e5e5e5;
  }
  text {
    position: absolute;
    width: 244rpx;
    height: 45rpx;
    line-height: 45rpx;
    font-size: 32rpx;
    color: #3b86f7;
    padding: 0 4rpx;
    top: -24rpx;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #fff;
  }
  .white {
    padding: 16rpx;
    font-size: 28rpx;
    border-radius: 50%;
    color: #fff;
    background-color: #ccc;
  }
  .login-point-left {
    width: 7rpx;
    height: 7rpx;
    border-radius: 50%;
    background: #e5e5e5;
    left: -258rpx;
    top: -4rpx;
    padding: 0;
  }
  .login-point-right {
    width: 7rpx;
    height: 7rpx;
    border-radius: 50%;
    background: #e5e5e5;
    right: -258rpx;
    top: -4rpx;
    padding: 0;
  }
}

.login-clear-cross {
  width: 34rpx;
  height: 34rpx;
  position: relative;
  z-index: 200;
}
/***验证码登录 */
.smslogin-box {
  .smsLogin {
    height: 100%;
    position: fixed;
    left: 0;
    top: 88rpx;
    background: #fff;
    .close-smslogin {
      height: 32.55rpx;
      line-height: 32.55rpx;
      padding: 19.5rpx 0 0 0;
      margin-bottom: 100.5rpx;
      img {
        width: 32.55rpx;
        height: 32.55rpx;
      }
    }
    .smslogin-title {
      height: 70rpx;
      line-height: 70rpx;
      color: #333435;
      font-size: 50rpx;
      text-align: left;
      margin-bottom: 134rpx;
    }

    .smslogin-send-btn {
      border: 0;
      border-radius: 0;
      background: transparent;
      text {
        font-size: 28rpx;
        color: #3b86f7;
        height: 40rpx;
        line-height: 40rpx;
      }
    }
    .smslogin-send-btn:after {
      border: 0;
    }
    .sms-box {
      margin-right: 48rpx;
      font-size: 36rpx;
      color: #333435;
      height: 50rpx;
      line-height: 50rpx;
    }
    .select-areacode {
      width: 108rpx;
      margin-right: 48rpx;
      font-size: 36rpx;
      color: #333435;
      height: 50rpx;
      line-height: 50rpx;
      padding: 0;
      .select-areacode-down {
        width: 22rpx;
        height: 16rpx;
        font-size: 32rpx;
      }
    }
  }
}


/**模拟文本框 */
.link-textarea:focus {
  border: none;
  outline: none;
  -webkit-appearance: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: #333435;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: none;
  color: #333435;
  background-color: #ffffff;
}
.user-name:empty:after {
    content: '请输入密码';
    color: #c7c9cd;
    font-size: 36rpx;
    text-align: left;
}
.info-box{
    width: 528rpx;
    height: 50rpx;
    min-height: 50rpx;
    padding:20rpx 0;
    /* box-sizing: border-box; */
}
.info-box .link-textarea{
  font-size: 36rpx;
  color: #3b3b3b;
  outline: 0;
  text-align: left;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-user-modify: read-write-plaintext-only;
  -webkit-user-select:text;
  overflow:hidden;/* //将超出内容隐藏 */
  text-overflow:ellipsis; /* //IE专用属性，文本溢出时显示省略标记()； */
  white-space:nowrap; /* //强制内容不换行 */
}
</style>
