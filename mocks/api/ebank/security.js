import {
    backend,
    responseHeader
} from '../utils';
import Mock from 'mockjs';
//模拟数据
//实名认证
const realNameFn = (req, res) => {
    let returnObj = Mock.mock({
        code: 0,
        message: 'ok!',
        'data': {
            certType:'00',//		证件类型代码
            certNbr:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,//		证件号码
            chnNm:'@cname',//		中文名称
            "gndrcd|1": ["1", "2"],//		性别代码
            natcd:'汉',//		民族
            isuBrchencd:'成都市青羊区公安局',//		签发机构
            rgstrdAddr:'成都市青羊区公安局',//		注册地址
            isuDt:'@date',//		签发日期
            matrDt:'2027-03-06',//		到期日期
            occd:'',//		职业
            tax:''//		税收身份
        }
    });
    responseHeader(res, returnObj);
    return returnObj;
};

//成功返回
const successFn = (req, res) => {
    let returnObj = {
        code: 0,
        message: 'ok!'
    };
    responseHeader(res, returnObj); 
}

//获取手机号
const getTelFn = (req, res) => {
    let  returnObj = Mock.mock({
        data: {
            mobileNo: /^1[385][1-9]\d{8}/
        }
    });
    responseHeader(res);
    return returnObj;
}
  

/**
 * 导出服务，{url,type,response}
 */
export default [
    {
      url: backend.mockExampleService + '/T06006',//修改密码
      type: 'post',
      response: successFn
    },
    {
      url: backend.mockExampleService + '/T06005',//获取手机号
      type: 'post',
      response: getTelFn
    },
    {
        url: backend.mockExampleService + '/T06003',//找回登录密码
        type: 'post',
        response: successFn
    },
    {
        url: backend.mockExampleService + '/T06004',//认证方式设置
        type: 'post',
        response: successFn
    },
    {
        url: backend.mockExampleService + '/TEST06002',//实名认证
        type: 'post',
        response: realNameFn
    },
    {
        url: backend.mockExampleService + '/T06002',//实名认证
        type: 'post',
        response: successFn
    },
    {
        url: backend.mockExampleService + '/T06008',//验证登录密码
        type: 'post',
        response: successFn
    },
    {
        url: backend.mockExampleService + '/T06007',//是否实名认证
        type: 'post',
        response: successFn
    },
    {
        url: backend.mockExampleService + '/T06009',//找回登录密码验证
        type: 'post',
        response: successFn
    }
]