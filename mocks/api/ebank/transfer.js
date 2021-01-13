import {
    backend,
    responseHeader
} from '../utils';
import city from "../common/data/data.city";
import Mock from 'mockjs';

const bankName = ["宇信银行", "招商银行", "成都银行", "工商银行", "农商银行", "农业银行"];//银行名称
const bankNo = ['aaaa','102100099996','103100000026','104100000004','105100000017','301290000007','302100011000','303100000006','304100040000','305100000013','306581000003','308584000013','309391000011','310290000013','402121000009','403100000004','307584007998'];
//查询银行
const bankBranchFn = (req, res) => {
    const param = req.body;
    let superNet = Mock.mock({
        'data|5-20':[
            {
                'bankNo|1': bankNo,//银行网点号
                'bankName|1': bankName,//bankName,
                rcvpin:/[A-Z]{1}/,
                bankType: /\d{6}/,//行别代码
                cityCode: /\d{6}/,//城市代码
            }
        ]
    });
    let small = Mock.mock({
        'data|5-20':[
            {
                'bankName|1': ['高新支行','青羊支行','武侯支行','华兴支行','金牛支行','锦江支行','高升桥支行','双流支行'],//	CHAR	收款方网点
                'bankNo|1': bankNo,	
                rcvpin:/[A-Z]{1}/,
                bankType: /\d{6}/,//行别代码
                cityCode: /\d{6}/,//城市代码
            }
        ]
    });
    let returnObj = {
        code: 0,
        msg: 'ok',
        data: param.transRoad == 1 ? superNet.data : small.data
    };
    responseHeader(res,returnObj);
    return returnObj;
}

//查询城市
const getCitysFn = (req, res) => {
    const param = req.body;
    let hotCity= [
        { "name": "成都", "code": "","province":"" },
        { "name": "重庆", "code": "","province":"" },
        { "name": "北京", "code": "","province":"" },
        { "name": "昆明", "code": "","province":"" },
        { "name": "乐山", "code": "","province":"" },
        { "name": "绵阳", "code": "","province":"" },
    ];
    let returnObj = {
        'data': param.hotCity ? hotCity : city
    };
    responseHeader(res);
    return returnObj;
}

//全国市信息
const getCitys = (req, res) => {
    let returnObj = {
        data : city
    }
    responseHeader(res);
    return returnObj;
}

//银行卡归属银行查询
const bankBinFn = (req, res) => {
    let returnObj = {
        data: [{
            'bankName|1':bankName,
            'bankNo|1': bankNo,
            acctType: ''
        }],
        code: 0
    }
    responseHeader(res);
    return returnObj;
}

