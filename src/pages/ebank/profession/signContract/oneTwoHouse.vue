<template>
  <view class="pending-order">
    <view class="pf-title pf-titleTwo">
      <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
      <text>{{HouseTitle}}</text>
    </view>

 <!--个人信息-start-->
      <view class="pf-content person-infor">
       
        <view class="person-infor-one">
          <text>借款人</text>
          <input placeholder="借款人" type="text" disabled="disabled" v-model="borrower" />
        </view>
        <view class="person-infor-one">
          <text>身份证号</text>
         <input placeholder="身份证号" type="text" disabled="disabled" v-model="certId" />
        </view>
        <view class="person-infor-one">
          <text>业务品种</text>
         <input placeholder="业务品种" type="text" disabled="disabled" v-model="businessType" />
        </view>
       <view class="person-infor-one">
          <text>审批金额(元)</text>
         <input placeholder="审批金额" type="text" disabled="disabled" v-model="businessSum" />
        </view>
        <view class="person-infor-one">
          <text>审批通过时间</text>
         <input placeholder="审批通过时间" type="text" disabled="disabled" v-model="occurDate" />
        </view>
        <view class="pf-ul" @click="getSupplement" v-show="payInfo">
          <view class="pf-li">
            <view class="pf-li-left">
              <img src="@/static/images/img-info.png">
              <view>补充受托支付信息</view>
            </view>
            <view class="pf-li-right">
              <view></view>
              <img src="@/static/images/profession/pf-arrow.svg">
            </view>
          </view>
        </view>
         <!--个人信息-end-->
        <view class="contract-button">
            <button type="primary" @click="submitform()">提交</button>
        </view>
      </view>
        <!-- <view class="pf-ul" v-show="supplementInfo" @click="getImgInfo">
          <view class="pf-li">
            <view class="pf-li-left">
              <img src="@/static/images/img-info2.png">
              <view>影像信息</view>
            </view>
            <view class="pf-li-right">
              <view></view>
              <img src="@/static/images/profession/pf-arrow.svg">
            </view>
          </view>
        </view> -->
  </view>
