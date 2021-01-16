<template>
  <view>
    <uni-drawer ref="pfSearch" mode="right" :maskClick="maskClick" :width="290" @change="drawerChange">
      <view class="pfSearchBox">
        <view class="pfSearch-ul">
          <view class="pfSearch-title">业务状态</view>
          <view class="pfSearch-li">
            <text 
              v-for="item in serviceStates" 
              :key="item.id"
              :class="applyPhaseVal==item.id? 'pfSearch-active' : ''"
              @click="serviceStatesText(item.id)">{{item.title}}</text>
            <!-- <text>审批否决</text>
            <text>授信审批中</text>
            <text>审批通过</text> 
            <text>人工定价审批中</text> -->
          </view>
        </view>
        <view class="pfSearch-ul" v-if="JSON.stringify(pfSearchBusiness) != '{}'">
          <view class="pfSearch-title">产品种类</view>
          <view class="pfSearch-li">
            <text 
              v-for="(item,index) in pfSearchBusiness" 
              :key="index"
              :class="businessType==index? 'pfSearch-active' : ''"
              @click="productCategoriesText(index)">{{item}}</text>
          </view>
        </view>
        <view class="pfSearch-ul">
          <view class="pfSearch-title">搜索条件</view>
          <view class="pfSearch-li">
            <input class="uni-input" placeholder="请输入借款人姓名/手机号/身份证" v-model="filterCode"/>
          </view>
        </view>
      </view>
      <view class="contract-button">
        <button type="primary" plain="true" @click="pfreset">重置</button>
        <button type="primary" @click="pfSearchClick">确定</button>
      </view>
    </uni-drawer>
  </view>
</template>

<script>
  import uniDrawer from "@/components/uni-drawer/uni-drawer.vue";
  import uniTag from "@/components/uni-tag/uni-tag.vue";

  export default {
    components: {
      uniDrawer,
      uniTag
    },
    data() {
      return {
        maskClick: true,  //点击遮罩是否可以关闭
        serviceStates: this.serviceStatesType,  //业务状态
        businessType: '1140010',
        filterCode: '',  //模糊搜索框
        applyPhaseVal: this.applyPhase,
      };
    },
    props:{
      switchDrawer: Boolean,
      applyPhase: String,
      pfSearchBusiness: Object, //产品种类
      serviceStatesType: Array,
    },
    watch: {
      switchDrawer(val,oldVal){
        if(val){
          this.show();
        }else{
          this.close();
        }
      },
      applyPhase(val){
        this.applyPhaseVal = this.applyPhase;
      }
    },
    computed:{},
    onLoad() {},
    onReady() {},
    onShareAppMessage() {},
    methods: {
      // 打开窗口
			show() {
				this.$refs.pfSearch.open();
			},
			// 关闭窗口
			close() {
				this.$refs.pfSearch.close()
			},
      //业务状态选择
      serviceStatesText(e){
        console.log(e)
        this.applyPhaseVal = e;
      },
      //产品种类选择
      productCategoriesText(e){
        // console.log(e)
        this.businessType = e;
      },
      //确定
      pfSearchClick(){
        this.close();
        let obj = {
          applyPhase : this.applyPhaseVal,
          businessType: this.businessType,
          filterCode: this.filterCode
        }
        this.$emit("professionSearch",obj)
      },
      //重置
      pfreset(){
        this.applyPhaseVal = this.applyPhase;
        this.businessType = '1140010';
        this.filterCode = '';
      },
      drawerChange(e){
        console.log(e)
        if(!e){
          this.$emit("changeSearch",false)
        }
      }
    }
  };
</script>
<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  @import '@/static/css/professionwf.less';

  .pfSearchBox{
    padding: 130rpx 0 0 24rpx;
    .pfSearch-ul{
      margin-bottom: 20rpx;
      .pfSearch-title{
        font-size: 26rpx;
        color: #333435;
      }
      .pfSearch-li{
        padding: 16rpx 0 6rpx;
        border-bottom: 2rpx solid #E5E5E5;
        uni-text{
          display: inline-block;
          font-size: 26rpx;
          padding: 10rpx 28rpx;
          margin: 0 16rpx 16rpx 0;         
          background: #F7F8F9;
          color: #666666;
          border-radius: 8rpx;
          line-height: 56rpx;
        }
        .pfSearch-active{
          background: #EDF4FF;
          color: #3B86F7;
        }
        .uni-input{
          padding: 10rpx 28rpx;  
          background: #F7F8F9;
          border-radius: 8rpx;
          border: 2rpx solid #E5E5E5;
          margin-right: 48rpx;
          .uni-input-placeholder{
            color: #E5E5E5;
          }
        }
      }
    }
    .pfSearch-ul:last-of-type .pfSearch-li{
      border-bottom: none;
    }
  }
  .contract-button{
    display: flex;
    padding: 100rpx 0 0;
    uni-button{
      width: 40%;
      margin: 0 0 0 7%;
    }
  }
</style>
