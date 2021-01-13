<template>
  <view class="uni-container">
    <view class="pf-title pf-titleTwo">
      <img src="@/static/images/profession/pf-back.svg" @click="backpf">
      <text>担保合同</text>
    </view>
    <view class="pf-content guaranty-content">
      <view class="guaranty-add" @click="addContract()">
        <img src="@/static/images/perfectInformation/add.svg">
        <text>新增担保合同</text>
      </view>
      <view class="guaranty-ul">
        <view class="guaranty-li" v-for="item in guarantyData" :key="item.gcSerialNo" @click="addContract(item)">
          <view class="guaranty-liTop">
            <view class="guaranty-liTopOne">
              <view>{{item.guarantorName}}</view>
              <view>{{item.relativeSum}}</view>
            </view>
            <view>担保合同流水号：{{item.gcSerialNo}}</view>
          </view>
          <img src="@/static/images/perfectInformation/formChooseArrow.svg" class="guaranty-liImg">
        </view>
        
      </view>
      
    </view>
  </view>
</template>

<script>
  import filter from '@/utils/filters';  //格式化金额、证件号等
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  export default {
    components: {},
    data() {
      return {
        guarantyData: [],  //列表
        businessSumVal: '',  //贷款金额，为空时不允许添加担保合同
      }
    },
    onLoad() {
      console.log(this.queryApplyInfoList)
      // this.guarantyData = this.queryApplyInfoList.clrList;
      this.guarantyData = this.queryApplyInfoList.guarantyList;
      this.businessSumVal = this.queryApplyInfoList.businessSum;
    },
    onReady() {},
    onShareAppMessage() {},
    computed:{
      ...mapGetters(['queryApplyInfoList','guarantyInputList'])
    },
    methods: {
      ...mapActions(['queryDictionaryListObjCommit','provincesListDataCommit']),
      ...mapMutations(['gcSerialNoReplace',, 'viceMortgagorArrReplace','emptyReplace']),
      addContract(e){
        console.log(e)
        if(this.businessSumVal == '' || this.businessSumVal == '0'){
          yu.showToast({
            title: '贷款申请信息未完善，请先完善信息',
            icon: 'none',
            duration: 3000
          });
          setTimeout(()=>{
            this.backpf();
          },3000)
          return false;
        }
        if(e == undefined){
          this.gcSerialNoReplace('');
          if(this.guarantyData != null && this.guarantyData.length > 0){
            yu.showToast({
              title: '已存在担保合同，无法添加，如需新增担保合同，需先删除当前担保合同',
              // image: '/static/images/perfectInformation/success.svg',
              icon: 'none',
              duration: 5000
            });
            return false;
          };
        }else{
          this.gcSerialNoReplace(e.gcSerialNo);
        };
        
        if(this.queryApplyInfoList.otherGuarantorList != null){
          this.viceMortgagorArrReplace(this.queryApplyInfoList.otherGuarantorList);
        }else{
          this.viceMortgagorArrReplace([]);
        }
        this.emptyReplace('guarantyInputList');
        this.queryDictionaryListObjCommit();  //押品中需要用到的数据字典信息
        this.provincesListDataCommit();  //押品中需要用到的省市区地址
        yu.navigateTo({
          url: 'newGuarantyContract',
        });
      },
      backpf(){
        yu.redirectTo({ url: '/pages/ebank/perfectInformation/perfectInformation' })
      }
    }
  }
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  @import '@/static/css/professionwf.less';
  .uni-container{
    background-color: #FFFFFF;
    padding: 30rpx 0;
    .guaranty-content{
      padding: 120rpx 30rpx 0;
      .guaranty-add{  
        background: #FFFFFF;
        box-shadow: 0 0 28rpx 0 rgba(0, 0, 0, 0.11);
        border-radius: 20rpx;
        padding: 25rpx 0;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 42rpx;
          height: 42rpx;
          margin-right: 14rpx;
        }
        span{
          font-size: 28rpx;
          color: #333435;
        }
      }
    }
  }

</style>