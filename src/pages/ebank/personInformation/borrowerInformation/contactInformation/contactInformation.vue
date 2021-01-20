<template>
  <view class="uni-container">
    <view class="pf-poifixed">
      <view :class="phoneSystem ?'pf-title pf-title-ios pf-titleThree':'pf-title pf-titleThree'">
        <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
        <text>借款人信息</text>
        <text class="pf-text" @click="submit(false)">暂存</text>
      </view>
      <!--信息完善进度条-start-->
      <view class="household-progress">
        <img src="@/static/images/firstroom/longProgress04.svg" />
        <view class="uni-flex uni-row">
            <view class="flex-item ">户籍信息</view>
            <view class="flex-item">基本信息</view>
            <view class="flex-item">工作信息</view>
            <view class="flex-item active">联系人信息</view>
        </view>
      </view>
      <!--信息完善进度条-end-->
    </view>
    <view class="pf-content household-content" :key="timer">
     
      <!--个人信息-start-->
	 <view v-for="(item,index) in customerConcatList" :key="index+'a'">
	  
     <view class="form-title">
					<view class="leftPart">
						<view class="vLine"></view>紧急联系人
					</view>
					<img v-if="index==0" src="@/static/images/firstroom/bluePlus.svg" @click="addContact" />
					<img v-else src="@/static/images/firstroom/minus.png" @click="minusContact(index)" />
				</view>
      <view class="contract-ul">
        <view class="contract-li-tips">
          <view class="contract-li">
            <view>姓名</view>
            <view>
              <img v-if="item.customerName!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="customerConcatList[index].customerName=''" />
						<input placeholder="请输入" type="text" v-model.trim="item.customerName" />
            </view>
          </view>
        </view>
        <view class="contract-li">
          <view>手机号码</view>
          <view>
            <img v-if="item.phoneNo!=''" class="cleanUp" src="@/static/images/firstroom/cleanUp.svg" @click="customerConcatList[index].phoneNo=''" />
						<input placeholder="请输入" type="number" v-model.trim="item.phoneNo" />
          </view>
        </view>
       
<view class="contract-li">
          <view>与借款人关系</view>
          <view>
            <picker @change="relationShipChange($event,index)" :value="relationShipIdxList[index]" :range-key="'value'"
						 :range="relationShipList">
							<view class="uni-input">{{relationShipList[relationShipIdxList[index]].value}}</view>
						</picker>
            <img src="@/static/images/firstroom/formChooseArrow.svg" />
          </view>
        </view>


       
      </view>
	  

	  
	 </view>  
	  
    
      <!--个人信息-end-->
      <view class="contract-button">
        <button type="primary" @click="submit(true)">提交</button>
      </view>
    </view>
  </view>
</template>
<script>
 import pageHead from "@/components/page-head.vue";
	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		data() {
			return {
				customerConcatList: [{
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
				relationShipList: [{
					key: 0,
					value: "请选择",
				}, ],
				relationShipIdxList: [],
				timer: "",
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
			this.getRelationShipList();
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
				this.queryDictionaryList(pdata, function(res) {
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
					function(err) {
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
			},
		},
		mounted() {},
	};
</script>

<style lang='scss' scoped>
  .uni-container{
    background-color: #f6f8f9;
    padding-top: 0;  
    padding-bottom: 30rpx;
    .household-content{
      padding-top: 270rpx;
      
     
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



      .contract-ul{
        .collateral-site{
          .contract-li{
            uni-view:last-of-type{
              justify-content: flex-start;
              margin-left: 0;
              color: #333435;
            }
          }
        }
      }
    }
  }
  .marginT25{
    margin-top: 25rpx;
  }
 .uni-input-placeholder{
   text-align: right;
 }
</style>
