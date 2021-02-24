<template>
  <view class="uni-container">
    <view :class="phoneSystem ?'pf-title pf-title-ios pf-titleThree':'pf-title pf-titleThree'">
      <img src="@/static/images/profession/pf-back.svg" @click="backpf">
      <text>选择抵押人</text>
      <text class="pf-text" @click="backContract">确定</text>
    </view>
    <view class="mortgagor-content" :class="phoneSystem ?'pf-content-ios':'pf-content'">
      <view class="guaranty-ul">
        <view class="mortgagor-title">其他担保人</view>
        <view class="guaranty-li" v-for="(item,index) in viceMortgagorList" :key="item.certId">
          <view class="guaranty-liTop">
            <view class="guaranty-liTopOne">
              <!--<view>{{item.guarantorName}}</view>-->
              <view>{{item.customerName}}</view>
              <view @click="viceMortgagorCheck(item,index)">
                <radio :checked="item.radioCheck"/>
              </view>
            </view>
            <view>证件号码 {{item.certID2}}</view>
          </view>
        </view>
        <!-- <view class="guaranty-li">
          <view class="guaranty-liTop">
            <view class="guaranty-liTopOne">
              <view>赵长欣<text class="guaranty-liPer guaranty-liPerDBR">担保人</text></view>
              <view>
                <radio :checked="radioCheck"/>
              </view>
            </view>
            <view>证件号码 410781 1990 080</view>
          </view>
        </view> -->
        
      </view>
    </view>
    
  </view>
</template>
  
<script>
  import filter from '@/utils/filters';  //格式化金额、证件号等
  import { mapGetters, mapMutations } from 'vuex';
  import {RSAdecode} from '@/static/js/util.js'
  export default {
    components: {},
    data() {
      return {
        viceMortgagorList: [],
        imgCross: false,
        applyPhase: '01',  //区分：合同01 押品02
      }
    },
    onLoad(options) {
      // this.queryDictionaryListAjax();  //--暂不展示
      this.applyPhase = options.applyPhase;
      console.log(this.queryApplyInfoList)
      this.mortgagorConcat();
    },
    onShareAppMessage() {},
    created(){},
    computed:{
      ...mapGetters(['gcSerialNo','queryApplyInfoList','viceMortgagorArr','ypviceMortgagorArr'])
    },
    methods: {
      ...mapMutations(['viceMortgagorArrReplace','ypviceMortgagorArrReplace']),
      //担保人关联人 与 担保人信息 合并
      mortgagorConcat(){
        // let guarantorListArr = [];
        // if(this.applyPhase == '01'){
        //   guarantorListArr = this.queryApplyInfoList.otherGuarantorList;
        // }else{
        //   guarantorListArr = this.queryApplyInfoList.otherClrList;
        // }
        let guarantorListArr = this.queryApplyInfoList.otherCustomerList;
        if(guarantorListArr != null){
          guarantorListArr.forEach((val)=>{
            val.radioCheck = false;
          });
          // this.viceMortgagorList = JSON.parse(JSON.stringify(guarantorListArr));
          let listArr = guarantorListArr.concat();
          listArr.forEach(item=>{
            item.certID2 = RSAdecode(item.certID);
          })
          this.viceMortgagorList = listArr;
        }
      },
      viceMortgagorCheck(item,index){
        this.viceMortgagorList[index].radioCheck = !this.viceMortgagorList[index].radioCheck;
        // this.$forceUpdate();  //强制页面刷新
        let arr = this.viceMortgagorList.filter((item)=> item.radioCheck);
        // console.log(arr)
        let arr2 = [];
        arr.forEach((item)=>{
          // arr2.push({
          //   'gcSerialNo': this.gcSerialNo,
          //   'guarantorName': item.guarantorName,
          //   'certID': item.certID,
          //   'certType': item.certType
          // })
          arr2.push({
            'gcSerialNo': this.gcSerialNo,
            'guarantorName': item.customerName,
            'certID': item.certID,
            'certType': item.certType
          })
        });
        // console.log(arr2)
        if(this.applyPhase == '01'){
          this.viceMortgagorArrReplace(arr2);
        }else{
          this.ypviceMortgagorArrReplace(arr2);
        }
      },
      //返回
      backpf(){
        yu.navigateBack();
      },
      //确定
      backContract(){
        let arr1 = this.viceMortgagorList.filter((item)=>item.radioCheck);
        if(arr1.length <= 0){
          yu.showModal({
            content: '未选择抵押人',
            showCancel: false,
            cancelText: "确定",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
            }
          });
          return;
        }
        if(this.applyPhase == '01'){
          yu.navigateTo({
            url: 'newGuarantyContract',
          });
        }else{
          yu.navigateTo({
            url: 'collateral',
          });
        }
        // this.backpf();

      },
       
    }
  }
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  .uni-container{
    padding: 0 0 30rpx 0;
    .mortgagor-content{
      .mortgagor-title{
        padding: 30rpx 0 0 0;
        line-height: 32rpx;
        font-size: 32rpx;
        color: #333435;
      }
      .guaranty-ul{
        padding: 2rpx 30rpx 0 30rpx;
        .guaranty-li{
          .guaranty-liTop{
            margin-right: 0;
            .guaranty-liPer{
              font-size: 22rpx;
              margin-left: 10rpx;
              padding: 2rpx 10rpx;
              border-radius: 6rpx;
            }
            .guaranty-liPerJKR{  //借款人
              color: #8D9CA5;
              background-color: #E8F6FF;
            }
            .guaranty-liPerDBR{  //担保人
              color: #ECB391;
              background-color: #FFF1E9;
            }
              
          }
          
        } 
      }
    }
  }
</style>
