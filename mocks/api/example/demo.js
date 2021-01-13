/**
 * @created by helin3 2019-11-22
 * @updated by
 * @description 个性化示例增、删、改、查服务，
 * 1）若无特殊要求（只是增加字段），可直接使用本模拟服务，无需重复模拟api
 * 2）若是个性化逻辑需求，请参考本示例重写（不要直接覆盖此api；不要放置到mocks/api/common目录下）
 */
import { backend, responseHeader } from '../utils';
import { List } from './data/data.demo';

function getList (req, res) {
  const { title, createAt, type, page, size, sort } = req.query;
  var mockList = List.filter(function (item) {
    if (createAt && item.createAt !== createAt) {
      return false;
    }
    if (type && item.type !== type) {
      return false;
    }
    if (title && item.title.indexOf(title) < 0) {
      return false;
    }
    return true;
  });
  if (sort === '-id') {
    mockList = mockList.reverse();
  }
  var pageList = [];
  if (page && size) {
    pageList = mockList.filter(function (item, index) {
      return index < size * page && index >= size * (page - 1);
    });
  } else {
    pageList = mockList;
  }
  responseHeader(res);
  return {
    code: 20000,
    data: {
      total: mockList.length,
      data: pageList
    }
  };
}
/**
 * 修改与新增
 * @param req
 * @returns {{code: number}}
 */
function saveFn (req, res) {
  var { id } = req.body;
  id = !id ? Math.floor((Math.random() * 1000) + 10000) : id;
  var updateFlag = false;
  for (var i = List.length - 1; i >= 0; i--) {
    var v = List[i];
    if (v.id === id) {
      var index = List.indexOf(v);
      List.splice(index, 1, req.body);
      updateFlag = true;
      break;
    }
  }
  if (!updateFlag) {
    req.body.id = id;
    List.unshift(req.body);
  }
  responseHeader(res);
  return {
    code: 0
  };
}
/**
 * 批量删除
 * @param req
 * @returns {{code: string}}
 */
function deleteData (req, res) {
  const { ids } = req.body;
  var idArray = ids.split(',');
  for (var i = List.length - 1; i >= 0; i--) {
    var v = List[i];
    for (var j = idArray.length - 1; j >= 0; j--) {
      var id = idArray[j];
      if (v.id === Number(id)) {
        var index = List.indexOf(v);
        List.splice(index, 1);
        idArray.splice(j, 1);
        break;
      }
    }
  }
  responseHeader(res);
  return {
    code: 0
  };
}

export default [{
  url: backend.mockExampleService + '/trade/example/list', // mock拦截路径
  type: 'get', // mock拦截方法
  response: (req) => { // 接口对应的响应
    return getList(req);
  }
},
{
  url: backend.mockExampleService + '/trade/example/save', // mock拦截路径
  type: 'post', // mock拦截方法
  response: saveFn // 接口对应的响应
},
{
  url: backend.mockExampleService + '/trade/example/delete',
  type: 'post',
  response: deleteData
}
];