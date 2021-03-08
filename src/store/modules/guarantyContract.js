import Vue from 'vue';
let $Vue = Vue.prototype;
export default {
  state: {
    queryApplyInfoList: {},  //3.1申请信息查询接口
    gcSerialNo: '',  //担保合同--担保合同号; 修改担保合同时有，新增担保合同是为空,用来匹配抵押人
    viceMortgagorArr: [],  //担保合同--抵押人, 其他抵押人(可多个);
    guarantyInputList: {},  //担保合同--input输入框;
    ypviceMortgagorArr: [],  //担保合同--押品--抵押人, 其他抵押人(可多个);
    collateralInputList: {},  //担保合同--押品--押品列表信息-input输入框;
    collateralPickerList: {},  //担保合同--押品--押品列表信息-picker选择框;
    queryDictionaryListObj: {},  //担保合同--押品--数据字典查询;
    queryDictionaryListArr: [
      {
        'dictionaryName': 'clrTypeId',  //押品类型
        'dataVal' : 'clrTypeIdArr',
      },
      // {
      //   'dictionaryName': 'certSubjectNo',  //押品科目号
      //   'dataVal' : 'certSubjectNoArr',
      // },
      // {
      //   'dictionaryName': 'houseStatus',  //房屋状态
      //   'dataVal' : 'houseStatusArr',
      // },
      {
        'dictionaryName': 'attribute_3',  //土地使用权类型
        'dataVal' : 'attribute_3Arr',
      },
      // {
      //   'dictionaryName': 'number6',  //房屋销售性质
      //   'dataVal' : 'number6Arr',
      // },
      {
        'dictionaryName': 'number7',  //房屋结构
        'dataVal' : 'number7Arr',
      },
      {
        'dictionaryName': 'houseType',  //户型
        'dataVal' : 'houseTypeArr',
      },
      // {
      //   'dictionaryName': 'clrStatus',  //押品实物状态
      //   'dataVal' : 'clrStatusArr',
      // },
      {
        'dictionaryName': 'currevalMode',  //抵押物评估方式
        'dataVal' : 'currevalModeArr',
      },
    ], //需要查询的数据字典
    provincesListData: [],  //获取省市区三级级联数据
    
  },
  getters: {
    queryApplyInfoList: state => state.queryApplyInfoList,
    gcSerialNo: state => state.gcSerialNo,
    viceMortgagorArr: state => state.viceMortgagorArr,
    guarantyInputList: state => state.guarantyInputList,
    ypviceMortgagorArr: state => state.ypviceMortgagorArr,
    collateralInputList: state => state.collateralInputList,
    collateralPickerList: state => state.collateralPickerList,
    queryDictionaryListObj: state => state.queryDictionaryListObj,
    provincesListData: state => state.provincesListData,
  },
  mutations: {
    queryApplyInfoReplace(state,val){
      state.queryApplyInfoList = val;
    },
    gcSerialNoReplace(state,val){
      state.gcSerialNo = val;
    },
    viceMortgagorArrReplace(state,val){
      state.viceMortgagorArr = val;
    },
    guarantyInputListReplace(state,val){
      state.guarantyInputList[val.key] = val.value;
    },
    ypviceMortgagorArrReplace(state,val){
      state.ypviceMortgagorArr = val;
    },
    collateralInputListReplace(state,val){
      state.collateralInputList[val.key] = val.value;
    },
    collateralPickerListReplace(state,val){
      state.collateralPickerList[val.key] = val.value;
    },
    queryDictionaryListObjReplace(state,val){
      state.queryDictionaryListObj[val.dataVal] = [];
      let dataArr = val.value;
      for(let k in dataArr){
        state.queryDictionaryListObj[val.dataVal].push({
          'key': k,
          'value': dataArr[k]
        });
      }
    },
    emptyReplace(state,val){
      let obj = state[val];
      for(let k in obj){
        obj[k] = '';
      };
    },
    provincesListDataReplace(state,val){
      state.provincesListData = val;
    },
  },
  actions: {
    queryApplyInfoCommit(context,val){
      let obj = {};
      if(val.routerTrue){
        obj.orderNo = val.orderNo;
        obj.applyNo = val.applyNo;
        yu.showLoading();
      }else{
        obj = val;
      }
      $Vue.interfaceRequest('/api/credit/queryApplyInfo',obj,"get",(res)=>{
        console.log(res)
        if(res.data.data.returnCode == "Success"){
          context.commit("queryApplyInfoReplace",res.data.data);
          let createDatas = res.data.data;
          createDatas.status = '1'; //状态（1-申请待提交 2-申请已提交 3-合同待生效 4-合同已生效 5-放款待发起 6-放款待提交 7-放款已提交）
          //更新贷款流程信息状态
          $Vue.interfaceRequest('/api/aldapploanprocessinfo/update',createDatas,"post",res => {},err => {});
          if(val.routerTrue){
            yu.hideLoading();
            if(val.routerJumpWay == 'navigateTo'){ 
              yu.navigateTo({
                url: val.routerTo,
              });
            }
            if(val.routerJumpWay == 'pageJump'){ 
              $Vue.pageJump(val.routerTo);
            }
          }
        }else{
          context.commit("queryApplyInfoReplace",{})
          yu.showToast({
            title: res.data.data.returnDesc,
            icon: 'none',
            duration: 3000
          });
        }
        
      },(err)=>{
        yu.hideLoading();
        context.commit("queryApplyInfoReplace",{})
        console.log(err)
        yu.showToast({
          title: '3.1信息查询失败，请联系管理员',
          icon: 'none',
          duration: 3000
        });
      });
    },
    queryDictionaryListObjCommit({commit,state},val){
      let arr = state.queryDictionaryListArr;
      arr.forEach(item=>{
        $Vue.queryDictionaryList({
          "dictionaryName": item.dictionaryName
        },(res)=>{
          let obj = {
            "dataVal": item.dataVal,
            "value": res.data.data
          }
          commit("queryDictionaryListObjReplace",obj);
        });
      });
    },
    provincesListDataCommit(context,val){
      $Vue.interfaceRequest('/api/region/regionListAllQuery',{},"post",(res)=>{
        console.log(res)
        context.commit("provincesListDataReplace",res.data.data.regionAllList)
      },function(err){
        console.log(err)
      });
    },
  }
};