/**
 * 产品 mock
 */

import { backend, responseHeader } from '../utils'
import Mock from 'mockjs';
//  T05005 /api/marketing/getprodinfobyflag
const product = (req, res) => {
  const reqData = req.body
  responseHeader(res)
  const param = reqData.condition
  let data = []
  // 白领贷
  if (param.prodFlag === '3001' && param.catlCode == '3') {
    data = [
      {
        isCombination: '0',
        costRate: '0',
        productId: 'DK100023',
        orderNum: 1,
        prodCharact: '按日计息，随借随还',
        rowId: 1,
        limitTime: '36',
        rateType: '1',
        money: 'RMB',
        prodFlag: '3001',
        rate: '6.7',
        loadAmount: 300000,
        prodName: '白领贷',
        prodDesc: '白领贷'
      },
      {
        isCombination: '0',
        costRate: '1.2',
        productId: 'DK100032',
        orderNum: 1,
        prodCharact: '上班族,随借随还,3年有效',
        rowId: 2,
        limitTime: '36',
        rateType: '1',
        money: 'RMB',
        prodFlag: '3001',
        rate: '6.8',
        loadAmount: 120000,
        prodName: '线上白领通',
        prodDesc: '线上白领通'
      }
    ]
  }
  // 推荐产品
  else if (param.prodFlag === '1002' && param.catlCode === '2') {
    data = [
      {
        prodDesc: '短期投资',
        prodName: '爱理财',
        profitRate: '3.55%',
        rateType: '2'
      },
      {
        prodDesc: '精选基金',
        prodName: '永赢惠添利灵活配置混合',
        profitRate: '30.15%',
        rateType: '4'
      }
    ]
  }
  // 稳健型产品 理财
  else if (param.prodFlag === '1003' && param.catlCode === '2') {
    // 推荐产品
    data = [
      {
        prodDesc: '短期投资',
        prodName: '爱理财',
        profitRate: '3.55%',
        rateType: '2'
      },
      {
        prodDesc: '精选基金',
        prodName: '永赢惠添利灵活配置混合',
        profitRate: '30.15%',
        rateType: '4'
      }
    ]
  }
  // 推荐产品
  else if (param.prodFlag === '1001' && param.catlCode === '2') {
    // 推荐产品
    data = [
      {
        prodDesc: '短期投资',
        prodName: '爱理财',
        profitRate: '3.55%',
        rateType: '2'
      },
      {
        prodDesc: '精选基金',
        prodName: '永赢惠添利灵活配置混合',
        profitRate: '30.15%',
        rateType: '4'
      }
    ]
  }
  // 精选推荐 贷款
  else if (param.prodFlag === '1005' && param.catlCode === '3') {
    data = [
      {
        prodCharact: '上班族专属,随借随还,三年有效',
        prodDesc: '上班族专属,随借随还,三年有效',
        prodName: '白领贷',
        loadAmount: '500000'
      },
      {
        prodCharact: '企业专属,秒审秒批,最长五年',
        prodDesc: '企业专属,秒审秒批,最长五年',
        prodName: '税务贷',
        loadAmount: '500000'
      }
    ]
  }
  // 权益宝
  else if (param.prodFlag === '2001' && param.catlCode === '2') {
    data = [
      {
        isCombination: '1',
        raiseEndData: '2019-12-26',
        riskLevel: '0',
        orderNum: 1,
        prodCharact: '灵活存取,只需转入5300元',
        increaseAmt: 100,
        rateType: '3',
        ticketNo: 'DH1002',
        useRemark: '在爱奇艺客户端输入兑换码即可',
        prodName: '爱奇艺黄金会员理财产品',
        dangerDisc: '白领贷',
        originAmt: 10000,
        prodDesc: '电脑、PAD，手机都可用',
        prdctScl: 20000000,
        ticketLogo: 'group1/M00/00/01/rBAUH14N3-aAUGgVAABjc1zg5IA815.jpg',
        raiseBeginDate: '2019-12-12',
        productId: 'LC100203',
        cashValue: 100,
        ticketType: '5',
        profitRate: 4.6,
        rowId: 1,
        money: 'RMB',
        prodFlag: '2001',
        ticketComp: '2',
        ticketName: '爱奇艺会员'
      },
      {
        isCombination: '1',
        raiseEndData: '2021-12-31',
        riskLevel: '0',
        productId: 'CL1000232',
        orderNum: 2,
        cashValue: 100,
        ticketType: '5',
        profitRate: 0,
        prodCharact: '灵活存取,只需转入5300元',
        rowId: 2,
        increaseAmt: 100,
        rateType: '3',
        money: 'RMB',
        ticketNo: 'DH10032',
        useRemark: '在客户端输入券码即可',
        prodFlag: '2001',
        prodName: '腾讯体育会员',
        originAmt: 5300,
        prodDesc: '电脑、pad、手机都可用',
        prdctScl: 40000000,
        ticketLogo: 'group1/M00/00/01/rBAUH14N4BGAA-xfAAAktY98WDA634.jpg',
        raiseBeginDate: '2020-01-02',
        ticketComp: '1',
        ticketName: '腾讯视频会员'
      }
    ]
  }
  return {
    data: data
  }
}
// 权益宝
const rights = (req, res) => {
  const param = req.body
  responseHeader(res)
  let data = []
  console.log(param)
  data = [
    {
      proName: '权益宝',
      proSts: '0',
      holdAmount: '5300',
      rightStrDate: '2019-11-29',
      rightName: '爱奇艺钻石会员',
      proIncome: '',
      isAutoRenew: '',
      expectReTime: '',
      hostDate: '2019-11-29',
      transAcct:'6214888888883008',
      rightSts:'1',
      retime: '2019-10-29'
    },{
      proName: '权益宝',
      proSts: '1',
      holdAmount: '3100',
      rightStrDate: '2019-11-29',
      rightName: '爱奇艺黄金会员',
      hostDate: '2019-11-29',
      transAcct:'6214888888883008',
      proIncome: '',
      isAutoRenew: '',
      expectReTime: '',
      rightSts:'1',
      retime: ''
    },
    {
      proName: '权益宝',
      proSts: '1',
      holdAmount: '6200',
      rightStrDate: '2019-11-29',
      hostDate: '2019-11-29',
      transAcct:'6214888888883008',
      rightName: '爱奇艺钻石会员',
      proIncome: '',
      isAutoRenew: '',
      expectReTime: '',
      rightSts:'1',
      retime: ''
    }
  ]
  return {
    data: data
  }
}

