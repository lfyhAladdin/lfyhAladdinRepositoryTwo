<template>
  <view class="incoming">
    <view class="customize-head">
      <view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
      <view class="ch-title">借款人信息</view>
      <view class="ch-other" @click="nextStep(false)">暂存</view>
    </view>
      <!--信息完善进度条-start-->
      <view class="progress">
        <img src="@/static/images/firstroom/longProgress02.svg" />
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
          <text>手机号码</text>
          <img v-if="personInfor.phone!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="personInfor.phone=''" />
          <input placeholder="请输入" maxlength="11" type="number" v-model.trim="personInfor.phone" @focus="verifyPhone.isTipShow=false" @blur="checkPhone(personInfor.phone)" />
          <view v-if="verifyPhone.isTipShow" class="tips">{{verifyPhone.tipText}}</view>
        </view>
        <view class="person-infor-one">
          <text>个人年收入（元）</text>
          <img v-if="personInfor.yearIncome!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="personInfor.yearIncome=''" />
          <input placeholder="请输入" type="number" v-model.trim="personInfor.yearIncome" @focus="verifyYearIncome.isTipShow=false" @blur="checkYearIncome(personInfor.yearIncome)" />
          <view v-if="verifyYearIncome.isTipShow" class="tips">{{verifyYearIncome.tipText}}</view>
        </view>
        <view class="person-infor-one">
          <text>居住状况</text>
          <picker @change="familyStatusChange" :value="familyStatusIdx" :range-key="'value'" :range="familyStatusList">
						<view class="uni-input">{{familyStatusList[familyStatusIdx].value}}</view>
					</picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one">
          <text>居住地址</text>
            <!-- 三级联动 -->
            <picker mode="multiSelector" @columnchange="changeNextCol" :value="mulIndex" :range="mulArr">
              <view class="picker" v-if="isShow">
               {{mulArr[0][mulIndex[0]]}}，{{mulArr[1][mulIndex[1]]}}，{{mulArr[2][mulIndex[2]]}}
              </view>
            </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one">
          <!-- <input placeholder="请输入详细地址" type="text" v-model.trim="personInfor.detailAddress" />  -->
          <textarea placeholder="请输入详细地址" name="" id="" cols="30" rows="10" v-model.trim="personInfor.detailAddress"></textarea>
        </view>
        <!-- <view class="person-infor-one">
          <text>居住地址邮编</text>
          <img v-if="personInfor.postcode!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="personInfor.postcode=''" />
          <input placeholder="请输入" type="number" v-model.trim="personInfor.postcode" @focus="verifyPostcode.isTipShow=false" @blur="checkPostCode(personInfor.postcode)" />
          <view v-if="verifyPostcode.isTipShow" class="tips">{{verifyPostcode.tipText}}</view>
        </view> -->
        <view class="person-infor-one">
          <text>最高学历</text>
          <picker @change="eduexperienceChange" :value="eduexperienceIdx" :range-key="'value'" :range="eduexperienceList">
						<view class="uni-input">{{eduexperienceList[eduexperienceIdx].value}}</view>
					</picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one">
          <text>最高学位</text>
          <picker @change="edudegreeChange" :value="edudegreeIdx" :range-key="'value'" :range="edudegreeList">
						<view class="uni-input">{{edudegreeList[edudegreeIdx].value}}</view>
					</picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        <view class="person-infor-one">
          <text>婚姻状况</text>
          <picker @change="marriageChange" :value="marriageIdx" :range-key="'value'" :range="marriageList">
						<view class="uni-input">{{marriageList[marriageIdx].value}}</view>
					</picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view>
        
      </view>
      <!--个人信息-end-->
      <view class="" @click="nextStep(true)">
        <view class="cbutton">
          <text>下一步</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import pageHead from "@/components/page-head.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      personInfor: {
        phone: "",
        yearIncome: "",
        detailAddress: ""
      },
      verifyPhone: {
        isTipShow: false,
        tipText: "请输入11位手机号码"
      },
      verifyYearIncome: {
        isTipShow: false,
        tipText: "个人年收入不能为空"
      },
      verifyPostcode: {
        isTipShow: false,
        tipText: "居住地址邮编不能为空"
      },
      familyStatusList: [
        {
          key: 0,
          value: "请选择"
        }
      ],
      familyStatusIdx: 0,
      eduexperienceList: [
        {
          key: 0,
          value: "请选择"
        }
      ],
      eduexperienceIdx: 0,
      edudegreeList: [
        {
          key: 0,
          value: "请选择"
        }
      ],
      edudegreeIdx: 0,
      marriageList: [
        {
          key: 0,
          value: "请选择"
        }
      ],
      marriageIdx: 0,

      mulIndex: [0, 0, 0],
      mulArr: [],
      mulCodeArr: [],
      regionCode: "",
      isShow: false,
      // 假设json为后端返回的数据
      json: [],
      orderNoVal: "", //订单编号
      applyNoVal: "", //申请编号
      isJump: true
    };
  },
  computed: {
    ...mapGetters(["approvalIngList", "userInfor"])
  },
  onLoad(option) {
    this.orderNoVal = this.approvalIngList.orderNo;
    this.applyNoVal = this.approvalIngList.serialNo;
    this.getFamilyStatusList();
    this.familyStatusIdx = this.selectInfo(this.familyStatusList, "0");
    this.getEduexperienceList();
    this.getEdudegreeList();
    this.getMarriageList();
    this.getCascadeData();
    if (localStorage.getItem("personalInformation")) {
      this.getPersonalData();
    }
  },
  onShow() {},
  onUnload() {},
  methods: {
    changeNextCol(e) {
      // 列的值改变时触发   我这里是三列：车子类型  品牌名称  车型
      console.log("修改的列", e.target.column, "值为", e.target.value);
      // 监听用户操作，改变mulIndex的值
      this.mulIndex[e.target.column] = e.target.value;
      // mulArr[0]的值是不会随用户操作变更的，因此不需要改变
      // mulArr[1]的值是由 mulIndex[0]的值决定的
      this.mulArr.splice(
        1,
        1,
        this.json[this.mulIndex[0]].children.map(function(v) {
          return v.regionName;
        })
      );
      this.mulCodeArr.splice(
        1,
        1,
        this.json[this.mulIndex[0]].children.map(function(v) {
          return v.regionId;
        })
      );
      // mulArr[2]的值是由 muIndex[1]的值决定的
      this.mulArr.splice(
        2,
        1,
        this.json[this.mulIndex[0]].children[this.mulIndex[1]].children.map(
          function(v) {
            return v.regionName;
          }
        )
      );
      this.mulCodeArr.splice(
        2,
        1,
        this.json[this.mulIndex[0]].children[this.mulIndex[1]].children.map(
          function(v) {
            return v.regionId;
          }
        )
      );
      // {{mulArr[0][mulIndex[0]]}}，{{mulArr[1][mulIndex[1]]}}，{{mulArr[2][mulIndex[2]]}}
      console.log(
        this.mulArr[0][this.mulIndex[0]] +
          this.mulArr[1][this.mulIndex[1]] +
          this.mulArr[2][this.mulIndex[2]]
      );
      console.log(this.mulCodeArr[2][this.mulIndex[2]]);
      this.regionCode = this.mulCodeArr[2][this.mulIndex[2]];
      console.log(this.mulIndex);
    },

    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },
    //下拉列表
    familyStatusChange: function(e) {
      this.familyStatusIdx = e.target.value;
    },
    eduexperienceChange(e) {
      this.eduexperienceIdx = e.target.value;
    },
    edudegreeChange(e) {
      this.edudegreeIdx = e.target.value;
    },
    marriageChange(e) {
      this.marriageIdx = e.target.value;
    },
    // 获取居住状况列表
    getFamilyStatusList() {
      let that = this;
      let pdata = {
        dictionaryName: "familyStatus"
      };
      this.queryDictionaryList(pdata, function(res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.familyStatusList.push({
            key: key,
            value: resData[key]
          });
        }
      });
    },
    // 获取省市区三级级联数据
    getCascadeData() {
      let that = this;
      let data = {};
      // 6.10接口 获取省市区三级级联数据
      let posturl = "/api/region/regionListAllQuery";
      yu.showLoading();
      that.interfaceRequest(
        posturl,
        data,
        "post",
        function(res) {
          yu.hideLoading();
          let resArr = res.data.data;
          that.json = resArr.regionAllList;
          // 初始化picker默认值
          that.mulArr[0] = that.json.map(function(v) {
            return v.regionName;
          });
          that.mulArr[1] = that.json[that.mulIndex[0]].children.map(function(
            v
          ) {
            return v.regionName;
          });
          that.mulArr[2] = that.json[that.mulIndex[0]].children[
            that.mulIndex[1]
          ].children.map(function(v) {
            return v.regionName;
          });
          that.mulCodeArr[0] = that.json.map(function(v) {
            return v.regionId;
          });
          that.mulCodeArr[1] = that.json[that.mulIndex[0]].children.map(
            function(v) {
              return v.regionId;
            }
          );
          that.mulCodeArr[2] = that.json[that.mulIndex[0]].children[
            that.mulIndex[1]
          ].children.map(function(v) {
            return v.regionId;
          });
          that.regionCode = that.mulCodeArr[2][that.mulIndex[2]];
          that.isShow = true;
        },
        function(err) {
          yu.hideLoading();
          alert("报错了！！");
        }
      );
    },
    // 获取最高学历列表
    getEduexperienceList() {
      let that = this;
      let pdata = {
        dictionaryName: "eduexperience"
      };
      this.queryDictionaryList(pdata, function(res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.eduexperienceList.push({
            key: key,
            value: resData[key]
          });
        }
      });
    },
    // 获取最高学位列表
    getEdudegreeList() {
      let that = this;
      let pdata = {
        dictionaryName: "edudegree"
      };
      this.queryDictionaryList(pdata, function(res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.edudegreeList.push({
            key: key,
            value: resData[key]
          });
        }
      });
    },
    // 获取婚姻状况列表
    getMarriageList() {
      let that = this;
      let pdata = {
        dictionaryName: "marriage"
      };
      this.queryDictionaryList(pdata, function(res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.marriageList.push({
            key: key,
            value: resData[key]
          });
        }
      });
    },
    // 下一步
    nextStep(isJump) {
      this.isJump = isJump;
      let that = this;
      let personalInformation = JSON.parse(
        localStorage.getItem("personalInformation")
      );
      let data = {
        userId: this.userInfor.loginCode,
        certType: personalInformation.certType,
        certId: personalInformation.certId,
        customerName: personalInformation.customerName,
        mobileTelephone: this.personInfor.phone,
        yearIncome: this.personInfor.yearIncome,
        familyStatus: this.familyStatusList[this.familyStatusIdx].key,
        regionCode: this.regionCode,
        familyAdd: this.personInfor.detailAddress,
        eduExperience: this.eduexperienceList[this.eduexperienceIdx].key,
        eduDegree: this.edudegreeList[this.edudegreeIdx].key,
        marriage: this.marriageList[this.marriageIdx].key,
        coord: this.mulIndex.join(","),
        scene: "cstScene",
        applyNo: this.applyNoVal,
        listName: "baseInfo"
      };
      // 3.7接口 个人信息更新
      let posturl = "/api/credit/customerInfoUpdate";
      yu.showLoading();
      that.interfaceRequest(
        posturl,
        data,
        "post",
        function(res) {
          yu.hideLoading();
          let resArr = res.data.data;
          if (resArr.returnCode == "Success") {
            if (that.isJump) {
              that.pageJump(
                "personInformation/borrowerInformation/workInformation/workInformation"
              );
            } else {
              alert("暂存成功！");
            }
          } else {
            alert("失败了！！");
          }
        },
        function(err) {
          yu.hideLoading();
          alert("报错了！！");
        }
      );
    },
    // 3.2接口 获取个人信息
    getPersonalData() {
      let that = this;
      let personalInformation = JSON.parse(
        localStorage.getItem("personalInformation")
      );
      let data = {
        certType: personalInformation.certType,
        certId: personalInformation.certId,
        customerName: personalInformation.customerName,
        scene: "cstScene",
        applyNo: this.applyNoVal
      };
      let posturl = "/api/front/perCustomerInfo";
      yu.showLoading();
      that.interfaceRequest(
        posturl,
        data,
        "post",
        function(res) {
          yu.hideLoading();
          let resData = res.data.data;
          if (resData.returnCode == "Success") {
            that.personInfor.phone = resData.mobileTelephone;
            that.personInfor.yearIncome = resData.yearIncome;
            that.personInfor.regionCode = resData.regionCode;
            that.personInfor.detailAddress = resData.familyAdd;
            that.familyStatusIdx = that.selectInfo(
              that.familyStatusList,
              resData.familyStatus
            );
            that.eduexperienceIdx = that.selectInfo(
              that.eduexperienceList,
              resData.eduExperience
            );
            that.edudegreeIdx = that.selectInfo(
              that.edudegreeList,
              resData.eduDegree
            );
            that.marriageIdx = that.selectInfo(
              that.marriageList,
              resData.marriage
            );
            if (resData.coord) {
              that.mulIndex = resData.coord.split(",");
              console.log(11111);
              console.log(that.mulIndex);
            }
          } else {
            alert("失败了！！");
          }
        },
        function(err) {
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
    }
  },
  mounted() {}
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
      .yearIncome-box {
        width: 310rpx;
        height: 264rpx;
        display: inline-block;
        margin-top: 48rpx;
        .yearIncome-positive {
          width: 310rpx;
          height: 210rpx;
          background: url("~@/static/images/firstroom/idcardPositive.svg")
            center top no-repeat;
          background-size: 310rpx 210rpx;
          position: relative;
        }
        .yearIncome-negative {
          width: 310rpx;
          height: 210rpx;
          position: relative;
          background: url("~@/static/images/firstroom/idcardNegative.svg")
            center top no-repeat;
          background-size: 310rpx 210rpx;
        }
        .yearIncome-img {
          width: 310rpx;
          height: 210rpx;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
        }
        .yearIncome-camera {
          width: 90rpx;
          height: 90rpx;
          text-align: center;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -45rpx;
          margin-top: -45rpx;
          z-index: 2;
          img {
            width: 90rpx;
            height: 90rpx;
          }
        }
        .yearIncome-infor {
          height: 37rpx;
          line-height: 37rpx;
          text-align: center;
          color: #333333;
          font-size: 26rpx;
          margin-top: 17rpx;
        }
      }
      .yearIncome-box:last-child {
        margin-left: 50rpx;
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
          width: 300rpx;
          color: #333333;
          font-size: 32rpx;
          /* margin-right: 40rpx; */
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
          width:100%;
          height: 105rpx;
          text-align: right;
        }
        input.nameUsed {
          /* margin-right: 90rpx; */
          width: 276rpx;
        }
        picker {
          float: right;
          color: #333333;
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
          margin-top: 36rpx;
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

.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}

.mpvue-picker-view-show {
  transform: translateY(0);
}

.mpvue-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}

.mpvue-picker__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}

.mpvue-picker__action {
  display: block;
  flex: 1;
  color: #1aad19;
}

.mpvue-picker__action:first-child {
  text-align: left;
  color: #888;
}

.mpvue-picker__action:last-child {
  text-align: right;
}

.picker-item {
  text-align: center;
  line-height: 40px;
  font-size: 16px;
}

.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
</style>