<template>
  <view class="pending-order">
    <view class="customize-head">
      <view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
      <view class="ch-title"><text>{{title}}</text></view>
      <view class="temporary-storage"  @tap="submitform('TS')">暂存</view>
    </view>
    

<view class="image-content">
    <img style="height:26rpx;margin:0 auto;display:block;margin-top:63rpx" src="@/static/images/firstroom/longProgress04.svg" />
    <ul class="loaninfo"><li>业务信息</li><li>担保信息</li><li>利率期限信息</li><li>还款信息</li></ul>
</view>
 <!--个人信息-start-->
      <view class="person-infor">
       
        <view class="account-information">
         <text class="account-title"></text>
         <text>账户信息</text>
        </view>
        <view class="person-infor-one">
          <text>扣款账号</text>
           <img v-if="deduction!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="deduction=''" />
         <input placeholder="请输入" type="number" class="loan-amount" v-model="deduction"/>
        </view>
         <view class="person-infor-one">
          <text>扣款账号子序号</text>
          <input placeholder="扣款账号子序号" type="number" v-model="deductionNumber" />
        </view>
        <view class="account-information">
         <text class="account-title"></text>
         <text>还款信息</text>
        </view>
        <view class="person-infor-one">
          <text>还款方式</text>
          <picker :value="productIndex" :range-key="'value'" :range="corpusPayMethodIdArr" @change="bindPickerChange">
            <view class="picker">{{ corpusPayMethodIdArr[productIndex].value }}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one">
          <text>还款周期</text>
         <picker :value="payCycValue" :range-key="'payCycKey'" :range="payCycList" @change="payCycbind">
            <view class="picker">{{ payCycList[payCycValue].payCycKey }}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
         <!-- <view class="person-infor-one">
          <text>定制还款计划</text>
          <button class="mini-btn" :class="{'active' : 0 == plan}" @click="clickBtn(0)" type="default" size="mini">是</button>
          <button class="mini-btn" :class="{'active' : 1 == plan}" @click="clickBtn(1)" type="default" size="mini">否</button>
        </view>
         <view class="loan-info-tips" v-show="plan==0">
          <text class="tips-info">后续请到PC端补录详细还款计划</text>
        </view> -->
      </view>
     

      <!--个人信息-end-->
      <view class="" @click="submitform('save')">
        <view class="cbutton">
          <text>提交</text>
        </view>
      </view>

  </view>
