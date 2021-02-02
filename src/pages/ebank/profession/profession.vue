<template>
  <view :class="phoneSystem ?'uni-container' : 'uni-container contract-button-an'">
    <view :class="phoneSystem ?'pf-title pf-title-ios':'pf-title'">
      <text>业务</text>
    </view>
    <view class="pf-content">
      <view class="pf-module" v-for="item in ulList" :key="item.ulId">
        <view class="pf-ulTitle">{{item.ulTitle}}</view>
        <view class="pf-ul">
          <view class="pf-li" v-for="liItem in item.ulLi" :key="liItem.liId" @click="proRouter(liItem)">
            <view class="pf-li-left">
              <img :src="liItem.imgIcon">
              <view>{{liItem.liTitle}}</view>
            </view>
            <view class="pf-li-right">
              <view v-if="liItem.liNum != 0 && liItem.liNum <= 99" class="pf-num">{{liItem.liNum}}</view>
              <view v-else-if="liItem.liNum > 99" class="pf-num">...</view>
              <view v-else></view>
              <img src="@/static/images/profession/pf-arrow.svg">
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import {RSAencode, RSAdecode} from '@/static/js/util.js'
  export default {
    data() {
      return {
        ulList: [
          {
            ulTitle: '订单任务',
            ulId: '1',
            ulLi: [
              {
                imgIcon: './static/images/profession/pf-1-1.svg',
                // liTitle: '订单待处理',
                liTitle: '待确认订单',
                liId: 'pendingOrder',
                liKey: 'orderPending',
                liNum: '',
                liUrl: 'index/pendingOrder/pendingOrder',
              }
            ]
          },
          {
            ulTitle: '授信申请及审批',
            ulId: '2',
            ulLi: [
              {
                imgIcon: './static/images/profession/pf-2-1.svg',
                liTitle: '申请待提交',
                liId: '01',
                liKey: 'creditSubmit',
                liNum: '',
                liUrl: 'profession/approvalIng/approvalIng',
              },
              {
                imgIcon: './static/images/profession/pf-2-3.svg',
                liTitle: '授信审批中',
                liId: '02',
                liKey: 'creditOngoing',
                liNum: '',
                liUrl: 'profession/approvalIng/approvalIng',
              },
              {
                imgIcon: './static/images/profession/pf-2-4.svg',
                liTitle: '审批通过',
                liId: '03',
                liKey: 'creditPass',
                liNum: '',
                liUrl: 'profession/approvalIng/approvalIng',
              },
              {
                imgIcon: './static/images/profession/pf-2-5.svg',
                liTitle: '审批否决',
                liId: '04',
                liKey: 'creditVeto',
                liNum: '',
                liUrl: 'profession/approvalIng/approvalIng',
              },
              {
                imgIcon: './static/images/profession/pf-2-2.svg',
                liTitle: '人工定价审批',
                liId: '05',
                liKey: 'creditPeoplePricing',
                liNum: '',
                liUrl: 'profession/approvalIng/approvalIng',
              },
            ]
          },
          {
            ulTitle: '合同签订',
            ulId: '3',
            ulLi: [
              {
                imgIcon: './static/images/profession/pf-3-1.svg',
                liTitle: '合同待签署',
                liId: '01',
                liKey: 'contractSigned',
                liNum: '',
                liUrl: 'profession/signContract/signTheContract',
              },
              {
                imgIcon: './static/images/profession/pf-3-2.svg',
                liTitle: '合同已签署',
                liId: '02',
                liKey: 'contractSgd',
                liNum: '',
                liUrl: 'profession/signContract/signTheContract',
              },
            ]
          },
          {
            ulTitle: '发放支付',
            ulId: '4',
            ulLi: [
              {
                imgIcon: './static/images/profession/pf-4-1.svg',
                liTitle: '待处理放款',
                liId: '05',
                liKey: 'issuePending',
                liNum: '',
                liUrl: 'profession/payment/payment',
              },
              {
                imgIcon: './static/images/profession/pf-4-2.svg',
                liTitle: '待提交放款',
                liId: '01',
                liKey: 'issueSubmit',
                liNum: '',
                liUrl: 'profession/payment/payment',
              },
              {
                imgIcon: './static/images/profession/pf-4-3.svg',
                liTitle: '审批中放款',
                liId: '02',
                liKey: 'issueOngoing',
                liNum: '',
                liUrl: 'profession/payment/payment',
              },
              {
                imgIcon: './static/images/profession/pf-4-4.svg',
                liTitle: '审批结束',
                liId: '03',
                liKey: 'issuePass',
                liNum: '',
                liUrl: 'profession/payment/payment',
              },
              // {
              //   imgIcon: './static/images/profession/pf-4-4.svg',
              //   liTitle: '审批通过',
              //   liId: '03',
              //   liKey: 'issuePass',
              //   liNum: '',
              //   liUrl: 'profession/payment/payment',
              // },
              // {
              //   imgIcon: './static/images/profession/pf-4-5.svg',
              //   liTitle: '审批否决',
              //   liId: '04',
              //   liKey: 'issueVeto',
              //   liNum: '',
              //   liUrl: 'profession/payment/payment',
              // },
            ]
          },
        ], //业务列表
      };
    },
    onLoad() {},
    onReady() {},
    onShareAppMessage() {},
    computed:{
      ...mapGetters(['businessNum','userInfor'])
    },
    created(){
      let name = "姓名";
      console.log(RSAencode(name))  //加密
      console.log(RSAdecode(RSAencode(name)))  //解密
      console.log(this.businessNum)
      this.commitFun();
    },
    activated(){
      this.commitFun();
    },
    //下拉的生命周期
    onPullDownRefresh() {
      console.log('下拉刷新');
      let datas = {
        userID: this.userInfor.loginCode, //客户经理编号
        orgID: this.userInfor.orgId //客户经理所属机构编号
      };
      this.businessNumCommit(datas);
      setTimeout(()=>{
        yu.stopPullDownRefresh();  //停止下拉刷新
      },5000)
    },
    methods: {
      ...mapActions(['priceApproveFlagListCommit','businessNumCommit']),
      //初始化时调用方法
      commitFun(){
        yu.stopPullDownRefresh();  //停止下拉刷新
        let numObj = this.businessNum;
        this.ulList.forEach((val)=>{
          let a = val.ulLi;
          a.forEach((val1)=>{
            for(let key in numObj){
              if(val1.liKey == key){
                val1.liNum = numObj[key];
              }
            }
          })
        });
      },
      //页面跳转
      proRouter(e){
        console.log(e.liUrl)
        if(e.liId == 'pendingOrder'){
          this.pageJump(e.liUrl)
        }else{
          this.priceApproveFlagListCommit();
          setTimeout(()=>{
            this.pageJump(e.liUrl + '?applyPhase=' + e.liId);
          },1000)
        }
      },
    },
  };
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  .uni-container{
    background-color: #FFFFFF;
  }
  .pf-content{
    padding-top: 50rpx;
    .pf-module{
      margin: 26rpx 0;
      .pf-ulTitle{
        font-size: 32rpx;
        color: #333333;
        margin: 0 0 18rpx;
      }
      .pf-ul{
        background: #FFFFFF;
        box-shadow: 0rpx 0rpx 28rpx 0rpx rgba(0, 0, 0, 0.11);
        border-radius: 20rpx;
        padding-left: 30rpx;
        .pf-li{     
          height: 60rpx;          
          padding: 26rpx 6rpx;
          border-bottom: 2rpx solid #E5E5E5;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .pf-li-left,
          .pf-li-right{
            display: flex;
            flex-direction: row;
            align-items: center;
            img{
              margin: 0 22rpx;
            }
          }
          .pf-li-left{
            img{
              width: 50rpx;
            }
          }
          .pf-li-right{
            .pf-num{
              font-size: 22rpx;
              color: #FFFFFF;
              width: 56rpx;
              height: 40rpx;
              line-height: 40rpx;
              text-align: center;
              background: #E75E58;
              border-radius: 16rpx 16rpx 16rpx 0rpx;
            }
            img{
              width: 15rpx;
            }
          }
        }
        .pf-li:last-of-type{
          border-bottom: 0;
        }
      }
    }
  }
</style>
