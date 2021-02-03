<template>
  <view class="uni-container">
    <view class="pf-poifixed">
      <view :class="phoneSystem ?'pf-title pf-title-ios pf-titleThree':'pf-title pf-titleThree'">
        <img src="@/static/images/profession/pf-back.svg" @click="backpf">
        <text>发放支付</text>
        <img src="@/static/images/profession/pf-screening.svg" class="pf-imgRig" @click="searchpf">
      </view>
      <view class="appro-fix">
        <!--tab页签-->
        <scroll-view 
          class="appro-tab" 
          scroll-x="true"
          scroll-left="0" 
          show-scrollbar="false"
          scroll-with-animation="true"
          :scroll-into-view="`applyPhase${applyPhase}`">
          <view 
            v-for="item in tabTitle" 
            :key="item.id" 
            :id="`applyPhase${item.id}`"
            :class="item.id == applyPhase ? 'appro-box tab-active' : 'appro-box'"
            @click="tabClick(item.id)">
            <view class="active-text">{{item.title}}</view>
            <view class="active"></view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="pf-content appro-content">
      
      <!--tab页签内容-->
      <view class="tab-ul">
        <!-- <view class="tab-li" v-for="item in tabArr[applyPhase]" :key="applyPhase == '05'? item.orderNo : item.putoutNo">-->
        <view class="tab-li" v-for="(item,index) in tabArr[applyPhase]" :key="index"  @click="toPaymentDetail(item)">
          <view class="tab-li-features">
            <view>{{item.businessType2}}</view>
            <view class="tab-color-orange">{{applyPhase == '05'? '待处理放款' : item.phaseName}}</view>
          </view>
          <view class="tab-li-content">
            <view class="tab-top">
              <text>￥{{item.businessSum2}}</text>
              <text></text>
            </view>
            <view class="tab-center">
              <view>
                <text>{{item.customerName}}</text>
                <text>{{item.certId2}}</text>
              </view>
              <view>
                <text>手机号码</text>
                <text>{{item.phoneNo2}}</text>
              </view>
              <view>
                <text>合同编号</text>
                <text>{{item.contractNo}}</text>
              </view>
              <view v-if="applyPhase != '05'">
                <text>出账编号</text>
                <text>{{item.putoutNo}}</text>
              </view>
              <view>
                <text>生成时间</text>
                <text>{{applyPhase == '05'? item.occurDate : item.putoutDate}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!--加载更多提示-->
      <uni-load-more :status="status[applyPhase]" :icon-size="16" :content-text="contentText" />
    </view>
    <pfSearch 
      :switchDrawer="switchDrawer"
      :applyPhase="applyPhase"
      :serviceStatesType="tabTitle"
      :pfSearchBusiness="pfSearchBusiness"
      @professionSearch="professionSearch"
      @changeSearch="changeSearch">
    </pfSearch>
  </view>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import pfSearch from '../childModule/pfSearch.vue';
  import filter from '@/utils/filters';
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  import {RSAdecode} from '@/static/js/util.js'
  export default {
    components: {
      pfSearch,
      uniLoadMore
    },
    data() {
      return {
        switchDrawer: false,  //搜索弹窗是否显示
        tabTitle:[
          {
            title: '待处理',
            id: '05',
          },
          {
            title: '待提交',
            id: '01',
          },
          {
            title: '审批中',
            id: '02',
          },
           {
            title: '审批结束',
            id: '03',
          },
          // {
          //   title: '审批通过',
          //   id: '03',
          // },
          // {
          //   title: '审批否决',
          //   id: '04',
          // },
        ],  //页签标题
        tabArr: {},  //页签内容
        applyPhase: '',  //申请阶段
        userID: '',  //客户经理编号
        numNo: {
          '01': {
            'beginNo': 1, //起始笔数
            'totalNo': 15, //查询笔数
          },
          '02': {
            'beginNo': 1,
            'totalNo': 15,
          },
          '03': {
            'beginNo': 1,
            'totalNo': 15,
          },
          '04': {
            'beginNo': 1,
            'totalNo': 15,
          },
          '05': {
            'beginNo': 1,
            'totalNo': 15,
          },
        },  //起始笔数
        filterCode: '',  //筛选字段
        businessType: '',  //业务品种
        ajaxJudge:{
          '01': true,
          '02': true,
          '03': true,
          '04': true,
          '05': true,
        },//第一次请求数据还是连续请求数据 --上拉加载
        status: {
          '01': 'more',
          '02': 'more',
          '03': 'more',
          '04': 'more',
          '05': 'more',
        },
				contentText: {
					contentdown: '上拉加载更多',  //more
					contentrefresh: '加载中',  //loading
					contentnomore: '没有更多',  //noMore
				},
        reachBottom:{
          '01': true,
          '02': true,
          '03': true,
          '04': true,
          '05': true,
        },  //是否允许上拉加载
        priceApproveFlagList: {},  //待处理列表 -- 待放款业务列表
      };
    },
    watch:{

    },
    onLoad(options) {
      // this.userID = '001263'; //001500 001263 004033
      this.userID = this.userInfor.loginCode;
      this.applyPhase = options.applyPhase;
      if(this.applyPhase == "05"){
        this.queryLendList();
      }else{
        this.queryApplyPutoutList();
      }
    },
    onReady() {},
    onShareAppMessage() {},
    //下拉的生命周期
    onPullDownRefresh() {
      this.pullRefresh();
    },
    //页面滚动到底部的事件 -- 上拉加载
    onReachBottom(){
      console.log('上拉加载')
      this.GJGCRefreshFooter();
    },
    computed:{
      ...mapGetters(['businessTypeList','userInfor','pfSearchBusiness','businessTypeList2'])
    },
    methods: {
      ...mapMutations(['paymentListReplace']),
      //页签切换
      tabClick(e){
        console.log(e)
        this.applyPhase = e;
        if(this.ajaxJudge[e]){
          if(e == '05'){
            this.queryLendList();
          }else{
            this.queryApplyPutoutList();
          }
        }else{
          console.log("不是第一次点击tab页签，不需要请求数据")
        }
      },
      //放款申请各阶段列表查询
      queryApplyPutoutList(){
        let data = {
          'userId': this.userID,  //客户经理编号
          'orgID': '',  //客户经理所属机构编号
          'putoutStatusCode': this.applyPhase,  //放款阶段编号
          'beginNo': this.numNo[this.applyPhase].beginNo,  //起始笔数
          'totalNo': this.numNo[this.applyPhase].totalNo,  //查询笔数
          'sortCode': 'putoutDate',  //排序字段 -- 出账起始日
          'filterCode': this.filterCode,  //筛选字段
          'businessType': this.businessType,  //业务品种
        }
        this.interfaceRequest('/api/lend/queryApplyPutoutList',data,"post",(res)=>{
          console.log(res)
          let dataList = res.data.data.putoutList;
          this.dataProcessing(dataList);
        },function(err){
          console.log(err)
        });
      },
      //待放款业务列表查询
      queryLendList(){
        let data = {
          'userId': this.userID,  //客户经理编号
          'orgID': '',  //客户经理所属机构编号
          'beginNo': this.numNo[this.applyPhase].beginNo,  //起始笔数
          'totalNo': this.numNo[this.applyPhase].totalNo,  //查询笔数
          'sortCode': 'occurDate',  //排序字段 -- 发生日期
          'filterCode': this.filterCode,  //筛选字段
          'businessType': this.businessType,  //业务品种
        }
        this.interfaceRequest('/api/lend/queryLendList',data,"post",(res)=>{
          console.log(res)
          let dataList = res.data.data.contractList;
          this.dataProcessing(dataList);
          console.log(dataList)
        },function(err){
          console.log(err)
        });
      },
      //对请求后的数据处理
      dataProcessing(dataList){
        yu.stopPullDownRefresh();  //停止下拉刷新
        if(this.ajaxJudge[this.applyPhase]){
          console.log(123)
          if(dataList != null){
            if(dataList.length < this.numNo[this.applyPhase].totalNo){
              this.status[this.applyPhase] = 'noMore';
              this.reachBottom[this.applyPhase] = false;
            }else{
              this.status[this.applyPhase] = 'more';
            }
            this.tabArr[this.applyPhase] = this.businessVarieties(dataList);
            this.ajaxJudge[this.applyPhase] = false;
            this.$forceUpdate();  //强制页面刷新
          }else{
            this.tabArr[this.applyPhase] = [];
            this.status[this.applyPhase] = 'noMore';
            this.reachBottom[this.applyPhase] = false;
          }
        }else{
          console.log(456)
          if(dataList != null){
            this.tabArr[this.applyPhase] = this.tabArr[this.applyPhase].concat(this.businessVarieties(dataList));
            this.status[this.applyPhase] = 'more';
          }else{
            this.tabArr[this.applyPhase] = this.tabArr[this.applyPhase].concat([]);
            this.status[this.applyPhase] = 'noMore';
            this.reachBottom[this.applyPhase] = false;
          }
        }
      },
      //业务品种、定价结果匹配
      businessVarieties(e){
        console.log(e)
        if(e == null || e.length == 0){
          return [];
        }
        let arr = this.businessTypeList2;  //业务品种
        e.forEach((item)=>{
          item.certId2 = filter.cardIDNoHideFormat(RSAdecode(item.certId));
          item.phoneNo2 = RSAdecode(item.phoneNo);
          item.businessSum2 = filter.moneyFormat(item.businessSum);
          for(let key in arr){
            if(item.businessType == key){
              item.businessType2 = arr[key];
            }
          }
        });

        return e;
      },
      //关闭
      changeSearch(e){
        this.switchDrawer = false;
      },
      //搜索
      professionSearch(e){
        console.log(e)
        this.screenReset();
        this.switchDrawer = false;
        this.filterCode = e.filterCode;
        this.businessType = e.businessType;
        this.applyPhase = e.applyPhase;
        if(e.applyPhase == '05'){
          this.queryLendList();
        }else{
          this.queryApplyPutoutList();
        }
      },
      //筛选后，重置
      screenReset(){
        this.numNo = {
          '01': {
            'beginNo': 1, //起始笔数
            'totalNo': 15, //查询笔数
          },
          '02': {
            'beginNo': 1,
            'totalNo': 15,
          },
          '03': {
            'beginNo': 1,
            'totalNo': 15,
          },
          '04': {
            'beginNo': 1,
            'totalNo': 15,
          },
          '05': {
            'beginNo': 1,
            'totalNo': 15,
          },
        };  //起始笔数
        this.ajaxJudge = {
          '01': true,
          '02': true,
          '03': true,
          '04': true,
          '05': true,
        };
        this.status = {
          '01': 'more',
          '02': 'more',
          '03': 'more',
          '04': 'more',
          '05': 'more',
        };
        this.reachBottom = {
          '01': true,
          '02': true,
          '03': true,
          '04': true,
          '05': true,
        };
      },
      //上拉加载
      GJGCRefreshFooter(){
        if(this.reachBottom[this.applyPhase]){
          if(this.status[this.applyPhase] != "loading"){
            this.numNo[this.applyPhase].beginNo += this.numNo[this.applyPhase].numNo;
            this.status[this.applyPhase] = 'loading';
            if(this.applyPhase == "05"){
              this.queryLendList();
            }else{
              this.queryApplyPutoutList();
            }
          }else{
            console.log("正在加载中，不允许上拉加载")
          }
        }else{
          console.log("没有更多数据，不允许上拉加载")
        }
      },
      //下拉刷新
      pullRefresh(){
        this.ajaxJudge[this.applyPhase] = true;
        this.reachBottom[this.applyPhase] = true;
        this.status[this.applyPhase] = "more"
        this.numNo[this.applyPhase].beginNo = 1;
        this.numNo[this.applyPhase].totalNo = 15;
        if(this.applyPhase == "05"){
          this.queryLendList();
        }else{
          this.queryApplyPutoutList();
        }
      },
      //发放支付详情
      toPaymentDetail(e){
        console.log(e)
        if(this.applyPhase == '05' || this.applyPhase == '01'){
          this.paymentListReplace(e);
          yu.navigateTo({
            url: 'paymentDetail?applyPhase=' + this.applyPhase,
          });
        }
      },
      //返回
      backpf(){
        yu.switchTab({ url: '/pages/ebank/profession/profession'});
      },
      //搜索
      searchpf(){
        this.switchDrawer = true;
      },
    }
  };
</script>
<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  .uni-container{
    background-color: #FFFFFF;
    padding: 0 0 30rpx 0;
    .appro-content{
      padding-top: 200rpx;
      .tab-ul{
        padding: 24rpx 30rpx;
        .tab-li{
          .tab-li-content{
            .tab-top{
              uni-text:last-of-type{
                font-size: 32rpx;
                color: #333435;
                margin-left: 20rpx;
              }
            }
          }
        }
      }
    }
  }
</style>