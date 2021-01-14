<template>
  <view class="incoming">
    <view class="customize-head">
      <view class="ch-img" @tap="navigateBack">
        <img src="@/static/images/firstroom/backArrow.svg" />
      </view>
      <view class="ch-title">借款人信息</view>
      <view class="ch-other" @click="nextStep(false)">暂存</view>
    </view>
    <!--信息完善进度条-start-->
    <view class="progress">
      <img src="@/static/images/firstroom/longProgress03.svg" />
      <view class="uni-flex uni-row">
        <view class="flex-item active">户籍信息</view>
        <view class="flex-item">基本信息</view>
        <view class="flex-item">工作信息</view>
        <view class="flex-item">联系人信息</view>
      </view>
    </view>
    <!--信息完善进度条-end-->
    <view class="customize-content-form">
      <!--个人信息-start-->
      <view class="person-infor marginT25">
        <view class="person-infor-one">
          <text>单位名称</text>
          <img
            v-if="personInfor.companyName!=''"
            class="cleanUp"
            src="@/static/images/firstroom/cleanUp.svg"
            @click="personInfor.companyName=''"
          />
          <!-- <input placeholder="请输入" type="text" v-model.trim="personInfor.companyName" @focus="verifyCompanyName.isTipShow=false" @blur="checkCompanyName(personInfor.companyName)" /> -->
          <textarea
            name
            placeholder-style="color:#c7c9cd"
            placeholder="请输入"
            id
            cols="30"
            rows="10"
            v-model.trim="personInfor.companyName"
            @focus="verifyCompanyName.isTipShow=false"
            @blur="checkCompanyName(personInfor.companyName)"
          ></textarea>
          <view v-if="verifyCompanyName.isTipShow" class="tips">{{verifyCompanyName.tipText}}</view>
        </view>
        <!--<view class="person-infor-one">
          <text>规模判断</text>
          <picker @change="scaleJudgementChange" :value="scaleJudgementIdx" :range-key="'value'" :range="scaleJudgementList">
						<view class="uni-input">{{scaleJudgementList[scaleJudgementIdx].value}}</view>
					</picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>-->
        <view class="person-infor-one">
          <text>单位地址</text>
          <img
            v-if="personInfor.companyAddress!=''"
            class="cleanUp"
            src="@/static/images/firstroom/cleanUp.svg"
            @click="personInfor.companyAddress=''"
          />
          <!-- <input placeholder="请输入" type="text" v-model.trim="personInfor.companyAddress" @focus="verifyCompanyAddress.isTipShow=false" @blur="checkCompanyAddress(personInfor.companyAddress)" /> -->
          <textarea
            name
            id
            placeholder-style="color:#c7c9cd"
            placeholder="请输入"
            cols="30"
            rows="10"
            v-model.trim="personInfor.companyAddress"
            @focus="verifyCompanyAddress.isTipShow=false"
            @blur="checkCompanyAddress(personInfor.companyAddress)"
          ></textarea>
          <view v-if="verifyCompanyAddress.isTipShow" class="tips">{{verifyCompanyAddress.tipText}}</view>
        </view>
        <!--<view class="person-infor-one">
          <text>单位地址邮编</text>
          <img v-if="personInfor.postcode!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="personInfor.postcode=''" />
          <input placeholder="请输入" type="number" v-model.trim="personInfor.postcode" @focus="verifyPostcode.isTipShow=false" @blur="checkPostCode(personInfor.postcode)" />
          <view v-if="verifyPostcode.isTipShow" class="tips">{{verifyPostcode.tipText}}</view>
        </view>-->
        <view class="person-infor-one">
          <text>单位电话</text>
          <img
            v-if="personInfor.telephone!=''"
            class="cleanUp"
            src="@/static/images/firstroom/cleanUp.svg"
            @click="personInfor.telephone=''"
          />
          <input
            placeholder="请输入"
            maxlength="11"
            type="number"
            v-model.trim="personInfor.telephone"
            @focus="verifyTelephone.isTipShow=false"
            @blur="checkTelephone(personInfor.telephone)"
          />
          <view v-if="verifyTelephone.isTipShow" class="tips">{{verifyTelephone.tipText}}</view>
        </view>
        <view class="person-infor-one">
          <text>单位性质</text>
          <picker
            @change="workNatureChange"
            :value="workNatureIdx"
            :range-key="'value'"
            :range="workNatureList"
          >
            <view class="uni-input">{{workNatureList[workNatureIdx].value}}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one">
          <text>单位所属行业</text>
          <picker
            @change="unitKindChange"
            :value="unitKindIdx"
            :range-key="'value'"
            :range="unitKindList"
          >
            <view class="uni-input">{{unitKindList[unitKindIdx].value}}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one">
          <text>职业</text>
          <picker
            @change="occupationChange"
            :value="occupationIdx"
            :range-key="'value'"
            :range="occupationList"
          >
            <view class="uni-input">{{occupationList[occupationIdx].value}}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one">
          <text>职务</text>
          <picker
            @change="headShipChange"
            :value="headShipIdx"
            :range-key="'value'"
            :range="headShipList"
          >
            <view class="uni-input">{{headShipList[headShipIdx].value}}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one">
          <text>职称</text>
          <picker
            @change="positionChange"
            :value="positionIdx"
            :range-key="'value'"
            :range="positionList"
          >
            <view class="uni-input">{{positionList[positionIdx].value}}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <!--<view class="person-infor-one">
          <text>是否本行员工</text>
          <view class="btnList">
            <button size="mini" :type="staff=='1'?'primary':''" @click="staff='1'">是</button>
            <button size="mini" :type="staff=='2'?'primary':''" @click="staff='2'">否</button>
          </view>
        </view>-->
      </view>
      <!--个人信息-end-->
      <view class @click="nextStep(true)">
        <view class="cbutton">
          <text>下一步</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import pageHead from "@/components/page-head.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      personInfor: {
        companyName: "",
        companyAddress: "",
        telephone: "",
      },
      verifyCompanyName: {
        isTipShow: false,
        tipText: "单位名称不能为空",
      },
      verifyCompanyAddress: {
        isTipShow: false,
        tipText: "单位地址不能为空",
      },
      verifyPostcode: {
        isTipShow: false,
        tipText: "单位地址邮编不能为空",
      },
      verifyTelephone: {
        isTipShow: false,
        tipText: "单位电话不能为空",
      },
      scaleJudgementList: [
        {
          key: 0,
          value: "请选择",
        },
      ],
      scaleJudgementIdx: 0,
      unitKindList: [
        {
          key: 0,
          value: "请选择",
        },
      ],
      unitKindIdx: 0,
      workNatureList: [
        {
          key: 0,
          value: "请选择",
        },
      ],
      workNatureIdx: 0,
      occupationList: [
        {
          key: 0,
          value: "请选择",
        },
      ],
      occupationIdx: 0,
      headShipList: [
        {
          key: 0,
          value: "请选择",
        },
      ],
      headShipIdx: 0,
      positionList: [
        {
          key: 0,
          value: "请选择",
        },
      ],
      positionIdx: 0,
      staff: "2",
      orderNoVal: "", //订单编号
      applyNoVal: "", //申请编号
      isJump: true,
    };
  },
  computed: {
    ...mapGetters(["approvalIngList", "userInfor","personalInformation"]),
  },
  onLoad(option) {
    this.orderNoVal = this.approvalIngList.orderNo;
    this.applyNoVal = this.approvalIngList.serialNo;
    // this.getScaleJudgementList();
    this.getUnitKindList();
    this.getWorkNatureList();
    this.getOccupationList();
    this.getHeadShipList();
    this.getPositionList();
    if(JSON.stringify(this.personalInformation) != "{}"){
      this.getPersonalData();
    }
  },
  onShow() {},
  onUnload() {},
  methods: {
    ...mapActions(["queryApplyInfoCommit"]),
    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },
    //下拉列表
    scaleJudgementChange(e) {
      this.scaleJudgementIdx = e.target.value;
    },
    unitKindChange(e) {
      this.unitKindIdx = e.target.value;
    },
    workNatureChange(e) {
      this.workNatureIdx = e.target.value;
    },
    occupationChange(e) {
      this.occupationIdx = e.target.value;
    },
    headShipChange(e) {
      this.headShipIdx = e.target.value;
    },
    positionChange(e) {
      this.positionIdx = e.target.value;
    },
    // 获取单位规模列表
    getScaleJudgementList() {
      let that = this;
      let pdata = {
        dictionaryName: "scaleJudgement",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.scaleJudgementList.push({
            key: key,
            value: resData[key],
          });
        }
      });
    },
    // 获取单位所属行业列表
    getUnitKindList() {
      let that = this;
      let pdata = {
        dictionaryName: "unitKind",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.unitKindList.push({
            key: key,
            value: resData[key],
          });
        }
      });
    },
    // 获取单位性质列表
    getWorkNatureList() {
      let that = this;
      let pdata = {
        dictionaryName: "workNature",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.workNatureList.push({
            key: key,
            value: resData[key],
          });
        }
      });
    },
    // 获取职业列表
    getOccupationList() {
      let that = this;
      let pdata = {
        dictionaryName: "occupation",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.occupationList.push({
            key: key,
            value: resData[key],
          });
        }
      });
    },
    // 获取职务列表
    getHeadShipList() {
      let that = this;
      let pdata = {
        dictionaryName: "headShip",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.headShipList.push({
            key: key,
            value: resData[key],
          });
        }
      });
    },
    // 获取职称列表
    getPositionList() {
      let that = this;
      let pdata = {
        dictionaryName: "position",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.positionList.push({
            key: key,
            value: resData[key],
          });
        }
      });
    },
    // 下一步
    nextStep(isJump) {
      this.isJump = isJump;
      let that = this;
      let personalInformation = this.personalInformation;
      console.log(personalInformation);
      let data = {
        userId: this.userInfor.loginCode,
        certType: personalInformation.certType,
        certId: personalInformation.certId,
        customerName: personalInformation.customerName,
        workCorp: this.personInfor.companyName,
        workAdd: this.personInfor.companyAddress,
        workTel: this.personInfor.telephone,
        workNature: this.workNatureList[this.workNatureIdx].key,
        unitKind: this.unitKindList[this.unitKindIdx].key,
        occupation: this.occupationList[this.occupationIdx].key,
        headShip: this.headShipList[this.headShipIdx].key,
        position: this.positionList[this.positionIdx].key,
        staff: this.staff,
        scene: "cstScene",
        applyNo: this.applyNoVal,
        listName: "workInfo",
      };
      // 3.7接口 个人信息更新
      let posturl = "/api/credit/customerInfoUpdate";
      that.interfaceRequest(
        posturl,
        data,
        "post",
        (res) => {
          console.log(res);
          let resArr = res.data.data;
          let errorMsg = res.data.message;
          console.log(errorMsg);
          this.queryApplyInfoCommit({
            orderNo: this.orderNoVal,
            applyNo: this.applyNoVal,
          }); //重新调'申请信息查询'接口，确保人员信息列表准确

          if (res.data.data == null) {
            yu.showModal({
              title: "失败了！",
              content: errorMsg,
              showCancel: false,
              confirmText: "我知道了",
              success: (res) => {
                if (res.confirm) {
                  console.log("用户点击确定");
                }
              },
            });
            return false;
          } else {
            if (that.isJump) {
              if (this.personInfor.companyName == "") {
                yu.showModal({
                  title: "单位名称不能为空！",
                  content: "",
                  showCancel: false,
                  confirmText: "我知道了",
                  success: (res) => {
                    if (res.confirm) {
                      console.log("用户点击确定");
                    }
                  },
                });
                return false;
              }
              if (this.personInfor.companyAddress == "") {
                yu.showModal({
                  title: "单位地址不能为空！",
                  content: "",
                  showCancel: false,
                  confirmText: "我知道了",
                  success: (res) => {
                    if (res.confirm) {
                      console.log("用户点击确定");
                    }
                  },
                });
                return false;
              }
              if (this.personInfor.telephone == "") {
                yu.showModal({
                  title: "单位电话不能为空！",
                  content: "",
                  showCancel: false,
                  confirmText: "我知道了",
                  success: (res) => {
                    if (res.confirm) {
                      console.log("用户点击确定");
                    }
                  },
                });
                return false;
              }
              that.pageJump(
                "personInformation/borrowerInformation/contactInformation/contactInformation"
              );
            } else {
              alert("暂存成功！");
            }
          }
        },
        function (err) {
          alert("报错了！！");
        }
      );
    },
    // 3.2接口 获取个人信息
    getPersonalData() {
      let that = this;
      let personalInformation = this.personalInformation;
      let data = {
        certType: personalInformation.certType,
        certId: personalInformation.certId,
        customerName: personalInformation.customerName,
        scene: "cstScene",
        applyNo: this.applyNoVal,
      };
      let posturl = "/api/front/perCustomerInfo";
      yu.showLoading();
      that.interfaceRequest(
        posturl,
        data,
        "post",
        function (res) {
          yu.hideLoading();
          let resData = res.data.data;
          if (resData.returnCode == "Success") {
            that.personInfor.companyName = resData.workCorp;
            that.personInfor.companyAddress = resData.workAdd;
            that.personInfor.telephone = resData.workTel;
            that.workNatureIdx = that.selectInfo(
              that.workNatureList,
              resData.workNature
            );
            that.unitKindIdx = that.selectInfo(
              that.unitKindList,
              resData.unitKind
            );
            that.occupationIdx = that.selectInfo(
              that.occupationList,
              resData.occupation
            );
            that.headShipIdx = that.selectInfo(
              that.headShipList,
              resData.headShip
            );
            that.positionIdx = that.selectInfo(
              that.positionList,
              resData.position
            );
            // that.staff = resData.staff;
          } else {
            alert("失败了！！");
          }
        },
        function (err) {
          yu.hideLoading();
          alert("报错了！！");
        }
      );
    },
    // 下拉框回显
    selectInfo(arr, parmName) {
      if (parmName) {
        let selIdx = 0;
        arr.forEach((item, index) => {
          if (item.key == parmName) {
            selIdx = index;
          }
        });
        return selIdx;
      } else {
        return 0;
      }
    },
  },
  mounted() {},
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
    padding-top: 362rpx;
    .image-information {
      padding: 0 40rpx;
      height: 421rpx;
      background: #ffffff;
      .title {
        height: 45rpx;
        line-height: 45rpx;
        font-size: 32rpx;
        color: #333333;
        padding-top: 26rpx;
      }
    }
    .image-information:after {
      display: block;
      content: "";
      clear: both;
    }
    .person-infor {
      background: #ffffff;
      padding-left: 30rpx;
      .person-infor-one {
        height: 105rpx;
        line-height: 105rpx;
        border-bottom: 1rpx solid #e5e5e5;
        padding-left: 10rpx;
        padding-right: 40rpx;
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
          color: #333333;
          font-size: 32rpx;
          /* margin-right: 40rpx; */
          width: 300rpx;
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
        textarea {
          width: 71%;
          height: 105rpx;
          text-align: right;
          padding-top: 30rpx;
          margin-left: 140rpx;
          line-height: 36rpx;
        }
        input.nameUsed {
          /* margin-right: 90rpx; */
          width: 276rpx;
        }
        picker {
          float: right;
          color: #c7c9cd;
          font-size: 32rpx;
          margin-right: 23rpx;
          height: 100%;
          line-height: 45rpx;
          padding: 30rpx 0;
          display: block;
          width: 300rpx;
          text-align: right;
          .uni-input {
            font-size: 32rpx;
            padding: 0;
            height: 45rpx;
            line-height: 45rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .plus {
          /* position: absolute;
            top: 50%;
            right: 30rpx; */
          float: right;
          /* margin-top: -15rpx; */
          width: 30rpx;
          margin-right: -10rpx;
          margin-left: 25rpx;
          margin-top: 36rpx;
        }
        .cleanUp {
          float: right;
          width: 34rpx;
          /* margin-right: 40rpx; */
          margin-right: -10rpx;
          margin-left: 25rpx;
          margin-top: 34rpx;
        }
        .choose-arrow {
          width: 15rpx;
          height: 26rpx;
          position: absolute;
          top: 50%;
          right: 32rpx;
          margin-top: -13rpx;
          /* margin-right: -7.5rpx; */
        }
        .tips {
          position: absolute;
          bottom: 0;
          right: 0;
          color: red;
        }
        .btnList {
          float: right;
          width: 300rpx;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
      .person-infor-one:last-child {
        border: 0;
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
  padding: 62rpx 0 18rpx 0;
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
  .ch-other {
    position: absolute;
    right: 40rpx;
    top: 69rpx;
    height: 36rpx;
    line-height: 36rpx;
    color: #3b86f7;
    font-size: 30rpx;
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

.form-title {
  height: 94rpx;
  line-height: 94rpx;
  text-align: center;
  font-size: 32rpx;
  color: #333333;
  padding-left: 40rpx;
  display: flex;
  vertical-align: middle;
  align-items: center;
  .vLine {
    width: 10rpx;
    height: 34rpx;
    background: #3b86f7;
    border-radius: 4px;
    margin-right: 17rpx;
  }
}

.progress {
  position: fixed;
  top: 130rpx;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 170rpx;
  padding-top: 60rpx;
  background: #ffffff;
  text-align: center;
  img {
    width: 548rpx;
  }
  .uni-flex {
    font-size: 24rpx;
    color: #999999;
    padding-left: 18rpx;
    .active {
      color: #333435;
    }
  }
}

.marginT25 {
  margin-top: 25rpx;
}
</style>