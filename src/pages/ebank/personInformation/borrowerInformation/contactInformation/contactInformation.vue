<template>
  <view class="incoming">
    <view class="customize-head">
      <view class="ch-img" @tap="navigateBack">
        <img src="@/static/images/firstroom/backArrow.svg" />
      </view>
      <view class="ch-title">借款人信息</view>
      <view class="ch-other" @click="submit(false)">暂存</view>
    </view>
    <!--信息完善进度条-start-->
    <view class="progress">
      <img src="@/static/images/firstroom/longProgress04.svg" />
      <view class="uni-flex uni-row">
        <view class="flex-item active">户籍信息</view>
        <view class="flex-item">基本信息</view>
        <view class="flex-item">工作信息</view>
        <view class="flex-item">联系人信息</view>
      </view>
    </view>
    <!--信息完善进度条-end-->

    <view class="customize-content-form" :key="timer">
      <view v-for="(item,index) in customerConcatList" :key="index+'a'">
        <view class="form-title">
          <view class="leftPart">
            <view class="vLine"></view>联系人
          </view>
          <img v-if="index==0" src="@/static/images/firstroom/bluePlus.svg" @click="addContact" />
          <img v-else src="@/static/images/firstroom/minus.png" @click="minusContact(index)" />
        </view>
        <view class="person-infor">
          <view class="person-infor-one">
            <text>姓名</text>
            <img
              v-if="item.customerName!=''"
              class="cleanUp"
              src="@/static/images/firstroom/cleanUp.svg"
              @click="customerConcatList[index].customerName=''"
            />
            <input placeholder="请输入" type="text" v-model.trim="item.customerName" />
          </view>
          <view class="person-infor-one">
            <text>手机号码</text>
            <img
              v-if="item.phoneNo!=''"
              class="cleanUp"
              src="@/static/images/firstroom/cleanUp.svg"
              @click="customerConcatList[index].phoneNo=''"
            />
            <input placeholder="请输入" type="number" v-model.trim="item.phoneNo" />
          </view>

          <view class="person-infor-one">
            <text>与借款人关系</text>
            <picker
              @change="relationShipChange($event,index)"
              :value="relationShipIdxList[index]"
              :range-key="'value'"
              :range="relationShipList"
            >
              <view class="uni-input">{{relationShipList[relationShipIdxList[index]].value}}</view>
            </picker>
            <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>
      </view>

      <view class @click="submit(true)">
        <view class="cbutton">
          <text>提交</text>
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
      customerConcatList: [
        {
          customerName: "",
          phoneNo: "",
          relationShip: "",
        },
        {
          customerName: "",
          phoneNo: "",
          relationShip: "",
        },
      ],
      relationShipList: [
        {
          key: 0,
          value: "请选择",
        },
      ],
      relationShipIdxList: [],
      timer: "",
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
    this.getRelationShipList();
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
    relationShipChange(e, idx) {
      this.relationShipIdxList[idx] = e.target.value;
      this.customerConcatList[idx].relationShip = this.relationShipList[
        e.target.value
      ].key;
      this.$forceUpdate();
    },
    // 获取与借款人关系列表
    getRelationShipList() {
      let that = this;
      let pdata = {
        dictionaryName: "relationShip",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.relationShipList.push({
            key: key,
            value: resData[key],
          });
        }
      });
    },
    // 添加联系人
    addContact() {
      var newArr = [];
      newArr = JSON.parse(JSON.stringify(this.customerConcatList));
      console.log(newArr);
      newArr.push({
        customerName: "",
        phoneNo: "",
        relationShip: "",
      });
      this.customerConcatList = JSON.parse(JSON.stringify(newArr));
      // let t=this.customerConcatList.length;
      // this.customerConcatList[t]={customerName:"123",phoneNo:'',relationShip: ''};
      // this.customerConcatList.push({
      //   customerName:"",
      //   phoneNo:'',
      //   relationShip: ''
      // })
      this.$forceUpdate();
      console.log(this.customerConcatList);
      this.timer = new Date().getTime();
    },
    //删除联系人
    minusContact(idx) {
      this.customerConcatList.splice(idx, 1);
    },
    // 下一步
    submit(isJump) {
      this.isJump = isJump;
      let that = this;
      let personalInformation = this.personalInformation;
      console.log(personalInformation);
      let data = {
        userId: this.userInfor.loginCode,
        certType: personalInformation.certType,
        certId: personalInformation.certId,
        customerName: personalInformation.customerName,
        customerConcatList: this.customerConcatList,
        scene: "cstScene",
        applyNo: this.applyNoVal,
        listName: "contactInfo",
      };
      // 3.7接口 个人信息更新
      let posturl = "/api/credit/customerInfoUpdate";
      yu.showLoading();
      that.interfaceRequest(
        posturl,
        data,
        "post",
        (res) => {
          yu.hideLoading();
          let resArr = res.data.data;
          if (resArr.returnCode == "Success") {
            if (that.isJump) {
              // that.pageJump('personInformation/personInformation')

              this.queryApplyInfoCommit({
                orderNo: this.orderNoVal,
                applyNo: this.applyNoVal,
                routerTrue: true,
                routerTo: "personInformation/personInformation",
                routerJumpWay: "pageJump",
              }); //重新调'申请信息查询'接口
            } else {
              alert("暂存成功！");
              this.queryApplyInfoCommit({
                'orderNo': this.orderNoVal,
                'applyNo': this.applyNoVal,
              }); //重新调'申请信息查询'接口
            }
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
        (res) => {
          yu.hideLoading();
          console.log(res);
          console.log(res.data.data.returnCode);
          let resData = res.data.data;
          console.log(resData.customerConcatList);

          if (resData.returnCode == "Success") {
            if (resData.customerConcatList != null) {
              that.customerConcatList = resData.customerConcatList;
              that.customerConcatList.forEach((item, index) => {
                that.relationShipIdxList.push(
                  that.selectInfo(that.relationShipList, item.relationShip)
                );
              });
            } else {
              console.log("无联系人数据");
              this.relationShipIdxList = [0, 0, 0];
            }
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
  padding-right: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .leftPart {
    display: flex;
    align-items: center;
  }
  .vLine {
    width: 10rpx;
    height: 34rpx;
    background: #3b86f7;
    border-radius: 4px;
    margin-right: 17rpx;
  }
  img {
    width: 30rpx;
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