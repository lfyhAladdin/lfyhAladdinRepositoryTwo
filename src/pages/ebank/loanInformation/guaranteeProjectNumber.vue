<template>
  <view class="pending-order">
    <view class="customize-head">
      <view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
      <view class="ch-title"><text>{{title}}</text></view>
    </view>
  
<view class="project-number">
              <view class="project-content">
                <text>项目编号：</text>
                <text>000001</text>
              
                    <label class="project-checked">
                        <checkbox value="cb" checked="true" />
                    </label>
                
              </view>
              <view class="project-number-text">
                <text class="project-number-con">项目名称</text>
                <text>我我我我是是项目名称</text>
              </view>
             
 </view>


  </view>
</template>
<script>
import { appEnv } from '@/config/app.config';
import filter from '@/utils/filters'
export default {
  data: function(){
    return {
      title: "核心项目编号",
      
    
    
    
    }
  },
  onLoad(){
   


  },
  methods: {
   
    //返回上一页
    navigateBack(){
      uni.navigateBack();
    },
  },
}
</script>

<style lang="scss" scoped>
.pending-order{
  background: #ffffff !important;
  width: 100%;
  height: 100%;
}
.customize-head{
  padding: 16rpx 56rpx 16rpx 36rpx;
  height: 50rpx;
  line-height: 50rpx;
  background: #ffffff;
  display: flex;
  vertical-align: middle;
  align-items: center;
  position: relative;
  border-bottom: 2rpx solid #E5E5E5;
  .ch-img{
    width: 20rpx;
    height: 36rpx;
    img{
      width: 20rpx;
      height: 36rpx;
    }
  }
  .ch-title{
    font-size: 36rpx;
    height: 50rpx;
    line-height: 50rpx;
    margin:0 auto;
    text-align: center;
    color: #333333;
    font-weight: 600;
  }
  
}
.project-number{
  margin:20rpx 30rpx;
  padding:30rpx 30rpx 33rpx;
  margin-bottom: 24rpx;   
  background: #FFFFFF;
  box-shadow: 0 0 28rpx 0 rgba(0, 0, 0, 0.11);
  border-radius: 20rpx;
  .project-content{
    height: 45rpx;
    line-height: 45rpx;
    font-weight: 600;
    font-size: 32rpx;
    .project-checked{
      float: right;
    }
  }
  .project-number-text{
    height: 33rpx;
    line-height: 33rpx;
    font-size: 24rpx;
     .project-number-con{
       color: #999999;
       margin-right: 111rpx;
     }
  }
}

</style>
