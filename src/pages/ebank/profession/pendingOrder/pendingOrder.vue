<template>
  <view class="pending-order">
    <view class="customize-head">
      <view class="ch-img" @tap="navigateBack"><img src="/static/images/firstroom/backArrow.svg" /></view>
      <view class="ch-title"><text>{{title}}</text></view>
    </view>

    <view class="orderlist">
      <view class="order" v-for="(orderOne,index) in orderlist" :key="index">
        <view class="order-title">
          <text class="text-left">{{orderOne.businessType}}</text><text class="text-right">待确认</text>
        </view>
        <view class="order-con">
          <view class="order-con-title">
            <text class="person-name">{{orderOne.customerName}}</text>
            <text class="person-idcard">{{orderOne.certIdHide}}</text>
          </view>
          <view class="order-con-infor">
            <view class="infor">
              <text class="infor-name">楼盘名称</text>
              <text class="infor-value">{{orderOne.projectName}}</text>
            </view>
            <view class="infor">
              <text class="infor-name">贷款金额</text>
              <text class="infor-value">{{orderOne.businessSumF}}</text>
            </view>
            <view class="infor">
              <text class="infor-name">手机号码</text>
              <text class="infor-value">{{orderOne.phoneNoF}}</text>
            </view>
            <view class="infor">
              <text class="infor-name">订单编号</text>
              <text class="infor-value">{{orderOne.orderNo}}</text>
            </view>
            <view class="infor">
              <text class="infor-name">申请时间</text>
              <text class="infor-value">{{orderOne.beginDateF}}</text>
            </view>
          </view>
        </view>
        <view class="order-handle">
          <view class="handle" @click="handleOrder($event,orderOne.orderNo,orderOne.businessTypeId,orderOne.projectNo)">
            <img src="/static/images/handle-logo.svg"><text>处理</text>
          </view>
          <view class="dial"><img src="/static/images/dial-logo.svg"><text @click="callPhone(orderOne.phoneNo)">拨号</text></view>
        </view>
      </view>
    </view>


    <view class="no-record">
      <img src="/static/images/noRecord.svg">
      <text>暂无记录~哦~</text>
    </view>
  </view>
</template>
<script>
import { appEnv } from '@/config/app.config';
import filter from '@/utils/filters'
export default {
  data: function(){
    return {
      title: "待确认订单",
      orderlist:[]
    }
  },
  onLoad(){
    let that=this;
    let userInfo={
      sortCode:'',
      filterCode:'',
      beginNo:'1',
      totalNo:'4'
    };
      yu.getStorage({
        key:'userInfo',
        success: (res) => {
          userInfo.userId=res.data.loginCode;
          userInfo.orgID=res.data.orgId;
        }
      });
      /**订单列表 ****start*****/
      let posturl="/api/orderListQuery/queryOrderList";
      that.interfaceRequest(posturl,userInfo,"post",function(res){
        let resArr=res.data.data.businessList;
        console.log(resArr);
        if(resArr != null){
          $(".no-record").hide();
          for(let i=0; i < resArr.length; i++){
            resArr[i].businessTypeId=resArr[i].businessType;
            resArr[i].phoneNoF=filter.telFormat(resArr[i].phoneNo);//格式化手机号
            resArr[i].businessSumF=filter.moneyUnit(filter.moneyFormat(resArr[i].businessSum),true);//格式化金额
            resArr[i].certIdHide=filter.cardIDNoHideFormat(resArr[i].certId);//隐藏身份证中间位数
            resArr[i].beginDateF=filter.dateFormat(resArr[i].beginDate);//格式化时间
            that.queryDictionaryValue({"dictionaryName":"businessType","key":resArr[i].businessType},function(datas){
              resArr[i].businessType=datas.data.data;
            });
          }
        }else{
          $(".no-record").show();
        }
        that.orderlist=resArr;
      },function(err){

      });
      /**订单列表 ****end*****/
  },
  methods: {
    callPhone (phoneNumber) {
        window.location.href = 'tel://' + phoneNumber
    },
    //返回上一页
    navigateBack(){
      uni.navigateBack();
    },

    //处理订单操作
    handleOrder(e,no,ty,cn){
      let that=this;
      let orderId=no;
      let businessType=ty;
      let projectID=cn;
      let orderData={
        orderNo:orderId,
        businessType:businessType,
        projectID:projectID,

      };
      let posturl="/api/ordercreditapply/createcreditapply";
      that.interfaceRequest(posturl,orderData,"post",function(res){
        console.log('处理订单成功');
        console.log(res);
      },function(err){

      });
    }
  },
}
</script>

