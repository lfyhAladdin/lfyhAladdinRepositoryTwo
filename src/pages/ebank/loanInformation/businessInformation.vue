<template>
  <view class="pending-order">


<view class="loan-application-information">
  <view class="customize-head">
      <view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
      <view class="ch-title"><text>{{title}}</text></view>
      <view class="temporary-storage" @tap="submitform('TS')">暂存</view>
    </view>

<view class="image-content">
    <img style="height:26rpx;margin:0 auto;display:block;margin-top:63rpx" src="@/static/images/firstroom/longProgress01.svg" />
    <ul class="loaninfo"><li>业务信息</li><li>担保信息</li><li>利率信息</li><li>还款信息</li></ul>
</view>
</view>

  
 <!--个人信息-start-->
      <view class="person-infor">
        <view class="person-infor-one">
          <text>申请编号</text>
          <input type="number" v-model="applicationNumber"  class="applicationNumber" id="copytext" disabled="false"/>
          <label class="copy" @click="copyInfo(applicationNumber)">复制</label>
        </view>
         <view class="person-infor-one">
          <text>申请日期</text>
          <input placeholder="申请日期" type="text" v-model="applicationDate" disabled="false" />
        </view>
         <view class="person-infor-one">
          <text>业务品种</text>
          <input placeholder="业务品种" type="text" v-model="businessType" disabled="false"/>
        </view>
        <view class="person-infor-one">
          <text>子产品种类</text>
           <picker :value="productIndex" :range-key="'value'" :range="childProductNoIdClass" :disabled="childProductNo" @change="bindPickerChange($event,'childProductNo')">
            <view class="picker">{{ childProductNoIdClass[productIndex].value }}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />


          <!-- <view class="beforeRed">押品类型</view>
          <view>
            <picker :range="clrTypeIdArr" :range-key="'value'" :value="clrTypeIdIndex" @change="pickerSelectorChange($event,'clrTypeId')">
              {{clrTypeIdArr[clrTypeIdIndex].value}}
            </picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg"/>
            
          </view> -->


        </view>
        <view class="person-infor-one">
          <text>是否有共借人</text>
          <button class="mini-btn" :class="{'active' : 0 == current}" @click="clickBtn(0)" type="default" size="mini">否</button>
          <button class="mini-btn" :class="{'active' : 1 == current}" @click="clickBtn(1)" type="default" size="mini">是</button>
        </view>
        <view class="person-infor-one">
          <text>贷款金额（元）</text>
         <img v-if="LoanAmount!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="LoanAmount=''" />
         <input placeholder="请输入" type="number" class="loan-amount" v-model="LoanAmount" maxlength="11" @blur="onKeyInput"/>
            
        </view>
         <view class="person-infor-one">
          <text>贷款期限（月）</text>
          <img v-if="LoanTerm!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="LoanTerm=''" />
         <input placeholder="请输入" type="number" class="loan-amount" maxlength="3" v-model="LoanTerm"/>
        </view>
         <view class="person-infor-one">
          <text>首付款金额（元）</text>
          <img v-if="downPayment!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="downPayment=''" />
         <input placeholder="请输入" type="number" class="loan-amount" maxlength="11" v-model="downPayment" @blur="onKeyInput"/>
        </view>
        <view class="down-payment-ratio">
          <text>首付款比例：</text>
          <text class="proportion">{{percent}}</text>
        </view>
         <view class="person-infor-one">
          <text>支出收入比（%）</text>
          <input type="number" v-model="outInRatio" disabled="false"/>
        </view>
         <view class="loan-info-tips">
          <text v-show="outInRatio > 55" class="tips-info">请在影像系统上传资产证明</text>
        </view>


      <view class="person-infor-one" v-show="roomsNum">
          <text>拟购房所属套数</text>
          <button class="mini-btn" :class="{'active' : 0 == houseNums}" @click="clickHouse(0)" type="default" size="mini">首套</button>
          <button class="mini-btn" :class="{'active' : 1 == houseNums}" @click="clickHouse(1)" type="default" size="mini">二套</button>
        </view>

      </view>
     

      <!--个人信息-end-->
     <view class="next-step" @tap="submitform('save')">
        <view class="cbutton">
          <text>下一步</text>
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
        mapMutations,
        mapActions
    } from "vuex";

    export default {
        data: function() {
            return {
                title: "贷款申请信息",
                orderlist: [],
                current: 0,
                houseNums: 0,
                applicationNumber: "",
                applicationDate: "",
                businessType: "",
                outInRatio: "",
                LoanAmount: "",
                LoanTerm: "",
                downPayment: "",
                guaranteeInformation: "loanInformation/guaranteeInformation",
                perfectInformation: "perfectInformation/perfectInformation",
                productList: [],
                productIndex: 0,
                percent: 0,
                LoanAmountFocus: false,
                childProductNoIdArr: [],
                productsArr: [],
                productIndexData: "",
                childProductNoIdClass: [],
                roomsNum: true, //拟购房所属套数，业务品种为商用房时，不展示
                childProductNo: false,
                childProductNoIdSituation1: [{
                    key: "GR1AJ",
                    value: "个人一手住房贷款"
                }, {
                    key: "HWJGYSZF",
                    value: "行外监管个人一手住房贷款"
                }],
                childProductNoIdSituation2: [{
                    key: "GR1SY",
                    value: "个人一手商用房贷款"
                }, {
                    key: "HWJGYSSYF",
                    value: "行外监管个人一手商用房按揭贷款"
                }],
                childProductNoIdSituation3: [{
                    key: "GR2AJ",
                    value: "个人二手住房贷款"
                }],
                childProductNoIdSituation4: [{
                    key: "GR2SY",
                    value: "个人二手商用房贷款"
                }]
            };
        },

        onLoad() {
            this.loanQuerydictList();
            this.queryDictionaryListObjCommit();
            console.log(this.loanQueryDictionaryListObj);
            console.log(this.approvalIngList);
            this.orderNoVal = this.approvalIngList.orderNo;
            let that = this;
            this.applyNoVal = this.approvalIngList.serialNo; //申请编号
            let applyDate = new Date();
            applyDate.getFullYear(); //获取完整的年份(4位)
            applyDate.getMonth(); //获取当前月份(0-11,0代表1月)
            applyDate.getDate(); //获取当前日(1-31)
            console.log(applyDate.getFullYear())
            console.log(applyDate.getMonth() + 1)
            this.getMonth = applyDate.getMonth() + 1;
            console.log(applyDate.getDate())
            console.log(applyDate.getFullYear() + '/' + this.getMonth + '/' + applyDate.getDate());
            console.log(this.approvalIngList.occurDate)
            if (this.approvalIngList.occurDate == "" || this.approvalIngList.occurDate == undefined || this.approvalIngList.occurDate == null) {
                this.applicationDate = applyDate.getFullYear() + '/' + this.getMonth + '/' + applyDate.getDate();
            } else {
                this.applicationDate = this.approvalIngList.occurDate; //申请时间
            }
            if (that.downPayment == "") {
                that.downPayment = "";
                this.percent = 0;
            }
            if (that.LoanAmount == "") {
                that.LoanAmount == "";
                this.percent = 0;
            }
            if (that.isAppLicant == "2") {
                that.current = 0;
            } else {
                that.current = 1;
            }
            if (that.houseNum == "10") {
                that.houseNums = 0;
            } else {
                that.houseNums = 1;
            }
            let data = {
                orderNo: this.orderNoVal,
                applyNo: this.applyNoVal
            };
            let posturl = "/api/credit/queryApplyInfo";
            that.interfaceRequest(
                posturl,
                data,
                "get",
                res => {
                    console.log(res, "申请信息更新");
                    if (res.data.data.businessType == null) {
                        this.childProductNoIdClass = this.childProductNoIdSituation1;
                    }
                    this.businessTypeList = res.data.data.businessType; //业务品种
                    console.log(this.businessTypeList)
                        // this.businessTypeList = "1140110";

                    if (this.businessTypeList == "1140010") {
                        //个人一手住房贷款
                        this.childProductNoIdClass = this.childProductNoIdSituation1;
                    }
                    if (this.businessTypeList == "1140110") {
                        //个人一手商用房贷款
                        this.childProductNoIdClass = this.childProductNoIdSituation2;
                        this.roomsNum = false;
                    }
                    if (this.businessTypeList == "1140020") {
                        //个人二手住房贷款
                        this.childProductNoIdClass = this.childProductNoIdSituation3;
                        this.childProductNo = true;
                    }
                    if (this.businessTypeList == "1140120") {
                        //个人二手商用房贷款
                        this.childProductNoIdClass = this.childProductNoIdSituation4;
                        this.roomsNum = false;
                        this.childProductNo = true;
                    }

                    this.childprodName = res.data.data.childProductNo;
                    this.childProductNoIdClass.forEach(
                        (item, index) => {
                            console.log(item);
                            if (item.key == this.childprodName) {
                                this.productIndex = index;
                                console.log(this.productIndex);
                            }
                        }
                    );

                    that.applicationNumber = res.data.data.applyNo; //申请编号
                    that.outInRatio = res.data.data.outInRatio; //支出收入比
                    that.isAppLicant = res.data.data.isAppLicant; //是否有共同借款人
                    that.houseNum = res.data.data.houseNum; //拟购房所属套数
                    that.productIndexData = res.data.data.childProductNo;
                    if (that.isAppLicant == "2") {
                        that.current = 0;
                    } else {
                        that.current = 1;
                    }
                    if (that.houseNum == "10") {
                        that.houseNums = 0;
                    } else {
                        that.houseNums = 1;
                    }
                    if (res.data.data.businessType == "1140010") {
                        that.businessType = "个人一手住房贷款";
                    }
                    if (res.data.data.businessType == "1140020") {
                        that.businessType = "个人二手住房贷款";
                    }
                    if (res.data.data.businessType == "1140120") {
                        that.businessType = "个人二手商用房贷款";
                    }
                    if (res.data.data.businessType == "1140110") {
                        that.businessType = "个人一手商用房贷款";
                    }
                    if (res.data.data.businessSum == "0") {
                        that.LoanAmount = "";
                    } else {
                        that.LoanAmountName = res.data.data.businessSum; //贷款金额
                        that.LoanAmount = res.data.data.businessSum; //贷款金额
                    }
                    if (res.data.data.firstValue == "0") {
                        that.downPayment = "";
                    } else {
                        that.downPaymentName = res.data.data.firstValue; //首付款金额
                        that.downPayment = res.data.data.firstValue; //首付款金额
                    }


                    that.LoanTerm = res.data.data.termMonth; //贷款期限

                    console.log(this.downPayment);
                    console.log(this.LoanAmount);

                    this.loansAnd = Number(that.downPayment) + Number(that.LoanAmount);
                    console.log(this.loansAnd);
                    this.proportion = that.downPayment / this.loansAnd;
                    this.proportion = this.proportion * 100;
                    console.log(this.proportion);
                    this.integer = Math.round(this.proportion);
                    console.log(this.integer)


                    if (this.loansAnd == 0) {
                        this.percent = 0;
                    } else {
                        this.percent = this.integer + "%";
                    }


                    console.log(that.LoanAmountName); //贷款金额
                    console.log(that.LoanTerm); //贷款期限
                    console.log(that.downPaymentName); ////首付款金额
                    if (that.LoanAmountName == "" || that.LoanAmountName == "0" || that.LoanAmountName == null) {
                        that.LoanAmount = ""
                    }
                    if (that.LoanTerm == "" || that.LoanTerm == "0" || that.LoanTerm == null) {
                        that.LoanTerm = ""
                    }
                    if (that.downPaymentName == "" || that.downPaymentName == "0" || that.downPaymentName == null) {
                        that.downPayment = ""
                    }



                },
                function(err) {}
            );


        },
        computed: {
            ...mapGetters([
                "queryApplyInfoList",
                "approvalIngList",
                "loanQueryDictionaryListObj"
            ])
        },
        methods: {
            ...mapMutations(["loanInputListReplace", "loanPickerListReplace"]),
            ...mapActions(["queryApplyInfoCommit", "queryDictionaryListObjCommit"]),
            loanQuerydictList() {
                let obj2 = this.loanQueryDictionaryListObj; //给各个下拉框赋值
                if (Object.keys(obj2).length != 0) {
                    for (let k in obj2) {
                        if (obj2[k] != "") {
                            this[k] = obj2[k];
                        }
                    }
                }
            },
            //是否有共同借款人
            clickBtn(cur) {
                this.current = cur;
                if (this.current == "0") {
                    //否
                    this.isAppLicant = "2";
                } else {
                    this.isAppLicant = "1";
                }
            },
            //拟购房所属套数
            clickHouse(data) {
                this.houseNums = data;
                if (this.houseNums == "0") {
                    this.houseNum = "10";
                } else {
                    this.houseNum = "20";
                }
            },
            //返回上一页
            navigateBack() {
                // this.pageJump(this.perfectInformation);

                yu.showModal({
                    title: '确定返回？',
                    content: '数据还未提交，点确定后编辑过的内容将不保存',
                    showCancel: true,
                    success: (res) => {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            this.pageJump(this.perfectInformation);
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });

            },
            //下拉列表
            bindPickerChange(e) {
                // this.childProductNo = true;
                console.log(this.childProductNo)
                let thisIndex = e.detail.value;
                this.productId = this.childProductNoIdClass[thisIndex].value;
                this.productIndex = e.detail.value;
                console.log(this.productId)
                    // this.productIndexData = this.childProductNoIdArr[thisIndex].childProductNo;
                console.log(this.childProductNoIdClass[thisIndex].key);
                this.childProductNoData = this.childProductNoIdClass[thisIndex].key;
                this[`${name}Index`] = e.target.value;
                this[`${name}Val`] = this[`${name}Arr`][this[`${name}Index`]].key;
                this.loanInputListReplace({
                    key: `${name}Val`,
                    value: this[`${name}Arr`][this[`${name}Index`]].key
                });
                this.loanPickerListReplace({
                    key: `${name}Index`,
                    value: e.target.value
                });
            },

            /**表单提交接口 **start****/
            submitform(e) {
                //TS 暂存 save 提交下一步
                console.log(e)
                let that = this;
                console.log(this.childprodName);

                console.log(this.childProductNoIdClass[this.productIndex].key)
                if (this.childprodName == "") {
                    this.childprodName = this.childProductNoIdClass[this.productIndex].key;
                }
                if (that.businessType == "个人一手住房贷款") {
                    that.businessTypeData = "1140010";
                }
                if (that.businessType == "个人二手住房贷款") {
                    that.businessTypeData = "1140020";
                }

                if (that.businessType == "个人二手商用房贷款") {
                    that.businessTypeData = "1140120";
                }
                if (that.businessType == "个人一手商用房贷款") {
                    that.businessTypeData = "1140110";
                }

                if (this.current == "0") {
                    //否
                    this.isAppLicant = "2";
                } else {
                    this.isAppLicant = "1";
                }
                if (this.houseNums == "0") {
                    this.houseNum = "10";
                } else {
                    this.houseNum = "20";
                }
                if (this.businessTypeList == "1140110" || this.businessTypeList == "1140120") {
                    this.houseNum = "";
                }
                console.log(this.firstValueNumber);
                console.log(this.businessSumNumber);
                let formData = {
                    applyNo: that.applicationNumber,
                    orderNo: this.orderNoVal,
                    listName: "basicInfo",
                    basicInfo: [{
                        businessLine: "",
                        businessSum: this.businessSumNumber == undefined ? this.LoanAmountName : this.businessSumNumber,
                        // businessSum:this.businessSumNumber,
                        businessType: this.businessTypeList,
                        childProductNo: this.childProductNoData == undefined ? this.childprodName : this.childProductNoData,
                        cycleFlag: "",
                        firstValue: this.firstValueNumber == undefined ? this.downPaymentName : this.firstValueNumber,
                        // firstValue:this.firstValueNumber,
                        houseNum: this.houseNum,
                        isAppLicant: this.isAppLicant,
                        isCompany: "",
                        isTranClause: "",
                        outInRatio: that.outInRatio,
                        purpose: "",
                        statOrgID: "",
                        termMonth: that.LoanTerm,
                        thirdPartyZIP1: ""
                    }]
                };

                let posturl = "/api/credit/updateApplyInfo";
                that.interfaceRequest(
                    posturl,
                    formData,
                    "post",
                    (res) => {
                        that.queryApplyInfoCommit({
                            orderNo: this.orderNoVal,
                            applyNo: that.applicationNumber
                        }); //重新调'申请信息查询'接口，确保担保合同信息列表准确
                        if (e == "TS") {
                            console.log(res)
                            this.messageTs = res.data.data.returnDesc;
                            yu.showModal({
                                title: "暂存状态",
                                content: this.messageTs,
                                showCancel: false,
                                confirmText: "我知道了",
                                success: res => {
                                    if (res.confirm) {
                                        console.log("用户点击确定");
                                    }
                                }
                            });
                        } else {
                            if (this.LoanAmount == "") {
                                yu.showModal({
                                    title: "贷款金额不能为空！",
                                    content: "请输入贷款金额",
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

                            console.log(that.LoanTerm); //贷款期限
                            console.log(that.downPaymentName); ////首付款金额

                            if (this.LoanTerm == "") {
                                yu.showModal({
                                    title: "贷款期限不能为空！",
                                    content: "请输入贷款期限",
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
                            if (this.downPayment == "") {
                                yu.showModal({
                                    title: "首付款金额不能为空！",
                                    content: "请输入首付款金额",
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
                            yu.showToast({
                                title: res.data.data.returnDesc,
                                icon: 'none',
                                duration: 3000
                            });
                            setTimeout(() => {
                                that.pageJump(that.guaranteeInformation);
                            }, 1000);
                        }




                    },
                    function(err) {}
                );
            },

            /**表单提交接口 **end****/
            onKeyInput() {
                console.log(this.loansAnd);
                console.log(this.proportion);
                console.log(this.percent);
                //首付款比例=首付款金额/（首付款金额+贷款金额）
                // this.downPayment=Number(this.downPayment);
                // this.LoanAmount=Number(this.LoanAmount);
                console.log(this.downPayment, "首付款金额");
                console.log(this.LoanAmount, "贷款金额");
                var regLoan = /^\d{1,8}(\.\d{1,2})?$/;
                // var regLoan=/^-?[1-9]+[0-9]*$/;
                this.checkReg = regLoan.test(this.LoanAmount);
                this.checDownPayment = regLoan.test(this.downPayment);
                console.log(this.checDownPayment)
                if (this.checkReg === false) {
                    yu.showModal({
                        title: "贷款金额只能输入到千万及保留两位小数",
                        content: "请重新输入",
                        showCancel: false,
                        confirmText: "我知道了",
                        success: res => {
                            if (res.confirm) {
                                console.log("用户点击确定");
                            }
                        }
                    });
                    this.LoanAmount = "";
                }
                if (this.downPayment == "") {
                    return false;
                } else {
                    if (this.checDownPayment === false) {
                        yu.showModal({
                            title: "首付款金额只能输入到千万及保留两位小数",
                            content: "请重新输入",
                            showCancel: false,
                            confirmText: "我知道了",
                            success: res => {
                                if (res.confirm) {
                                    console.log("用户点击确定");
                                }
                            }
                        });
                        this.downPayment = "";
                    }
                }



                this.firstValueData = this.downPayment; //首付款金额
                this.businessSumData = this.LoanAmount; //贷款金额
                this.firstValueNumber = Number(this.firstValueData)
                this.businessSumNumber = Number(this.businessSumData)
                console.log(this.firstValueNumber);
                console.log(this.businessSumNumber);
                this.loansAnd = this.firstValueNumber + this.businessSumNumber;
                console.log(this.loansAnd);
                this.proportion = this.firstValueNumber / this.loansAnd;
                this.proportion = this.proportion * 100;
                console.log(this.proportion);
                this.integer = Math.round(this.proportion);
                console.log(this.integer)


                if (this.loansAnd == 0) {
                    this.percent = 0;
                } else {
                    this.percent = this.integer + "%";
                }

                console.log(this.percent);
            },
            //复制
            copyInfo: function(val) {
                let url = val;
                let oInput = document.createElement("input");
                oInput.value = url;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象;
                document.execCommand("Copy"); // 执行浏览器复制命令
                yu.showModal({
                    title: "",
                    content: "复制成功",
                    showCancel: false,
                    confirmText: "我知道了",
                    success: res => {
                        if (res.confirm) {
                            console.log("用户点击确定");
                        }
                    }
                });
                oInput.remove();
            }
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
        li:first-child {
            color: #000;
        }
    }
    
    ul li {
        list-style-type: none;
    }
    
    .loan-application-information {
        height: 350rpx;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: #ffffff;
    }
    
    .pending-order {
        background: #ffffff !important;
        width: 100%;
        height: 100%;
    }
    
    .customize-head {
        padding: 116rpx 40rpx 16rpx 36rpx;
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
            font-size: 32rpx;
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
        margin-top: 370rpx;
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
                .uni-input {
                    color: #333435;
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
            .cleanUp {
                float: right;
                width: 34rpx;
                margin-right: 20rpx;
                margin-left: -25rpx;
                margin-top: 36rpx;
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
        .down-payment-ratio {
            background: #f6f8f9;
            height: 102rpx;
            line-height: 102rpx;
            color: #999999;
            text-align: right;
            .proportion {
                color: #e89f73;
                margin-right: 40rpx;
            }
        }
    }
    
    .copy {
        position: relative;
        right: -67%;
        color: #3b86f7;
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
    }
    
    .mini-btn:first-of-type {
        margin-left: 15%;
        margin-right: 10%;
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
</style>