<template>
  <view class="outermost">
    <view :class="phoneSystem ? 'pf-title pf-title-ios pf-titleTwo pf-titleTwo-ios':'pf-title pf-titleTwo'">
      <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
      <text>{{title}}</text>
    </view>
    <view class="container">
      <view class="uni-flex uni-row operationList">
        <view class="flex-item" @click="add(1)">
          <view class="topPart">
            <img src="@/static/images/addManually.png" />
          </view>
          <view class="bottomPart">手动新增</view>
        </view>
        <view class="flex-item" @click="addToast">
          <view class="topPart">
            <img src="@/static/images/addPhotoId.png" />
          </view>
          <view class="bottomPart">拍身份证新增</view>
        </view>
        <view class="flex-item" @click="addToast">
          <view class="topPart">
            <img src="@/static/images/addShare.png" />
          </view>
          <view class="bottomPart">分享给客户填写</view>
        </view>
      </view>
      <view class="pinformations">
        <!-- 借款人 -->
        <view class="pinformation">
          <view class="clearfix">
            <view class="pinformation-left">
              <text>{{borrower.fullName}}</text>
              <view class="unmarried" v-if="borrower.marriage=='10'">未婚</view>
              <view class="married" v-else-if="borrower.marriage=='20'">已婚</view>
              <view class="unmarried" v-else-if="borrower.marriage=='30'">丧偶</view>
              <view class="unmarried" v-else-if="borrower.marriage=='40'">离婚</view>
            </view>
            <view class="pinformation-right" @click="toComplete('借款人',borrower.customerCertType,borrower.customerCertID,borrower.fullName,'no')">
              <text v-if="borrower.completeFlag=='1'">已完善</text>
              <text class="not-completed" v-else-if="borrower.completeFlag=='2'">未完善</text>
              <img src="@/static/images/firstroom/formChooseArrow.svg" />
            </view>
          </view>
          <view class="personIdentity">借款人</view>
        </view>
        
        <uni-swipe-action>
          <!-- 借款人配偶 -->
          <uni-swipe-action-item v-for="(item,index) in otherCustomerList" :options="options" :key="index+'e'" @change="swipeChange" @click="swipeClick($event,'借款人配偶',item.certID)">
            <view class="pinformation borderT">
              <view class="clearfix">
                <view class="pinformation-left">
                  <text>{{item.customerName}}</text>
                </view>
                <view class="pinformation-right" @click="toComplete('借款人配偶',item.certType,item.certID,item.customerName,'no')">
                  <text v-if="item.completeFlag=='1'">已完善</text>
                  <text class="not-completed" v-else-if="item.completeFlag=='2'">未完善</text>
                  <img src="@/static/images/firstroom/formChooseArrow.svg" />
                </view>
              </view>
              <view class="personIdentity">借款人配偶</view>
            </view>
          </uni-swipe-action-item>
          
          <!-- 共借人及其配偶 -->
          <uni-swipe-action-item v-for="(item,index) in sameList" :options="options" :key="index+'a'" @change="swipeChange" @click="swipeClick($event,item.pclass,item.certID)">
            <view class="pinformation marginT30" v-if="item.pclass=='共借人'">
              <view class="clearfix">
                <view class="pinformation-left">
                  <text>{{item.customerName}}</text>
                  <view class="unmarried" v-if="item.marriage=='10'">未婚</view>
                  <view class="married" v-else-if="item.marriage=='20'">已婚</view>
                  <view class="unmarried" v-else-if="item.marriage=='30'">丧偶</view>
                  <view class="unmarried" v-else-if="item.marriage=='40'">离婚</view>
                </view>
                <view class="pinformation-right" @click="toComplete('共借人',item.certType,item.certID,item.customerName,'no')">
                  <text v-if="item.completeFlag=='1'">已完善</text>
                  <text class="not-completed" v-else-if="item.completeFlag=='2'">未完善</text>
                  <img src="@/static/images/firstroom/formChooseArrow.svg" />
                </view>
              </view>
              <view class="personIdentity">共借人</view>
            </view>
            <view class="pinformation borderT"  v-if="item.pclass=='共借人配偶'">
              <view class="clearfix">
                <view class="pinformation-left">
                  <text>{{item.customerName}}</text>
                </view>
                <view class="pinformation-right" @click="toComplete('共借人配偶',item.certType,item.certID,item.customerName,item.relCertID)">
                  <text v-if="item.completeFlag=='1'">已完善</text>
                  <text class="not-completed" v-else-if="item.completeFlag=='2'">未完善</text>
                  <img src="@/static/images/firstroom/formChooseArrow.svg" />
                </view>
              </view>
              <view class="personIdentity">共借人配偶</view>
            </view>
          </uni-swipe-action-item>

          <!-- 担保人及其配偶 -->
          <uni-swipe-action-item v-for="(item,index) in guarList" :options="options" :key="index+'b'" @change="swipeChange" @click="swipeClick($event,item.pclass,item.certID)">
            <view class="pinformation marginT30" v-if="item.pclass=='担保人'">
              <view class="clearfix">
                <view class="pinformation-left">
                  <text>{{item.guarantorName}}</text>
                  <view class="unmarried" v-if="item.marriage=='10'">未婚</view>
                  <view class="married" v-else-if="item.marriage=='20'">已婚</view>
                  <view class="unmarried" v-else-if="item.marriage=='30'">丧偶</view>
                  <view class="unmarried" v-else-if="item.marriage=='40'">离婚</view>
                </view>
                <view class="pinformation-right" @click="toComplete('担保人',item.certType,item.certID,item.guarantorName,'no')">
                  <text v-if="item.completeFlag=='1'">已完善</text>
                  <text class="not-completed" v-else-if="item.completeFlag=='2'">未完善</text>
                  <img src="@/static/images/firstroom/formChooseArrow.svg" />
                </view>
              </view>
              <view class="personIdentity">担保人</view>
            </view>
            <view class="pinformation borderT" v-if="item.pclass=='担保人配偶'">
              <view class="clearfix">
                <view class="pinformation-left">
                  <text>{{item.customerName}}</text>
                </view>
                <view class="pinformation-right" @click="toComplete('担保人配偶',item.certType,item.certID,item.customerName,item.relCertID)">
                  <text v-if="item.completeFlag=='1'">已完善</text>
                  <text class="not-completed" v-else-if="item.completeFlag=='2'">未完善</text>
                  <img src="@/static/images/firstroom/formChooseArrow.svg" />
                </view>
              </view>
              <view class="personIdentity">担保人配偶</view>
            </view>
          </uni-swipe-action-item>
        </uni-swipe-action>

      </view>
    </view>
      
      <!-- 手动增加选择关联人弹框 -->
      <view class="modalMask" v-if="isModalShow" @click="closeModel"></view>
      <transition name="slide">
        <view class="modal" v-if="isModalShow">
          <view class="modalTitle">选择关联人</view>
          <view class="modalContent">
            <view v-for="(item,index) in relatedPersonList" :key="index+'a'" :class="['option',{active:active==index}]" @click="selected(index)">{{item}}</view>
          </view>
          <view class="btns" @click="closeModel">取消</view>
        </view>
      </transition>

  </view>
