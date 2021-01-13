/**
 * @created by helin3 2019-11-22
 * @updated by
 * @description 通用增、删、改、查服务，
 * 1）若无特殊要求（只是增加字段），可直接使用本模拟服务，无需重复模拟api
 * 2）若是个性化逻辑需求，请参考本示例重写（不要直接覆盖此api；不要放置到mocks/api/common目录下）
 */
import { backend, responseHeader } from '../utils';
import { List } from './data/data.crud';

/**
 * 查询数据
 * 默认条件过滤：type|title|createAt
 * @param {*} req 请求参数:
 * 1) post请求通过 req.body
 * 2) get请求通过 req.query
 */
const queryListFn = (req, res) => {
  const { page = 1, size = 10, sort, condition } = req.query;
  const { id, type, title, createAt } = condition || {};
  let mockList = List.filter(item => {
    // 精确匹配
    if (id && item.id !== id) {
      return false;
    }
    if (type && item.type !== type) {
      return false;
    }
    if (createAt && item.createAt !== createAt) {
      return false;
    }
    // 模糊匹配
    if (title && item.title.indexOf(title) < 0) {
      return false;
    }
    return true;
  });

  if (sort === '-id') {
    mockList = mockList.reverse();
  }

  let pageList;
  if (page && size) {
    pageList = mockList.filter((item, index) => {
      return index < size * page && index >= size * (page - 1);
    });
  }
  responseHeader(res);
  return {
    code: 0,
    total: mockList.length,
    data: pageList
  };
};

/**
 * 保存数据（新增/修改）
 * @param {*} req 请求参数:
 * 1) post请求通过 req.body
 * 2) get请求通过 req.query
 */
const saveFn = (req, res) => {
  var temp = req.body;
  temp.id = !temp.id ? Math.floor((Math.random() * 1000) + 10000) : temp.id;
  var updateFlag = false;
  for (var i = List.length - 1; i >= 0; i--) {
    var v = List[i];
    if (v.id + '' === temp.id + '') {
      var index = List.indexOf(v);
      List.splice(index, 1, temp);
      updateFlag = true;
      break;
    }
  }
  if (!updateFlag) {
    List.unshift(temp);
  }
  responseHeader(res);
  return {
    code: 0
  };
};

/**
 * 删除数据
 * @param {*} req 请求参数:
 * 1) post请求通过req.body
 * 2) get请求通过req.query
 */
const deleteFn = (req, res) => {
  var temp = req.body;
  var ids = temp.ids.split(',');
  for (var i = List.length - 1; i >= 0; i--) {
    var v = List[i];
    for (var j = ids.length - 1; j >= 0; j--) {
      var id = ids[j];
      if (v.id + '' === id + '') {
        var index = List.indexOf(v);
        List.splice(index, 1);
        ids.splice(j, 1);
        break;
      }
    }
  }
  responseHeader(res);
  return {
    code: 0
  };
};

/**
 * 导出服务，{url,type,response}
 */
export default [
  {
    url: backend.mockExampleService + '/crud/list',
    type: 'get',
    response: queryListFn
  },
  {
    url: backend.mockExampleService + '/crud/save',
    type: 'post',
    response: saveFn
  },
  {
    url: backend.mockExampleService + '/crud/delete',
    type: 'post',
    response: deleteFn
  }
];