<style lang="scss" scoped>
uni-view{
  line-height: 0;
  font-size: 0;
}
.pending-order{
  background: #ffffff !important;
  width: 100%;
  height: 100%;
}
.customize-head{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 62rpx 56rpx 16rpx 36rpx;
  height: 50rpx;
  line-height: 50rpx;
  background: #ffffff;
  display: flex;
  vertical-align: middle;
  align-items: center;
  position: relative;
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
  }
  .ch-share{
    width: 34rpx;
    height: 34rpx;
    position: absolute;
    top: 50%;
    right: 36rpx;
    margin-top: -17rpx;
    margin-right: -17rpx;
    img{
      width: 34rpx;
      height: 34rpx;
    }
  }
}

.orderlist{
  margin: 152rpx 30rpx 0 30rpx;
  .order{
    width: 658rpx;
    /**height: 512rpx; */
    background: #FFFFFF;
    box-shadow: 0 0 28rpx 0 rgba(0,0,0,0.11);
    border-radius: 20rpx;
    margin-bottom: 24rpx;
    padding-left: 32rpx;
    .order-title{
      padding: 0 16rpx 0 27rpx;
      height: 72rpx;
      line-height: 72rpx;
      border-bottom: 1rpx solid #e5e5e5;
      .text-left{
        height: 33rpx;
        line-height: 33rpx;
        font-size: 24rpx;
        color: #333345;
        text-align: left;
        float: left;
        margin:20rpx 0;
      }
      .text-right{
        height: 33rpx;
        line-height: 33rpx;
        font-size: 24rpx;
        color: #E89F73 ;
        text-align: right;
        float: right;
        margin:19.5rpx 0;
      }
    }

    .order-con{
      padding-left: 16rpx;
      border-bottom: 1rpx solid #e5e5e5;
      .order-con-title{
        height: 45rpx;
        line-height: 45rpx;
        margin-top: 20rpx;
        margin-bottom: 17rpx;
        .person-name{
          width: 96rpx;
          height: 45rpx;
          line-height: 45rpx;
          display: inline-block;
          text-align: left;
          font-size: 32rpx;
          color: #333333;
          margin-right: 21rpx;
        }
        .person-idcard{
          height: 37rpx;
          line-height: 37rpx;
          text-align: left;
          font-size: 26rpx;
          color: #999999;
        }
      }
      .order-con-infor{
        margin: 21rpx 0;
        .infor{
          display: block;
          .infor-name{
            width: 104rpx;
            font-size: 26rpx;
            height: 48rpx;
            line-height: 48rpx;
            color: #999999;
            margin-right: 70rpx;
            display:inline-flex;
            vertical-align: top;
            align-items: center;
          }
          .infor-value{
            width: 436rpx;
            font-size: 26rpx;
            line-height: 48rpx;
            color: #151617;
            display: inline-block;
          }
        }
      }
    }


    .order-handle{
      margin: 16rpx 0 18rpx 0;
      display: block;
      .dial{
        width: 150rpx;
        height: 60rpx;
        line-height: 60rpx;
        background: #FFFFFF;
        border: 1rpx solid #E5E5E5;
        border-radius: 35rpx;
        font-size: 24rpx;
        color: #666666;
        float: right;
        margin-left: 30rpx;
        display: flex;
        vertical-align: middle;
        align-items: center;
        img{
          margin-left: 34.2rpx;
          width: 24.5rpx;
          height: 24.5rpx;
        }
        text{
          height: 33rpx;
          line-height: 33rpx;
          font-size: 24rpx;
          color: #666666;
          margin-left: 6.2rpx;
        }
      }
      .handle{
        width: 150rpx;
        height: 60rpx;
        line-height: 60rpx;
        background: #FFFFFF;
        border: 1rpx solid #3b86f7;
        border-radius: 35rpx;
        font-size: 24rpx;
        color: #3b86f7;
        float: right;
        margin:0 30rpx;
        display: flex;
        vertical-align: middle;
        align-items: center;
        img{
          margin-left: 34.2rpx;
          width: 24.5rpx;
          height: 24.5rpx;
        }
        text{
          height: 33rpx;
          line-height: 33rpx;
          font-size: 24rpx;
          color: #3b86f7;
          margin-left: 6.2rpx;
        }
      }
    }
    .order-handle:after{
      display: block;
      content: "";
      clear: both;
    }
  }
  .order:after{
    display: block;
    content: "";
    clear: both;
  }
}
.orderlist:after{
  display: block;
  content: "";
  clear: both;
}

/* 无记录 */
.no-record{
  width: 100%;
  height: 100%;
  padding-top: 131rpx;
  text-align: center;
  display: none;
  img{
    width: 386rpx;
    height: 262rpx;
    margin: 0 auto;
  }
  text{
    width: 386rpx;
    margin-top: 32rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 40rpx;
    display: block;
    margin: 0 auto;
  }
}
</style>
