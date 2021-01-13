<template>
  <view class="uni-container">
    <view class="pf-title pf-titleThree">
      <img src="@/static/images/profession/pf-back.svg" @click="backpf">
      <view class="gencies-item">
        <input class="uni-input" 
          placeholder="请输入搜索内容"
          autocomplete="off"
          enterkeyhint="done" 
          v-model="valInput" 
          @focus="focusInput" 
          @blur="blurInput"/>
        <img src="@/static/images/perfectInformation/search.svg" class="imgSearch">
        <view class="imgCross" v-show="imgCross" @click="imgCrossClick">
          <img src="@/static/images/perfectInformation/cross.svg">
        </view>
      </view>
      <text class="pf-text" @click="genciesSearch">搜索</text>
    </view>
    <view class="pf-content gencies-content">
      <view class="gencies-ul">
        <view class="gencies-li" v-for="item in genciesList" :key="item.orgID" @click="toCollateral(item)">
          <view>{{item.orgName}}</view>
          <view>{{item.orgID}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapGetters, mapMutations } from 'vuex';
  export default {
    components: {},
    data() {
      return {
        genciesList: [],
        userID: '',
        orgNameVal: '',
        imgCross: false,
        valInput: '',
      }
    },
    onLoad() {
      // this.userID = '004033';
      this.userID = this.userInfor.loginCode;
      this.queryorginfo();
    },
    onReady() {},
    onShareAppMessage() {},
    computed:{
      ...mapGetters(['userInfor'])
    },
    methods: {
      ...mapMutations(['collateralInputListReplace']),
      queryorginfo(){
        let data = {
          'orgName': this.orgNameVal,  //评估机构名称
          'userID': this.userID,  //客户经理编号
        }
        this.interfaceRequest('/api/lendassessorg/queryorginfo',data,"get",(res)=>{
          console.log(res.data.data)
          this.genciesList = res.data.data.orgResDtoList;
          
        },function(err){
          console.log(err)
        });
      },
      genciesSearch(){
        this.queryorginfo();
      },
      focusInput(e){
        this.imgCross = true;
      },
      blurInput(e){
        this.orgNameVal = e.target.value;
      },
      imgCrossClick(){
        this.valInput = '';
        this.imgCross = false;
      },
      //返回
      backpf(){
        // yu.navigateBack();
        yu.navigateTo({
          url: 'collateral',
        });
      },
      toCollateral(e){
        console.log(e)
        this.collateralInputListReplace({
          'key': `dcurrevalOrgNameVal`,
          'value': e.orgName,
        });
        this.collateralInputListReplace({
          'key': `dcurrevalOrgIDVal`,
          'value': e.orgID,
        });
        yu.navigateTo({
          url: 'collateral',
        });
      },

    }
  }
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  @import '@/static/css/professionwf.less';
  .uni-container{
    background-color: #FFFFFF;
    padding: 30rpx 0;
    .gencies-content{
      .gencies-ul{
        padding-left: 30rpx;
        .gencies-li{
          padding: 20rpx 0 20rpx 10rpx;
          border-bottom: 2rpx solid #E5E5E5;
          uni-view:first-of-type{
            font-size: 32rpx;
            color: #333435;
          }
          uni-view:last-of-type{
            font-size: 24rpx;
            color: #999999;
          }
        }
      }
    }
  }

</style>