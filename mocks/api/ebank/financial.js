/**
 * 理财产品 mock
 */

import { backend, responseHeader } from '../utils'
// // 客户当前持有理财统计信息查询 /api/financial/allInfo
const allInfo = (req, res) => {
  const param = req.body
  responseHeader(res)
  let data = {
    incomeLstD: '13.5', //昨日收益
    totalPosition: '100001', //总持仓
    totalIncome: '307' //累计收益
  }
  return { data: data }
}
const buy = (req, res) => {
  const param = req.body
  responseHeader(res)
  let data = {
    flowno: 'FIN2020012015282710000030',
    applnbrchencd: '100000',
    usrId: 'PB00000012',
    opTime: '2020-01-20 15:28:39',
    transCode: 'T03002',
    transType: '0',
    stt: '90',
    amt: 10000,
    cryType: 'CNY',
    acctNo: '6214830000000010',
    productNo: 'LC100203',
    productName: '爱奇艺黄金会员理财产品',
    hostNo: '0d29c5258b98452babc686d2f99b0f39',
    hostDate: null,
    hostCode: '0',
    hostMsg: '正常',
    authrzOprtPsnlId: null,
    creBrchencd: '100000',
    creOprtPsnlId: null,
    creTm: '2020-01-20 15:28:39',
    finlUpdBrchencd: '100000',
    finlUpdOprtPsnlId: null,
    finlUpdTm: '2020-01-20 15:28:39',
    proSts: '1',
    holdAmount: '10000',
    rightStrDate: '2020-01-20 15:28:39',
    rightName: '爱奇艺黄金会员理财产品',
    proIncome: '0',
    isAutoRenew: '1',
    expectReTime: '2021-01-20 03:28:39',
    retime: null,
    rightSts: '1',
    custId: 'PB00000012'
  }
  return { code: '0', total: 0, message: null, level: null, data: data }
}

/**
 * 导出服务，{url,type,response}
 */
export default [
  {
    url: backend.mockExampleService + '/T03001', // 客户当前持有理财统计信息查询 /api/financial/allInfo
    type: 'post',
    response: allInfo
  },
  {
    url: backend.mockExampleService + '/T03002', // 理财购买 /api/financial/buy
    type: 'post',
    response: buy
  }
]
