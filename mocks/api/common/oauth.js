/**
 * @created by helin3 2019-11-22
 * @updated by
 * @description 通用认证权限Mock模拟
 */
/* eslint camelcase:0 */
import Mock from 'mockjs';
import { backend, responseHeader } from '../utils';
import demoLookups from './data/data.lookup';
const imageUri = 'http://www.yusys.com.cn/group/newsCenter/newslist/201812/W020181213492932714886.png';
/**
 * oauth认证获取/刷新token
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const loginFn = (req, res) => {
  let returnObj = {};
  const suffix = new Date().getTime();
  // 获取Token、刷新Token请求成功返回相关token信息
  const tempReturnObj = {
    data:{
      access_token: 'Basicd2ViX2FwcDo=' + suffix,
      expires_in: 600, // 单位：秒
      refresh_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9' + suffix,
    },
    code: 0,
    message: 'ok'
  };

  try {
    const data = req.body;
    if (data.grant_type === 'refresh_token') {
      // 刷新token请求认证成功，返回相关token信息
      returnObj = tempReturnObj;
      // 此处未模拟refresh_token失效情况，真实情况，请根据真实后端情况判断
    } else if (data.username !== 'admin' || data.password !== 'admin') {
      returnObj = tempReturnObj;
      //获取token请求认证失败，返回错误信息
      // returnObj = {
      //   code: '9001',
      //   message: '用户名或密码错误，请重新输入!'
      // };
    } else {
      // 获取token请求认证成功，返回相关token信息
      returnObj = tempReturnObj;
    }
  } catch (e) {
    // 获取token认证请求、刷新token认证请求失败
    returnObj.code = '-1';
    returnObj.message = '系统错误，请联系系统管理员!';
  }
  responseHeader(res, returnObj);
  return returnObj;
};

/**
 * 模拟注销会话
 */
const logoutFn = (req, res) => {
  let returnObj = {
    code: 0,
    message: 'ok!'
  };
  responseHeader(res, returnObj);
  return returnObj;
};

/**
 * 模拟获取用户会话信息
 */
const sessionInfoFn = (req, res) => {
  let returnObj = Mock.mock({
    code: 0,
    message: 'ok!',
    data: {
      usrPretentinfo: "",//	CHAR	客户预留信息	O	
      usrNknm: "@cname",//	CHAR	用户昵称	O	
      usrId: "@id",//	CHAR	网银客户号	M	
      usrNm: "鲁某某",//	CHAR	客户姓名	M	
      "gndrcd|1": ["1", "2"],//1:男
      sysDate: "@date",//	CHAR	系统日期	M	
      mobileNo: /^1[385][1-9]\d{8}/,//	CHAR	手机号码	M	
      creBrchencd: "",//	CHAR	用户开户机构号	M	
      'certType': '00',//, '01', '02', '03', '04'],//	CHAR	证件类型	O	有则认证
      certNbr: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,//	CHAR	证件号码	O	
      headUrl: imageUri,//	CHAR	头像地址	O	
      'wechatBind|1': ['0', '1'],//	CHAR	是否绑定微信	M	0：否，1：是
      lastLogin: "@date"
    }
  })
  responseHeader(res, returnObj);
  return returnObj;
};

//账户信息
const accoInfoFn = (req, res) => {
  let returnObj = Mock.mock({
    'data|3-10': [{
      acctNo: /^([1-9]{1})(\d{14}|\d{18})$/,//	CHAR	账号
      'acctType|1': ['01', '02', '03', '04', '05', '06', '07'],//	CHAR	账号类型
      acctAls: '@cname',//	CHAR	账号别名
      'bankNo|1': ['302100011000','306581000003','103100000026'],//	CHAR	银行编号
      'bankName|1': ['招商银行', '宇信银行', '工商银行', '民生银行'],//	CHAR	银行名称
      openacctBrchennm: '@city'
    }],
    code: 0,
    message: 'ok!'
  });
  responseHeader(res, returnObj);
  return returnObj;
}

//检测手机号是否注册
const telRegiFn = (req, res) => {
  let returnObj = Mock.mock({
    'data': {
      'flag': 1//|1['0', '1']//, '2']
    },
    code: 0,
    message: 'ok!'
  });
  responseHeader(res, returnObj);
  return returnObj;
}

//检测是绑定第三方
const bindThirdFn = (req, res) => {
  let returnObj = Mock.mock({
    'data': {
      mobileNo: /^1[385][1-9]\d{8}/,//	CHAR	手机号
      thirdId: /[a-z0-9A-Z]{16}///	CHAR	客户端编号 16位随机数
    },
    code: 0,
    message: 'ok!'
  });
  responseHeader(res, returnObj);
  return returnObj;
}

//发送短信验证码
const sendCodeFn = (req, res) => {
  let returnObj = Mock.mock({
    'data': {
      clientId: /[a-z0-9A-Z]{16}///	CHAR	客户端编号 16位随机数
    },
    code: 0,
    message: 'ok!'
  });
  responseHeader(res, returnObj);
  return returnObj;
}

//交易流水号获取
const orderFlowNoFn = (req, res) => {
  let returnObj = Mock.mock({
    'data': {
      flowno: /[a-z0-9A-Z]{16}///	CHAR	客户端编号 16位随机数
    },
    code: 0,
    message: 'ok!'
  });
  responseHeader(res, returnObj);
  return returnObj;
}

/**
 * 菜单和权限获取  楼层控制暂时不用权限 接口控制
 */
// const menuandcontrFn = (req, res) => {
//   responseHeader(res);
//   return {
//     menu: demoMenus,
//     contr: demoContrls
//   };
// };

/**
 * 字典获取
 * @param lookupCodes 字典类型参数，支持逗号分隔
 */
const lookupQueryFn = (req, res) => {
  let returnObj = {};
  const code = req.query.lookupCodes;
  if (!code) {
    returnObj = {
      code: -1,
      message: '请求参数错误'
    };
  } else {
    const codeArr = code.split(',');
    for (let i = 0, len = codeArr.length; i < len; i++) {
      const codeType = codeArr[i];
      returnObj[codeType] = demoLookups[codeType] || [];
    }
  }
  responseHeader(res, returnObj);
  return {
    data: returnObj
  };
};

/**
 * 导出服务，{url,type,response}
 */
export default [
  {
    url: backend.mockExampleService + '/T01001',//登录
    type: 'post',
    response: loginFn
  },
  {
    url: backend.mockExampleService + '/T01002',//签退
    type: 'post',
    response: logoutFn
  },
  {
    url: backend.mockExampleService + '/T01014',//用户注销
    type: 'post',
    response: logoutFn
  },
  {
    url: backend.mockExampleService + '/T01004',//用户信息
    type: 'post',
    response: sessionInfoFn
  },
  {
    url: backend.mockExampleService + '/T01003',//账户信息
    type: 'post',
    response: accoInfoFn
  },
  {
    url: backend.mockExampleService + '/T01005',//手机号是否注册
    type: 'post',
    response: telRegiFn
  },
  {
    url: backend.mockExampleService + '/T01006',//手机号注册
    type: 'post',
    response: logoutFn
  },
  {
    url: backend.mockExampleService + '/T01007',//第三方绑定检查
    type: 'post',
    response: bindThirdFn
  },
  {
    url: backend.mockExampleService + '/T01010',//交易流水号获取
    type: 'post',
    response: orderFlowNoFn
  },
  {
    url: backend.mockExampleService + '/T01011',//短信发送
    type: 'post',
    response: sendCodeFn
  },
  {
    url: backend.mockExampleService + '/T01012',//短信验证
    type: 'post',
    response: logoutFn
  }
];
