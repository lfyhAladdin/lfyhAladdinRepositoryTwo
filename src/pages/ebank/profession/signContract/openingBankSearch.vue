<template>
  <view class="search-box">
    <view class="search-title">
    <view class="ch-img" @tap="navigateBack"><img src="@/static/images/firstroom/backArrow.svg" /></view>
      <view class="search">
        <img class="img-slogo" src="/static/images/firstroom/searchLogo.svg" />
        <input class="search-input" placeholder="请输入搜索内容" type="string" v-model="searchword" @input="inputfun" />
        <img v-show="ifShowClearInput" class="img-scancle" src="@/static/images/firstroom/searchCancle.svg"  @click="clearSearchInput()" />
      </view>
      <view class="search-submit" @click="searchFun"><text>搜索</text></view>
    </view>
    <view class="search-result">
      <!--<view class="search-one" v-for="(searchOne,index) in searchlist" :key="index" @click="goDetailPage(ordinaryIncoming)">
        <view class="search-name">{{searchOne.buildingName}}</view>
        <view class="search-address">{{searchOne.region}}</view>
      </view>-->

      
    
       <view class="partner-search">
          <view class="partner-title">
           <text>A支行名称</text>
          </view>
          <view class="partner-box">
          <text class="partner-a">000000003</text>
          </view>

       </view>

      <view class="search-one" v-for="(item,index) in resultSearchList" :key="index">
        <view class="search-name">
          <label v-for="(item2,cindex) in item" :key="cindex"  @click="searchResult(item2.oldname,item2.oldId)">
            <text v-if="item2.key==true" style="color: #3B86F7;">{{item2.BuildingName}}</text>
            <text v-else>{{item2.BuildingName}}</text>
          </label>
        </view>
        <view class="search-address">{{item.Region}}</view>
          
      </view>

    </view>
  </view>
</template>
<script>
import { appEnv } from '@/config/app.config';
export default {
  data: function() {
    return {
      searchword:"",
      ifShowClearInput:false,
      ordinaryIncoming:"index/ordinaryIncoming/ordinaryIncoming",
      resultSearchList: [],
			searchInput:"",

    }
  },
  onLoad(){
    
  },
  mounted(){
  },
  methods:{
    inputfun(){
      this.ifShowClearInput=true
    },
    clearSearchInput(){
      this.searchword='';
      this.ifShowClearInput=false;
    },
    searchFun(){
      let that=this;
      let data = {
					"orgId": "601104",
          "filterCode":that.searchword
				};
      that.interfaceRequest('/api/front/propertyInfo',data,"post",function(res){
        let search=res.data.data.houseList;
        for(let i in search){
          that.resultSearchList.push(search[i]);             
        }
        that.searchEffect();
      },function(err){

      });
    },
    searchEffect() {
      var that=this
      let hilight_word = function(BuildingName, word,Region,oldname,oldId) {
        //indexof方法的作用：判断是否包含传入参数，返回大于等于0的值表示包含
        let idx = word.indexOf(BuildingName);
        let t = [];
        if (idx > -1) {
          if (idx == 0) {
            t = hilight_word(BuildingName, word.substr(BuildingName.length));
            t.unshift({
              key: true,
              BuildingName: BuildingName,
              Region:Region,
              oldname:oldname,
              oldId:oldId
            });
            return t;
          }
          if (idx > 0) {
            t = hilight_word(BuildingName, word.substr(idx));
            t.unshift({
              key: false,
              BuildingName: word.substring(0, idx),
              Region:Region,
              oldname:oldname,
              oldId:oldId
            });
            return t;
          }
        }
        return [{
          key: false,
          BuildingName: word,
          Region:Region,
          oldname:oldname,
          oldId:oldId
        }];
      };
      let searched = [];
      let inputs = that.searchword;
      for (let i = 0; i < that.resultSearchList.length; i++) {
        var current_word = that.resultSearchList[i].buildingName;
        var Region = that.resultSearchList[i].region;
        let oldname= that.resultSearchList[i].buildingName;
        let oldId= that.resultSearchList[i].buildingNo;
        if (current_word.indexOf(inputs) > -1) {
          searched.push(hilight_word(inputs, current_word,Region,oldname,oldId))
        }
      }
      that.resultSearchList = searched;
    },

    searchResult(name,id){
      let projectName=name;
      let projectId=id;
      let that=this;
      let url=that.ordinaryIncoming+'?projectName='+name+'&projectId='+id;
      console.log(url);
      that.pageJump(url);
    },
  }
}
</script>
<style lang="scss" scoped>
  .search-box{
    width: 100%;
    height: 100%;
    background: #ffffff;
    .search-title{
      height: 65rpx;
      line-height: 65rpx;
      padding:117rpx 0 9rpx 0;
      display: inline-flex;
      vertical-align: middle;
      align-items: center;
       .ch-img{
          width: 20rpx;
          height: 36rpx;
          margin-left: 36rpx;
          img{
            width: 20rpx;
            height: 36rpx;
          }
        }
      .search{
        width:70%;
        height: 65rpx;
        line-height: 65rpx;
        display: inline-flex;
        vertical-align: middle;
        align-items: center;
        background: #F3F5FA;
        border-radius: 6rpx;
        margin-left: 30rpx;
        .img-slogo{
          width: 26rpx;
          height: 26rpx;
          margin-left: 21rpx;
        }
        .search-input{
          width: 466rpx;
          margin-left: 16rpx;
          background: transparent;
          font-size: 26rpx;
          color: #333345;
          letter-spacing: 1.52rpx;
        }
        .img-scancle{
          width: 32rpx;
          height: 32rpx;
          float: right;
          margin-right: 22rpx;
        }
      }
      .search-submit{
        height: 42rpx;
        line-height: 42rpx;
        font-size: 30rpx;
        color: #333345;
        margin-left: 38rpx;
        display: inline-block;
      }
    }
    .search-title:after{
      display: block;
      content: "";
      clear: both;
    }
    .search-result{
      margin-top: 7rpx;
      padding-left: 30rpx;
      .partner-title{
         height: 60rpx;
         line-height:60rpx;
         color: #333435;
      }
      .partner-box{
        color: #999999;
        margin-right: 60rpx;
        font-size: 24rpx;
        border-bottom: solid 2rpx #E5E5E5;
        text{
          height: 33rpx;
          line-height: 33rpx;
        }
        .partner-b{
          float: right;
        }
      }
      .partner-search{
        margin-top: 27rpx;
        margin-left: 30rpx;
      }
      .search-one{
        padding-left: 10rpx;
        border-bottom: 1rpx solid #E5E5E5;
        .search-name{
          height: 45rpx;
          line-height: 45rpx;
          color: #333345;
          font-size: 32rpx;
          margin-top: 29rpx;
        }
        .search-address{
          height: 33rpx;
          line-height: 33rpx;
          color: #999999;
          font-size: 24rpx;
          margin-top: 8rpx;
          margin-bottom: 29rpx;
        }
      }
      .search-one:after{
        display: block;
        content: "";
        clear: both;
      }
    }
  }
</style>

