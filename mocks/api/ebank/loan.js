/**
 * 贷款 mock
 */

import { backend, responseHeader } from '../utils'

// 贷款合同查询 T04004 /api/loan/query
const loanContract = (req, res) => {
  const param = req.body
  responseHeader(res)
  // let data = [];
  let data = [
    {
      usrAmt: '0',
      endDate: '2021-01-10 05:16:52',
      limitAmt: '100000000',
      usrId: 'PB00000012',
      productName: '权益宝',
      contractSts: '0',
      rowId: 1,
      stt: '90',
      transType: '0',
      opTime: '17:16:52',
      custId: 'PB00000012',
      contractAmt: '10000000',
      contractId: '1001010',
      hostDate: '2020-01-10',
      flowno: 'LOA20200110000000041',
      transCode: 'T04001',
      id: 'acac6ef4c7a448a8ac5ddcde9c6c3079',
      productNo: '111111'
    }
  ]
  return {
    code: '0',
    total: 1,
    message: '正常',
    level: null,
    data: data
  }
}
// 借据列表查询
const debtList = (req, res) => {
  const param = req.body
  responseHeader(res)
  // let data = [];
  let data = [
    {
      overDueInterest: '0',
      productName: '白领贷',
      acctNo: '6225111122226688',
      beginDate: '2019-10-1',
      endDate: '2019-11-1',
      contractId: '',
      balance: '300000',
      interest: '3900', //利息
      realRate: '6.9'
    }
  ]
  return {
    data: data,
    total: 1
  }
}
// 提款申请
const drawApply = (req, res) => {
  const param = req.body
  responseHeader(res)
  // let data = [];
  let data = [
    {
      contractAmt: '300000',
      limitAmt: '300000',
      usrAmt: '0',
      endDate: '2019-11-1',
      contractId: ''
    }
  ]
  return {
    data: data
  }
}
// 还款 /api/loan/repayment
const repay = (req, res) => {
  const param = req.body
  responseHeader(res)
  // let data = [];
  let data = [
    {
      contractAmt: '300000',
      limitAmt: '300000',
      usrAmt: '0',
      endDate: '2019-11-1',
      contractId: ''
    }
  ]
  return {
    data: data
  }
}
// 还款计划 TODO
const plan = (req, res) => {
  const param = req.body
  responseHeader(res)
  // let data = [];
  let data = [
  ]
  return {
    data: data
  }
}

/**
 * 导出服务，{url,type,response}
 */
export default [
  {
    url: backend.mockExampleService + '/T04004', // 贷款合同查询
    type: 'post',
    response: loanContract
  },
  {
    url: backend.mockExampleService + '/T04003', // 提款申请
    type: 'post',
    response: drawApply
  },
  {
    url: backend.mockExampleService + '/T04002', // 借据列表查询
    type: 'post',
    response: debtList
  },
  {
    url: backend.mockExampleService + '/T04006', // 还款计划
    type: 'post',
    response: plan
  },
  {
    url: backend.mockExampleService + '/T04007', // 还款
    type: 'post',
    response: repay
  }
]
