<template>
  <view class="uni-container">
    <view class="pf-poifixed">
      <view :class="phoneSystem ?'pf-title pf-title-ios pf-titleThree':'pf-title pf-titleThree'">
        <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
        <text>借款人信息</text>
        <text class="pf-text" @click="nextStep(false)">暂存</text>
      </view>
      <!--信息完善进度条-start-->
      <view class="household-progress">
        <img src="@/static/images/firstroom/longProgress03.svg" />
        <view class="uni-flex uni-row">
         <view class="flex-item">户籍信息</view>
        <view class="flex-item ">基本信息</view>
        <view class="flex-item active">工作信息</view>
        <view class="flex-item">联系人信息</view>
        </view>
      </view>
      <!--信息完善进度条-end-->
    </view>
    <view class="pf-content work-content">
      <!--个人信息-start-->
      <view class="contract-ul marginT25">
        <view class="contract-li-tips">
          <view class="contract-li">
            <view>单位名称</view>
            <view>
              <input class="uni-input" placeholder="请输入" type="text" v-model.trim="personInfor.companyName" @focus="verifyCompanyName.isTipShow=false" @blur="checkCompanyName(personInfor.companyName)" />
              <img v-if="personInfor.companyName!=''" src="@/static/images/firstroom/cleanUp.svg" @click="personInfor.companyName=''" />
            </view>
          </view>
          <view v-if="verifyCompanyName.isTipShow" class="contract-tips">{{verifyCompanyName.tipText}}</view>
        </view>
        <view class="contract-li-tips">
          <view class="contract-li">
            <view>单位地址</view>
            <view>
              <input class="uni-input" placeholder="请输入" type="text" v-model.trim="personInfor.companyAddress" @focus="verifyCompanyAddress.isTipShow=false" @blur="checkCompanyAddress(personInfor.companyAddress)" />
              <img v-if="personInfor.companyAddress!=''" src="@/static/images/firstroom/cleanUp.svg" @click="personInfor.companyAddress=''" />
            </view>
          </view>
          <view v-if="verifyCompanyAddress.isTipShow" class="contract-tips">{{verifyCompanyAddress.tipText}}</view>
        </view>
        <view class="contract-li-tips">
          <view class="contract-li">
            <view>单位电话</view>
            <view>
              <input class="uni-input" placeholder="请输入" type="number" maxlength="11" v-model.trim="personInfor.telephone" @focus="verifyTelephone.isTipShow=false" @blur="checkTelephone(personInfor.telephone)" />
              <img v-if="personInfor.telephone!=''" src="@/static/images/firstroom/cleanUp.svg" @click="personInfor.telephone=''" />
            </view>
          </view>
          <view v-if="verifyTelephone.isTipShow" class="contract-tips">{{verifyTelephone.tipText}}</view>
        </view>
        <view class="contract-li">
          <view>单位性质</view>
          <view>
            <picker @change="workNatureChange" :value="workNatureIdx" :range-key="'value'" :range="workNatureList">
              {{workNatureList[workNatureIdx].value}}
            </picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>
        <view class="contract-li">
          <view>单位所属行业</view>
          <view>
            <picker @change="unitKindChange" :value="unitKindIdx" :range-key="'value'" :range="unitKindList">
              {{unitKindList[unitKindIdx].value}}
            </picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>
        <view class="contract-li">
          <view>职业</view>
          <view>
            <picker @change="occupationChange" :value="occupationIdx" :range-key="'value'" :range="occupationList">
						<view class="uni-input">{{occupationList[occupationIdx].value}}</view>
					</picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>
        <view class="contract-li">
          <view>职务</view>
          <view>
            <picker @change="headShipChange" :value="headShipIdx" :range-key="'value'" :range="headShipList">
              {{headShipList[headShipIdx].value}}
            </picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>

 <view class="contract-li">
          <view>职称</view>
          <view>
            <picker @change="positionChange" :value="positionIdx" :range-key="'value'" :range="positionList">
						<view class="uni-input">{{positionList[positionIdx].value}}</view>
					</picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>

      </view>
      <!--个人信息-end-->
      <view class="contract-button">
        <button type="primary" @click="nextStep(true)">下一步</button>
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
    ...mapGetters(["approvalIngList", "userInfor", "personalInformation"]),
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
    if (JSON.stringify(this.personalInformation) != "{}") {
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
          let errorReturnDesc = res.data.data.returnDesc;
          console.log(errorMsg);
          this.queryApplyInfoCommit({
            orderNo: this.orderNoVal,
            applyNo: this.applyNoVal,
          }); //重新调'申请信息查询'接口，确保人员信息列表准确

          if (res.data.data.returnCode == "Success") {
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
            if (that.isJump) {
             
              that.pageJump(
                "personInformation/borrowerInformation/contactInformation/contactInformation"
              );
            } else {
               yu.showModal({
                      title: "暂存状态",
                      content: res.data.data.returnCode,
                      showCancel: false,
                      confirmText: "我知道了",
                      success: res => {
                          if (res.confirm) {
                              console.log("用户点击确定");
                          }
                      }
                  });
            }
          } else {
            yu.showModal({
              title: "失败了！",
              content: errorMsg == null ? errorReturnDesc : errorMsg,
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
        },
        function (err) {
           uni.showToast({
                  title: '失败了,请重试！！',
                  icon: 'none',
                  duration: 2000
              });
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
            uni.showToast({
                  title: '失败了,请重试！！',
                  icon: 'none',
                  duration: 2000
              });
          }
        },
        function (err) {
          yu.hideLoading();
          uni.showToast({
                  title: '失败了,请重试！！',
                  icon: 'none',
                  duration: 2000
              });
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
  .uni-container{
    background-color: #f6f8f9;
    padding: 0 0 30rpx 0;
    .work-content{
      padding-top: 270rpx;
    
    }
  }
  .marginT25{
    margin-top: 25rpx;
  }
</style>
