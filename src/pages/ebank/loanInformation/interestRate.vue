<template>
  <view class="pending-order">
    <view class="customize-head">
      <view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
      <view class="ch-title"><text>{{title}}</text></view>
      <view class="temporary-storage"  @tap="submitform('TS')">暂存</view>
    </view>
    

<view class="image-content">
    <img style="height:26rpx;margin:0 auto;display:block;margin-top:63rpx" src="@/static/images/firstroom/longProgress03.svg" />
    <ul class="loaninfo"><li>业务信息</li><li>担保信息</li><li>利率期限信息</li><li>还款信息</li></ul>
</view>


 <!--个人信息-start-->
      <view class="person-infor">
       
        
        <view class="person-infor-one">
          <text>基准利率类型</text>
         <picker :value="productIndex" :range-key="'value'" :range="rateClassIdArr" disabled="false" @change="bindPickerChange">
            <view class="picker">{{ rateClassIdArr[productIndex].value }}</view>
          </picker>
         
        </view>
        <view class="person-infor-one">
          <text>利率模式</text>
          <!-- <button class="mini-btn" :class="{'active' : 0 == current}" type="default" size="mini">固定利率</button> -->
          <button class="mini-btn" :class="{'active' : 1 == current}" type="default" size="mini">浮动利率</button>
        </view>
        <view class="interest-rate">
        <view class="interest-contont">
         <text>利率类型 </text>
         <text>月利率</text>
        </view>
          <view class="interest-contont" v-show="interestRate"><text>基准月利率 </text>
         <text>{{baseRate}}‰</text>
        </view>
          <view class="interest-contont">
          <text>浮动利率类型 </text>
         <text>{{rateFloatTypeIdArr[rateFloatTypeValue].value}}</text>
        </view>
        </view>
        <!-- <view class="person-infor-one">
          <text>浮动利率类型</text>
          <picker :value="rateFloatTypeValue" :range-key="'value'" :range="rateFloatTypeIdArr" @change="rateFloatTypeChange">
            <view class="picker">{{ rateFloatTypeIdArr[rateFloatTypeValue].value }}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view> -->
         <view class="person-infor-one">
          <text>浮动值(‰)</text>
          <text v-bind:class="{ 'float-downward' : flag, 'float-downward2': !flag}"  @tap="floatClick">{{rateFLoat}}</text>
          <input placeholder="请输入" type="number" class="loan-amount" v-model="FloatingValue" @blur="floatInput"/>
        </view>
        <view class="person-infor-one">
          <text>利率调整方式 </text>
          <picker :value="adjustRateTypeIndex" :range-key="'value'" :range="adjustRateTypeIdArr" @change="adjustRateTypeChange">
            <view class="picker">{{ adjustRateTypeIdArr[adjustRateTypeIndex].value }}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one" v-show="cycle">
          <text>利率调整周期</text>
           <picker @change="rateAdjustCycChange" :value="index" :range="array">
                        <view class="uni-input">{{array[index]}}</view>
                    </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
         <view class="person-infor-one" v-show="interestRate">
          <text>执行年利率(%)</text>
          <input placeholder="执行年利率" type="number"  v-model="businessRate" disabled="false"/>
        </view>

      </view>
     

      <!--个人信息-end-->
      <view class="" @tap="submitform('save')">
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
                current: 0,
                rateClass: "",
                rateFloatType: "",
                repaymentInformation: "loanInformation/repaymentInformation",
                rateAdjustCyc: "loanInformation/rateAdjustCyc",
                guaranteeInformation: "loanInformation/guaranteeInformation",
                businessRate: "",
                baseRate: "",
                rateFLoat: "上浮", //浮动
                FloatingValue: "",
                flag: false,
                productList: [],
                productIndex: 1,
                //利率调整方式
                adjustRateTypeList: [],
                adjustRateTypeTitle: [],
                adjustRateTypeIndex: 0,
                rateClassIdArr: [],
                //浮动利率类型
                rateFloatTypeIdArr: [],
                rateFloatTypeValue: 1,
                //利率调整方式
                adjustRateTypeIdArr: [],
                interestRate:true,
                cycle:false,
                array: ['1YAF', '1MAF'],
                index: 0,
               
            };
        },
        created() {

        },
        onLoad() {
          
            console.log(this.queryApplyInfoList, "信息1111111111111111");
            this.rateClassName = this.queryApplyInfoList.rateClass; //基准利率类型
            this.rateFloatTypeName = this.queryApplyInfoList.rateFloatType;
            this.adjustRateTypeName = this.queryApplyInfoList.adjustRateType;
            this.businessTypeData=this.queryApplyInfoList.businessType;

            // this.loanQueryDictionaryListObj.rateClassIdArr.forEach((item, index) => {
            //   console.log(item)
            //   if (item.key == this.rateClassName) {
            //     this.productIndex = index;

            //   }
            // });
            this.productIndex = 1;
            this.rateFloatTypeValue = 1;
            this.loanQueryDictionaryListObj.adjustRateTypeIdArr.forEach((item, index) => {
                console.log(item)
                if (item.key == this.adjustRateTypeName) {
                    this.adjustRateTypeIndex = index;

                }
            });
            // this.queryDictionaryListObjCommit();
            this.loanQuerydictList();
            console.log(this.loanQueryDictionaryListObj)
            let that = this;
            that.applicationNumber = this.queryApplyInfoList.applyNo; //申请编号
            that.rateType = this.queryApplyInfoList.rateType; //利率模式
            that.baseRate = this.queryApplyInfoList.baseRate; //基准利率
            // that.businessRate = this.queryApplyInfoList.businessRate; //执行利率
            that.rateFLoat = this.queryApplyInfoList.rateFLoat; //浮动值
            if(this.queryApplyInfoList.rateFLoat<0){
              that.FloatingValue = this.queryApplyInfoList.rateFLoat.replace(/\-/g,''); //浮动值
            }else{
                that.FloatingValue = this.queryApplyInfoList.rateFLoat; //浮动值
            }
            
            that.floatNegative = this.queryApplyInfoList.rateFLoat; //浮动值
            this.adjustRateTypeOne = this.queryApplyInfoList.adjustRateType; //利率调整方式
            console.log(this.adjustRateTypeTitle)
             console.log(that.baseRate)
            this.adjustRateTypeTitle.forEach((item, index) => {
                if (item == this.adjustRateTypeOne) {
                    this.adjustRateTypeIndex = index;
                }
            });
            if(that.baseRate==""){
                this.interestRate=false;
            }
             if(this.adjustment==0 ||this.adjustRateTypeIndex==0){
              this.cycle=false;
            }else{
              this.cycle=true;
            }
            

            if (that.rateType == "02") {
                that.current = 0;
            } else {
                that.current = 1;
            }
            if (that.rateFLoat > 0) {
                that.rateFLoat = "上浮";
            } else {
                that.rateFLoat = "下浮";
            }
            
             if(this.queryApplyInfoList.rateAdjustCyc=="1YAF"){
              this.index=0;
            }else{
              this.index=1;
            }
            if(this.baseRate!="" && this.FloatingValue!=""){
               this.floatInput(); 
            }
          
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
                url: 'guaranteeInformation',
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });



            },
            clickBtn(cur) {
                this.current = cur;
                console.log(this.current);
            },
            loanQuerydictList() {
                let obj2 = this.loanQueryDictionaryListObj; //给各个下拉框赋值
                if (Object.keys(obj2).length != 0) {
                    for (let k in obj2) {
                        if (obj2[k] != '') {
                            this[k] = obj2[k];
                        }
                    };
                };
            },
            //下拉列表-基准利率类型
            bindPickerChange: function(e) {
                var thisIndex = e.detail.value;
                this.productId = this.rateClassIdArr[thisIndex].value;
                // this.productIndex = thisIndex;
                this.rateClassKey = this.rateClassIdArr[thisIndex].key; //传给后台的值
            },
            //下拉列表-浮动利率类型
            rateFloatTypeChange: function(e) {
                var rateFloatTypeIndex = e.detail.value;
                this.rateFloatTypeId = this.rateFloatTypeIdArr[rateFloatTypeIndex].value;
                this.rateFloatTypeValue = rateFloatTypeIndex;
                this.rateFloatTypeKey = this.rateClassIdArr[thisIndex].key; //传给后台的值

            },
           
            rateAdjustCycChange: function(e) {
              console.log(e)
            console.log('picker发送选择改变，携带值为', e.target.value)
            this.index = e.target.value;
            if(this.index==0){
              this.rateAdjustCycIndex="1YAF";
            }else{
              this.rateAdjustCycIndex="1MAF";
            }
        },
            //下拉列表-利率调整方式
            adjustRateTypeChange: function(e) {
              console.log(e.detail.value)
              var adjustRateTypethisIndexs = e.detail.value;
                this.adjustRateTypeId = this.adjustRateTypeIdArr[adjustRateTypethisIndexs].value;
                this.adjustRateTypeIndex = adjustRateTypethisIndexs;
                this.adjustRateTypeIdArrKey = this.adjustRateTypeIdArr[adjustRateTypethisIndexs].key; //传给后台的值
                console.log(this.adjustRateTypeIdArrKey)
              this.adjustment=e.detail.value;
               if(this.adjustment==0){
              this.cycle=false;
            }else{
              this.cycle=true;
            }
                
            },

            /**表单提交接口 **start****/
            submitform(e) {
                //TS 暂存 save 提交下一步
                if (this.current == "0") {
                    this.rateType = "02";
                } else {
                    this.rateType = "05";
                }
                if (this.FloatingValue == "") {
                    this.FloatingValue = this.queryApplyInfoList.rateFLoat;
                }

                if (this.queryApplyInfoList.rateClass == "") {
                    this.queryApplyInfoList.rateClass = "1"
                }
                if (this.queryApplyInfoList.rateFloatType == "") {
                    this.queryApplyInfoList.rateFloatType = "0"
                }
                if (this.queryApplyInfoList.adjustRateType == "") {
                    this.queryApplyInfoList.adjustRateType = "0"
                }
                let that = this;
                console.log(this.rateAdjustCycIndex);
                console.log(this.adjustRateTypeIdArrKey)
                let formData = {
                    applyNo: that.applicationNumber,
                    orderNo: "",
                    businessType:this.businessTypeData,
                    listName: "rateInfo",
                    rateInfo: [{
                        adjustRateType: this.adjustRateTypeIdArrKey == undefined ? this.queryApplyInfoList.adjustRateType : this.adjustRateTypeIdArrKey,
                        rateAdjustCyc: this.rateAdjustCycIndex,
                        rateClass: this.rateClassKey == undefined ? this.queryApplyInfoList.rateClass : this.rateClassKey,
                        rateFLoat: this.flag ? this.FloatingValue : this.floatNegative,
                        rateFloatType: this.rateFloatTypeKey == undefined ? this.queryApplyInfoList.rateFloatType : this.rateFloatTypeKey,
                        rateType: this.rateType
                    }]
                };

                let posturl = "/api/credit/updateApplyInfo";
                that.interfaceRequest(
                    posturl,
                    formData,
                    "post",
                    function(res) {
                        console.log(6666);
                        // that.pageJump(that.repaymentInformation);
                        console.log(res);
                        that.queryApplyInfoCommit({
                            'orderNo': '',
                            'applyNo': that.applicationNumber,
                        }); //重新调'申请信息查询'接口，确保担保合同信息列表准确
                        if(e=="TS"){
                            that.messageTs=res.data.data;
                        yu.showModal({
                                title: "暂存状态",
                                content:that.messageTs,
                                showCancel: false,
                                confirmText: "我知道了",
                                success: res => {
                                    if (res.confirm) {
                                        console.log("用户点击确定");
                                    }
                                }
                            });
                    }else{
                        setTimeout(()=>{
                        that.pageJump(that.repaymentInformation);
                    },1000)
          }
                    },
                    function(err) {}
                );
            },
            deposit() {
                if (this.current == "0") {
                    this.rateType = "02";
                } else {
                    this.rateType = "05";
                }
                if (this.FloatingValue == "") {
                    this.FloatingValue = this.queryApplyInfoList.rateFLoat;
                }
                console.log("暂存");
                let that = this;
                let formData = {
                    applyNo: that.applicationNumber,
                    orderNo: "",
                    listName: "rateInfo",
                    rateInfo: [{

                        adjustRateType: this.adjustRateTypeIndex,
                        rateAdjustCyc: this.rateAdjustCycIndex,
                        rateClass: this.productList[this.productIndex].rateClass,
                        rateFLoat: this.flag ? this.FloatingValue : this.floatNegative,
                        rateFloatType: this.rateFloatTypeValue,
                        rateType: this.rateType
                    }]
                };

                let posturl = "/api/credit/updateApplyInfo";
                that.interfaceRequest(
                    posturl,
                    formData,
                    "post",
                    function(res) {
                        console.log("暂存成功!");
                        uni.showToast({
                            title: "暂存成功!",
                            duration: 2000
                        });
                        console.log(res);
                    },
                    function(err) {}
                );
            },
            /**表单提交接口 **end****/
    
           // 执行利率=(基准利率+浮动值)*12/10
            floatInput() {
                console.log(this.baseRate);
                console.log(this.FloatingValue);

                if (this.rateFLoat == "下浮") {
                    this.floatNumber = Number(this.baseRate) + Number(this.FloatingValue);
                    this.businessRateValue = "-" + this.floatNumber*12/10;
                    this.businessRate=this.businessRateValue.toFixed(2);
                    this.floatNegative = "-" + this.FloatingValue;
                    console.log(this.businessRate);
                } else {
                    this.floatNumber = Number(this.baseRate) + Number(this.FloatingValue);
                    this.businessRateValue = this.floatNumber*12/10;
                    this.businessRate=this.businessRateValue.toFixed(2);
                    console.log(this.businessRate);
                }
            },
            floatClick() {
                console.log(111);
                this.flag = !this.flag;
                if (this.flag == true) {
                    this.rateFLoat = "上浮";
                    this.FloatingValue = "";
                    this.businessRate = "";
                } else if (this.flag == false) {
                    this.rateFLoat = "下浮";
                    this.FloatingValue = "";
                    this.businessRate = "";
                }
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
        li:nth-of-type(3) {
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
            .float-downward {
                text-align: center;
                width: 140rpx;
                height: 60rpx;
                line-height: 60rpx;
                background-color: #f7f8f9;
                color: #666666;
                display: inline-block;
                margin-top: 24rpx;
                margin-left:70rpx;
            }
            .float-downward2 {
                text-align: center;
                width: 140rpx;
                height: 60rpx;
                line-height: 60rpx;
                background-color: #f7f8f9;
                color: #666666;
                display: inline-block;
                margin-top: 24rpx;
                margin-left:70rpx;
            }
            .rateAdjustCyc {
                margin-left: 100rpx;
            }
            input {
                float: right;
                // color: #c7c9cd;
                font-size: 32rpx;
                margin-right: 40rpx;
                height: 45rpx;
                line-height: 45rpx;
                text-align: right;
                padding: 30rpx 0;
                // .uni-input{color: #c7c9cd}
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
                width: 40%;
            }
        }
        .interest-rate {
            height:200rpx;
            background-color: #f6f8f9;
            .interest-contont {
                display: flex;
                justify-content: space-around;
                text {
                    width: 240rpx;
                }
            }
            .interest-contont:first-child {
                padding-top: 30rpx;
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
        margin-right: 10%;
        float: right;
    }
</style>