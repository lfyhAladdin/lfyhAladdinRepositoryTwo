<template>
  <view class="uni-container">
    <view class="pf-title">
      <text>我的</text>
      <!--<text></text>-->
    </view>
    <view class="pf-content mine-title">
      <view class="mine-title-avatar"><img :src=useravatar /></view>
      <view class="mine-title-content">
        <view class="mineName"><text class="user-name">{{username}}</text><text class="user-position">{{position}}</text></view>
        <view class="mineMechanism"><text>{{mechanism}}</text></view>
      </view>
    </view>

    <view class="mine-features">
      <view class="mfeatures" v-for="item in mfeatureslist" :key="item.url"  @click="pageJump(item.url)">
        <img class="mfeatures-img" :src=item.imgurl />
        <text class="mfeatures-name">{{item.name}}</text>
        <text class="cache-size" v-if="item.cachesize != '0'">{{item.cachesize}}</text>
        <text class="uni-panel-icon uni-icon"><img src="@/static/images/firstroom/formChooseArrow.svg"></text>
      </view>
    </view>

    <view class="sign-out" @click="signOut"><text>退出</text></view>
  </view>
</template>
<script>
import { mapGetters} from "vuex";
import uLink from "@/components/uLink.vue";
import {RSAdecode} from '@/static/js/util.js'
export default {
  components: {
    uLink
  },
  data() {
    return {
      navigateFlag: false,
      username: "",
      logincode: "",
      userOrgId:"",
      position: "",
      mechanism: "",
      orginlist:[],
      useravatar: "./static/images/mine/avatar.svg",
      mfeatureslist: [
        {
          imgurl: "./static/images/mine/switchingMechanism.svg",
          name: "切换机构",
          cachesize: "0",
          url: "mine/switchingMechanism/switchingMechanism"
        },
        {
          imgurl: "./static/images/mine/changePassword.svg",
          name: "修改密码",
          cachesize: "0",
          url: "login/updatePassword/chooseVerification/chooseVerification"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['userInfor'])
  },
  created() {
    console.log(this.userInfor);
    this.commitFun();
  },
  activated(){
    this.commitFun();
  },
  onReady() {},
  onShareAppMessage() {},
  methods: {
    commitFun(){
      /* 获取当前用户登录信息 */
      this.username = RSAdecode(this.userInfor.userName);
      this.logincode = this.userInfor.logincode;
      this.orginlist=this.userInfor.organList;
      this.userOrgId = this.userInfor.orgId;
      for (let i = 0; i < this.orginlist.length; i++) {
        if (this.orginlist[i].orgId == this.userOrgId) {
          this.mechanism = this.orginlist[i].orgName;
          this.position = this.orginlist[i].roleName;
        }
      }
    },
    signOut() {
      let _this=this;
      yu.showModal({
        content: "确定要退出登录",
        success: function(result) {
          if (result.confirm) {
            _this.buryingBehavior('','ald0002','',_this.userOrgId,_this.userInfor.loginCode,_this.username);
            _this.$http
            .request({
              method: "post",
              url: _this.loginPostUrl+"api/logout",
              header: {
                "Content-Type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
              },
              custom:{oauth:1},
              data: {}
            })
            .then(
              res => {
                /* 退出成功 */
                //yu.clearStorage();
                localStorage.removeItem('userOrgId');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('uni-storage-keys');
                localStorage.removeItem('loginStatus');
                setTimeout(() => {
                  _this.pageJump("login/login");
                }, 500);
              },
              err => {
                /* 退出成功 */
                //yu.clearStorage();
                
                localStorage.removeItem('userOrgId');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('uni-storage-keys');
                localStorage.removeItem('loginStatus');
                setTimeout(() => {
                  _this.pageJump("login/login");
                }, 500);
              }
            );
          } else if (result.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@styles/uni-nvue.css";

uni-page-body {
  background: url("~@/static/images/mine/mineBG.svg") left top no-repeat;
  background-size: 100%;
  background-color: #ffffff;
}
.pf-title{
  background: no-repeat;
  color: #ffffff;
}
.uni-container {
  background: transparent;
  padding: 0;
  .mine-titleB {
    padding-top: 59rpx;
    height: 45rpx;
    line-height: 45rpx;
    text-align: center;
    font-size: 32rpx;
    color: #ffffff;
  }
  .mine-title {
    // padding-top: 74rpx;
    padding-left: 47rpx;
    margin-bottom: 57rpx;
    .mine-title-avatar {
      width: 120rpx;
      height: 120rpx;
      margin-right: 26rpx;
      float: left;
      img {
        width: 120rpx;
        height: 120rpx;
      }
    }

    .mine-title-content {
      float: left;
      .mineName {
        display: flex;
        vertical-align: middle;
        align-items: center;
        .user-name {
          height: 56rpx;
          line-height: 56rpx;
          font-size: 40rpx;
          color: #ffffff;
          margin-right: 12rpx;
        }
        .user-position {
          height: 30rpx;
          line-height: 30rpx;
          background: rgba(255, 255, 255, 0.39);
          border-radius: 8rpx;
          font-size: 22rpx;
          color: #ffffff;
          text-align: center;
          padding: 6rpx 8rpx;
        }
      }
      .mineMechanism {
        padding-top: 10rpx;
        font-size: 26rpx;
        color: #ffffff;
        height: 37rpx;
        line-height: 37rpx;
      }
    }
  }
  .mine-title:after {
    display: block;
    content: "";
    clear: both;
  }

  .mine-features {
    margin: 0 30rpx 0 30rpx;
    background: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0 0 28rpx 0 rgba(#000000, 0.11);
    padding: 50rpx 35rpx 50rpx 35rpx;
    .mfeatures {
      height: 160rpx;
      line-height: 160rpx;
      border-bottom: 1rpx solid #e5e5e5;
      display: flex;
      vertical-align: middle;
      align-items: center;
      position: relative;
      .mfeatures-img {
        width: 80rpx;
        height: 80rpx;
        margin-left: 17rpx;
      }
      .mfeatures-name {
        height: 45rpx;
        line-height: 45rpx;
        font-size: 32rpx;
        color: #333453;
        margin-left: 30rpx;
      }
      .cache-size {
        position: absolute;
        top: auto;
        right: 48rpx;
        height: 37rpx;
        line-height: 37rpx;
        font-size: 26rpx;
        color: #999999;
      }
      .uni-panel-icon {
        position: absolute;
        top: auto;
        right: 17rpx;
        color: #b3b6c1;
        img{
          width:15.6rpx;
          height: 26.3rpx;
        }
      }
    }
    .mfeatures:last-child {
      border-bottom: 0;
    }
  }
  .mine-features:after {
    display: block;
    content: "";
    clear: both;
  }
  .sign-out {
    margin: 93rpx auto 113rpx auto;
    width: 332rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    border: 2rpx solid #3b86f7;
    background: #ffffff;
    border-radius: 45rpx;
    box-shadow: 0 10rpx 23rpx 0 rgba(#e3edfb, 1);
    text {
      font-family: PingFangSC-Medium;
      font-size: 32rpx;
      color: #3b86f7;
      letter-spacing: 0;
      text-align: center;
    }
  }
}
.uni-container:after {
  display: block;
  content: "";
  clear: both;
}
</style>
