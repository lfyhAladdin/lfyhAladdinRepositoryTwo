<template>
  <view class="pending-order">
    <view :class="phoneSystem ? 'pf-title pf-title-ios pf-titleTwo pf-titleTwo-ios':'pf-title pf-titleTwo'">
      <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
      <text>{{title}}</text>
    </view>
    <view class="orderlist">
      <view class="order" v-for="(orderOne,index) in orderlist" :key="index">
        <view class="order-title">
          <text class="text-left">{{orderOne.businessTypeName}}</text><text class="text-right">待确认</text>
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
              <text class="infor-value">{{orderOne.orderDate}}</text>
            </view>
          </view>
        </view>
        <view class="order-handle">
          <view class="handle" @click="handleOrder($event,orderOne.orderNo,orderOne.businessTypeId,orderOne.projectNo)">
            <img src="@/static/images/handle-logo.svg"><text>处理</text>
          </view>
          <view class="dial"><a @tap="call(orderOne.phoneNo)"><img src="@/static/images/dial-logo.svg"><text>拨号</text></a></view>
        </view>
      </view>
      
      <!--加载更多提示-->
      <uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
    </view>
    <view class="no-record" v-show="ifShowNoRecord">
      <view class="no-record-img"><img src="@/static/images/noRecord.svg"></view>
      <view class="no-record-text"><text>暂无记录~哦~</text></view>
    </view>
  </view>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import filter from "@/utils/filters";
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
  components: {uniLoadMore},
  data: function() {
    return {
      title: "待确认订单",
      orderlist: [],//订单列表
      ifShowNoRecord: false,//订单为空时显示效果
      businessTypeList:[],//产品列表集合
      beginNo: 1, //起始笔数
      totalNo: 15, //查询笔数
      status:'more',
      ajaxJudge:true,
      contentText: {
        contentdown: '上拉加载更多',  //more
        contentrefresh: '加载中',  //loading
        contentnomore: '没有更多',  //noMore
      },
      reachBottom:true,//是否允许上拉加载
    };
  },
  computed: {
    ...mapGetters(["approvalIngList","userInfor"])
  },
  onLoad() {
    this.inquireOrderList();
  },
  created(){
    let _this=this;
    /****产品列表集合获取   start */
    let posturl="/api/dictionary/queryDictionaryList";
    let param={"dictionaryName": "businessType"};
    _this.interfaceRequest(
      posturl,
      param,
      "GET",
      function(res) {
        let result=res.data.data;
        _this.businessTypeList=result;
      },
      function(err) {}
    );
    /****产品列表集合获取   end */
  },
  //下拉的生命周期
  onPullDownRefresh() {
    console.log('下拉刷新')
    this.pullRefresh();
  },
  //页面滚动到底部的事件 -- 上拉加载
  onReachBottom(){
    console.log('上拉加载')
    this.GJGCRefreshFooter();
  },
  methods: {
    ...mapActions(["businessNumCommit"]),
    ...mapMutations(["approvalIngListReplace"]),
      ...mapActions(['queryApplyInfoCommit']),
    // 调用拨号功能
    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },

    //处理订单操作
    handleOrder(e, no, ty, cn) {
      let that = this;
      let orderId = no;
      let businessType = ty;
      let projectID = cn;
      let applyID="";
      let orderData = {
        orderNo: orderId,
        businessType: businessType,
        projectID: projectID
      };
      let posturl = "/api/ordercreditapply/createcreditapply";
      that.interfaceRequest(
        posturl,
        orderData,
        "post",
        function(res) {
          console.log("处理订单成功");
          console.log(res.data.data.applyNo);
          applyID=res.data.data.applyNo;
          //数量更新
          let e = {
            orderNo: "",
            serialNo: applyID,
            fromProductTitle: that.title,
            fromProductId: that.productId,
            fromProductName: that.productName,
            imageList: {
              imageBatchNo: that.imgBatchNumber,
              upLoadDate: that.imgFirstUploadTime
            },
            businessType2: that.title,
          };
          that.approvalIngListReplace(e);
          let datas = {
            userID: that.userInfor.loginCode, //客户经理编号
            orgID: that.userInfor.orgId //客户经理所属机构编号
          };
          that.businessNumCommit(datas);

          uni.showModal({
            title: "办理成功",
            content: "点击确定，立即完善该业务",
            success: function(res) {
              if (res.confirm) {
                // that.getApplyInfor(orderId,applyID);
                that.queryApplyInfoCommit({
                  'orderNo': this.orderNoVal, 
                  'applyNo': applyID,
                  'routerTrue': true,
                  'routerTo': '/pages/ebank/perfectInformation/perfectInformation',
                  'routerJumpWay': 'navigateTo'
                }); //重新调'申请信息查询'接口
                
                // that.queryApplyInfoCommit({
                //   orderNo: orderId,
                //   applyNo: applyID
                // });
                // setTimeout(()=>{
                //   yu.navigateTo({ url: '/pages/ebank/perfectInformation/perfectInformation' });
                // },1500)
              } else if (res.cancel) {
                console.log("用户点击取消");
                that.ajaxJudge= true;
                that.reachBottom = true;
                that.status= "more"
                that.beginNo = 1;
                that.inquireOrderList();
              }
            }
          });
        },
        function(err) {}
      );
    },
    //获取申请信息
    // getApplyInfor(orderNo,applyID){
    //   let _this=this;
    //   let data={
    //     orderNo:orderNo,
    //     applyNo:applyID,
    //   };
    //   _this.interfaceRequest(
    //     '/api/credit/queryApplyInfo',
    //     data,
    //     "get",
    //     function(res) {
    //       let result=res.data.data;
    //       console.log(result);
    //       _this.approvalIngListReplace(result);
    //     },
    //     function(err) {}
    //   );
    // },
    inquireOrderList() {
      let that = this;
      let userInfo = {
        sortCode: "",
        filterCode: "",
        beginNo: that.beginNo,
        totalNo: that.totalNo
      };

      userInfo.userId = that.userInfor.loginCode;
      userInfo.orgID = that.userInfor.orgId;

      /**订单列表 ****start*****/
      let posturl = "/api/orderListQuery/queryOrderList";
      that.interfaceRequest(
        posturl,
        userInfo,
        "post",
        function(res) {
          let resArr = res.data.data.businessList;
          //无订单信息
          if(that.beginNo == 1 && resArr == null){
            that.ifShowNoRecord = true;
          }
          if(resArr != null){
            that.ifShowNoRecord = false;
            for (let i = 0; i < resArr.length; i++) {
              resArr[i].businessTypeId = resArr[i].businessType;
              resArr[i].phoneNoF = filter.telFormat(resArr[i].phoneNo); //格式化手机号
              resArr[i].businessSumF = filter.moneyUnit(
                filter.moneyFormat(resArr[i].businessSum),
                true
              ); //格式化金额
              resArr[i].certIdHide = filter.cardIDNoHideFormat(
                resArr[i].certId
              ); //隐藏身份证中间位数
              resArr[i].beginDateF = filter.dateFormat(resArr[i].beginDate); //格式化时间
              resArr[i].businessTypeName = that.businessTypeList[resArr[i].businessType];
              
            }
          }
          that.dataProcessing(resArr);
          
        },
        function(err) {}
      );
      /**订单列表 ****end*****/
    },
    //对请求后的数据处理
      dataProcessing(resArr){
        
        console.log(resArr)
        yu.stopPullDownRefresh();  //停止下拉刷新
        if(this.ajaxJudge){
          console.log(123)
          if(resArr.indexOf("null") == -1){
            if(resArr.length < this.totalNo){
              this.status= 'noMore';
              this.reachBottom= false;
            }else{
              this.status = 'more';
            }
            this.orderlist=resArr;
            this.ajaxJudge = false;
            this.$forceUpdate();  //强制页面刷新
          }else{
            this.status= 'noMore';
            this.reachBottom= false;
          }
        }else{
          console.log(456)
          if(resArr != null){
            this.orderlist=this.orderlist.concat(resArr);
            this.status= 'more';
          }else{
            this.orderlist = this.orderlist.concat([]);
            this.status = 'noMore';
            this.reachBottom = false;
          }
        };
      },
    //上拉加载
    GJGCRefreshFooter(){
      if(this.reachBottom){
        if(this.status != "loading"){
          this.beginNo += this.totalNo;
          this.status= 'loading';
          this.inquireOrderList();
        }else{
          console.log("正在加载中，不允许上拉加载")
        }
      }else{
        console.log("没有更多数据，不允许上拉加载")
      }
    },
    //下拉刷新
    pullRefresh(){
      this.ajaxJudge= true;
      this.reachBottom = true;
      this.status= "more"
      this.beginNo = 1;
      this.inquireOrderList();
    },
    //拨打电话
    call(num) {
      uni.makePhoneCall({
        phoneNumber: num
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.no-record {
  width: 100%;
  height: 100%;
  padding-top: 361rpx;
  .no-record-img {
    width: 100%;
    height: 262rpx;
    text-align: center;
    img {
      width: 385rpx;
      height: 262rpx;
      margin: 0 auto;
    }
  }
  .no-record-text {
    width: 100%;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 40rpx;
    display: block;
    margin-top: 32rpx;
    text-align: center;
    text {
      line-height: 40rpx;
      display: block;
      text-align: center;
    }
  }
}

uni-view {
  line-height: 0;
  font-size: 0;
}
.pending-order {
  background: #ffffff !important;
  width: 100%;
  height: 100%;
}
.customize-head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 62rpx 36rpx 18rpx 0;
  height: 50rpx;
  line-height: 50rpx;
  background: #ffffff;
  display: flex;
  vertical-align: middle;
  align-items: center;
  border-bottom: 1rpx solid #e5e5e5;
  .ch-img {
    position: absolute;
    left: 0;
    top: 69rpx;
    width: 20rpx;
    height: 36rpx;
    margin-left: 36rpx;
    img {
      width: 20rpx;
      height: 36rpx;
    }
  }
  .ch-title {
    font-size: 36rpx;
    height: 50rpx;
    line-height: 50rpx;
    margin: 0 auto;
    text-align: center;
    color: #333333;
  }
}
.orderlist {
  padding: 154rpx 30rpx 0 30rpx;
  .order {
    width: 658rpx;
    /**height: 512rpx; */
    background: #ffffff;
    box-shadow: 0 0 28rpx 0 rgba(0, 0, 0, 0.11);
    border-radius: 20rpx;
    margin-bottom: 24rpx;
    padding-left: 32rpx;
    .order-title {
      padding: 0rpx 16rpx 0rpx 27rpx;
      height: 72rpx;
      line-height: 72rpx;
      border-bottom: 1rpx solid #e5e5e5;
      .text-left {
        height: 33rpx;
        line-height: 33rpx;
        font-size: 24rpx;
        color: #333345;
        text-align: left;
        float: left;
        margin: 20rpx 0rpx;
      }
      .text-right {
        height: 33rpx;
        line-height: 33rpx;
        font-size: 24rpx;
        color: #e89f73;
        text-align: right;
        float: right;
        margin: 19.5rpx 0rpx;
      }
    }

    .order-con {
      padding-left: 16rpx;
      border-bottom: 1rpx solid #e5e5e5;
      .order-con-title {
        height: 45rpx;
        line-height: 45rpx;
        margin-top: 20rpx;
        margin-bottom: 17rpx;
        .person-name {
          
          height: 45rpx;
          line-height: 45rpx;
          display: inline-block;
          text-align: left;
          font-size: 32rpx;
          color: #333333;
          margin-right: 21rpx;
        }
        .person-idcard {
          height: 37rpx;
          line-height: 37rpx;
          text-align: left;
          font-size: 26rpx;
          color: #999999;
        }
      }
      .order-con-infor {
        margin: 21rpx 0rpx;
        .infor {
          display: block;
          .infor-name {
            width: 104rpx;
            font-size: 26rpx;
            height: 48rpx;
            line-height: 48rpx;
            color: #999999;
            margin-right: 70rpx;
            display: inline-flex;
            vertical-align: top;
            align-items: center;
          }
          .infor-value {
            width: 436rpx;
            font-size: 26rpx;
            line-height: 48rpx;
            color: #151617;
            display: inline-block;
          }
        }
      }
    }

    .order-handle {
      padding: 16rpx 0rpx 18rpx 0rpx;
      display: block;
      .dial {
        width: 150rpx;
        height: 60rpx;
        line-height: 60rpx;
        background: #ffffff;
        border: 1rpx solid #e5e5e5;
        border-radius: 35rpx;
        font-size: 24rpx;
        color: #666666;
        float: right;
        margin-left: 30rpx;
        display: flex;
        vertical-align: middle;
        align-items: center;
        a{
          width: 150rpx;
          height: 60rpx;
          text-decoration:none
        }
        img {
          margin-left: 34.2rpx;
          width: 24.5rpx;
          height: 24.5rpx;
        }
        text {
          height: 33rpx;
          line-height: 33rpx;
          font-size: 24rpx;
          color: #666666;
          margin-left: 6.2rpx;
        }
      }
      .handle {
        width: 150rpx;
        height: 60rpx;
        line-height: 60rpx;
        background: #ffffff;
        border: 1rpx solid #3b86f7;
        border-radius: 35rpx;
        font-size: 24rpx;
        color: #3b86f7;
        float: right;
        margin: 0 30rpx;
        display: flex;
        vertical-align: middle;
        align-items: center;
        img {
          margin-left: 34.2rpx;
          width: 24.5rpx;
          height: 24.5rpx;
        }
        text {
          height: 33rpx;
          line-height: 33rpx;
          font-size: 24rpx;
          color: #3b86f7;
          margin-left: 6.2rpx;
        }
      }
    }
    .order-handle:after {
      display: block;
      content: "";
      clear: both;
    }
  }
  .order:after {
    display: block;
    content: "";
    clear: both;
  }
}
.orderlist:after {
  display: block;
  content: "";
  clear: both;
}
</style>