</template>
<script>
import uniSection from '@/components/uni-section/uni-section.vue';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';
import { mapGetters, mapMutations,mapActions } from 'vuex'

export default {
	components: { uniSection, uniSwipeAction, uniSwipeActionItem },
  data:function(){
    return {
      title: "人员信息",
      isModalShow: false,
      addType: 0,  //0什么也不是，1是手动新增，2是拍身份证新增
      active: 100,
      relatedPersonList: ['共借人','担保人', '借款人配偶', '共借人配偶', '担保人配偶'],
      borrower: {  //借款人
        customerCertID: '',
        customerCertType: '',
        fullName: '',
        marriage: '',
        completeFlag: '',
        spouse: {}
      },
      otherCustomerList: [],  //借款人配偶
      sameApplyList: [],  //共借人
      sameApplyList: [],   //共借人配偶
      sameList: [],  //共借人及其配偶
      guarantorList: [],  //担保人
      guarantyRelList: [],   //担保人配偶
      guarList: [],  //担保人及其配偶
      navigateFlag: false,
      householdRegister: 'personInformation/householdRegister/householdRegister',
      listName: '',
      sendArr: [],
      options: [{
        text: '删除',
        style: {
          backgroundColor: 'transparent',
          marginTop: '30rpx'
        }
			}],
      orderNoVal: '',  //订单编号
      applyNoVal: ''  //申请编号
    }
  },
  computed: {
    ...mapGetters(['approvalIngList','queryApplyInfoList'])
  },
  onLoad() {
    console.log(888888888888);
    console.log(this.approvalIngList);
    console.log(this.queryApplyInfoList);
    this.pageInfo()
  },
  methods: {
    ...mapActions(['queryApplyInfoCommit']),
    ...mapMutations(["personalInformationReplace"]),
    addToast(){
      yu.showToast({
            title:"敬请期待",
            icon: 'none',
            duration: 3000
          });
           yu.hideLoading();
    },
    // 左滑删除
    swipeChange(e) {
      console.log('返回：', e);
    },
    swipeClick(e, perInd, cid) {
      let {
        content
      } = e
      if (content.text === '删除') {
        uni.showModal({
          title: '提示',
          content: '是否删除',
          success: (res) => {
            if (res.confirm) {
              if(perInd=='担保人' || perInd=='共借人'){
                this.deleteP(perInd,cid);
              }else if(perInd=='担保人配偶' || perInd=='共借人配偶' || perInd=='借款人配偶'){
                this.deleteSpouse(perInd,cid);
              }
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }
    },
    //返回上一页
    navigateBack(){
      // uni.navigateBack();
      this.pageJump('perfectInformation/perfectInformation')
    },
    // 页面初始化
    pageInfo(){
      this.orderNoVal = this.approvalIngList.orderNo;
      this.applyNoVal = this.approvalIngList.serialNo;
      let resData = this.queryApplyInfoList;
      // 借款人信息
      this.borrower.customerCertID = resData.customerCertID;
      this.borrower.customerCertType = resData.customerCertType;
      this.borrower.fullName = resData.fullName;
      this.borrower.marriage = resData.marriage;
      this.borrower.completeFlag = resData.completeFlag;
      this.otherCustomerList = resData.otherCustomerList;
      // 共借人信息，且如果共借人配偶有值，将共借人配偶信息添加到相应的共借人信息里
      this.sameApplyList = resData.sameApplyList;
      this.sameApplyRelList = resData.sameApplyRelList;
      let sameArr = [];
      if(this.sameApplyList && this.sameApplyRelList){
        this.sameApplyList.forEach((item, index) => {
          item.pclass="共借人"
          this.sameApplyRelList.forEach((ite,idx) => {
            ite.pclass="共借人配偶"
            if (item.certID === ite.relCertID) {
              sameArr.push(item);
              sameArr.push(ite);
            }else{
              sameArr.push(item);
            }
          });
        });
        this.sameList = this.unique(sameArr);
      }else if(this.sameApplyList && this.sameApplyRelList==null){
        this.sameApplyList.forEach((item, index) => {
          item.pclass="共借人"
        });
        this.sameList=this.sameApplyList;
      }
      console.log(this.sameList)
      // 担保人信息，且如果担保人配偶有值，将担保人配偶信息添加到相应的担保人信息里
      this.guarantorList = resData.guarantorList;
      this.guarantyRelList = resData.guarantyRelList;
      let guarArr = [];
      if(this.guarantorList && this.guarantyRelList){
        this.guarantorList.forEach((item, index) => {
          item.pclass="担保人"
          this.guarantyRelList.forEach((ite,idx) => {
            ite.pclass="担保人配偶"
            if (item.certID === ite.relCertID) {
              guarArr.push(item);
              guarArr.push(ite);
            }else{
              guarArr.push(item);
            }
          });
        });
        this.guarList = this.unique(guarArr);
        console.log(this.guarList);
      }else if(this.guarantorList && this.guarantyRelList==null){
        this.guarantorList.forEach((item, index) => {
          item.pclass="担保人"
        });
        this.guarList=this.guarantorList
      }
    },
    //数组去重
    unique(arr) {
      const res = new Map();
      return arr.filter((a) => !res.has(a) && res.set(a, 1))
    },
    add(addType){
      this.personalInformationReplace({});
      this.isModalShow=true;
      this.addType=addType;
    },
    closeModel(){
      this.isModalShow=false;
      this.addType=0;
    },
    selected(idx){
      console.log(5555555555);
      console.log(this.approvalIngList);
      this.active=idx;
      this.pageJump(this.householdRegister+'?identity='+this.relatedPersonList[this.active]);
      this.isModalShow=false;
    },
    // 去完善信息
    toComplete(pType,certType,certID,customerName,relCertID){
      let data = {
        certType: certType,
        certId: certID,
        customerName: customerName,
        relCertID: relCertID
      }
      this.personalInformationReplace(data);
      if(pType=='借款人'){
        this.pageJump('personInformation/borrowerInformation/householdRegister/householdRegister')
      }else{
        this.pageJump('personInformation/householdRegister/householdRegister?identity='+pType)
      }
    },
    // 删除共借人、担保人
    deleteP(perInd,cid){
      if(perInd=='共借人'){
        this.listName='sameApplyList';
        var idx=1000;
        this.sameApplyList.forEach((item, index) => {
          if(item.certID==cid){
            idx=index
          }
        });
        this.sameApplyList.splice(idx,1);
        this.sendArr=this.sameApplyList;
        // if(this.sameApplyRelList.length>0){
        //   var ind=1000;
        //   this.sameApplyRelList.forEach((item, index) => {
        //     if(item.relCertID==cid){
        //       ind=index
        //     }
        //   });
        //   this.sameApplyRelList.splice(ind,1);
        // }
      }else if(perInd=='担保人'){
        this.listName='guarantorList';
        var idx=1000;
        this.guarantorList.forEach((item, index) => {
          if(item.certID==cid){
            idx=index
          }
        });
        this.guarantorList.splice(idx,1);
        this.sendArr=this.guarantorList;
        // if(this.guarantyRelList.length>0){
        //   var ind=1000;
        //   this.guarantyRelList.forEach((item, index) => {
        //     if(item.relCertID==cid){
        //       ind=index
        //     }
        //   });
        //   this.guarantyRelList.splice(ind,1);
        // }
      }
      this.listUpdate(1);
    },
    // 删除借款人、共借人、担保人的配偶
    deleteSpouse(perInd,cid){
      if(perInd=='共借人配偶'){
        this.listName='sameApplyRelList'
        var ind=1000;
        this.sameApplyRelList.forEach((item, index) => {
          if(item.certID==cid){
            ind=index
          }
        });
        this.sameApplyRelList.splice(ind,1);
        this.sendArr=this.sameApplyRelList;
      }else if(perInd=='担保人配偶'){
        this.listName='guarantyRelList'
        var ind=1000;
        this.guarantyRelList.forEach((item, index) => {
          if(item.certID==cid){
            ind=index
          }
        });
        this.guarantyRelList.splice(ind,1);
        this.sendArr=this.guarantyRelList;
      }else if(perInd=='借款人配偶'){
        this.listName='otherCustomerList'
        var ind=1000;
        this.otherCustomerList.forEach((item, index) => {
          if(item.certID==cid){
            ind=index
          }
        });
        this.otherCustomerList.splice(ind,1);
        this.sendArr=this.otherCustomerList;
      }
      this.listUpdate(2);
    },
    // 3.12接口 关联人列表更新
    listUpdate(type){
      let data={
        orderNo: this.orderNoVal,
        applyNo: this.applyNoVal,
        listName: this.listName,
        [this.listName]: this.sendArr
      }
      let posturl="/api/credit/updateApplyInfo";
      console.log(1111111111)
      console.log(data)
      yu.showLoading();
      this.interfaceRequest(posturl,data,"post",(res)=>{
        yu.hideLoading();
        let resArr=res.data.data;
        if(resArr.returnCode == 'Success'){
          this.queryApplyInfoCommit({
            "orderNo": this.orderNoVal, 
            "applyNo": this.applyNoVal,
            'routerTrue': true,
            'routerTo': 'personInformation',
            'routerJumpWay': 'navigateTo'
          }); //重新调'申请信息查询'接口
        }else{
          yu.showToast({
            title: resArr.returnDesc,
            icon: 'none',
            duration: 3000
          });
        }
      },(err)=>{
        yu.hideLoading();
        yu.showToast({
          title: '3.3.12更新失败，请联系管理员',
          icon: 'none',
          duration: 3000
        });
      });
    }
  }
}
</script>
<style lang="scss" scoped>

.container{
  box-sizing: border-box;
  height: 100%;
  padding-top: 130rpx;
  overflow-y: auto;
}
.operationList{
  background: #ffffff;
}
.operationList .flex-item{
  width: 33.33%;
  height: 180rpx;
  padding-top: 43rpx;
  .topPart{
    height: 60rpx;
    line-height: 6prpx;
    margin-bottom: 12rpx;
    text-align: center;
    img{
      height: 60rpx;
    }
  }
  .bottomPart{
    font-size: 24rpx;
    color: #333333;
    text-align: center;
  }
}
.pinformations{
  padding: 30rpx 30rpx 30rpx 30rpx;
  .pinformation-one{
    padding-left: 32rpx;
    /* background: #FFFFFF; */
    /* box-shadow: 0 0 28rpx 0 rgba(0,0,0,0.11); */
    /* border-radius: 20rpx; */
  }
 /*  .pinformation-one+.pinformation-one{
    margin-top: 30rpx;
  } */
  .pinformation{
    box-sizing: border-box;
    width: 100%;
    padding: 39rpx 0 21rpx 16rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
  }
  .pinformation+.pinformation{
    border-top: 1rpx solid #e5e5e5;
  }
  .personIdentity{
    font-size: 24rpx;
    color: #999999;
  }
  .pinformation-left{
    height: 45rpx;
    line-height: 45rpx;
    float: left;
    display: flex;
    vertical-align: middle;
    align-items: center;
    img{
      width: 80rpx;
      height: 80rpx;
    }
    text{
      height: 45rpx;
      line-height: 45rpx;
      font-size: 32rpx;
      color: #333333;
      // margin-left: 16rpx;
    }
    .married{
      width: 73rpx;
      height: 33rpx;
      line-height: 33rpx;
      background: #E8F6FF;
      border-radius: 6rpx;
      border-radius: 6rpx;
      font-size: 22rpx;
      color: #8D9CA5;
      text-align: center;
      margin-left: 10rpx;
    }
    .unmarried{
      width: 73rpx;
      height: 33rpx;
      line-height: 33rpx;
      background: #FCEDE4;
      border-radius: 6rpx;
      border-radius: 6rpx;
      font-size: 22rpx;
      color: #ECB391;
      text-align: center;
      margin-left: 10rpx;
    }
  }
  .pinformation-right{
    height: 45rpx;
    line-height: 45rpx;
    float: right;
    display: flex;
    vertical-align: middle;
    align-items: center;
    img{
      width: 14rpx;
      height: 28rpx;
      padding-right: 30rpx
    }
    text{
      height: 33rpx;
      line-height: 33rpx;
      font-size: 24rpx;
      color: #999999;
      margin-right: 14.7rpx;
    }
    text.not-completed{
      color: #E89F73;
    }
  }
  .pinformation-two{
    width: 658rpx;
    height: 281rpx;
    padding-left: 32rpx;
    background: #FFFFFF;
    box-shadow: 0 0 28rpx 0 rgba(0,0,0,0.11);
    border-radius: 20rpx;
    .pinformation{
      padding-left: 3rpx;
    }
  }
}
.clearfix:after{
  clear: both;
}
.slide-enter-active, .slide-leave-active {
    transition: all 0.2s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(0, 100%, 0)
}
.modalMask{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.65);
}
.modal{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #F6F8F9;
  text-align: center;
  color: #333435;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  overflow: hidden;
  .modalTitle{
    height: 105rpx;
    line-height: 105rpx;
    font-size: 36rpx;
  }
  .modalTitle,.modalContent,.btns{
    background: #FFFFFF;
  }
  .option{
    height: 105rpx;
    line-height: 105rpx;
    font-size: 32rpx;
    border-top: 1rpx solid #EEEEEE;
  }
  .option.active{
    color: #3B86F7;
  }
  .btns{
    height: 105rpx;
    line-height: 105rpx;
    margin-top: 20rpx;
    font-size: 32rpx;
  }
}
.marginT30{
  margin-top: 30rpx;
}
.borderT{
  border-top: 1rpx solid #EEEEEE;
}

.deleteBtn{
  width: 100rpx;
  height: 40rpx;
  line-height: 40rpx;
  background: #FCEDE4;
  border-radius: 6rpx;
  font-size: 25rpx;
  color: #ECB391;
  text-align: center;
  margin-left: 20rpx;
}


	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/common/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.cont {
		display: block;
		flex: 1;
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding: 10px 0;
		background-color: #fff;
	}

	.button {
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		padding: 4px 8px;
		border-radius: 4px;
	}

	.button-text {
		font-size: 15px;
	}
  .uni-swipe_button{
    margin-top: 30rpx;
  }
</style>
