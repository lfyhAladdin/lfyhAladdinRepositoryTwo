<template>
  <view class="pending-order">
  <view class="customize-head">
      <view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
      <view class="ch-title"><text>{{title}}</text></view>
    </view>
  
 <!--个人信息-start-->
      <view class="person-infor">
        <view class="person-infor-one">
          <text class="required">对方账户种类</text>
          <button class="mini-btn" :class="{'active' : 0 == current}" @click="accountType(0)" type="default" size="mini">行内</button>
          <button class="mini-btn" :class="{'active' : 1 == current}" @click="accountType(1)" type="default" size="mini">行外</button>
        </view>
         <view class="person-infor-one">
          <text class="required">受托支付方式</text>
          <button class="mini-btn" :class="{'active' : 0 == mode}" @click="paymentMethod(0)" type="default" size="mini">手工支付</button>
          <button class="mini-btn" v-show="payment" :class="{'active' : 1 == mode}" @click="paymentMethod(1)" type="default" size="mini">立即支付</button>
        </view>
         <view class="person-infor-one">
          <text class="required">收款人名称</text>
          <img v-if="payeeName!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="payeeName=''" />
         <input placeholder="请输入" type="text" class="loan-amount" v-model=" payeeName"/>
        </view>
         <view class="person-infor-one">
          <text class="required">收款账号</text>
          <img v-if="collectionAccountNumber!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="collectionAccountNumber=''" />
         <input placeholder="请输入" type="number" class="loan-amount" v-model="collectionAccountNumber"/>
        </view>
         <view class="person-infor-one" v-show="accountNo">
          <text class="required">收款账号子账号</text>
          <img v-if="subAccountNo!=''" class="clearAcc" src="@/static/images/firstroom/cleanUp.svg" @click="subAccountNo=''" />
          <input placeholder="请输入" type="number" v-model="subAccountNo" />
        </view>
        <view class="person-infor-one" v-show="bankShow">
          <text  class="required">开户行号</text>
          <img v-if="bankNo!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="bankNo=''" />
          <input placeholder="请输入" type="number" class="loan-amount" v-model=" bankNo"/>
        </view>
         <view class="person-infor-one" v-show="bankShow">
          <text class="required">开户行名</text>
          <img v-if="bankName!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="bankName=''" />
          <input placeholder="请输入" type="text" class="loan-amount" v-model="bankName"/>
        </view>
     

      </view>
     

      <!--个人信息-end-->
     <view class="next-step" @tap="submitform()">
        <view class="cbutton">
          <text>保存</text>
        </view>
      </view>

  </view>
