import Vue from 'vue';
let $Vue = Vue.prototype;
export default {
    state: {
        hptInputList: {},
        fujiaInputList: {},
        zhuyaoInputList: {},
        childProductNoList: {},
        //贷款信息申请数据字典查询
        loanQueryDictionaryListObj: {},
        //数据字典参数集合
        queryDictionaryListArrloan: [{
                'dictionaryName': 'childProductNo', //子产品种类
                'dataVal': 'childProductNoIdArr',
            },
            {
                'dictionaryName': 'vouchType', //主担保方式
                'dataVal': 'vouchTypeIdArr',
            },
            {
                'dictionaryName': 'vouchType1', //附加担保方式
                'dataVal': 'vouchType1IdList',
            },
            {
                'dictionaryName': 'vouchClass', //主要担保类型
                'dataVal': 'vouchClassIdArr',
            },
            {
                'dictionaryName': 'rateClass', //基准利率类型
                'dataVal': 'rateClassIdArr',
            },
            {
                'dictionaryName': 'rateFloatType', //浮动利率类型
                'dataVal': 'rateFloatTypeIdArr',
            },
            {
                'dictionaryName': 'adjustRateType', //利率调整方式
                'dataVal': 'adjustRateTypeIdArr',
            },
            {
                'dictionaryName': 'corpusPayMethod', //还款方式
                'dataVal': 'corpusPayMethodIdArr',
            },

        ],
        signContractList: {}, //签署合同点击列表数据
    },
    getters: {
        hptInputList: state => state.hptInputList,
        fujiaInputList: state => state.fujiaInputList,
        zhuyaoInputList: state => state.zhuyaoInputList,
        loanQueryDictionaryListObj: state => state.loanQueryDictionaryListObj,
        childProductNoList: state => state.childProductNoList, //子产品种类
        signContractList: state => state.signContractList,
    },
    mutations: {
        //子产品种类
        loanInputListReplace(state, val) {
            state.childProductNoList[val.key] = val.value;
        },
        loanPickerListReplace(state, val) {
            state.childProductNoList[val.key] = val.value;
        },
        //主担保方式
        hptInputListReplace(state, val) {
            state.hptInputList[val.key] = val.value;
        },
        hptcollateralPicker(state, val) {
            state.hptInputList[val.key] = val.value;
        },

        //附加担保方式
        fujiaInputListReplace(state, val) {
            state.fujiaInputList[val.key] = val.value;
        },
        fujiacollateralPicker(state, val) {
            state.fujiaInputList[val.key] = val.value;
        },

        //  //主要担保类型
        zhuyaoInputListReplace(state, val) {
            state.zhuyaoInputList[val.key] = val.value;
        },
        zhuyaocollateralPicker(state, val) {
            state.zhuyaoInputList[val.key] = val.value;
        },
        //贷款申请数据字典
        queryDictionaryLoan(state, val) {
            state.loanQueryDictionaryListObj[val.dataVal] = [];
            let dataArr = val.value;
            for (let k in dataArr) {
                state.loanQueryDictionaryListObj[val.dataVal].push({
                    'key': k,
                    'value': dataArr[k]
                });
            }
        },
        //签署合同
        signContractReplace(state, val) {
            state.signContractList = val;
        },
    },
    actions: {

        queryDictionaryListObjCommit({ commit, state }, val) {
            let arr = state.queryDictionaryListArrloan;
            arr.forEach(item => {
                $Vue.queryDictionaryList({
                    "dictionaryName": item.dictionaryName
                }, (res) => {
                    let obj = {
                        "dataVal": item.dataVal,
                        "value": res.data.data
                    }
                    commit("queryDictionaryLoan", obj);
                });
            });
        },

    }
};