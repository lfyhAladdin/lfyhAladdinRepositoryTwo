/**
 * @created by helin3 2019-11-22
 * @updated by
 * @description mocks模拟数据工具方法
 */
import { backend as backendAlias } from '../../src/config/app.config';

/**
 * 将业务报文体错误码通过header返回
 * @param {Object} res 响应对象
 * @param {Object} retObj 响应报文体，默认值：{code: 0, message: 'ok'}
 */
export const responseHeader = function (res, retObj = {code: 0, message: 'ok'}) {
  res.header('code', retObj.code);
  res.header('msg', encodeURIComponent(retObj.message));
};

/**
 * 将app.config中的backend导出，避免mocks/api里面引用时，写很长的相对路径，如：../../../src/config/app.config
 */
export const backend = backendAlias
