<template>
  <view class="information-box">
    <view class="customize-head">
      <view class="ch-title"><text>{{title}}</text></view>
    </view>
    <view v-for="(item,index) in navlist"  :key="index">
      <view class="class-name"><text>{{item.className}}</text></view>
      <view class="pinformations"  v-for="(items,i) in item.classlist" :key="i">
        <view class="pinformation-one">
          <view class="pinformation">
            <view class="pinformation-left">
              <img :src="items.navImg" />
              <view class="word-con">
                <text class="name-word">{{items.productName}}</text>
                <!--<text class="infor-word">{{items.productDesc}}</text>-->
              </view>
            </view>
            <view class="pinformation-right">
              <view @click="pageJump(items.productApplyUrl)" class="apply-botton">申请</view>
              <img @click="pageJump(items.productDetailUrl)" src="@/static/images/firstroom/formChooseArrow.svg" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data: function() {
    return {
      title: "产品",
      navlist:[
        {
          className:"抵押类",
          classlist:[
            {
              navImg:"./static/images/product/firstroomLogo.svg",
              productName:"一手房",
              productDesc:"",
              productApplyUrl:"index/ordinaryQRcode/ordinaryQRcode?from=firstroom",
              productDetailUrl:""
            },
            {
              navImg:"./static/images/product/secondroomLogo.svg",
              productName:"二手房",
              productDesc:"",
              productApplyUrl:"index/ordinaryQRcode/ordinaryQRcode?from=secondroom",
              productDetailUrl:""
            },
          ]
        }
      ],
    };
  },
  created() {},
  computed: {},
  onLoad: function(options) {},
  methods: {
    
  },
  mounted() {},
  activated(){}
};
</script>
<style lang="scss" scoped>
.information-box {
  background: #ffffff !important;
  width: 100%;
  height: 100%;
}
.customize-head {
  padding: 62rpx 56rpx 16rpx 36rpx;
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
    width: 160rpx;
    font-size: 36rpx;
    height: 50rpx;
    line-height: 50rpx;
    margin: 0 auto;
    text-align: center;
    color: #333333;
  }
  .ch-share {
    width: 34rpx;
    height: 34rpx;
    position: absolute;
    top: 50%;
    right: 36rpx;
    margin-top: 8rpx;
    margin-right: -17rpx;
    img {
      width: 34rpx;
      height: 34rpx;
    }
  }
}
.class-name{
  height: 45rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #333435;
  line-height: 45rpx;
  padding-left: 30rpx;
  text-align: left;
  margin-top: 30rpx;
}
.pinformations {
  padding: 30rpx 30rpx 0 30rpx;
  .pinformation-one {
    width: 690rpx;
    height: 160rpx;
    background: #ffffff;
    box-shadow: 0 0 28rpx 0 rgba(0, 0, 0, 0.11);
    border-radius: 20rpx;
  }
  .pinformation {
    height: 160rpx;
    line-height: 160rpx;
    display: block;
    padding-left: 32rpx;
    border-bottom: 1rpx solid #e5e5e5;
  }
  .pinformation:last-child {
    border: 0;
  }
  .pinformation-left {
    height: 160rpx;
    line-height: 160rpx;
    float: left;
    display: flex;
    vertical-align: middle;
    align-items: center;
    img {
      width: 98rpx;
      height: 98rpx;
    }
    .word-con{
      height: 98rpx;
      margin-left: 21rpx;
      text{
        display: block
      }
      .name-word{
        height: 98rpx;
        font-size: 36rpx;
        font-weight: 500;
        color: #333435;
        line-height: 98rpx;
      }
      .infor-word{
        height: 33rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
        line-height: 33rpx;
        margin-top: 8rpx;
      }
    }
    
  }
  .pinformation-right {
    height: 160rpx;
    line-height: 160rpx;
    float: right;
    display: flex;
    vertical-align: middle;
    align-items: center;
    img {
      width: 14rpx;
      height: 28rpx;
      padding-right: 30rpx;
    }
    text {
      height: 33rpx;
      line-height: 33rpx;
      font-size: 24rpx;
      color: #999999;
      margin-right: 14.7rpx;
    }
    text.not-completed {
      color: #e89f73;
    }
    .apply-botton{
      width: 124rpx;
      height: 60rpx;
      background: #FFFFFF;
      border-radius: 35rpx;
      border: 2rpx solid #3B86F7;
      text-align: center;
      line-height: 60rpx;
      font-size: 26rpx;
      font-weight: 500;
      color: #3B86F7;
      margin-right: 32rpx;
    }
  }
}



</style>