</template>
<script>
    import {
        appEnv
    } from "@/config/app.config";
    import filter from "@/utils/filters";
    import uLink from "@/components/uLink.vue";
    import {
        mapGetters,
        mapMutations,
        mapActions
    } from "vuex";
    export default {
        data: function() {
            return {
                interestRate: "loanInformation/interestRate",
                supplement: "profession/signContract/supplement",
                signTheContract: "profession/signContract/signTheContract",
                supplementInfo: true,
                payInfo: false,
                borrower: "", //借款人
                HouseTitle: "",
                certId: "",
                businessType: "",
                businessSum: "",
                occurDate: "",
            };
        },
        onLoad() {
            console.log(this.signContractList);
            this.oneTwoHouseInfo = this.signContractList;
            //  this.oneTwoHouseInfo = eval("(" + this.$route.query.fxdata + ")"); //把传过来的字符串转为对象操作
            console.log(this.oneTwoHouseInfo, "一手房信息");
            console.log(this.oneTwoHouseInfo.certID)
                // this.oneTwoHouseList=JSON.stringify(this.oneTwoHouseInfo);
                // console.log(this.oneTwoHouseList)
            this.contractNo = this.oneTwoHouseInfo.contractNo; //合同编号
            this.contractAmt = this.oneTwoHouseInfo.businessSum;
            console.log(this.contractNo, "合同编号")
            this.houseName = this.oneTwoHouseInfo.businessType;
            console.log(this.houseName)
            if (this.houseName == "1140010" || this.houseName == "1140110") {
                this.HouseTitle = "一手房";
            } else {
                this.HouseTitle = "二手房";
            }

            console.log(this.HouseTitle, "一二手房标题");
            console.log(this.oneTwoHouseInfo.childProductNo)
            if (this.oneTwoHouseInfo.childProductNo == "GR1AJ" || this.oneTwoHouseInfo.childProductNo == "GR1SY") {
                this.payInfo = false;
            } else {
                this.payInfo = true;
            }

            this.borrower = this.oneTwoHouseInfo.customerName; //借款人
            this.certId = this.oneTwoHouseInfo.certID; //身份证号
            this.businessType = this.oneTwoHouseInfo.businessType2; //业务品种
            this.businessSum = this.oneTwoHouseInfo.businessSum; //审批金额
            this.occurDate = this.oneTwoHouseInfo.occurDate; //审批通过时间
        },
        created() {
            this.userID = this.userInfor.loginCode;
            console.log(this.userID)
        },
        computed: {
            ...mapGetters(["signContractList", "userInfor"])
        },
        methods: {
            ...mapMutations(["signContractReplace"]),
            ...mapActions(["businessNumCommit"]),
            //返回上一页
            navigateBack() {

                yu.navigateTo({
                    url: 'signTheContract',
                });
            },

            /**表单提交接口 **start****/
            submitform() {
                // let data = {
                //   contractNo: "2020121500000001"
                // };
                // this.interfaceRequest(
                //   "/api/contract/conEffect",
                //   data,
                //   "post",
                //   res => {
                //     console.log(res, "合同生效接口");
                //   },
                //   function(err) {
                //     console.log(err);
                //   }
                // );

                yu.showModal({
                    title: "确定提交？",
                    content: "点击确认，完成合同签署过程",
                    confirmText: "确认",
                    success: res => {
                        if (res.confirm) {
                            console.log("用户点击确定");

                            let data = {
                                contractNo: this.contractNo,
                            };
                            this.interfaceRequest(
                                "/api/contract/conEffect",
                                data,
                                "post",
                                res => {
                                    console.log(res, "合同生效接口");
                                    console.log(res.data.message);

                                    if (res.data.data.returnCode == "Success") {
                                        this.messageData = "合同签署完成！"
                                    } else {
                                        this.messageData = res.data.message;
                                    }
                                    // yu.showModal({
                                    //   title: "合同签署完成",
                                    //   content: "点击确定，继续补录押品信息",
                                    //   cancelText: "暂不补录",
                                    //   success: res => {
                                    //     if (res.confirm) {
                                    //       console.log("用户点击确定");
                                    //       console.log(res.confirm)
                                    //       console.log(this.contractNo);
                                    //         yu.navigateTo({
                                    //      url: 'signTheContract?+confirm=true&name='+this.contractNo,
                                    // });
                                    //     } else if (res.cancel) {
                                    //       console.log("用户点击取消");
                                    //       console.log(res.cancel)
                                    //       // this.pageJump(this.signTheContract);
                                    //        yu.navigateTo({
                                    //         url: 'signTheContract?+confirm=true&name='+this.contractNo,
                                    // });
                                    //     }
                                    //   }
                                    // });



                                    yu.showModal({
                                        title: "签署合同",
                                        content: this.messageData,
                                        showCancel: false,
                                        confirmText: "我知道了",
                                        success: res => {
                                            if (res.confirm) {
                                                console.log("用户点击确定");
                                                let data = {
                                                    "userID": this.userID, //客户经理编号
                                                    "orgID": "", //客户经理所属机构编号
                                                };
                                                this.businessNumCommit(data);

                                                yu.navigateTo({
                                                    url: 'signTheContract',
                                                });
                                            }
                                        }
                                    });




                                },
                                function(err) {
                                    console.log(err);
                                }
                            );
                        } else if (res.cancel) {
                            console.log("用户点击取消");
                        }
                    }
                });
            },
            getSupplement() {
                console.log(this.contractNo)
                yu.navigateTo({
                    url: 'supplement?+contractNo=' + this.contractNo,
                });
            },
            getImgInfo() {
                yu.navigateTo({
                    url: 'contractImgInfo',
                });
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

    
    .person-infor {
        // margin-top: 24rpx;
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
                color: #c7c9cd;
                font-size: 32rpx;
            }
            input {
                width: 63%;
                float: right;
                color: #333333;
                font-size: 32rpx;
                margin-right: 40rpx;
                height: 45rpx;
                line-height: 45rpx;
                text-align: right;
                padding: 30rpx 0;
                .uni-input {
                    color: #333333;
                }
                .uni-input-placeholder {
                    color: #c7c9cd;
                }
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
        }
    }
    
    .pf-ul {
        background: #ffffff;
        box-shadow: 0rpx 0rpx 28rpx 0rpx rgba(0, 0, 0, 0.11);
        border-radius: 20rpx;
        margin: 35rpx 30rpx 30rpx 30rpx;
        .pf-li {
            height: 60rpx;
            padding: 26rpx 6rpx;
            border-bottom: 2rpx solid #e5e5e5;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .pf-li-left,
            .pf-li-right {
                display: flex;
                flex-direction: row;
                align-items: center;
                img {
                    margin: 0 22rpx;
                }
            }
            .pf-li-left {
                img {
                    width: 80rpx;
                }
            }
            .pf-li-right {
                .pf-num {
                    font-size: 22rpx;
                    color: #ffffff;
                    width: 56rpx;
                    height: 40rpx;
                    line-height: 40rpx;
                    text-align: center;
                    background: #e75e58;
                    border-radius: 16rpx 16rpx 16rpx 0rpx;
                }
                img {
                    width: 15rpx;
                }
            }
        }
        .pf-li:last-of-type {
            border-bottom: 0;
        }
    }
    
    .pSubmit-cover {
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.65);
        z-index: 10000;
        .cover-submit {
            width: 100%;
            height: 648rpx;
            background: #ffffff;
            border-radius: 20rpx 20rpx 0 0;
            position: absolute;
            bottom: 0;
            .cover-title {
                height: 60rpx;
                line-height: 60rpx;
                text-align: center;
                font-size: 36rpx;
                color: #333333;
                padding: 38rpx 30rpx;
                font-weight: 600;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 20rpx;
                    position: absolute;
                    left: 40rpx;
                }
            }
            .contract-ul {
                margin-top: 80rpx;
                .contract-li {
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                    height: 80rpx;
                    font-size: 32rpx;
                    uni-view:last-of-type {
                        color: #333435;
                    }
                    .iptcontract {
                        text-align: right;
                    }
                }
                .contract-li:last-of-type {
                    border-bottom: 2rpx solid #e5e5e5;
                }
            }
            .contract-button {
                margin-top: 154rpx;
                uni-button {
                    width: 330rpx;
                    box-shadow: 0rpx 10rpx 23rpx 0rpx rgba(59, 134, 247, 0.4);
                    border-radius: 50rpx;
                }
            }
        }
    }
</style>