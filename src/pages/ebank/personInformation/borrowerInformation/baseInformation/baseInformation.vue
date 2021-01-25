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
        <img src="@/static/images/firstroom/longProgress02.svg" />
        <view class="uni-flex uni-row">
          <view class="flex-item ">户籍信息</view>
          <view class="flex-item active">基本信息</view>
          <view class="flex-item">工作信息</view>
          <view class="flex-item">联系人信息</view>
        </view>
      </view>
      <!--信息完善进度条-end-->
    </view>
    <view class="pf-content baseIn-content">
      <!--个人信息-start-->
      <view class="contract-ul marginT25">
        <view class="contract-li-tips">
          <view class="contract-li">
            <view>手机号码</view>
            <view>
              <input class="uni-input" placeholder="请输入" type="number" v-model.trim="personInfor.phone" @focus="verifyPhone.isTipShow=false" @blur="checkPhone(personInfor.phone)" />
              <img v-if="personInfor.phone!=''" src="@/static/images/firstroom/cleanUp.svg" @click="personInfor.phone=''">
            </view>
          </view>
          <view v-if="verifyPhone.isTipShow" class="contract-tips">{{verifyPhone.tipText}}</view>
        </view>
        <view class="contract-li-tips">
          <view class="contract-li">
            <view>个人年收入（元）</view>
            <view>
              <input class="uni-input" placeholder="请输入" maxlength="11" type="number" v-model.trim="personInfor.yearIncome" @focus="verifyYearIncome.isTipShow=false" @blur="checkYearIncome(personInfor.yearIncome)" />
              <img v-if="personInfor.yearIncome!=''" src="@/static/images/firstroom/cleanUp.svg" @click="personInfor.yearIncome=''" />
            </view>
          </view>
          <view v-if="verifyYearIncome.isTipShow" class="contract-tips">{{verifyYearIncome.tipText}}</view>
        </view>
        <view class="contract-li">
          <view>居住状况</view>
          <view>
            <picker @change="familyStatusChange" :value="familyStatusIdx" :range-key="'value'" :range="familyStatusList">
              {{familyStatusList[familyStatusIdx].value}}
            </picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>
        <view class="collateral-site">
          <view class="contract-li">
            <view>居住地址</view>
            <view class="colladdress">
              <picker mode="multiSelector" @columnchange="changeNextCol" @change="provincesChange" :value="mulIndex" :range="mulArr">
                {{provinceZhi}},{{cityZhi}},{{areaZhi}}
              </picker>
              <img src="@/static/images/firstroom/formChooseArrow.svg" />
            </view>
          </view>
          <view class="collateral-flex">
            <textarea 
              placeholder="请输入详细地址"  
              v-model.trim="personInfor.detailAddress"
              auto-height fixed="true"/>
          </view>
        </view>
        <view class="contract-li">
          <view>最高学历</view>
          <view>
            <picker @change="eduexperienceChange" :value="eduexperienceIdx" :range-key="'value'" :range="eduexperienceList">
              {{eduexperienceList[eduexperienceIdx].value}}
            </picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>
        <view class="contract-li">
          <view>最高学位</view>
          <view>
            <picker @change="edudegreeChange" :value="edudegreeIdx" :range-key="'value'" :range="edudegreeList">
              {{edudegreeList[edudegreeIdx].value}}
            </picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>
        <view class="contract-li">
          <view>婚姻状况</view>
          <view>
            <picker @change="marriageChange" :value="marriageIdx" :range-key="'value'" :range="marriageList">
              {{marriageList[marriageIdx].value}}
            </picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>
        
      </view>
      <!--个人信息-end-->
      <view :class="phoneSystem ? 'contract-button':'contract-button contract-button-an'">
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
        phone: "",
        yearIncome: "",
        detailAddress: "",
      },
      verifyPhone: {
        isTipShow: false,
        tipText: "请输入11位手机号码",
      },
      verifyYearIncome: {
        isTipShow: false,
        tipText: "个人年收入不能为空",
      },
      verifyPostcode: {
        isTipShow: false,
        tipText: "居住地址邮编不能为空",
      },
      familyStatusList: [
        {
          key:"",
          value: "请选择",
        },
      ],
      familyStatusIdx: 0,
      eduexperienceList: [
        {
          key:"",
          value: "请选择",
        },
      ],
      eduexperienceIdx: 0,
      edudegreeList: [
        {
          key:"",
          value: "请选择",
        },
      ],
      edudegreeIdx: 0,
      marriageList: [
        {
          key:"",
          value: "请选择",
        },
      ],
      marriageIdx: 0,

      mulIndex: [0, 0, 0],
      mulArr: [],
      mulCodeArr: [],
      regionCode: "",
      // 假设json为后端返回的数据
      json: [],
      orderNoVal: "", //订单编号
      applyNoVal: "", //申请编号
      isJump: true,
      provinceZhi: '河北省',
      cityZhi: '廊坊市',
      areaZhi: '安次区',
    };
  },
  computed: {
    ...mapGetters(["approvalIngList", "userInfor","personalInformation"]),
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
    if(JSON.stringify(this.personalInformation) != "{}"){
      this.getPersonalData();
    }
  },
  onShow() {},
  onUnload() {},
  methods: {
    ...mapActions(["queryApplyInfoCommit"]),
    changeNextCol(e){
        // 列的值改变时触发   我这里是三列：车子类型  品牌名称  车型
        console.log('修改的列', e.target.column, '值为', e.target.value);
        // 监听用户操作，改变mulIndex的值
        this.mulIndex[e.target.column] = e.target.value;
        // mulArr[0]的值是不会随用户操作变更的，因此不需要改变  
        // mulArr[1]的值是由 mulIndex[0]的值决定的
        this.mulArr.splice(1,1,this.json[this.mulIndex[0]].children.map(function(v){return v.regionName}));
        this.mulCodeArr.splice(1,1,this.json[this.mulIndex[0]].children.map(function(v){return v.regionId}));
        if(this.mulArr[1].length == 0){
          this.mulArr[1] = [];
          this.mulArr[2] = [];
          this.mulCodeArr[1] = [];
          this.mulCodeArr[2] = [];
        }else{
           // mulArr[2]的值是由 muIndex[1]的值决定的 
          this.mulArr.splice(2,1,this.json[this.mulIndex[0]].children[this.mulIndex[1]].children.map(function(v){return v.regionName}));
          this.mulCodeArr.splice(2,1,this.json[this.mulIndex[0]].children[this.mulIndex[1]].children.map(function(v){return v.regionId}));
        }
        // console.log(this.mulArr)
        // console.log(this.mulCodeArr)
        console.log(this.mulIndex)
      },
      provincesChange(e){
        console.log(e)
        this.mulIndex = e.target.value;
        this.provinceZhi = this.mulArr[0][this.mulIndex[0]]; 
        if(this.mulArr[1].length == 0){
          this.cityZhi = this.provinceZhi;
          this.areaZhi = this.provinceZhi;
        }else{
          this.cityZhi = this.mulArr[1][this.mulIndex[1]];
          this.areaZhi = this.mulArr[2][this.mulIndex[2]];
          this.regionCode=this.mulCodeArr[2][this.mulIndex[2]];
        }
      },
    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },
    //下拉列表
    familyStatusChange: function (e) {
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
        dictionaryName: "familyStatus",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.familyStatusList.push({
            key: key,
            value: resData[key],
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
        function (res) {
          yu.hideLoading();
          let resArr = res.data.data;
          that.json = resArr.regionAllList;
          // 初始化picker默认值
          that.mulArr[0] = that.json.map(function (v) {
            return v.regionName;
          });
          that.mulArr[1] = that.json[that.mulIndex[0]].children.map(function (
            v
          ) {
            return v.regionName;
          });
          that.mulArr[2] = that.json[that.mulIndex[0]].children[
            that.mulIndex[1]
          ].children.map(function (v) {
            return v.regionName;
          });
          that.mulCodeArr[0] = that.json.map(function (v) {
            return v.regionId;
          });
          that.mulCodeArr[1] = that.json[that.mulIndex[0]].children.map(
            function (v) {
              return v.regionId;
            }
          );
          that.mulCodeArr[2] = that.json[that.mulIndex[0]].children[
            that.mulIndex[1]
          ].children.map(function (v) {
            return v.regionId;
          });
          that.regionCode = that.mulCodeArr[2][that.mulIndex[2]];
          that.provinceZhi = that.mulArr[0][that.mulIndex[0]]; 
          that.cityZhi = that.mulArr[1][that.mulIndex[1]];
          that.areaZhi = that.mulArr[2][that.mulIndex[2]];
        },
        function (err) {
          yu.hideLoading();
          uni.showToast({
          title: '失败，请重试！！',
          icon: 'none',
          duration: 2000
      });
        }
      );
    },
    // 获取最高学历列表
    getEduexperienceList() {
      let that = this;
      let pdata = {
        dictionaryName: "eduexperience",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.eduexperienceList.push({
            key: key,
            value: resData[key],
          });
        }
      });
    },
    // 获取最高学位列表
    getEdudegreeList() {
      let that = this;
      let pdata = {
        dictionaryName: "edudegree",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.edudegreeList.push({
            key: key,
            value: resData[key],
          });
        }
      });
    },
    // 获取婚姻状况列表
    getMarriageList() {
      let that = this;
      let pdata = {
        dictionaryName: "marriage",
      };
      this.queryDictionaryList(pdata, function (res) {
        let resData = res.data.data;
        for (let key in resData) {
          that.marriageList.push({
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
        listName: "baseInfo",
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
              console.log(this.familyStatusList[this.familyStatusIdx].value);
              this.queryApplyInfoCommit({
                orderNo:this.orderNoVal,
                applyNo: this.applyNoVal,
              }); //重新调'申请信息查询'接口，确保人员信息列表准确
              if (this.personInfor.phone == "") {
                yu.showModal({
                  title: "错误",
                  content: "手机号码不能为空！",
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

              if (this.personInfor.yearIncome == "") {
                yu.showModal({
                  title: "错误",
                  content: "个人年收入不能为空！",
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
              if ( this.familyStatusList[this.familyStatusIdx].value == "请选择") {
                yu.showModal({
                  title: "错误",
                  content: "请选择居住状况！",
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
              if (this.personInfor.detailAddress == "") {
                yu.showModal({
                  title: "错误",
                  content: "居住地址不能为空！",
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
              if (
                this.eduexperienceList[this.eduexperienceIdx].value == "请选择"
              ) {
                yu.showModal({
                  title: "错误",
                  content: "请选择最高学历！",
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
              if (this.edudegreeList[this.edudegreeIdx].value == "请选择") {
                yu.showModal({
                  title: "错误",
                  content: "请选择最高学位！",
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
              if (this.marriageList[this.marriageIdx].value == "请选择") {
                yu.showModal({
                  title: "错误",
                  content: "请选择婚姻状况！",
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
                "personInformation/borrowerInformation/workInformation/workInformation"
              );
            } else {
                yu.showToast({
                  title: '暂存成功！',
                  image: './static/images/perfectInformation/success.svg',
                  duration: 2000
                });
            }
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
              let arr = resData.coord.split(",");
              that.mulIndex = [];
              arr.forEach(item=>{
                that.mulIndex.push(Number(item))
              });
              console.log(11111);
              console.log(that.mulIndex);
            }
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
    .baseIn-content{
      padding-top: 270rpx;
    
    }
  }
  .marginT25{
    margin-top: 25rpx;
  }
</style>
