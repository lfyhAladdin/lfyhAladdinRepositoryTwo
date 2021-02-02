<template>
  <view class="index-container">
    <view class="flying-screen" style="display:none">
      <img class="banklogo" src="@/static/images/index/logo.svg">
      <text>张三已审批通过，请及时确认合同</text>
      <img class="flying-screen-colse" src="@/static/images/index/index-close.svg">
    </view>
    <view class="index-title">
      <view class="index-title-name">Hi~{{username}}</view>
      <view class="index-title-word">欢迎来到阿拉丁</view>
      <view class="index-bells" style="display:none"><img src="@/static/images/index/bells.svg"><text class="bells-point"></text></view>
    </view>
    <view class="index-features">
      <view class="features" v-for="(featuresOne,index) in featureslist" :key="index"   @click="pageJump(featuresOne.url)">
        <img :src=featuresOne.imgurl />
        <text>{{featuresOne.name}}</text>
        <text class="news" v-if="featuresOne.newsnumber != 0 && featuresOne.newsnumber <= 99">{{featuresOne.newsnumber}}</text>
        <text class="news" v-else-if="featuresOne.newsnumber > 99">…</text>
      </view>
    </view>
    <view class="index-application">
      <view class="application-title"><text>申请</text></view>
      <view class="application-list">
        <view class="application-one" v-for="(applicationOne,index) in applicationlist" :key="index"  @click="pageJump(applicationOne.url)">
          <view><img :src=applicationOne.imgurl /></view>
          <view><text>{{applicationOne.name}}</text></view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      navigateFlag: false,
      featureslist: [
        {
          imgurl: "./static/images/index/pendingOrder.svg",
          name: "待确认订单",
          newsnumber: 0,
          url: "index/pendingOrder/pendingOrder"
        },
        {
          imgurl: "./static/images/index/applicationPending.svg",
          name: "申请待提交",
          newsnumber: 0,
          url: "profession/approvalIng/approvalIng?applyPhase=01"
        },
        {
          imgurl: "./static/images/index/pricingApproval.svg",
          name: "人工定价审批",
          newsnumber: 0,
          url: "profession/approvalIng/approvalIng?applyPhase=05"
        },
        {
          imgurl: "./static/images/index/contractToSign.svg",
          name: "合同待签署",
          newsnumber: 0,
          url: "profession/signContract/signTheContract?applyPhase=01"
        },
        {
          imgurl: "./static/images/index/processingLoan.svg",
          name: "待处理放款",
          newsnumber: 0,
          url: "profession/payment/payment?applyPhase=05"
        },
        {
          imgurl: "./static/images/index/submitLoan.svg",
          name: "待提交放款",
          newsnumber: 0,
          url: "profession/payment/payment?applyPhase=01"
        }
      ],
      applicationlist: [
        {
          imgurl: "./static/images/index/firstRoom.svg",
          name: "一手房",
          url: "index/ordinaryQRcode/ordinaryQRcode?from=firstroom"
        },
        {
          imgurl: "./static/images/index/secondRoom.svg",
          name: "二手房",
          url: "index/ordinaryQRcode/ordinaryQRcode?from=secondroom"
        }
      ]
    };
  },

  computed: {
    ...mapGetters(['businessNum','userInfor'])
  },
  onLoad() {
    console.log(this.userInfor);
    this.commitFun();
  },
  activated(){
    this.commitFun();
  },
  onReady() {},
  onShareAppMessage() {
    return {
      title: "欢迎体验yu-app",
      path: "/pages/tabBar/template/template"
    };
  },
  //下拉的生命周期
  onPullDownRefresh() {
    console.log('下拉刷新');
    let datas = {
      userID: this.userInfor.loginCode, //客户经理编号
      orgID: this.userInfor.orgId //客户经理所属机构编号
    };
    this.businessNumCommit(datas);
    setTimeout(()=>{
      yu.stopPullDownRefresh();  //停止下拉刷新
    },5000)
  },
  mounted() {},
  methods: {
    ...mapActions(['businessNumCommit']),
    commitFun(){
      yu.stopPullDownRefresh();  //停止下拉刷新
      this.username=this.userInfor.userName;
      this.featureslist[0].newsnumber = this.businessNum.orderPending; //订单数量
      this.featureslist[1].newsnumber = this.businessNum.creditSubmit; //申请待提交数量
      this.featureslist[2].newsnumber = this.businessNum.creditPeoplePricing; //人工定价审批数量
      this.featureslist[3].newsnumber = this.businessNum.contractSigned; //合同待签署数量
      this.featureslist[4].newsnumber = this.businessNum.issuePending;  //待处理放款数量
      this.featureslist[5].newsnumber = this.businessNum.issueSubmit;  //待提交放款数量
    }
  },
};
</script>

