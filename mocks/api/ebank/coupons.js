import {
    backend,
    responseHeader
} from '../utils';
import city from "../common/data/data.city";
import Mock from 'mockjs';
const imageUri = 'http://www.yusys.com.cn/group/newsCenter/newslist/201812/W020181213492932714886.png';
const couponDetailFn = (req, res) => {
    console.log('11111111',req);
    let returnObj= Mock.mock({
        'data|2-10': [
            {
                ticketNo: /\d{6}/,//	CHAR	票圈编号
                'ticketName|1': ['7天免息券', '3天免息券', '3元现金券'],//	CHAR	票券名称
                ticketType:'',//	CHAR	票券类型
                useCondition:'',//	CHAR	使用条件
                receiveType:'',//	CHAR	领取方式
                ticketLogo: imageUri,//	CHAR	票券logo
                cashValue:'',//	CHAR	现金价值
                usedSts:'',//	CHAR	使用状态
                'useRemark|1': ['7天免息券', '3天免息券', '3元现金券'],//	DATE	使用说明
                virtNo:'',//	CHAR	虚拟识别码
                virtPwd:'111111',//	CHAR	使用密码
                validStartDate: '@date',//	CHAR	生效开始日期 
                validEndDate:'@date'//	DATE	生效结束日期 
            }
        ]
    })
    responseHeader(res);
    return {
        code: 0,
        data: returnObj
    }
}

//卡券查询
const couponsFn =  (req, res) => {
    let returnObj= Mock.mock({
        'data|2-10': [
            {
                ticketNo:  /\d{6}/,//	CHAR	票圈编号
                'ticketName|1': ['7天免息券', '3天免息券', '3元现金券'],//	CHAR	票券名称
                ticketLogo: imageUri,//	CHAR	票券logo
                cashValue:'',//	CHAR	现金价值
                ticketType:'',//	CHAR	票券类型
                useCondition:'',//	CHAR	使用条件
                receiveType:'',//	CHAR	领取方式
                'useRemark|1': ['7天免息券', '3天免息券', '3元现金券'],//	DATE	使用说明
                haveRecevieNum:'@number',//	CHAR	领取数量
                totalNum:'@number'
            }
        ]
    })
    responseHeader(res);
    return returnObj
}
// 卡券领取 TODO
const getCard =  (req, res) => {
    const param = req.body
    responseHeader(res)
    return {"total":0,"code":"0","data":null,"message":"票券领取成功","level":null}
}
/**
 * 导出服务，{url,type,response}
 */
export default [
    {
        url: backend.mockExampleService + '/T05003',//卡券明细查询
        type: 'post',
        response: couponDetailFn
    },
    {
        url: backend.mockExampleService + '/T05001',//卡券明细查询
        type: 'post',
        response: couponsFn
    },
    {
        url: backend.mockExampleService + '/T05002',//卡券领取
        type: 'post',
        response: getCard
    }
]