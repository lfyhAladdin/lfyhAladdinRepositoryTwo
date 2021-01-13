/**
 * 首页 mock
 */

import {
    backend,
    responseHeader
} from '../utils';

// 滚动公告信息
const announce = (req, res) => {
    const param = req.body;
    responseHeader(res);
    let data = [{
        noticeId: '1001',
        tlNm: '关于增加利率调整的公告',
        txtCntnt: '关于增加利率调整的公告xxxxxxxxxxxx',
        publshTm: '2019-12-21',
    }, {
        noticeId: '1002',
        tlNm: '关于暂停ATM取款的公告',
        txtCntnt: '关于暂停ATM取款的公告xxxxxxxxxxxxxxx',
        publshTm: '2020-1-1',
    }]
    return {data:data};
};


/**
 * 导出服务，{url,type,response}
 */
export default [{
    url: backend.mockExampleService + '/T01009', // 首页公告信息查询
    type: 'post',
    response: announce
}];