</template>
<script>
import { appEnv } from "@/config/app.config";
import filter from "@/utils/filters";
import { mapGetters, mapMutations,mapActions } from "vuex";
export default {
  data: function() {
    return {
      title: "贷款申请信息",
      deduction: "", //扣款账号
      deductionNumber: "0001", //扣款账号子序号
      plan: 0,
      perfectInformation:"perfectInformation/perfectInformation",
      successMsg:"",
      productList: [
       
      ],
      productIndex: 0,
      //还款周期
      payCycList: [
         {
          payCycVal: "1MA21",
          payCycKey: "1MA21"
        },
      ],
      payCycValue: 0,
      corpusPayMethodIdArr:[],//还款方式
    };
  },
  created() {
     this.corpusPayMethodName =this.queryApplyInfoList.corpusPayMethod;
        this.loanQueryDictionaryListObj.corpusPayMethodIdArr.forEach((item, index) => {
          console.log(item)
          if (item.key == this.corpusPayMethodName) {
            this.productIndex = index;

          }
        });
  },
  onLoad() {
    let that = this;
    //  this.queryDictionaryListObjCommit();
    this.loanQuerydictList();
    console.log(this.loanQueryDictionaryListObj)
   
    console.log(this.queryApplyInfoList,"贷款申请信息");
    that.isMadePayPlan = this.queryApplyInfoList.isMadePayPlan; //定制还款计划 1是 2否
    that.deductionNumber=this.queryApplyInfoList.payAcctChNo;//扣款账号子序号
    that.deduction=this.queryApplyInfoList.payAcctNo;//扣款账号
    // this.productIndex=this.queryApplyInfoList.corpusPayMethod;//还款方式
    // that.applyNo=this.queryApplyInfoList.applyNo;//申请编号
    this.businessTypeData=this.queryApplyInfoList.businessType;
    if(that.deductionNumber==""){
      that.deductionNumber="0001";
    }
    if (that.isMadePayPlan == "1") {
      that.plan = 0;
    } else {
      that.plan = 1;
    }
    console.log('还款方式')
    // if(this.queryApplyInfoList.corpusPayMethod=="3"){

    // }
    console.log(this.productList)
    setTimeout(()=>{
      this.productList.forEach((item,index)=>{
        if(item.corpusPayMethod == this.queryApplyInfoList.corpusPayMethod){
          this.productIndex = index;
        }
      })
    },1000)
    
    

  },
  computed: {
    ...mapGetters(["queryApplyInfoList", "loanQueryDictionaryListObj"])
  },
  methods: {
    ...mapActions(['queryApplyInfoCommit']),
    //返回上一页
    navigateBack() {
  
 yu.showModal({
          title: '确定返回？',
          content: '数据还未提交，点确定后编辑过的内容将不保存',
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              yu.navigateTo({
                url: 'interestRate',
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });


    },
    clickBtn(cur) {
      this.plan = cur;
    },

      loanQuerydictList(){
   let obj2 = this.loanQueryDictionaryListObj;  //给各个下拉框赋值
        if(Object.keys(obj2).length != 0){
          for(let k in obj2){
            if(obj2[k] != ''){
              this[k] = obj2[k];
            }
          };
        };
 },
    //下拉列表-还款方式
    bindPickerChange: function(e) {
      console.log(e.target.value)
      this.productIndex = e.target.value
      // var thisIndex = e.detail.value;
      this.corpusPayMethodKey = this.corpusPayMethodIdArr[this.productIndex].key;//传给后台的值
     console.log(this.corpusPayMethodKey)
    },
    //下拉列表-还款周期
    payCycbind: function(e) {
      this.payCycValue = e.target.value
      // var payCycIndex = e.detail.value;
      // this.payCycId = this.payCycList[payCycIndex].payCycVal;
      // this.payCycValue = payCycIndex;
      // let payCycOI = {};
      // uni.setStorage({
      //   key: "payCycOI",
      //   data: {
      //     payCycId: this.payCycList[payCycIndex].payCycVal,
      //     payCycValue: payCycIndex,
      //     payCycName: this.payCycList[payCycIndex].payCycKey
      //   },
      //   fail: function(error) {}
      // });
    },
    /**表单提交接口 **start****/
    submitform(e) {
      // if(this.productIndex=="0"){
      //      this.corpusPayMethod="1";
      // }
      // if(this.productIndex=="1"){
      //      this.corpusPayMethod="2";
      // }
      // if(this.productIndex=="2"){
      //      this.corpusPayMethod="3";
      // }
      // if(this.productIndex=="3"){
      //      this.corpusPayMethod="4";
      // }
      // if(this.productIndex=="4"){
      //      this.corpusPayMethod="7";
      // }
      // if(this.plan=="0"){
      //    this.MadePayPlan="1";
      // }else{
      //  this.MadePayPlan="2";
      // }
console.log(1)
console.log(this.queryApplyInfoList)
console.log(this.queryApplyInfoList.applyNo)
 if(this.queryApplyInfoList.corpusPayMethod==""){
        this.queryApplyInfoList.corpusPayMethod="1"
      }
console.log(1)

      payCycValue: 0
      let that = this;
      let formData = {
        applyNo:this.queryApplyInfoList.applyNo,
        orderNo: "",
        businessType:this.businessTypeData,
        listName: "payInfo,accountInfo",
        payInfo: [
          {
            corpusPayMethod:this.corpusPayMethodKey == undefined? this.queryApplyInfoList.corpusPayMethod:this.corpusPayMethodKey,
            initFirstRepay: "2",
            isMadePayPlan: '2',
            isMoreAccount: "2",
            payCyc: this.payCycList[this.payCycValue].payCycVal
          }
        ],
        accountInfo: [
          {
            payAcctNo: this.deduction,
            payAcctChNo: this.deductionNumber,
            isLoanToSave: '2'
          }
        ]
      };


      let posturl = "/api/credit/updateApplyInfo";
      that.interfaceRequest(
        posturl,
        formData,
        "post",
        (res)=> {
          console.log(6666);
          console.log(res);
          console.log(res.data.data.returnCode)
          that.successMsg=res.data.data.returnCode;
          console.log(res.data.data)
         console.log(that.successMsg)
          // that.pageJump(that.perfectInformation);
          that.queryApplyInfoCommit({
            'orderNo': '',
            'applyNo':this.queryApplyInfoList.applyNo,
          }); //重新调'申请信息查询'接口，确保担保合同信息列表准确



         if(e=="TS"){
           this.messageTs=res.data.data.returnDesc;
                        yu.showModal({
                                title: "暂存状态",
                                content:this.messageTs,
                                showCancel: false,
                                confirmText: "我知道了",
                                success: res => {
                                    if (res.confirm) {
                                        console.log("用户点击确定");
                                    }
                                }
                            });
                    }else{

 if(this.deduction==""){
         yu.showModal({
              title: "扣款账号不能为空！",
              content: "",
              showCancel: false,
              confirmText: "我知道了",
              success: res => {
                  if (res.confirm) {
                      console.log("用户点击确定");
                  }
              }
          });
          return false;
      }
if(this.deductionNumber==""){
         yu.showModal({
              title: "扣款账号子序号不能为空！",
              content: "",
              showCancel: false,
              confirmText: "我知道了",
              success: res => {
                  if (res.confirm) {
                      console.log("用户点击确定");
                  }
              }
          });
          return false;
      }

                       
  console.log(that.successMsg)
           if(that.successMsg=="Success"){
              setTimeout(()=>{
            that.pageJump(that.perfectInformation);
          },1000)
          }else{

 yu.showModal({
          title: "该账号或者子账号序号录入错误",
          content: "",
          showCancel: false,
          confirmText: "我知道了",
          success: res => {
              if (res.confirm) {
                  console.log("用户点击确定");
              }
          }
      });
          return false;









          }



          }




        





        },
        function(err) {}
      );
    },
   
    /**表单提交接口 **end****/
  }
};
</script>

<style lang="scss" scoped>
.loaninfo {
  display: flex;
  font-size: 24rpx;
  li {
    flex: 1;
    color: #999999;
  }
  li:nth-of-type(4) {
    color: #000;
  }
}
ul li {
  list-style-type: none;
}
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
  }
  .temporary-storage {
    color: #3b86f7;
  }
  .image-content {
    margin-top: 65rpx;
  }
}

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
    text:nth-of-type(2) {
      color: #e89f73;
      margin-right: 40rpx;
    }
    input {
      float: right;
      color: #333435;
      font-size: 32rpx;
      margin-right: 40rpx;
      height: 45rpx;
      line-height: 45rpx;
      text-align: right;
      padding: 30rpx 0;
      .uni-input{color:#333435}
      .uni-input-placeholder {
        color: #c7c9cd;
      }
    }
    picker {
      float: right;
      color: #333435;
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
    .clear {
      width: 38rpx;
      height: 38rpx;
      position: absolute;
      top: 50%;
      right: 32rpx;
      margin-top: -18rpx;
      margin-right: -7.5rpx;
    }
    .loan-amount {
      margin-right: 80rpx;
    }
  }
  .account-information {
    height: 110rpx;
    line-height: 110rpx;
    background-color: #f6f8f9;
    color: #333435;
    font-size: 34rpx;
    font-weight: 600;
    .account-title {
      width: 10rpx;
      height: 30rpx;
      border-left: solid 10rpx #3b86f7;
      margin-right: 20rpx;
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
.mini-btn {
  margin-top: 30rpx;
}
.mini-btn:first-of-type {
  margin-left: 15%;
  margin-right: 10%;
}
.loan-info-tips {
  color: #e89f73;
  border-bottom: 0.5px solid #e5e5e5;
  text-align: right;
  .tips-info {
    margin-right: 74rpx;
  }
}
 .cleanUp{
      float: right;
      width: 34rpx;
      margin-right:20rpx;
      margin-left: -60rpx;
      margin-top: 36rpx;
          }
</style>
