<template>
  <view class="uni-container">
    <view :class="phoneSystem ? 'pf-title pf-title-ios pf-titleTwo pf-titleTwo-ios':'pf-title pf-titleTwo'">
      <img src="@/static/images/profession/pf-back.svg" @click="backpf">
      <text>发放支付</text>
    </view>
    <view :class="phoneSystem ?'pf-content-ios':'pf-content'">
      <view class="contract-ul">
        <view class="contract-li">
          <view>借款人</view>
          <view>{{paymentList.customerName}}</view>
        </view>
        <view class="contract-li">
          <view>身份证号</view>
          <view>{{paymentList.certId2}}</view>
        </view>
        <view class="contract-li">
          <view>业务品种</view>
          <view>{{paymentList.businessType2}}</view>
        </view>
        <view class="contract-li" v-if="applyPhase == '01'">
          <view>批复金额（元）</view>
          <view>{{paymentList.businessSum2}}</view>
        </view>
      </view>
      <!--tab页签内容-->
      <view class="tab-ul" v-if="applyPhase == '05'">
        <view class="tab-li">
          <view class="tab-li-features">
            <view>《个人购房借款担保合同》</view>
            <view class="tab-color-orange">待发放</view>
          </view>
          <view class="tab-li-content">
            <view class="tab-top">
              <text>￥{{paymentList.businessSum2}}</text>
              <text></text>
            </view>
            <view class="tab-center">
              <view>
                <text>合同号</text>
                <text>{{paymentList.contractNo}}</text>
              </view>
              <view>
                <text>合同签署时间</text>
                <text>{{paymentList.occurDate}}</text>
              </view>
            </view>
            <view class="tab-bottom">
              <text @click="addLendApplySuccess">发起放款申请</text>
            </view>
          </view>
        </view>
      </view>
      <view class="contract-button" v-if="applyPhase == '01'">
        <button type="primary" @click="updatePayment">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  import filter from '@/utils/filters';
  import {RSAdecode} from '@/static/js/util.js'
  export default {
    components: {},
    data() {
      return {
        applyPhase: '05',
        userID: '',
        orgId: '',
        orderNoVal: '',
        contractNoVal: '',
        certId2: '',  //身份证号码
      };
    },
    watch:{},
    onLoad(options) {
      this.applyPhase = options.applyPhase;
    },
    onReady() {},
    onShareAppMessage() {},
    computed:{
      ...mapGetters(['paymentList','userInfor'])
    },
    created(){
      console.log(this.paymentList)
      this.userID = this.userInfor.loginCode;
      this.orgId =  this.userInfor.orgId;

      this.orderNoVal = this.paymentList.orderNo;
      this.contractNoVal = this.paymentList.contractNo;
      this.certId2 = RSAdecode(this.certId);
    },
    methods: {
      ...mapActions(["businessNumCommit"]),
      //放款申请
      addLendApplySuccess(){
        yu.showModal({
          title: '提示',
          content: '请确认是否需要在信贷系统中打印电子合同，若需要请先打印合同再申请放款',
          confirmText: '申请放款',
          success:(res)=> {
            if (res.confirm) {
              this.addLendApplySuccessAjax();
            }else{
              console.log('用户点击取消');
            }
          }
        });
      },
      addLendApplySuccessAjax(){
        let data = {
          'orderNo': this.orderNoVal,  //订单编号
          'contractNo': this.contractNoVal,  //合同编号
          // 'contractNo': '2017111400000086',  //合同编号
        };
        yu.showLoading();
        this.interfaceRequest('/api/lend/addLendApplySuccess',data,"get",(res)=>{
          yu.hideLoading();
          if(res.data.data.returnCode == 'Failed'){
            this.showToastFun(res.data.data.returnDesc);
            return;
          }
          console.log(res)
          yu.showModal({
            title: '申请成功',
            content: '审批通过后将自动放款',
            showCancel: false,
            cancelText: "我知道了",
            success:(res)=> {
              let data = {
                "userID": this.userID, //客户经理编号
                "orgID": this.orgId, //客户经理所属机构编号
              };
              this.businessNumCommit(data);
              if (res.confirm) {
                console.log('用户点击确定');
                yu.navigateTo({
                  url: 'payment?applyPhase=01',
                });
              }
            }
          });
        },(err)=>{
          yu.hideLoading();
          this.showToastFun('5.3放款申请失败，请联系管理员！');
          console.log(err)
        });
      },
      showToastFun(e){
        yu.showToast({
          title: e,
          icon: 'none',
          duration: 3000
        });
      },
      //提交
      updatePayment(){
        yu.navigateTo({
          url: 'paymentSubmit',
        });
      },
      //返回
      backpf(){
        yu.navigateBack();
      },
    }
  };
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  .uni-container{
    background-color: #FFFFFF;
    padding: 0 0 30rpx 0;
  }
</style>
