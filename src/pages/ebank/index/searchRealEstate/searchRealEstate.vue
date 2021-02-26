<template>
  <view class="search-box">
    <view class="pf-title pf-titleThree">
      <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
      <view class="gencies-item">
        <input class="uni-input" placeholder="请输入搜索内容" readonly="readonly" type="string" v-model="searchword" @input="inputfun"/>
        <img src="@/static/images/firstroom/searchLogo.svg" class="imgSearch">
        <view class="imgCross" v-show="ifShowClearInput" @click="clearSearchInput()">
          <img src="@/static/images/firstroom/searchCancle.svg">
        </view>
      </view>
      <text class="pf-text" @click="searchFun">搜索</text>
    </view>
    <view class="pf-content search-result" v-show="showSearchResult">
      <view class="search-one" v-for="(item,index) in resultSearchList" :key="index" @click="searchResult(item)" >
        <view class="search-name"  v-html="item.BuildingName"></view>
        <view class="search-address">{{item.locationC}}</view>
      </view>

    </view>
    <view class="no-record" v-show="showNoRecord">
      <view class="no-record-img"><img src="@/static/images/noSearchRecord.svg"></view>
      <view class="no-record-text"><text>没有您要的记录~哦~</text></view>
    </view>
  </view>
</template>
<script>
import { mapGetters } from "vuex";
import { appEnv } from "@/config/app.config";
export default {
  data: function() {
    return {
      fromProduct:"",
      productId:'',
      searchword: "",
      ifShowClearInput: false,
      ordinaryIncoming: "index/ordinaryIncoming/ordinaryIncoming",
      resultSearchList: [],
      list: [],
      searchInput: "",
      urlParam: "",
      showNoRecord:false,
      showSearchResult:true,
    };
  },
  computed: {
    ...mapGetters(['userInfor'])
  },
  onLoad: function(options) {
    this.urlParam = "";
    this.urlParam =
      "phone=" +
      options.phone +
      "&productId=" +
      options.productId +
      "&productIndex=" +
      options.productIndex +
      "&productName=" +
      options.productName+
      "&personName=" +
      options.personName+
      "&personIDcard=" +
      options.personIDcard+
      "&from=" +
      options.from;
      this.productId=options.productId;

    if(options.from === 'firstroom'){//一手房
      this.title="一手房";
      this.fromProduct=options.from;
    }else if(options.from === 'secondroom'){//二手房
      this.title="二手房";
      this.fromProduct=options.from;
      this.productId= 1140020;
      this.productName="个人二手住房贷款";
    }else{
      this.title="其他产品";
      this.fromProduct=options.from;
    };
    this.searchFun();
  },
  mounted() {},
  methods: {
    //返回上一页
    navigateBack() {
      uni.navigateBack();
    },
    log(p) {
      console.log(p[0].oldname);
    },
    inputfun() {
      this.ifShowClearInput = true;
    },
    clearSearchInput() {
      this.searchword = "";
      this.ifShowClearInput = false;
    },
    searchFun() {
      let that = this;
    /* 获取当前用户机构ID */
      let userOrgId = that.userInfor.orgId;
      let data = {
        orgId: userOrgId,
        filterCode: that.searchword,
        businessType:that.productId,
      };
      yu.showLoading();
      that.interfaceRequest(
        "/api/front/propertyInfo",
        data,
        "post",
        function(res) {
          yu.hideLoading();
          let searchlist = res.data.data.houseList;
          if(searchlist != null){
            that.showNoRecord=false;
            that.showSearchResult=true;
            that.search(searchlist);
          }else{
            //无楼盘信息
            that.showNoRecord=true;
            that.showSearchResult=false;
          }
        },
        function(err) {
          yu.hideLoading();
        }
      );
    },
    search(list) {
      let that = this;
      list.map((item, index) => {
        if (that.searchword && that.searchword.length > 0) {
          let replaceReg = new RegExp(that.searchword, "g");
          let replaceString =
            '<uni-text style="color:#3b86f7">' + that.searchword + "</uni-text>";
          list[index].BuildingName = item.buildingName.replace(
            replaceReg,
            replaceString
          );
        } else {
          list[index].BuildingName = item.buildingName;
        }
      });
      that.resultSearchList = list;
      console.log(that.resultSearchList);
    },
    searchResult(item) {
      let projectName = item.buildingName;
      let projectId = item.projectNo;
      let that = this;
      let url =
        that.ordinaryIncoming +
        "?projectName=" +
        projectName +
        "&projectId=" +
        projectId +
        "&" +
        that.urlParam;
      console.log(url);
      that.pageJump(url);
    }
  }
};
</script>
<style lang="scss" scoped>
body,
uni-page-wrapper,
uni-page-body {
  background: #ffffff;
  display: block;
}
body::after,
uni-page-wrapper::after,
uni-page-body::after {
  display: block;
  content: "";
  clear: both;
}
.search-box {
  width: 100%;
  height: 100%;
  background: #ffffff;
  .search-title {
    width: 100%;
    background: #ffffff;
    height: 65rpx;
    line-height: 65rpx;
    padding: 59rpx 0 9rpx 0;
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
    .ch-img {
      position: absolute;
      left: 0;
      top: 72rpx;
      width: 20rpx;
      height: 36rpx;
      margin-left: 36rpx;
      img {
        width: 20rpx;
        height: 36rpx;
      }
    }
    .search {
      width: 532rpx;
      height: 65rpx;
      line-height: 65rpx;
      display: inline-flex;
      vertical-align: middle;
      align-items: center;
      background: #f3f5fa;
      border-radius: 6rpx;
      margin-left: 80rpx;
      .img-slogo {
        width: 26rpx;
        height: 26rpx;
        margin-left: 21rpx;
      }
      .search-input {
        width: 466rpx;
        margin-left: 16rpx;
        background: transparent;
        font-size: 26rpx;
        color: #333345;
        letter-spacing: 1.52rpx;
      }
      .img-scancle {
        width: 32rpx;
        height: 32rpx;
        float: right;
        margin-right: 22rpx;
      }
    }
    .search-submit {
      height: 42rpx;
      line-height: 42rpx;
      font-size: 30rpx;
      color: #333345;
      margin-left: 38rpx;
      display: inline-block;
    }
  }
  .search-title:after {
    display: block;
    content: "";
    clear: both;
  }
  .search-result {
    // padding-top: 130rpx;
    padding-left: 30rpx;
    .search-one {
      padding-left: 10rpx;
      border-bottom: 1rpx solid #e5e5e5;
      .search-name {
        height: 45rpx;
        line-height: 45rpx;
        color: #333345;
        font-size: 32rpx;
        margin-top: 29rpx;
      }
      .search-address {
        height: 33rpx;
        line-height: 33rpx;
        color: #999999;
        font-size: 24rpx;
        margin-top: 8rpx;
        margin-bottom: 29rpx;
      }
    }
    .search-one:after {
      display: block;
      content: "";
      clear: both;
    }
  }
}


.no-record{
  width: 100%;
  height: 100%;
  padding-top: 361rpx;
  .no-record-img{
    width: 100%;
    height: 262rpx;
    text-align: center;
    img{
      width: 385rpx;
      height: 262rpx;
      margin: 0 auto;
    }
  }
  .no-record-text{
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
    text{
      line-height: 40rpx;
      display: block;
      text-align: center;
    }
  }
}
</style>