// 收益类明细查询
const incomeList = (req, res) => {
  const param = req.body
  responseHeader(res)
  let data = []
  if (param.proSts === '0') {
    data = []
  }

  return {
    data: data
  }
}
// 权益宝购买
const buy = (req, res) => {
  const param = req.body
  responseHeader(res)
  let data = []
  if (param.proSts === '0') {
    data = []
  }

  return {
    data: data
  }
}

// 权益类明细查询
const rightsList = (req, res) => {
  const param = req.body
  responseHeader(res)
  let data = [
    {
      productName: '权益宝-爱奇艺黄金会员',
      num: '4',
      prdctSt: '1'
    },
    {
      prdctSt: '0',
      num: '2020-01-09',
      productName: '贷款免息券'
    },
    {
      prdctSt: '1',
      num: '2019-12-25',
      productName: '爱奇艺黄金会员'
    },
    {
      prdctSt: '1',
      num: '2019-12-25',
      productName: '爱奇艺转世会员'
    },
    {
      prdctSt: '1',
      num: '2019-12-25',
      productName: '爱奇艺钻石会员'
    }
  ]

  return {
    data: data
  }
}

// 交易记录
const tranList = (req, res) => {
  const param = req.body
  responseHeader(res)
  let data = [
    {
      prodCode: '',
      prodName: '宇信理财',
      transType: '1',
      amt: '7100',
      txnCnl: '',
      tranDate: '2019-10-11  10:00:01',
      tranStatus: ''
    },
    {
      prodCode: '',
      prodName: '宇信理财',
      transType: '2',
      amt: '7100',
      txnCnl: '',
      tranDate: '2019-10-11  10:00:01',
      tranStatus: ''
    }
  ]
  if (param.transType) {
    data = data.filter(item => {
      return item.transType === param.transType
    })
  }

  console.log(data)

  return {
    data: data
  }
}
// 赎回
const redeem = (req, res) => {
  const param = req.body
  responseHeader(res)
  let data = {
    stt:90
  }

  return {
    data: data
  }
}

