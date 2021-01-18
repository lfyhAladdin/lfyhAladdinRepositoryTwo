<template>
  <view class="uni-container">
    <!--<view class="pf-title pf-titleThree">
      <img src="@/static/images/profession/pf-back.svg" @click="backpf">
      <text>担保合同</text>
      <text class="pf-text" @click="updateApplyInfo('TS')">暂存</text>
    </view> -->
    <view class="pf-title pf-titleTwo">
      <img src="@/static/images/profession/pf-back.svg" @click="backpf">
      <text>担保合同</text>
    </view>
    <view class="pf-content contract-content">
      <view class="contract-title">
        <text class="contract-title-text"></text>
        <text>担保合同信息</text>
      </view>
      <view class="contract-ul">
        <view class="contract-li">
          <view>担保类型</view>
          <view>
            <picker :range="contractTypeArr" :range-key="'value'" :value="collateralTypeIndex" disabled>
              {{contractTypeArr[collateralTypeIndex].value}}
            </picker>
          </view>
        </view>
        <view class="contract-li">
          <view>担保方式</view>
          <view>
            <picker :range="guarantyTypeArr" :range-key="'value'" :value="guarantyTypeIndex" disabled>
              {{guarantyTypeArr[guarantyTypeIndex].value}}
            </picker>
          </view>
        </view>
        <view class="contract-li">
          <view>是否主担保方式</view>
          <view>
            <picker :range="isMainContractArr" :range-key="'value'" :value="isMainContractIndex" disabled>
              {{isMainContractArr[isMainContractIndex].value}}
            </picker>
          </view>
        </view>
      </view>
      <view class="contract-ul mt-20">
        <view class="contract-li">
          <view class="beforeRed">主抵押人</view>
          <view>
            <text>{{guarantorNameVal}}</text>
          </view>
        </view>
        <view class="contract-li">
          <view>其他抵押人</view>
          <view @click="toMortgagor">
            <text>{{viceGuarantorNameVal}}</text>
            <img src="@/static/images/perfectInformation/formChooseArrow.svg">
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">担保金额（元）</view>
          <view>
            <!--<input class="uni-input" placeholder="请输入" disabled v-model="relativeSumVal"/>-->
            <text>{{relativeSumVal}}</text>
          </view>
        </view>
        <view class="contract-li">
          <view>备注</view>
          <view>
            <input class="uni-input" 
              placeholder="非必输"  
              v-model="markVal" 
              @focus="focusInput('mark')" 
              @blur="blurInput($event,'mark')"/>  
            <text class="imgCross" v-show="markFocus" @click="imgCrossClick('mark')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
      </view>
      <view class="contract-ul mt-20" v-if="gcSerialNo != ''">
        <view class="contract-li">
          <view class="contract-title">
            <text class="contract-title-text"></text>
            <text>押品信息</text>
          </view>
          <view class="contract-title-img" @click="addMortgagor()">
            <img src="@/static/images/perfectInformation/addCollateral.svg">
          </view>
        </view>
      </view>
      <view class="guaranty-ul" v-if="gcSerialNo != ''">
        <view class="guaranty-li" v-for="item in collateralList" :key="item.clrId" @click="addMortgagor(item)">
          <view class="guaranty-liTop">
            <view class="guaranty-liTopOne">
              <view>{{item.residenceAdd}}</view>
              <view>{{item.floorArea}}㎡</view>
            </view>
            <view>抵押人：{{item.ownerName1}}</view>
          </view>
          <img src="@/static/images/perfectInformation/formChooseArrow.svg" class="guaranty-liImg">
        </view>
      </view>
      <view class="contract-button">
        <button type="primary" @click="updateApplyInfo('save')">保存</button>
        <button type="primary" plain="true" @click="updateApplyInfo('delete')">删除</button>
      </view>
    </view>
  </view>
</template>

