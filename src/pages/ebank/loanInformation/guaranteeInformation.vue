<template>
	<view class="pending-order">
		<view class="customize-head">
			<view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
			<view class="ch-title"><text>{{title}}</text></view>
			<view class="temporary-storage" @tap="submitform('TS')">暂存</view>
		</view>


		<view class="image-content">
			<img style="height:26rpx;margin:0 auto;display:block;margin-top:63rpx" src="@/static/images/firstroom/longProgress02.svg" />
			<ul class="loaninfo">
				<li>业务信息</li>
				<li>担保信息</li>
				<li>利率期限信息</li>
				<li>还款信息</li>
			</ul>
		</view>

		<!--个人信息-start-->
		<view class="person-infor">
			<view class="person-infor-one">
				<text>主担保方式</text>
				<picker :value="productIndex" :range-key="'value'" :range="vouchTypeIdArr" disabled="false" @change="bindPickerChange">
					<view class="picker">{{ vouchTypeIdArr[productIndex].value }}</view>
				</picker>

			</view>
			<!-- <view class="person-infor-one">
          <text>附加担保方式 </text>
         <picker :value="vouchType1Index" :range-key="'value'" :range="vouchType1IdList" @change="vouchType1Change">
            <view class="picker">{{ vouchType1IdList[vouchType1Index].value }}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view> -->
			<!-- <view class="person-infor-one">
          <text>主要担保类型</text>
          <picker :value="vouchClassIndex" :range-key="'value'" :range="vouchClassIdArr" @change="vouchClassChange">
            <view class="picker">{{ vouchClassIdArr[vouchClassIndex].value }}</view>
          </picker>
          <img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
        </view> -->
			<view class="person-infor-one" v-show="customer">
				<text>合作商客户名</text>
				<input placeholder="合作商客户名" type="text" disabled="disabled" v-model="warrantor" class="warrantor-input" />
			</view>
			<view class="person-infor-one" v-show="customer">
				<text>核心项目编号</text>
				<input placeholder="核心项目编号" type="text" disabled="disabled" v-model="projectID" />
			</view>
			<view class="person-infor-one" v-show="customer" @click="pageJump(guaranteePartnerFirm)">
				<text>合作商账号</text>
				<text style="color:#333435">{{partnerAccountNum}}</text>
				<img class="choose-arrow" src="@/static/images/firstroom/formChooseArrow.svg" />
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
				interestRate: "loanInformation/interestRate",
				guaranteePartnerFirm: "loanInformation/guaranteePartnerFirm",
				businessInformation: "loanInformation/businessInformation",
				warrantor: "",
				projectID: "",
				partnerAccountNum: "",
				vouchTypeValue: "",
				vouchType1Id: "",
				vouchClassId: "",
				productVal: "",
				vouchType1Val: "",
				vouchClassVal: "",
				productList: [],
				productIndex: 3,
				//附加担保方式
				vouchType1List: [],
				vouchType1Index: 0,
				//主要担保类型
				vouchClassList: [],
				vouchClassIndex: 0,
				vouchDataList: [],
				vouchDataLists: [],
				flag: "",
				flags: "",
				vouchType1Arr: [],
				vouchTypeIdArr: [],
				customer: true,
			};
		},
		onLoad(res) {
			this.loanQuerydictList();
			console.log(this.loanQueryDictionaryListObj)
			console.log(this.vouchTypeIdArr[this.productIndex].value)
			this.loanQueryDictionaryListObj.vouchTypeIdArr.forEach((item, index) => {
				console.log(item)
				if (item.key == "020") {
					console.log(item.value)
					this.vouchTypeIdArr[this.productIndex].value = item.value;

				}
			});

			if (res.data == undefined) {
				this.getList(res);
			} else {
				this.getLists(res);
			}

			if (this.fujiaInputList.vouchType1Indexs == undefined) {
				if (this.queryApplyInfoList.vouchType1 == "070") {
					this.vouchType1Index = 0;
				}
				if (this.queryApplyInfoList.vouchType1 == "040") {
					this.vouchType1Index = 1;
				}
				if (this.queryApplyInfoList.vouchType1 == "020") {
					this.vouchType1Index = 2;
				}
				if (this.queryApplyInfoList.vouchType1 == "010") {
					this.vouchType1Index = 3;
				}
				if (this.queryApplyInfoList.vouchType1 == "") {
					this.vouchType1Index = 0;
				}
			}
			// if (this.zhuyaoInputList.vouchClassIndex == undefined) {
			//   if (this.queryApplyInfoList.vouchClass == "06") {
			//     this.vouchClassIndex = 0;
			//   }
			//   if (this.queryApplyInfoList.vouchClass == "07") {
			//     this.vouchClassIndex = 1;
			//   }
			//   if (this.queryApplyInfoList.vouchClass == "") {
			//     this.vouchClassIndex = 0;
			//   }
			// } else {
			//   this.vouchClassIndex = this.zhuyaoInputList.vouchClassIndex;
			// }
			console.log(this.accountListCode);

			let that = this;
			console.log(this.queryApplyInfoList,"申请信息");
			this.vouchTypeName = this.queryApplyInfoList.vouchType;
			this.vouchTy1peName = this.queryApplyInfoList.vouchType1;
			this.vouchClassName = this.queryApplyInfoList.vouchClass;
			this.businessTypeData = this.queryApplyInfoList.businessType;
			console.log(this.businessTypeData)
			if (this.businessTypeData == "1140020" || this.businessTypeData == "1140120") {
				this.customer = false;
			}
			// this.loanQueryDictionaryListObj.vouchTypeIdArr.forEach((item, index) => {
			//   console.log(item)
			//   if (item.key == this.vouchTypeName) {
			//     this.productIndex = index;

			//   }
			// });
			this.productIndex = 3;
			this.loanQueryDictionaryListObj.vouchType1IdList.forEach((item, index) => {
				console.log(item)
				if (item.key == this.vouchTy1peName) {
					this.vouchType1Index = index;

				}
			});
			this.loanQueryDictionaryListObj.vouchClassIdArr.forEach((item, index) => {
				console.log(item)
				if (item.key == this.vouchClassName) {
					this.vouchClassIndex = index;

				}
			});
			// console.log(this.queryApplyInfoList.warrantor, "核心");
			that.applicationNumber = this.queryApplyInfoList.applyNo; //申请编号
			that.warrantor = this.queryApplyInfoList.warrantor; //合作商客户名
			that.projectID = this.queryApplyInfoList.projectID; //核心项目编号
			that.projectName = this.queryApplyInfoList.projectName; //项目名称
			that.warrantorID = this.queryApplyInfoList.warrantorID; //合作商客户号
		},
		computed: {
			...mapGetters([
				"queryApplyInfoList",
				"hptInputList",
				"fujiaInputList",
				"zhuyaoInputList",
				"loanQueryDictionaryListObj"
			])
		},
		methods: {
			...mapMutations([
				"hptInputListReplace",
				"hptcollateralPicker",
				"fujiaInputListReplace",
				"fujiacollateralPicker",
				"zhuyaoInputListReplace",
				"zhuyaocollateralPicker"
			]),
			...mapActions(['queryApplyInfoCommit']),
			getLists(res) {
				this.vouchDataList = JSON.parse(res.data);
				this.accountListCode = this.vouchDataList;
				this.partnerAccountNum = this.vouchDataList.accountNo;
				console.log(this.partnerAccountNum);
			},

			getList(res) {
				let that = this;
				that.partnerAccountNum = this.queryApplyInfoList.thirdPartyAccounts; //合作商账号

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
			//返回上一页
			navigateBack() {
				yu.showModal({
					title: '确定返回？',
					content: '数据还未提交，点确定后编辑过的内容将不保存',
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							yu.navigateTo({
								url: 'businessInformation',
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//下拉列表-主要担保方式
			bindPickerChange: function(e) {
				var thisIndex = e.detail.value;
				this.productId = this.vouchTypeIdArr[thisIndex].value;
				this.vouchTypeValue = this.vouchTypeIdArr[thisIndex].value;
				this.productIndex = thisIndex;
				this.vouchTypeKey = this.vouchTypeIdArr[thisIndex].key; //传给后台的值
				console.log(this.vouchTypeKey)
				this.productIndex = e.target.value;
				// this.hptInputListReplace({
				//   key: "productVal",
				//   value: this.vouchTypeIdArr[thisIndex].value
				// });
				// this.hptcollateralPicker({
				//   key: "productIndex",
				//   value: e.target.value
				// });
			},

			//下拉列表-附加担保方式
			vouchType1Change: function(e) {
				var vouchIndex = e.detail.value;
				console.log(this.vouchType1IdList)
				this.vouchType1Id = this.vouchType1IdList[vouchIndex].value;
				this.vouchType1Index = vouchIndex;
				this.vouchType1Key = this.vouchType1IdList[vouchIndex].key; //传给后台的值

				this.vouchType1Indexs = e.target.value;
				this.fujiaInputListReplace({
					key: "vouchType1Val",
					value: this.vouchType1List[vouchIndex].value
				});
				this.fujiacollateralPicker({
					key: "vouchType1Indexs",
					value: e.target.value
				});
			},

			//下拉列表-主要担保类型
			vouchClassChange: function(e) {
				var vouchClassIndexs = e.detail.value;
				this.vouchClassId = this.vouchClassIdArr[vouchClassIndexs].value;
				this.vouchClassIndex = vouchClassIndexs;
				this.vouchClassKey = this.vouchClassIdArr[vouchIndex].key; //传给后台的值
				this.vouchClassIndex = e.target.value;
				this.zhuyaoInputListReplace({
					key: "vouchClassVal",
					value: this.vouchClassId
				});
				this.zhuyaocollateralPicker({
					key: "vouchClassIndex",
					value: e.target.value
				});
			},
			/**表单提交接口 **start****/
			submitform(e) {
				//TS 暂存 save 提交下一步
				let that = this;
				console.log(this.vouchTypeKey)
				//  console.log(that.projectID)
				console.log(this.partnerAccountNum);
				console.log(this.accountListCode);

				let formData = {
					applyNo: that.applicationNumber,
					orderNo: "",
					listName: "vouchInfo",
					businessType: this.businessTypeData,
					vouchInfo: [{
						projectID: that.projectID,
						projectName: that.projectName,
						subcrEditAggreement: "",
						thirdPartyAccounts: this.partnerAccountNum,                                   
						thirdPartyBailAc: this.accountListCode == undefined ? this.queryApplyInfoList.thirdPartyBailAc : this.accountListCode
							.thirdPartyBailAc,                                                            
						thirdPartyBailAcCH: this.accountListCode == undefined ? this.queryApplyInfoList.thirdPartyBailAcCH : this.accountListCode
							.thirdPartyBailAcCh,
						thirdPartyChNum: this.accountListCode == undefined ? this.queryApplyInfoList.thirdPartyChNum : this.accountListCode
							.accountSubNo,
						// vouchClass:this.vouchClassKey == undefined? this.queryApplyInfoList.vouchClass:this.vouchClassKey,
						// vouchType:this.vouchTypeKey ==undefined? this.queryApplyInfoList.vouchType:this.vouchTypeKey,
						vouchClass: "",
						vouchType: "020",
						vouchType1: "",
						warrantor: that.warrantor,
						warrantorID: that.warrantorID
					}]
				};

				let posturl = "/api/credit/updateApplyInfo";
				that.interfaceRequest(
					posturl,
					formData,
					"post",
					(res) => {

						// yu.navigateTo({
						//   url: "interestRate"
						// });
						// that.pageJump(that.interestRate);
						that.queryApplyInfoCommit({
							'orderNo': '',
							'applyNo': that.applicationNumber,
						}); //重新调'申请信息查询'接口，确保担保合同信息列表准确

						if (e == "TS") {
							this.messageTs=res.data.data;
							yu.showModal({
								title: "暂存状态",
								content:this.messageTs,
								showCancel: false,
								confirmText: "我知道了",
								success: res => {
									if (res.confirm) {
										console.log("用户点击确定");
									}
								}
							});
						} else {



							console.log(this.customer)

							if (this.customer === true) {
								if (that.partnerAccountNum == undefined || that.partnerAccountNum == "") {
									yu.showModal({
										title: "合作商账号不能为空！",
										content: "",
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
							}



							setTimeout(() => {
								that.pageJump('loanInformation/interestRate');
							}, 1000)
						}



					},
					function(err) {}
				);
			},
			/**表单提交接口 **end****/

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

		li:nth-of-type(2) {
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

			text:nth-of-type(2) {
				color: #c7c9cd;
				margin-left: 160rpx;
			}

			input {
				width: 63%;
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

			.warrantor-input {
				margin-right: 10rpx;
				width: 66%;
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
				margin-right: 80rpx;
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
</style>
