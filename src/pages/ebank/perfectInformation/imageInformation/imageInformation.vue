<template>
  <view class="uni-container information-box">
    <view class="pf-title pf-titleTwo">
      <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
      <text>{{title}}</text>
    </view>
    <view :class='["uni-panel",index=="0" ? " uni-panel-first-child" : ""]' v-for="(item, index) in list" :key="item.id">
      <view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index)">
        <text class="uni-panel-line"></text>
        <text class="uni-panel-text">{{item.name}}</text>
        <text class="uni-panel-icon uni-icon" :class="item.open ? 'uni-panel-icon-on' : ''">
          <img v-show="item.open" src="@/static/images/perfectInformation/grayTopArrow.svg">
          <img v-show="!item.open" src="@/static/images/perfectInformation/grayDownArrow.svg">
        </text>
      </view>
      <view class="uni-panel-c" v-if="item.open">
        <view class="uni-navigate-item" v-for="(item2,key) in item.pages" :key="key" @click="changeInformationDetailsPage(item2,item.name)">
          <text class="uni-navigate-text">{{item2.name ? item2.name : item2}}</text>
          <text class="uni-navigate-icon uni-icon"><img src="@/static/images/perfectInformation/grayRightArrow.svg"></text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
// TODO 修复Android v3 加载过慢问题
// #ifdef APP-PLUS
var domModule = weex.requireModule("dom");
domModule.addRule("fontFace", {
  fontFamily: "uniicons",
  src: "url('/common/uni.ttf')"
});
// #endif
import {mapGetters, mapMutations, mapActions} from 'vuex';
import uLink from "@/components/uLink.vue";
export default {
  components: {
    uLink
  },
  onShow() {
    this.setStatusFontColor("dark");
  },
  data() {
    return {
      title: "影像信息",
      serialNo: "", //申请编号
      imageBatchNo:'',//图片版本批次号
      imageUpLoadDate:'',//图片上传时间
      imagelists:[],
      filePartName:'LS_SQZL_P',//放款审核 出账后  值：LS_FKZL_P
      modelCode:'LS_SQZL',//放款审核 出账后  值：LS_FKZL
      list: [
        {
          id: "view",
          name: "授信审批",
          open: true,
          pages: [
            "身份证明资料",
            "收入证明资料",
            "用途证明资料",
            "抵押房产资料",
            "征信相关资料",
            "系统生成表格"
          ]
        },
        /* {
          id: "content",
          name: "放款审核",
          open: false,
          pages: [
            "房产证、他项权证",
            "放款账户信息",
            "借款抵押合同信息",
            "其他资料"
          ]
        },
        {
          id: "form",
          name: "出账后",
          open: false,
          pages: ["放款通知书", "放款凭证", "其他贷后资料"]
        } */
      ],
      paramBusiFileTypeList:[
        "2012060101","2012060102","2012060103","2012060104",
        "2012060201","2012060202","2012060203",
        "2012060301","2012060302","2012060303","2012060304","2012060305",
        "2012060401","2012060402","2012060403",
        "2012060501","2012060502","2012060503",
        "2012060601","2012060602","2012060603","2012060604"
      ],//影像信息参数（全部）
      navigateFlag: false
    };
  },
  computed:{
    ...mapGetters(['queryApplyInfoList','imageInformation'])
  },
  created(){
    this.getListName();//获取影像信息菜单  比对
    this.serialNo = this.queryApplyInfoList.applyNo; //申请编号
    //获取当前申请信息的图片批次号  start
    //let _this=this;
    this.imageBatchNo=this.queryApplyInfoList.imageList[0].imageBatchNo;
    this.imageUpLoadDate=this.queryApplyInfoList.imageList[0].imageUpLoadDate;
    this.getImagesList(this.queryApplyInfoList.imageList[0].imageBatchNo,this.queryApplyInfoList.imageList[0].imageUpLoadDate);
    //获取当前申请信息的图片批次号  end
    
  },
  onLoad: function(options) {
    //this.serialNo = options.serialNo; //申请编号获取
  },
  methods: {
    ...mapMutations(['imageInformationReplace','busiFileTypeListResReplace']),
    //返回上一页
    navigateBack() {
      this.pageJump("perfectInformation/perfectInformation");
    },
    //数据字典查询 
    getListName(){
      let _this=this;
      let posturl="/api/dictionary/queryDictionaryList";
      let param={"dictionaryName": "busiFileType"};
      _this.interfaceRequest(
        posturl,
        param,
        "GET",
        function(res) {
          _this.busiFileTypeListResReplace(res.data.data);
        },
        function(err) {}
      );
    },
    //获取下载当前申请的影像信息
    getImagesList(imageBatchNo,busiStartDate){
      yu.showLoading();
      //获取图片信息 start
      let _this=this;
      let posturl="/api/imagehandle/downloadbynoanddate";
      let param={
        "busiSerialNo": imageBatchNo,
        "busiStartDate":busiStartDate,
        "busiFileTypeList":_this.paramBusiFileTypeList,
        "filePartName": _this.filePartName,
        "modelCode": _this.modelCode
      };
      _this.interfaceRequest(
        posturl,
        param,
        "post",
        function(res) {
          console.log(res);
          yu.hideLoading();
          if(res.data.code == 500){
            yu.showToast({
              icon: "none",
              title: res.data.data.returnDesc,
              duration: 1500
            });
          }else{
            _this.imageInformationReplace(res.data.data.downloadImageOutVoList);
            console.log(_this.imageInformation);
          }
          
        },
        function(err) {
          console.log(err);
           
        }
      );
      //获取图片信息 end
    },
    //base64路径拼接
    base64URL(param){
      return 'data:image/jpg;base64,' + param;
    },
    //页面跳转
    changePage(url) {
      this.pageJump(url);
    },
    changeInformationDetailsPage(name) {
      localStorage.setItem('imgFromID',name);
      let url = "perfectInformation/imageVideoList/imageVideoList";
      this.pageJump(url + "?title=" + name);
    },

    triggerCollapse(e) {
      if (!this.list[e].pages) {
        this.goDetailPage(this.list[e].url);
        return;
      }
      for (var i = 0; i < this.list.length; ++i) {
        if (e === i) {
          this.list[i].open = !this.list[e].open;
        } else {
          this.list[i].open = false;
        }
      }
    },
    goDetailPage(e) {
      if (this.navigateFlag) {
        return;
      }
      this.navigateFlag = true;
      if (typeof e === "string") {
        uni.navigateTo({
          url: "/pages/component/" + e + "/" + e
        });
      } else {
        uni.navigateTo({
          url: e.url
        });
      }
      setTimeout(() => {
        this.navigateFlag = false;
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@styles/uni-nvue.css";
uni-page-body {
  background: #ffffff;
}
.uni-panel {
  width: 690rpx;
  line-height: 105rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 28rpx 0rpx rgba(0, 0, 0, 0.11);
  border-radius: 20rpx;
  border: 0;
  margin-top: 20rpx;
  .uni-panel-h {
    height: 105rpx;
    line-height: 105rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #333435;
    padding: 0;
    border-radius: 20rpx;
  }
  .uni-panel-h-on {
    background: #ffffff;
    border-bottom: 1rpx solid #e5e5e5;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .uni-panel-line {
    width: 10rpx;
    height: 30rpx;
    background: #3b86f7;
    border-radius: 4rpx;
    margin: 37.5rpx 17rpx 37.5rpx 33rpx;
  }
  .uni-panel-text {
    font-size: 32rpx;
    font-weight: 500;
    color: #333435;
    flex: 2;
  }
  .uni-panel-icon {
    margin-right: 29rpx;
    img {
      width: 26rpx;
      height: 15rpx;
    }
  }
  .uni-panel-c {
    padding-left: 51rpx;
    border-bottom-right-radius: 20rpx;
    border-bottom-left-radius: 20rpx;
    .uni-navigate-item {
      height: 105rpx;
      line-height: 105rpx;
      border-top: 0;
      border-bottom: 1rpx solid #e5e5e5;
      padding: 0;
    }
    .uni-navigate-item:last-child {
      border-bottom: 0;
    }
    .uni-navigate-icon {
      margin-right: 29rpx;
      img {
        width: 12rpx;
        height: 21rpx;
      }
    }
  }
}
.uni-panel-first-child{
  margin-top: 80rpx;
}
.information-box {
  background: #ffffff !important;
  height: 100%;
  padding: 30rpx;
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
}
.pinformations {
  padding: 30rpx 30rpx 0 30rpx;
  .pinformation-one {
    width: 690rpx;
    height: 140rpx;
    background: #ffffff;
    box-shadow: 0 0 28rpx 0 rgba(0, 0, 0, 0.11);
    border-radius: 20rpx;
  }
  .pinformation {
    height: 140rpx;
    line-height: 140rpx;
    display: block;
    padding-left: 32rpx;
    border-bottom: 1rpx solid #e5e5e5;
  }
  .pinformation:last-child {
    border: 0;
  }
  .pinformation-left {
    height: 140rpx;
    line-height: 140rpx;
    float: left;
    display: flex;
    vertical-align: middle;
    align-items: center;
    img {
      width: 80rpx;
      height: 80rpx;
    }
    text {
      height: 45rpx;
      line-height: 45rpx;
      font-size: 32rpx;
      color: #333333;
      margin-left: 16rpx;
    }
  }
  .pinformation-right {
    height: 140rpx;
    line-height: 140rpx;
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
  }
  .pinformation-two {
    width: 658rpx;
    height: 281rpx;
    padding-left: 32rpx;
    background: #ffffff;
    box-shadow: 0 0 28rpx 0 rgba(0, 0, 0, 0.11);
    border-radius: 20rpx;
    .pinformation {
      padding-left: 3rpx;
    }
  }
}
.cbutton {
  width: 620rpx;
  padding: 0;
  margin: 175rpx auto 280rpx auto;
  font-size: 36rpx;
  color: #edf6fe;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 50rpx;
  background: #3b86f7;
  border: 0rpx;
  text-align: center;
  box-shadow: 0rpx 10rpx 23rpx 0rpx rgba(#3b86f7, 0.4);
}
.cbutton:after {
  display: block;
  content: "";
  clear: both;
}
</style>