<script>
  import filter from '@/utils/filters';  //格式化金额、证件号等
  import {mapGetters, mapMutations, mapActions } from 'vuex';
  export default {
    components: {},
    data() {
      return {
        collateralTypeIndex: 0,
        contractTypeArr: [
          {
            'key': '010',
            'value': '一般担保'
          }
        ],
        guarantyTypeIndex: 0,
        guarantyTypeArr: [
          {
            'key': '050',
            'value': '抵押'
          }
        ],
        isMainContractIndex: 0,
        isMainContractArr: [
          {
            'key': '1',
            'value': '是'
          }
        ],
        contractTypeVal: '010',
        guarantyTypeVal: '050',
        isMainContractVal: '1',
        relativeSumVal: '',  //默认贷款金额，不可修改
        markVal: '',
        markFocus: false,
        collateralList: [],  //押品列表
        otherGuarantorListArr: [],  //其他权属人信息
        orderNoVal: '',  //订单编号
        applyNoVal: '',  //申请编号
        businessTypeVal: '',  //业务品种
        certTypeVal: '',  //担保人证件类型，不可修改
        certIDVal: '',  //担保人证件号码，不可修改
        guarantorNameVal: '',  //担保人姓名，不可修改
        viceGuarantorNameVal: '',  //其他担保人姓名
        preventResubmit: true,  //防重复提交
      }
    },
    onLoad() {},
    onShareAppMessage() {},
    computed:{
      ...mapGetters([
        'gcSerialNo',
        'queryApplyInfoList',
        'viceMortgagorArr',
        'guarantyInputList',
        'collateralInputList',
        'collateralPickerList',
        'approvalIngList',
      ])
    },
    created(){
      console.log('新增担保合同')
      console.log(this.gcSerialNo)  //担保合同号
      console.log(this.queryApplyInfoList)
      console.log(this.approvalIngList)
      console.log(this.queryApplyInfoList.guarantyList)
      
      this.guarantyCreated();
    },
    methods: {
      ...mapActions(['queryApplyInfoCommit']),
      ...mapMutations([
        'viceMortgagorArrReplace',
        'guarantyInputListReplace',
        'ypviceMortgagorArrReplace',
        'emptyReplace',
      ]),
      guarantyCreated(){
        this.relativeSumVal = this.queryApplyInfoList.businessSum;
        this.certTypeVal = this.queryApplyInfoList.customerCertType;  
        this.certIDVal = this.queryApplyInfoList.customerCertID;  
        this.guarantorNameVal = this.queryApplyInfoList.fullName;

        this.orderNoVal = this.approvalIngList.orderNo;
        this.applyNoVal = this.approvalIngList.serialNo;
        this.businessTypeVal = this.approvalIngList.businessType;
        
        if(this.viceMortgagorArr.length > 0){
          this.viceGuarantorNameVal = this.viceMortgagorArr[0].guarantorName;
        }
        if(this.queryApplyInfoList.guarantyList != null){
          let obj1 = this.queryApplyInfoList.guarantyList[0];
          for(let k in obj1){
            this[`${k}Val`] = obj1[k];
          };
        }
        this.collateralList = this.queryApplyInfoList.clrList;  //不做数据处理，只展示押品信息
        let obj = this.guarantyInputList;
        console.log('暂存信息')
        if(Object.keys(obj).length != 0){
          for(let k in obj){
            if(obj[k] != ''){
              this[k] = obj[k];
            }
          };
        }
      },
      //抵押人
      toMortgagor(){
        yu.navigateTo({
          url: 'mortgagor?applyPhase=01',
        });
      },
      //输入框
      blurInput(e,name){
        this[`${name}Val`] = e.target.value;
        this.guarantyInputListReplace({
          'key': `${name}Val`,
          'value': e.target.value,
        });
      },
      focusInput(name){
        this[`${name}Focus`] = true;
      },
      imgCrossClick(name){
        this[`${name}Val`] = '';
        this[`${name}Focus`] = false;
      },
      //添加押品信息
      addMortgagor(e){
        // return false;
        console.log(e)
        if(e == undefined){
          if(this.collateralList != null && this.collateralList.length > 0){
            yu.showToast({
              title: '已存在押品，无法添加，如需新增押品，需先删除当前押品',
              // image: '/static/images/perfectInformation/success.svg',
              icon: 'none',
              duration: 5000
            });
            return false;
          };
        }
        if(this.queryApplyInfoList.otherClrList != null){
          this.ypviceMortgagorArrReplace(this.queryApplyInfoList.otherClrList);
        }else{
          this.ypviceMortgagorArrReplace([]);
        }
        this.emptyReplace('collateralInputList');
        this.emptyReplace('collateralPickerList');
        yu.navigateTo({
          url: 'collateral',
        });
      },
      //申请信息更新
      updateApplyInfo(e){
        //TS暂存  save保存  delete删除
        console.log(e)
        if(!this.preventResubmit){
          yu.showModal({
            content: '操作进行中，请稍等',
            showCancel: false,
            cancelText: "确定",
            success: function (res) {
              // if (res.confirm) {
              //   console.log('用户点击确定');
              // }
            }
          });
          return;
        };
        this.preventResubmit = false;
        yu.showLoading();
        let arr = this.queryApplyInfoList.guarantyList;
        let arrList = [];
        if(arr != undefined && arr != null){
          arrList = arr.concat();
        }
        console.log(arrList)
        let guarantyList = [];
        // if(e == 'TS' || e == 'save'){
        if(e == 'save'){
          if(this.gcSerialNo != ''){
            //担保合同修改
            arrList.forEach((item)=>{
              if(item.gcSerialNo == this.gcSerialNo){
                item.gcSerialNo = this.gcSerialNo;  //担保合同号
                item.contractType = this.contractTypeVal; //担保合同类型
                item.guarantyType = this.guarantyTypeVal;  //抵质押类型
                item.isMainContract = this.isMainContractVal;  //是否主担保合同
                item.certType = this.certTypeVal;  //担保人证件类型
                item.certID = this.certIDVal;  //担保人证件号码
                item.guarantorName = this.guarantorNameVal;  //担保人姓名
                item.relativeSum = this.relativeSumVal;  //担保金额
                item.mark = this.markVal;  //备注
              }
            })
          }else{
            //担保合同新建
            arrList.push(
              {
                'contractType': this.contractTypeVal,  //担保合同类型
                'guarantyType': this.guarantyTypeVal,  //抵质押类型
                'isMainContract': this.isMainContractVal,  //是否主担保合同
                'certType': this.certTypeVal,  //担保人证件类型
                'certID': this.certIDVal,  //担保人证件号码
                'guarantorName': this.guarantorNameVal,  //担保人姓名
                'relativeSum': this.relativeSumVal,  //担保金额
                'mark': this.markVal,  //备注
              }
            );
          }
          guarantyList = arrList;
        }else{
          if(this.gcSerialNo != ''){
            guarantyList = arrList.filter(item=> item.gcSerialNo != this.gcSerialNo);
            this.viceMortgagorArrReplace([]);
          }
        };
        let data = {
          "orderNo": this.orderNoVal, 
          "applyNo": this.applyNoVal,
          'listName': 'guarantyList,otherGuarantorList',  //更新列表名称
          'businessType': this.businessTypeVal,  //业务品种
          'guarantyList': guarantyList,
          'otherGuarantorList': this.viceMortgagorArr
        }
        console.log(data.guarantyList)
        this.interfaceRequest('/api/credit/updateApplyInfo',data,"post",(res)=>{
          yu.hideLoading();
          console.log(res)
          console.log(res.data.data)
          this.preventResubmit = true;
          if(res.data.data.returnCode != 'Success'){
            yu.showToast({
              title: res.data.data.returnDesc,
              icon: 'none',
              duration: 3000
            });
            return;
          };
          yu.showToast({
            title: res.data.data.returnDesc,
            icon: 'none',
            duration: 3000
          });
          setTimeout(()=>{
            this.queryApplyInfoCommit({
              "orderNo": this.orderNoVal, 
              "applyNo": this.applyNoVal,
              'routerTrue': true,
              'routerTo': 'guarantyContract',
              'routerJumpWay': 'navigateTo'
            }); //重新调'申请信息查询'接口，确保担保合同信息列表准确
          },3000);
          // if(e == 'TS'){
          //   yu.showToast({
          //     title: '暂存成功',
          //     image: './static/images/perfectInformation/success.svg',
          //     duration: 2000
          //   });
          // }else{
          //   setTimeout(()=>{  
          //     yu.navigateTo({
          //       url: 'guarantyContract',
          //     });
          //   },1500)
          // }
          // setTimeout(()=>{  
          //   yu.navigateTo({
          //     url: 'guarantyContract',
          //   });
          // },2000)
        },(err)=>{
          console.log(err)
          yu.hideLoading();
          this.preventResubmit = true;
          yu.showToast({
            title: '3.12更新失败，请联系管理员',
            icon: 'none',
            duration: 3000
          });
        });
      },
      //返回
      backpf(){
        yu.showModal({
          title: '确定返回？',
          content: '数据还未提交，点确定后编辑过的内容将不保存',
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              yu.navigateTo({
                url: 'guarantyContract',
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
    }
  }
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  @import '@/static/css/professionwf.less';
  .uni-container{
    // padding: 30rpx 0;
    padding: 0 0 30rpx 0;
    .pf-titleTwo{
      img{
        background-color: greenyellow;
      }
    } 
    .contract-content{
      padding-top: 130rpx;
      .contract-title{
        padding: 30rpx 40rpx;
        line-height: 32rpx;
        display: flex;
        align-items: flex-end;
        uni-text{  
          font-size: 32rpx;
          color: #333435;
        }
        .contract-title-text{
          display: inline-block;
          width: 10rpx;
          height: 30rpx;
          color: #3B86F7;
          background: #3B86F7;
          border-radius: 4rpx;
          margin-right: 8rpx;
        }
      }
      .contract-li{
        .contract-title{
          padding: 0;
        }
        .contract-title-img{
          img{
            width: 30rpx;
            height: 30rpx;
          }
        }
        .imgCross{
          img{
            margin-left: 0;
          }
        }
      }
      .mt-20{
        margin-top: 20rpx;
      }
      .guaranty-ul{
        margin-top: 30rpx;
        padding: 0 30rpx;
      }
    }
  }
</style>