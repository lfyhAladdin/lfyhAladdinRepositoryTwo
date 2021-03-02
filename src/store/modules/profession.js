import Vue from 'vue';
let $Vue = Vue.prototype;
export default {
  state: {
    businessNum: {
      'orderPending': 0,  //订单--订单待处理
      'creditPeoplePricing': 0,  //授信--人工定价审批
      'creditSubmit': 0,  //授信--待提交
      'creditOngoing': 0,  //授信--审批中
      'creditPass': 0,  //授信--通过
      'creditVeto': 0,  //授信--否决
      'contractSigned': 0,  //合同--待签署
      'contractSgd': 0,  //合同--已签署
      'issuePending': 0,  //发放支付--待处理
      'issueSubmit': 0,  //发放支付--待提交
      'issueOngoing': 0,  //发放支付--审批中
      'issuePass': 0,  //发放支付--审批通过
      'issueVeto': 0,  //发放支付--审批否决
    },
    approvalIngList: {},  //授信业务--发起跳转的列表信息
    businessTypeList: {},  //数据字典-业务品种查询
    priceApproveFlagList: {},  //数据字典-定价结果查询
    paymentList: {},  //发放支付--发起跳转的列表信息
    businessTypeList2: {},  //页面展示的业务品种列表
    pfSearchBusiness: {},  //筛选框的业务品种列表
  },
  getters: {
    businessNum: state => state.businessNum,
    approvalIngList: state => state.approvalIngList,
    businessTypeList: state => state.businessTypeList,
    priceApproveFlagList: state => state.priceApproveFlagList,
    paymentList: state => state.paymentList,
    businessTypeList2: state => state.businessTypeList2,
    pfSearchBusiness: state => state.pfSearchBusiness,
  },
  mutations: {
    businessNumReplace(state,val){
      state.businessNum[val.name] = Number(val.number);
    },
    approvalIngListReplace(state,val){
      state.approvalIngList = val;
    },
    numberPiP(state,data){
      if(data == ''){
        return;
      };
      let str = data.str;
      let a = str.substring(0,str.length-1).split(";");
      let b = [];
      a.forEach((val,index)=>{
        b.push(val.split(data.symbol));
      });
      let obj = data.obj;
      let c = [];
      b.forEach((val)=>{
        for(let key in obj){
          if(val[0] == key){
            c.push({
              'name': obj[key],
              'number': val[1].substring(0,val[1].length-1)
            })
          }
        }
      });
      c.map((val)=>{
        return state.businessNum[val.name] = Number(val.number);
      })
    },
    businessTypeListReplace(state,val){
      state.businessTypeList = val;
      let obj = JSON.parse(JSON.stringify(val));
      let obj2 = JSON.parse(JSON.stringify(val));
      for(let key in obj){
        obj[key] = obj[key].replace("个人","");
      }
      for(let key in obj2){
        obj2[key] = obj2[key].replace("个人","").replace("贷款","");
      }
      state.businessTypeList2 = obj;
      state.pfSearchBusiness = obj2;
    },
    priceApproveFlagListReplace(state,val){
      state.priceApproveFlagList = val;
    },
    paymentListReplace(state,val){
      state.paymentList = val;
    },
    
  },
  actions: {
    businessNumCommit(context,val){
      let data = {
        userID: val.userID, //客户经理编号
        orgID: val.orgID, //客户经理所属机构编号
        applyPhase: "01,02,03,04", //申请阶段(授信申请)
        applyPhase2: "01,02", //申请阶段(合同)
        putoutStatusCode: "01,02,03,04" //申请阶段(放款申请)
      }
      // 1.授信申请各阶段数量统计查询
      // 2.放款申请各阶段数量查询
      // 3.待放款业务数量查询
      // 4.业务合同数量查询
      // 5.定价审批申请列表数量查询
      // 6.订单列表数量查询
      $Vue.interfaceRequest('/api/queryHomePageCount/query',data,"get",(res)=>{
        console.log(res)
        if(res.data.code != 200){
          return;
        }
        let arrList = res.data.data.homePageCountDtoList;
        arrList.forEach(item=>{
          if(item.flag == '1'){
            if(item.returnCode == 'Failed'){
              context.commit("numberPiP", '');
              return;
            }
            context.commit("numberPiP", {
              'str': item.applyNumber,
              'symbol': ':',
              'obj': {
                '待处理申请': 'creditSubmit',
                '审批中申请': 'creditOngoing',
                '审批通过申请': 'creditPass',
                '已否决申请': 'creditVeto',
              }
            });
          }else if(item.flag == '2'){
            if(item.returnCode == 'Failed'){
              context.commit("numberPiP", '');
              return;
            }
            context.commit("numberPiP", {
              'str': item.applyNumber,
              'symbol': '：',
              'obj': {
                '待处理': 'issueSubmit',
                '审批中': 'issueOngoing',
                '审批通过': 'issuePass',
                '审批否决': 'issueVeto',
              }
            });
          }else if(item.flag == '3'){
            if(item.returnCode == 'Failed'){
              context.commit("businessNumReplace", 0);
              return;
            }
            context.commit("businessNumReplace", {
              name : 'issuePending',
              number: item.applyNumber
            });
          }else if(item.flag == '4'){
            if(item.returnCode == 'Failed'){
              context.commit("numberPiP", '');
              return;
            }
            context.commit("numberPiP", {
              'str': item.applyNumber,
              'symbol': '：',
              'obj': {
                '待生效合同': 'contractSigned',
                '已生效合同': 'contractSgd',
              }
            });
          }else if(item.flag == '5'){
            if(item.returnCode == 'Failed'){
              context.commit("businessNumReplace", 0);
              return;
            }
            context.commit("businessNumReplace", {
              name : 'creditPeoplePricing',
              number: item.applyNumber
            });
          }else{
            if(item.returnCode == 'Failed'){
              context.commit("businessNumReplace", 0);
              return;
            }
            context.commit("businessNumReplace", {
              name : 'orderPending',
              number: item.applyNumber
            });
          } 
        })
      },function(err){
        console.log(err)
      }); 
    },
    businessTypeListCommit(context){
      $Vue.interfaceRequest('/api/dictionary/queryDictionaryList',{
        "dictionaryName":"businessType"
      },"get",(res)=>{
        context.commit("businessTypeListReplace",res.data.data);
      },function(err){
        console.log(err)
      });
    },
    priceApproveFlagListCommit(context){
      $Vue.interfaceRequest('/api/dictionary/queryDictionaryList',{
        "dictionaryName":"priceApproveFlag"
      },"get",(res)=>{
        context.commit("priceApproveFlagListReplace",res.data.data);
      },function(err){
        console.log(err)
      });
    }
  }
};