//收款人名册
const payListFn = (req, res) => {
    let returnObj = Mock.mock({
        'data|5-10': [
            {
                rcvacc:/^([1-9]{1})(\d{14}|\d{18})$/,//	CHAR	收款账号
                rcvname:'@cname',//	CHAR	收款账号户名
                rcvpin:/[A-Z]{1}/,//	CHAR	户名首字母
                'comitrno|1':bankName,//	CHAR	收款方开户行
                'rcvbank|1':bankName,//	CHAR	收款方开户行名称
                'comitrnoOpen|1': ['高新支行','青羊支行','武侯支行','华兴支行','金牛支行','锦江支行','高升桥支行','双流支行'],//	CHAR	收款方网点
                'rcvbankOpen|1': bankNo,	//CHAR	收款方网点号
                mobileNo:/^1[385][1-9]\d{8}/,//	CHAR	短信通知手机号码
                cryType:'CNY',//	CHAR	币种
                cityCode:'001',//	CHAR	城市代码
                cityName:'成都'//	CHAR	城市名称
            },
            {
                rcvacc:/^([1-9]{1})(\d{14}|\d{18})$/,//	CHAR	收款账号
                rcvname:'鲁某某',//	CHAR	收款账号户名
                rcvpin:/[A-Z]{1}/,//	CHAR	户名首字母
                'comitrno|1':bankName,//	CHAR	收款方开户行
                'rcvbank|1':bankName,//	CHAR	收款方开户行名称
                'comitrnoOpen|1':['高新支行','青羊支行','武侯支行','华兴支行','金牛支行','锦江支行','高升桥支行','双流支行'],//	CHAR	收款方网点
                'rcvbankOpen|1': bankNo,	//CHAR	收款方网点号
                mobileNo:/^1[385][1-9]\d{8}/,//	CHAR	短信通知手机号码
                cryType:'CNY',//	CHAR	币种
                cityCode:'001',//	CHAR	城市代码
                cityName:'成都'//	CHAR	城市名称
            }
        ],
        code: 0
    })
    responseHeader(res,returnObj);
    return returnObj;
}
// 账户限额查询
const accountLimitFn = (req, res) => {
    let returnObj = {
        acctNo: '333333333333333', // 账号
        signAmt: '1000', // 单笔限额
        dayNum: '3', // 已用日累计笔数
        dayNumMax: '10', // 日累计笔数最大值
        dayAmt: '5000', // 已用日累计限额
        dayAmtMax: '10000', // 日累计限额最大值
        monsNum: '10', // 已用月累计笔数
        monsNumMax: '50', // 月累计笔数最大值
        monsAmt: '50000', // 已用月累计限额
        monsAmtMax: '5000000', // 月累计限额最大值
        yearsNum: '10000', // 已用年累计笔数
        yearsNumMax: '100000000', // 年累计笔数最大值
        yearsAmt: '55555555', // 已用年累计限额
        yearsAmtMax: '5555555555' // 年累计限额最大值
    };
    responseHeader(res);
    return {
        code: 0,
        data: returnObj
    }
}
// 转账
const transferSubmittFn = (req, res) => {
    let returnObj = {
        flowno: '333333333333333', // 付款流水号
        stt: '90', // 指令状态
        hostNo: '', // 核心流水
        hostDate: '', // 核心日期
        hostCode: '', // 核心错误码
        hostMsg: '' // 核心错误信息
    };
    responseHeader(res);
    return {
        code: 0,
        data: returnObj
    }
}

// 转账结果查询
const transResultFn = (req, res) => {
    let returnObj = {
        flowno: /^([1-9]{1})(\d{14}|\d{18})$/, // 付款流水号
        rcvacc: /^([1-9]{1})(\d{14}|\d{18})$/, // 收款账号
        rcvname: '@name', // 收款账号户名
        'comitrno|1': bankName, // 收款方开户行
        'rcvbank|1': bankName, // 收款方开户行名称
        payacc: /^([1-9]{1})(\d{14}|\d{18})$/, // 付款账号
        payname: '@name', // 付款户名
        amt: '9000', // 付款金额
        usage: '转账附言', // 附言
        stt: '90', // 指令状态
        hostNo: '', // 核心流水
        hostDate: '2020-02-02', // 核心日期
        hostCode: '', // 核心错误码
        hostMsg: '' // 核心错误信息
    };
    responseHeader(res);
    return {
        code: 0,
        data: returnObj
    }
}
/**
 * 导出服务，{url,type,response}
 */
export default [
    {
        url: backend.mockExampleService + '/T07001',//银行网点查询
        type: 'post',
        response: bankBranchFn
    },
    {
        url: backend.mockExampleService + '/T07002',//城市查询
        type: 'post',
        response: getCitysFn
    },
    {
        url: backend.mockExampleService + '/T01008',//银行卡归属银行查询（卡BIN查询）
        type: 'post',
        response: bankBinFn
    },
    {
        url: backend.mockExampleService + '/T07004',//收款人名册
        type: 'post',
        response: payListFn
    },
    {
        url: backend.mockExampleService + '/T06001',//账户限额查询
        type: 'post',
        response: accountLimitFn
    },
    {
        url: backend.mockExampleService + '/T07006',//转账
        type: 'post',
        response: transferSubmittFn
    },
    {
        url: backend.mockExampleService + '/T07007',//转账结果查询
        type: 'post',
        response: transResultFn
    },
    {
        url: backend.mockExampleService + '/T07008',//新增收款人
        type: 'post',
        response: transResultFn
    },
    {
        url: backend.mockExampleService + '/T07003',//删除收款人
        type: 'post',
        response: transResultFn
    }
    
]