// 维护列表
const getMaintainList = (req, res) => {
  const param = req.body;
  responseHeader(res)
  let data = Mock.mock({
    'data|1-40': [{
      'transType|1': ['T03002', 'T03007', 'T04003', 'T04005', 'T07006'], // 交易类型
      transDate: '@date', // 交易日期
      transTime: '@time', // 交易时间
      'balance|1-100.0-2': 1, // 余额
      'amt|1-100.0-2': 1, // 交易金额
      'flag|1': ['0', '1'], // 收支标志
      rejectreason: '',
      shopId: '@id()',
      'shopLogo|1': [
        'https://img.36krcdn.com/20200410/v2_9c3331af67e64994aa97a27fffb1a380_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center',
        'https://img.36krcdn.com/20200411/v2_16417a06088947debe0450950f8fc813_img_png',
        'https://img.36krcdn.com/20200410/v2_6905947498bc4ec0af228afed409f771_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center',
        'https://img.36krcdn.com/20200410/v2_86bbf8245f754be79f3386a82b385093_img_000',
        'https://img.36krcdn.com/20200408/v2_c67c3edfe4b5446992b32fad93a44a75_img_png',
        'https://img.36krcdn.com/20200411/v2_2204c6132432403184e43df22485545e_img_000?x-oss-process=image/resize,m_mfit,w_432,h_288/crop,w_432,h_288,g_center',
        'https://img.36krcdn.com/20200406/v2_d2c6a686b4074a1eb43603e67d6ba204_img_png',
        'https://img.36krcdn.com/20200411/v2_f497b1c414d5489791569b3ea99df33d_img_000',
        'https://img.36krcdn.com/20200411/v2_da4c26244cbc494c8e0e5918518e866c_img_png',
        'https://img.36krcdn.com/20200411/v2_61c1766736df49a0b2d0213624c0ebd2_img_000?x-oss-process=image/resize,m_mfit,w_432,h_288/crop,w_432,h_288,g_center',
        'https://img.36krcdn.com/20200411/v2_b92317dfc59948cea0f3c69a0357e519_img_000?x-oss-process=image/resize,m_mfit,w_432,h_288/crop,w_432,h_288,g_center'
      ],
      shopName: '@ctitle()',
      'staus|1': [0, 1],
      'shopAddress': '@county(true)',
      'auditstatus|1': [1,2,3,4,5,6],
      'auditmessage|1': ['待审核', '审核中', '已审核'],
      addTime: new Date() // 备注
    }],
    code: 0,
    message: 'ok!'
  });
  data.count = data.data.length;
  return data;
}
/**
 * 导出服务，{url,type,response}
 */
export default [
  {
    url: backend.mockExampleService + '/T05005', // 根据产品特征查询
    type: 'post',
    response: product
  },
  {
    url: backend.mockExampleService + '/T03005', //持有理财查询 /api/financial/finHoldList
    type: 'post',
    response: rights
  },
  {
    url: backend.mockExampleService + '/T03006', // 收益类明细查询
    type: 'post',
    response: incomeList
  },
  {
    url: backend.mockExampleService + '/T03003', // 权益类明细查询
    type: 'post',
    response: rightsList
  },
  {
    url: backend.mockExampleService + '/T03004', // 交易记录
    type: 'post',
    response: tranList
  },
  {
    url: backend.mockExampleService + '/T03002', // 购买
    type: 'post',
    response: buy
  },
  {
    url: backend.mockExampleService + '/T03007', // 购买
    type: 'post',
    response: redeem
  },
  {
    url: backend.mockExampleService + '/T03008', // 维护列表
    type: 'post',
    response: getMaintainList
  }
]
