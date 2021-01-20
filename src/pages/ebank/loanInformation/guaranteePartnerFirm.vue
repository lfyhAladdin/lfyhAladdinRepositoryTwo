<template>
  <view class="uni-container">
    <view :class="phoneSystem ?'pf-title pf-title-ios pf-titleThree':'pf-title pf-titleThree'">
      <img src="@/static/images/profession/pf-back.svg" @tap="navigateBack">
      <text>合作商账号</text>
       <text></text>
    </view>
    <view class="pf-content mortgagor-content">
      <view class="guaranty-ul" v-for="(item,index) in accountList" :key="item.buildingNo">
        <view class="mortgagor-title">
        <text>合作商账号：</text>
        <text> {{item.accountNo}}</text>
        <view class="radio-checked" @click="checkedClick(item,index)">
                <radio :checked="item.radioCheck"/>
              </view>
        </view>
        
        <view class="guaranty-li" >
          <view class="guaranty-liTop">
            <view class="guaranty-liTopOne">
              <view class="project-number-text">
                  <text class="project-number-con">保证金比例</text>
                  <text>{{item.bailRatio}}</text>
                </view>
                
              
            </view>
            <view class="account-funds">
            <text class="account-funds-con">账户资金用途</text>
            <text>{{item.accountUse}}</text>
            </view>
          </view>
        </view>
       
        
      </view>
    </view>
    
  </view>
</template>

<script>
    import filter from '@/utils/filters'; //格式化金额、证件号等
    import {
        mapGetters,
        mapMutations
    } from 'vuex';
    export default {
        components: {},
        data() {
            return {
                guaranteeInformation: "loanInformation/guaranteeInformation",
                accountList: [],
            }
        },
         computed: {
             ...mapGetters(["userInfor","queryApplyInfoList"]),
        },
        created() {
            
           
        },
        onLoad() {
            console.log(this.userInfor);
            this.orgId=this.userInfor.orgId;
            this.applicationNumber = this.queryApplyInfoList.applyNo; //申请编号
             console.log(this.orgId)
            console.log(this.applicationNumber)
            let data = {
                orgId:this.orgId, //客户经理机构编号
                filterCode: "", // 筛选字段
                applyNo:this.applicationNumber,
                //  orgId:"", //客户经理机构编号
                // filterCode: "", // 筛选字段
                // applyNo:"",
            };
            this.interfaceRequest(
                "/api/front/propertyInfo",
                data,
                "post",
                res => {
                    console.log(res);
                    console.log(res)
                    this.accountList = res.data.data.accountList;
                    console.log(this.accountList);
                },
                function(err) {
                    console.log(err);
                }
            );
        },
        onShareAppMessage() {},
        
       
        methods: {

            //返回上一页
            navigateBack() {
                this.pageJump(this.guaranteeInformation);
            },
            checkedClick: function(item) {
                let data = JSON.stringify(item);
                console.log(item, '合作商账号')
                this.accountList.forEach((val) => {
                    val.radioCheck = true;
                    console.log(val.radioCheck)
                });
                yu.navigateTo({
                    url: 'guaranteeInformation?+data=' + data,
                });




                console.log(item);


            }

        }
    }
</script>

<style lang='scss'>
    @import '~@styles/uni-nvue.css';
    .uni-container {
        padding: 0 0 30rpx 0;
        .mortgagor-content {
            .mortgagor-title {
                padding: 30rpx 0 0 10rpx;
                line-height: 32rpx;
                font-size: 32rpx;
                color: #333435;
                .radio-checked{
                    float: right;
                }
            }
            .guaranty-ul {
                padding: 2rpx 30rpx 0 30rpx;
                .guaranty-li {
                    .guaranty-liTop {
                        margin-right: 0;
                        .guaranty-liPer {
                            font-size: 22rpx;
                            margin-left: 10rpx;
                            padding: 2rpx 10rpx;
                            border-radius: 6rpx;
                        }
                        .guaranty-liPerJKR {
                            //借款人
                            color: #8D9CA5;
                            background-color: #E8F6FF;
                        }
                        .guaranty-liPerDBR {
                            //担保人
                            color: #ECB391;
                            background-color: #FFF1E9;
                        }
                    }
                }
            }
        }
    }
    .project-number-text {
			height: 40rpx;
			line-height: 40rpx;
			font-size: 24rpx;

			.project-number-con {
				color: #999999;
				margin-right: 111rpx;
			}
		}
        .account-funds{
            height: 40rpx;
			line-height: 40rpx;
			font-size: 24rpx;
            color: #333435;
            .account-funds-con{
                color: #999999;
                margin-right: 111rpx;
            }
        }
</style>