</template>
<script>
    import {
        appEnv
    } from "@/config/app.config";
    import filter from "@/utils/filters";
    import {
        mapGetters,
        mapMutations
    } from "vuex";
    export default {
        data: function() {
            return {
                title: "二手房",
                current: 0,
                mode: 0,
                applicationNumber: "",
                applicationDate: "",
                businessType: "",
                payeeName: "",
                collectionAccountNumber: "",
                subAccountNo: "",
                guaranteeInformation: "loanInformation/guaranteeInformation",
                openingBankSearch: "profession/signContract/openingBankSearch",
                bankName: "",
                bankNo: "",
                bankShow:false,
                accountNo:true,
                payment:true,
            };
        },
        onLoad() {
            console.log(this.signContractList)
            console.log(this.current)
            if(this.current==0){
              this.bankShow=false;
            }else{
              this.accountNo=false;
            }
            this.contractNo = this.signContractList.contractNo;
            this.contractAmt=this.signContractList.businessSum;
            this.getPaymentInfoQuery();

        },
        computed: {
    ...mapGetters(["signContractList" ])
  },
        methods: {
   ...mapMutations(["signContractReplace"]),
            //返回上一页
            navigateBack() {
                 yu.navigateTo({
                url: 'oneTwoHouse',
              });
               
            },
            //受托支付信息查询
            getPaymentInfoQuery() {
        

                let data = {
                    orderNo: "", //订单号
                    contractNo:this.contractNo, // 合同编号
                };
                this.interfaceRequest(
                    "/api/lend/paymentInfoQuery",
                    data,
                    "get",
                    res => {
                        console.log(res,"受托支付信息查询");
                     this.otherAccountTypeData=res.data.data.otherAccountType;
                     this.payeeTypeData=res.data.data.payeeType;
                     this.otherAccountNameData=res.data.data.otherAccountName;
                     this.otherAccountNoData=res.data.data.otherAccountNo;
                     this.otherOpenBankData=res.data.data.otherOpenBank;
                     this.otherAccountChNoData=res.data.data.otherAccountChNo;
                     this.otherOpenBankNameData=res.data.data.otherOpenBankName;




                if(this.otherAccountNameData==null){
                   this.payeeName="";
                }else{
                  this.payeeName=this.otherAccountNameData;
                }
                if(this.otherAccountNoData==null){
                    this.collectionAccountNumber="";
                }else{
                  this.collectionAccountNumber=this.otherAccountNoData;
                }
                this.subAccountNo=this.otherAccountChNoData;
               
                 if(this.otherOpenBankData==null){
                   this.bankNo="";
                }else{
                    this.bankNo=this.otherOpenBankData;
                }
                if(this.otherOpenBankNameData==null){
                   this.bankName="";
                }else{
                   this.bankName=this.otherOpenBankNameData;
                }
                
                 if (this.otherAccountTypeData=="1") {
                    this.current =0;
                } else {
                    this.current =1;
                    this.bankShow=true;
                    this.accountNo=false;
                    this.payment=false;
                    this.subAccountNo="";
                }

               if (this.payeeTypeData=="1") {
                    this.mode =0
                } else {
                    this.mode =1
                }






                    },
                    function(err) {
                        console.log(err);
                    }
                );
            },
            submitform() {

              if (this.current == "0") {
                    this.otherAccountType = "1";
                    this.bankNo="";
                    this.bankName="";
                } else {
                    this.otherAccountType = "2";
                    this.payeeType = "1";
                    this.subAccountNo="";
                    
                }
         
              if (this.mode == "0") {
                    this.payeeType = "1";
                } else {
                    this.payeeType = "3";
                }





                let formdata = {
                  
                    // "contractNo": "201611240151",
                    
                    // "paymentList": [
                    //   {
                    //     "capitalUse": "购房",
                    //     "currency": "01",
                    //     "otherAccountChNo": "3001",   //收款账号子序号
                    //     "otherAccountName": "中国银行", //对方账户名称
                    //     "otherAccountNo": "6217000300000832678",  //对方账号
                    //     "otherAccountType": "2",  //对方账户种类  1 本行账户 2 他行账户
                    //     "otherOpenBank": "601104",
                    //     "otherOpenBankName": "中国银行", //对方开户行名称
                    //     "payeeType": "1",       //受托支付方式  1 手工支付 3 立即支付
                    //     "paymentSum": "1000000",
                    //     "paymentSumUp": "壹佰万元整"
                    //   }
                    // ]
                        "contractNo":this.contractNo,
                        "contractAmt":this.contractAmt,
                        "otherAccountChNo": this.subAccountNo, //收款账号子序号
                        "otherAccountName": this.payeeName, //对方账户名称
                        "otherAccountNo": this.collectionAccountNumber, //对方账号
                        "otherAccountType": this.otherAccountType, //对方账户种类  1 本行账户 2 他行账户
                        "otherOpenBank":this.bankNo, //对方开户行号
                        "otherOpenBankName":this.bankName, //对方开户行名称
                        "payeeType": this.payeeType, //受托支付方式  1 手工支付 3 立即支付
                       
    

                };
                this.interfaceRequest(
                    "/api/lend/paymentInfoEntry",
                    formdata,
                    "post",
                    res => {
                        console.log(res);
if(res.data.data.returnCode=="Failed"){
                            yu.showModal({
                                title: "失败",
                                content:res.data.data.returnDesc,
                                showCancel: false,
                                confirmText: "我知道了",
                                success: res => {
                                    if (res.confirm) {
                                        console.log("用户点击确定");
                                    }
                                }
                            });
                            return false; 
}else{
              yu.navigateTo({
                            url: 'oneTwoHouse',
                        });
}



                      
                        // this.getPaymentInfoQuery(res);
                    },
                    function(err) {
                        console.log(err);
                    }
                );
            },
            //对方账户种类
            accountType(cur) { // 1 本行账户 2 他行账户
                this.current = cur;
                if (this.current == "0") {
                    this.otherAccountType = "1";
                    this.bankShow=false;
                    this.accountNo=true;
                    this.payment=true;
                } else {
                    this.otherAccountType = "2";
                    this.accountNo=false;
                    this.bankShow=true;
                    this.payment=false;
                }
            },
            //受托支付方式
            paymentMethod(data) { //1 手工支付 3 立即支付
                this.mode = data;
                if (this.mode == "0") {
                    this.payeeType = "1";
                } else {
                    this.payeeType = "3";
                }
            },

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
        padding: 116rpx 56rpx 16rpx 36rpx;
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
        .ch-share {
            width: 34rpx;
            height: 34rpx;
            position: absolute;
            top: 50%;
            right: 36rpx;
            margin-top: -17rpx;
            margin-right: -17rpx;
            img {
                width: 34rpx;
                height: 34rpx;
            }
        }
    }
    
    .person-infor {
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
                color:#333435;
                font-size: 32rpx;
                margin-right: 40rpx;
                height: 45rpx;
                line-height: 45rpx;
                text-align: right;
                padding: 30rpx 0;
                .uni-input {
                    color:#333435;
                }
                .uni-input-placeholder {
                    color: #c7c9cd;
                }
            }
            .applicationNumber {
                margin-right: 140rpx;
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
    }
    
    .required:before {
        content: "*";
        color: red;
    }
    
    .active {
        background-color: #edf4ff;
        color: #3b86f7;
    }
    
    .mini-btn {
        margin-top: 30rpx;
        width:29%;
    }
    
    .mini-btn:first-of-type {
        margin-left: 4%;
        margin-right:6%;
    }
    
    .loan-info-tips {
        color: #e89f73;
        border-bottom: 0.5px solid #e5e5e5;
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
    .cleanUp{
      float: right;
      width: 34rpx;
      margin-right:20rpx;
      margin-left: -60rpx;
      margin-top: 36rpx;
          }
           .clearAcc{
      float: right;
      width: 34rpx;
      margin-right:20rpx;
      margin-left: -18rpx;
      margin-top: 36rpx;
          }
</style>