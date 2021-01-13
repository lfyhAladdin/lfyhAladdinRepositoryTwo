import Mock from 'mockjs';
import { backend, responseHeader } from '../utils';
/**
 * 本行借记卡加挂
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const addAcctFn = (req, res) => {
	const data = req.body;
	responseHeader(res);
	return {
		code: 0,
	};
};
/**
 * 本行借记卡解挂
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const deleteAcctFn = (req, res) => {
	const data = req.body;
	responseHeader(res);
	return {
		code: 0,
	};
};
/**
 * 信用卡加挂
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const addCreditFn = (req, res) => {
	const data = req.body;
	responseHeader(res);
	return {
		code: 0,
	};
};
/**
 * 信用卡解挂
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const deleteCreditFn = (req, res) => {
	const data = req.body;
	responseHeader(res);
	return {
		code: 0,
	};
};
/**
 * 账户别名修改
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const updateAcctNameFn = (req, res) => {
	const data = req.body;
	responseHeader(res);
	return {
		code: 0,
	};
};
/**
 * 资产负债查询
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const balanceAllFn = (req, res) => {
	const returnObj = {
		depositNum: 23000, // 资产总额
		debtAmt: 10000, // 负债总额
		currentAmt: 23000, // 活期总额
		inveAmt: 2000, // 投资总额
		returnAmt: 3000, // 剩余应还
		incomeAmt: 2.5, // 昨日收益
	};
	responseHeader(res);
	return {
		code: 0,
		data: returnObj,
	};
};
/**
 * 余额查询
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const balanceQueryFn = (req, res) => {
	const data = req.body;
	const returnObj = {
		'balance|1-100.0-2': 1, // 余额
		cryType: 'CNY', // 币种
	};
	responseHeader(res);
	return {
		code: 0,
		data: returnObj,
	};
};
/**
 * 帐户交易明细信息查询
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const detailQueryFn = (req, res) => {
	const data = req.body;
	const returnObj = [
		{
			tranDate: '2020-02-02', // 交易日期
			tranTime: '08:02:00', // 交易时间
			payacc: '622201010101010101', // 卡号
			cryType: 'CNY', // 币种
			userrem: '', // 备注
			usage: '', // 用途
			amt: 3000, // 交易金额
			balance: 300, // 余额
			loanFlag: 1, // 借贷标志  0-贷;1-借
			cshRmtFlg: 2, // 钞汇标志  1-现钞;2-现汇
			cshTranFlag: 2, // 现转标志  1-现金;2-转账
			rcvacc: '622201010101010102', // 对方账号
			rcvname: '工商银行', // 对方账号名称
			rcvbank: '', // 对方开户分行
			channel: '', // 交易渠道
			stt: '91', // 交易状态
			feeAmt: 2.5, // 手续费
		},
	];
	responseHeader(res);
	return {
		code: 0,
		data: returnObj,
	};
};
/**
 * 客户资产收支
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const balanceListFn = (req, res) => {
	let datas = req.body;
	let returnObj = Mock.mock({
		'data|1-10': [
			{
				'transType|1': ['T03002', 'T03007', 'T04003', 'T04005', 'T07006'], // 交易类型
				transDate: '@date', // 交易日期
				transTime: '@time', // 交易时间
				'balance|1-100.0-2': 1, // 余额
				'amt|1-100.0-2': 1, // 交易金额
				'flag|1': ['0', '1'], // 收支标志
				rem: '', // 备注
			},
		],
		code: 0,
		message: 'ok!',
	});
	responseHeader(res, returnObj);
	return returnObj;
};

// 登录
const loginFn = (req, res) => {
	let datas = req.body;
  console.log(datas);
	let returnObj = {
		code: 0,
    data: {
      smallbankname: '滨海分行',
      headimg: 'http://mockplat.dfyusys.com:8890/Image/headImg/abc1b5dc-571c-4870-a56b-6cefef35f4a3.png',
      phone: '18876522003',
      messagecount: 6,
      rolename: '网点管理员',
      bankname: '滨海分行',
      id: 9632,
      type: '0',
      account: '6903',
      realname: '陈静2',
    },
    message: '',
    returnTime: Date.now(),
	};
	responseHeader(res, returnObj);
	return returnObj;
};

/**
 * 导出服务，{url,type,response}
 */
export default [
	{
		url: backend.mockExampleService + '/T02001', // 本行借记卡加挂
		type: 'post',
		response: addAcctFn,
	},
	{
		url: backend.mockExampleService + '/T02002', // 信用卡加挂
		type: 'post',
		response: addCreditFn,
	},
	{
		url: backend.mockExampleService + '/T02003', // 余额查询 /api/account/balanceQuery
		type: 'post',
		response: balanceQueryFn,
	},
	{
		url: backend.mockExampleService + '/T02004', // 本行借记卡解挂
		type: 'post',
		response: deleteAcctFn,
	},
	{
		url: backend.mockExampleService + '/T02005', // 信用卡解挂
		type: 'post',
		response: deleteCreditFn,
	},
	{
		url: backend.mockExampleService + '/T02006', // 帐户交易明细信息查询
		type: 'post',
		response: detailQueryFn,
	},
	{
		url: backend.mockExampleService + '/T02007', // 账户别名修改
		type: 'post',
		response: updateAcctNameFn,
	},
	{
		url: backend.mockExampleService + '/T02008', // 资产负债查询
		type: 'post',
		response: balanceAllFn,
	},
	{
		url: backend.mockExampleService + '/T02009', // 客户资产收支
		type: 'post',
		response: balanceListFn,
	},
	{
		url: backend.mockExampleService + '/1040', // 登录
		type: 'post',
		response: loginFn,
	},
];
