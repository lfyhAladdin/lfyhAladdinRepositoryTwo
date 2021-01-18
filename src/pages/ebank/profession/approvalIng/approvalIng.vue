<template>
  <view class="uni-container">
    <view class="pf-poifixed">
      <view class="pf-title pf-titleThree">
        <img src="@/static/images/profession/pf-back.svg" @click="backpf">
        <text>授信业务</text>
        <img src="@/static/images/profession/pf-screening.svg" class="pf-imgRig" @click="searchpf">
      </view>
      <view class="appro-fix">
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
        <view class="tab-li" v-for="item in tabArr[applyPhase]" :key="item.serialNo" @click="toPerfectInformation(item)">
          <view class="tab-li-features">
            <view>{{item.businessType2}}</view>
            <view class="tab-color-orange">{{applyPhase == '05'? item.priceApproveFlag2 : item.phaseName}}</view>
          </view>
          <view class="tab-li-content">
            <view class="tab-top">
              <text>{{item.customerName}}</text>
              <text>{{item.certID2}}</text>
            </view>
            <view class="tab-center">
              <view>
                <text>{{item.address2}}</text> <!--楼盘名称/房屋位置-->
                <text>{{item.addressVal2}}</text>
              </view>
              <view v-if="item.loanAmount2">
                <text>贷款金额</text> <!--贷款金额-->
                <text>{{item.businessSum2}}</text>
              </view>
              <view>
                <text>手机号码</text>
                <text>{{item.phoneNo}}</text>
              </view>
              <view>
                <text>申请编号</text>
                <text>{{item.serialNo}}</text>
              </view>
              <view>
                <text>申请时间</text>
                <text>{{item.occurDate}}</text>
              </view>
            </view>
            <view class="tab-bottom" v-if="applyPhase == '05'">
              <text @click="querypriceresult(item)">获取定价结果</text>
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
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import pfSearch from '../childModule/pfSearch.vue';
  import filter from '@/utils/filters';
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
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
            title: '待提交',
            id: '01',
          },
          {
            title: '人工定价审批',
            id: '05',
          },
          {
            title: '授信审批中',
            id: '02',
          },
          {
            title: '审批通过',
            id: '03',
          },
          {
            title: '审批否决',
            id: '04',
          },
        ],  //页签标题
        tabArr: {},  //页签内容
        applyPhase: '',  //申请阶段
        userID: '',  //客户经理编号
        orgId: '',  //客户经理所属机构编号
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
      };
    },
    watch:{

    },
    computed:{
      ...mapGetters(['businessTypeList','priceApproveFlagList','userInfor','pfSearchBusiness','businessTypeList2'])
    },
    onLoad(options) {
      console.log(options);
      // alert(JSON.stringify(options));
      this.userID = this.userInfor.loginCode;
      this.orgId =  this.userInfor.orgId;
      console.log(this.userInfor)
      this.applyPhase = options.applyPhase;
      if(this.applyPhase == "05"){
        this.querypriceapprapplyinfo();
      }else{
        this.queryApplyPhaseList();
      }
    },
    onReady() {},
    onShareAppMessage() {},
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
      ...mapMutations(['approvalIngListReplace']),
      ...mapActions(['queryApplyInfoCommit']),
      //页签切换
      tabClick(e){
        console.log(e)
        this.applyPhase = e;
        if(this.ajaxJudge[e]){
          if(e == '05'){
            this.querypriceapprapplyinfo();
          }else{
            this.queryApplyPhaseList();
          }
        }else{
          console.log("不是第一次点击tab页签，不需要请求数据")
        }
      },
      //返回
      backpf(){
        // yu.navigateBack();
        yu.switchTab({ url: '/pages/ebank/profession/profession' });
      },
      //搜索
      searchpf(){
        this.switchDrawer = true;
      },
      //授信申请各阶段列表信息
      queryApplyPhaseList(){
        let data = {
          'userID': this.userID,  //客户经理编号
          'orgID': this.orgId,  //客户经理所属机构编号
          'applyPhase': this.applyPhase,  //申请阶段
          'beginNo': this.numNo[this.applyPhase].beginNo,  //起始笔数
          'totalNo': this.numNo[this.applyPhase].totalNo,  //查询笔数
          'sortCode': 'occurDate',  //排序字段 -- 按发生日期排序
          'filterCode': this.filterCode,  //筛选字段
          'businessType': this.businessType,  //业务品种
        }
        console.log(data)
        this.interfaceRequest('/api/credit/queryApplyPhaseList',data,"post",(res)=>{
          console.log(res)
          let datas = res.data.data;
          this.dataProcessing(datas,datas.applyList);
        },(err)=>{
          yu.showToast({
            title: '3.9授信信息查询失败，请联系管理员！',
            icon: 'none',
            duration: 3000
          });
        });
      },
      //定价审批申请列表查询
      querypriceapprapplyinfo(){
        let data = {
          'userID': this.userID,  //客户经理编号
          // 'userID': '001500',  //客户经理编号
          'orgID': this.orgId,  //客户经理所属机构编号
          'beginNo': this.numNo[this.applyPhase].beginNo,  //起始笔数
          'totalNo': this.numNo[this.applyPhase].totalNo,  //查询笔数
          'filterCode': this.filterCode,  //筛选字段
          'businessType': this.businessType,  //业务品种
        }
        this.interfaceRequest('/api/creditprice/querypriceapprapplyinfo',data,"get",(res)=>{
          console.log(res)
          let datas = res.data.data;
          this.dataProcessing(datas,datas.applyResDtoList);
        },function(err){
          yu.showToast({
            title: '3.4定价审批信息查询失败，请联系管理员！',
            icon: 'none',
            duration: 3000
          });
        });
      },
      //对请求后的数据处理
      dataProcessing(datas,dataList){
        yu.stopPullDownRefresh();  //停止下拉刷新
        if(datas.returnCode == "Success"){
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
          };
        }else{
          yu.showToast({
            title: datas.returnDesc,
            icon: 'none',
            duration: 3000
          });
        }
      },
      //获取定价结果
      querypriceresult(e){
        let data = {
          'orderNo': e.orderNo,  //订单编号
          'applyNo': e.serialNo,  //申请编号
        }
        this.interfaceRequest('/api/creditprice/querypriceresult',data,"get",(res)=>{
          console.log(res)
          if(res.data.data && res.data.data.returnCode == 'Success'){
            // yu.showModal({
            //   title: '同步成功',
            //   content: '点击确定，立即进行合同签订',
            //   showCancel: true,
            //   success: (res) => {
            //     if (res.confirm) {
            //       console.log('用户点击确定');
            //       this.pullRefresh();
            //     } else if (res.cancel) {
            //       console.log('用户点击取消');
            //     }
            //   }
            // });
            yu.showModal({
              content: res.data.data.returnDesc,
              showCancel: false,
              cancelText: "我知道了",
              success: (res) => {
                if (res.confirm) {
                  console.log('用户点击确定');
                  this.pullRefresh();
                }
              }
            });
          }else{
            yu.showToast({
              title: res.data.data.returnDesc,
              icon: 'none',
              duration: 3000
            });
          }
        },(err)=>{
          yu.showToast({
            title: '3.6定价结果异常，请联系管理员！',
            icon: 'none',
            duration: 3000
          });
        });
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
          this.querypriceapprapplyinfo();
        }else{
          this.queryApplyPhaseList();
        }
      },
      //业务品种、定价结果匹配
      businessVarieties(e){
        console.log(e)
        if(e==null || e.length == 0){
          return [];
        }
        let arr = this.businessTypeList2;  //业务品种
        let arr2 = this.priceApproveFlagList;  //定价结果
        e.forEach((item)=>{
          item.certID2 = filter.cardIDNoHideFormat(item.certID);
          item.businessSum2 = filter.moneyFormat(item.businessSum) +"元";
          for(let key in arr){
            if(item.businessType == key){
              item.businessType2 = arr[key];
              item.address2 = this.housSwitch(arr[key],'楼盘名称','房屋位置');
              item.addressVal2 = this.housSwitch(arr[key],item.buildingName,item.buildingAdd);
              item.loanAmount2 = this.housSwitch(arr[key],true,false);
            }
          }
        });
        if(this.applyPhase == "05"){
          console.log(arr2)
          e.forEach((item)=>{
            for(let key in arr2){
              if(item.priceApproveFlag == key){
                item.priceApproveFlag2 = arr2[key];
              }
            }
          })
        };
        return e;
      },
      //一手、二手房显示区分
      housSwitch(hous,nameA,nameB){
        if(hous != undefined && hous.includes('一手')){
          return nameA;
        }else{
          return nameB;
        }
        // return hous.includes('一手') ? nameA : nameB
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
            this.numNo[this.applyPhase].beginNo += this.numNo[this.applyPhase].totalNo;
            this.status[this.applyPhase] = 'loading';
            if(this.applyPhase == "05"){
              this.querypriceapprapplyinfo();
            }else{
              this.queryApplyPhaseList();
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
        // this.numNo[this.applyPhase].totalNo = 15;
        if(this.applyPhase == "05"){
          this.querypriceapprapplyinfo();
        }else{
          this.queryApplyPhaseList();
        }
      },
      //跳转到一手房
      toPerfectInformation(e){
        // console.log(e)
        if(this.applyPhase == '01'){
          this.approvalIngListReplace(e);
          this.queryApplyInfoCommit({
            'orderNo': e.orderNo, 
            'applyNo': e.serialNo,
            'routerTrue': true,
            'routerTo': '/pages/ebank/perfectInformation/perfectInformation',
            'routerJumpWay': 'navigateTo'
          }); //重新调'申请信息查询'接口
        }
      }
    }
  };
</script>
<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  @import '@/static/css/professionwf.less';
  .uni-container{
    background-color: #FFFFFF;
    padding: 0 0 30rpx 0;
    .appro-content{
      padding-top: 228rpx;
      .tab-ul{
        // padding: 110rpx 30rpx 24rpx;
        padding: 24rpx 30rpx;
      }
    }
    //不出现滚动条
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: transparent;
    }
  }

</style>