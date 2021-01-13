/**
 * 首页 mock
 */
import Mock from 'mockjs';
import {
    backend,
    responseHeader
} from '../utils';

// 会员等级信息
const memberLevelFn = (req, res) => {
    let param = req.body;
    let returnObj = {
        'usrGrdval|1': ['1','2','3','4'],
        grdGrwval: '',
        upgrdTm: ''
    }
    responseHeader(res);
    return {
        code: 0,
        data: returnObj
    };
};

//获取会员成长值 
const getGrdGrow = (req, res) => {
    let returnObj = Mock.mock({
        data:[
            {
                ruleCd: '@number',//	CHAR	规则代码
                'ruleNm|1': ['每日签到', '转账', '理财购买', '贷款申请' ,'提款申请' ,'实名认证' ,'添加账号' ,'添加信用卡' ,'还款'],//	CHAR	规则名称
                ruleDesc: '',//	CHAR	规则描述
                'grdNum|1': [12,20,40,35,30],//	CHAR	单次成长值
                grdPro: '1000',//	CHAR	成长值比例
                'busCode|1': ['T08005', 'T07006', 'T03002', 'T04001', 'T04003', 'T06002', 'T02001', 'T02002'] 
            }
        ]
    });
    responseHeader(res);
    return returnObj;
}

//获取会员等级规则
const getMemLevel = (req, res) => {
   let data = [ {
        "usrGrdval" : 1,
        "grdMinGrwval" : 0,
        "grdMaxGrwval" : 1500,
        "usrGrdname" : "白银"
      }, {
        "usrGrdval" : 2,
        "grdMinGrwval" : 1501,
        "grdMaxGrwval" : 3500,
        "usrGrdname" : "黄金"
      }, {
        "usrGrdval" : 3,
        "grdMinGrwval" : 3501,
        "grdMaxGrwval" : 5500,
        "usrGrdname" : "钻石"
      }, {
        "usrGrdval" : 4,
        "grdMinGrwval" : 6000,
        "grdMaxGrwval" : 99999999,
        "usrGrdname" : "黑金"
      } ];
      let returnObj = Mock.mock({
        data:data
    });
    responseHeader(res);
    return returnObj;
    
}

// 会员成长值变更记录
const grdChangeListFn = (req, res) => {
    let param = req.body;
    let returnObj = [{
        ruleCd: 'ruleCd',
        ruleName: '签到',
        upgrdNum: '60',
        refTm: '2020-02-02 12:20:02'
    },{
        ruleCd: 'ruleCd',
        ruleName: '贷款',
        upgrdNum: '60',
        refTm: '2020-02-02 12:20:02'
    },{
        ruleCd: 'ruleCd',
        ruleName: '失效',
        upgrdNum: '-60',
        refTm: '2020-02-02 12:20:02'
    }]
    responseHeader(res);
    return {
        code: 0,
        data: returnObj
    };
};
/**
 * 导出服务，{url,type,response}
 */
export default [
    {
        url: backend.mockExampleService + '/T08001', // 会员等级查询
        type: 'post',
        response: memberLevelFn
    }, 
    {
        url: backend.mockExampleService + '/T08004', // 会员成长值变更记录
        type: 'post',
        response: grdChangeListFn
    },
    {
        url: backend.mockExampleService + '/T08002', // 获取会员成长值规则
        type: 'post',
        response: getGrdGrow
    },
    {
        url: backend.mockExampleService + '/T08005', // 获取会员签到
        type: 'post',
        response: getGrdGrow
    },
    {
        url: backend.mockExampleService + '/T08006', // 获取会员等级规则查询
        type: 'post',
        response: getMemLevel
    }
];