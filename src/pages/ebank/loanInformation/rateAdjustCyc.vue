<template>
  <view class="pending-order">
    <view class="customize-head">
      <view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
      <view class="ch-title"><text>{{title}}</text></view>
    </view>


<view class="rateAdjustCyc-infor">

   <view class="rateAdjustCyc-title">
 <text class="rateAdjustCyc-text">1MN20</text>
 <view>
<text class="rateAdjustCyc-time">每月的20日，如遇节假日则顺延下一工作日</text>
</view>
</view>
<view class="circulation-quantity">
<view class="circulation-content">
<text class="required">循环量</text>
      <button class="mini-btn" :class="{'active' : 0 == current}" @click="clickBtn(0)" type="default" size="mini">半月</button>
      <button class="mini-btn" :class="{'active' : 1 == current}" @click="clickBtn(1)" type="default" size="mini">周</button>
      <button class="mini-btn" :class="{'active' : 2 == current}" @click="clickBtn(2)" type="default" size="mini">天</button>
</view>

<view class="circulation-content">
      <button class="mini-btn" :class="{'active' : 3 == current}" @click="clickBtn(3)" type="default" size="mini">年</button>
      <button class="mini-btn" :class="{'active' : 4 == current}" @click="clickBtn(4)" type="default" size="mini">季度</button>
      <button class="mini-btn" :class="{'active' : 5 == current}" @click="clickBtn(5)" type="default" size="mini">月</button>
</view>
</view>

<view class="person-infor-one">
          <text class="required">日期</text>
         <input placeholder="请输入" type="number" class="loan-amount" v-model="timeDate" @blur="onKeyInput"/>
 </view>
<view class="working-day">
<text class="required">工作日选项</text>
<view class="working-btn">
<button class="circulation-btn" :class="{'active' : 0 == working}" @click="workingBtn(0)" type="default" size="mini">实际日期</button>
<button class="circulation-btn" :class="{'active' : 1 == working}" @click="workingBtn(1)" type="default" size="mini">上一工作日</button>
<button class="circulation-btn" :class="{'active' : 2 == working}" @click="workingBtn(2)" type="default" size="mini">下一工作日</button>
</view>
</view>
  <view class="person-infor-one">
          <text class="required">间隔</text>
         <input placeholder="请输入" type="number" class="loan-amount" v-model="interval"/>
 </view>

<view class="next-step" @tap="submitform()">
        <view class="cbutton">
          <text>确定</text>
        </view>
      </view>


</view>


  </view>
</template>
<script>
import { appEnv } from "@/config/app.config";
import filter from "@/utils/filters";
export default {
  data: function() {
    return {
      title: "利率调整周期",
      isChecked: false,
      guaranteeInformation: "loanInformation/guaranteeInformation",
      timeDate:"",//日期
      interval:"",//间隔
      current: 0,
      working:0,
      interestRate: "loanInformation/interestRate",
    };
  },
  onLoad() {
    // let data = {
    //   orgId: "601104", //客户经理机构编号
    //   filterCode: "孔雀" // 筛选字段
    // };
    // this.interfaceRequest(
    //   "/api/front/propertyInfo",
    //   data,
    //   "post",
    //   res => {
    //     console.log(res);
    //     this.accountList = res.data.data.accountList;
    //     console.log(this.accountList);
    //   },
    //   function(err) {
    //     console.log(err);
    //   }
    // );
  },
  methods: {
    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },
    checkedClick: function(item) {
      let that = this;
      console.log(item);
      // that.pageJump(that.guaranteeInformation);
      
      // that.accountData=item;
      this.$router.push({ path: "guaranteeInformation",query:{fxdata:JSON.stringify(item),} });//对象转为字符串

    },
     clickBtn(cur) {
      this.current = cur;
    },
    workingBtn(w) {
      this.working = w;
      console.log(this.working)
    },
     submitform() {
       console.log("确定")
       this.pageJump(this.interestRate);
     }
  }
};
</script>

<style lang="scss" scoped>
.pending-order {
  background: #ffffff !important;
  width: 100%;
  height: 100%;
}
.customize-head {
  padding: 100rpx 56rpx 16rpx 36rpx;
  height: 50rpx;
  line-height: 50rpx;
  background: #ffffff;
  display: flex;
  vertical-align: middle;
  align-items: center;
  position: relative;
  border-bottom: 2rpx solid #e5e5e5;
  .ch-img {
    width: 20rpx;
    height: 36rpx;
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
    font-weight: 600;
  }
}
.rateAdjustCyc-title{
  text-align: center;
  margin-top: 50rpx;
  .rateAdjustCyc-text{
    font-size: 56rpx;
    font-weight: 600;
    letter-spacing: 20rpx;
  }
  .rateAdjustCyc-time{
    color: #C7C9CD;
  }
}
.required:before {
  content: "*";
  color: red;
}
.circulation-quantity{
  margin-top: 80rpx;
  height: 200rpx;
  line-height: 200rpx;
  .circulation-content{
    margin-bottom:40rpx;
    .mini-btn:nth-last-of-type(3){
      margin-right: 40rpx;
    }
    .mini-btn{
      width: 160rpx;
      margin-right: 20rpx;
      float: right;
}
  }
}

.person-infor-one {
    height: 105rpx;
    line-height: 105rpx;
    border-top: 1rpx solid #e5e5e5;
    border-bottom: 1rpx solid #e5e5e5;
    padding-left: 10rpx;
    position: relative;
    text {
      float: left;
      color: #333333;
      font-size: 32rpx;
    }
    input {
      float: right;
      color: #c7c9cd;
      font-size: 32rpx;
      margin-right: 40rpx;
      height: 45rpx;
      line-height: 45rpx;
      text-align: right;
      padding: 30rpx 0;
      .uni-input{color: #c7c9cd}
      .uni-input-placeholder {
        color: #c7c9cd;
      }
    }
   
  }
  .rateAdjustCyc-infor{
    margin-left: 30rpx;
  }
  .working-day{
    padding-left: 10rpx;
    margin-top: 20rpx;
    height: 170rpx;
    .working-btn{
      margin-top: 30rpx;
     .circulation-btn{
      margin-left: 20rpx;
    }
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
.active {
  background-color: #edf4ff;
  color: #3b86f7;
}
</style>