<style lang='scss' scoped>
@import "~@styles/uni-nvue.css";

uni-page-body {
  background: url("~@/static/images/index/indexBG.svg") left top no-repeat;
  background-size: 100%;
  background-color: #ffffff;
}
@keyframes myfirst {
  0% {
    right: -595rpx;
  }
  100% {
    right: 0;
  }
}
.flying-screen {
  width: 595rpx;
  height: 88rpx;
  opacity: 0.94;
  position: fixed;
  top: 52rpx;
  right: 0;
  z-index: 2;
  background-image: linear-gradient(90deg, #191b20 4%, #32384b 97%);
  border-radius: 20rpx 0 0 20rpx;
  display: flex;
  vertical-align: middle;
  align-items: center;
  animation: myfirst 5s linear 2s infinite alternate;
  .banklogo {
    width: 50rpx;
    height: 60rpx;
    margin-left: 17rpx;
  }
  text {
    height: 33rpx;
    line-height: 33rpx;
    color: #f9cf74;
    font-size: 24rpx;
    margin-left: 20rpx;
  }
  .flying-screen-colse {
    position: absolute;
    right: 17rpx;
    width: 20rpx;
    height: 20rpx;
  }
}
.index-container {
  padding-top: 91rpx;
  .index-title {
    margin: 0 35rpx 99rpx 45rpx;
    color: #ffffff;
    position: relative;
    .index-title-name {
      font-size: 50rpx;
      line-height: 70rpx;
    }
    .index-title-word {
      font-size: 40rpx;
      line-height: 56rpx;
    }
    .index-bells {
      position: absolute;
      top: -10rpx;
      right: 0;
      img {
        width: 36rpx;
        height: 39rpx;
      }
      .bells-point {
        width: 20rpx;
        height: 20rpx;
        background: #e75e58;
        border-radius: 20rpx;
        display: block;
        position: absolute;
        right: -16rpx;
        top: -12rpx;
      }
    }
  }
  .index-features {
    margin: 0 30rpx 100rpx 30rpx;
    background: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0 0 28rpx 0 rgba(#000000, 0.13);
    padding: 50rpx 44rpx 34rpx 44rpx;
    .features {
      width: 156rpx;
      height: 144rpx;
      position: relative;
      float: left;
      text-align: center;
      line-height: 0;
      margin-right: 66rpx;
      img {
        width: 100rpx;
        height: 100rpx;
        margin-bottom: 7rpx;
      }
      text {
        width: 156rpx;
        height: 37rpx;
        line-height: 37rpx !important;
        text-align: center;
        color: #333453;
        font-size: 26rpx;
        display: block;
      }
      .news {
        position: absolute;
        right: -8rpx;
        top: -12rpx;
        width: 48rpx;
        height: 36rpx;
        text-align: center;
        line-height: 36rpx;
        font-size: 22rpx;
        background: #e75e58;
        color: #ffffff;
        border-radius: 14rpx 14rpx 14rpx 0rpx;
      }
    }
    .features:nth-child(3n) {
      margin-right: 0;
    }
    .features:nth-child(1) {
      margin-bottom: 38rpx;
    }
    .features:nth-child(2) {
      margin-bottom: 38rpx;
    }
    .features:nth-child(3) {
      margin-bottom: 38rpx;
    }
  }
  .index-features:after {
    display: block;
    content: "";
    clear: both;
  }

  .index-application {
    margin: 0 30rpx 0 30rpx;
    .application-title {
      height: 65rpx;
      line-height: 65rpx;
      font-size: 46rpx;
      color: #333453;
      text-align: left;
    }
    .application-list {
      .application-one {
        width: 130rpx;
        text-align: center;
        float: left;
        margin-right: 55rpx;
        view {
          text-align: center;
          img {
            width: 65rpx;
            height: 72rpx;
            display: block;
            margin: 68rpx auto 13rpx auto;
          }
          text {
            height: 37rpx;
            line-height: 37rpx;
            font-size: 26rpx;
            display: block;
          }
        }
      }
      .application-one:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
  .index-application:after {
    display: block;
    content: "";
    clear: both;
  }
}
</style>
