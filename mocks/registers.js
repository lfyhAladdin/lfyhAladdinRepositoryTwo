/**
 * @created by helin3 2019-11-22
 * @updated by
 * @description Mock业务模块登记注册表
 * 特别注意：不要试图增加/改变/删除带${XXX}的注释行
 * TODO: 1) 导入你的模拟业务模块；2) 添加你的模拟业务模块
 */
import oauth from './api/common/oauth';
import crud from './api/common/crud';
import file from './api/common/file';

import demo from './api/example/demo';

import account from './api/ebank/account';
import home from './api/ebank/home';
import marketing from './api/ebank/marketing';
import product from './api/ebank/product';
import financial from './api/ebank/financial';
import member from './api/ebank/member';
import transfer from './api/ebank/transfer';
import loan from './api/ebank/loan';
import coupons from './api/ebank/coupons';

//安全中心
import security from "./api/ebank/security";
//登录
// import oauth from "./api/ebank/T01001";
/** ${CliPluginMockApiAutoImport} Dangerous!!! */

const registers = [
  oauth,
  crud,
  file,
  demo,
  account,
  home,
  marketing,
  product,
  security,
  financial,
  member,
  transfer,
  loan,
  coupons
  /** ${CliPluginMockApiAutoExport} Dangerous!!! */
];
// node环境不支持数组解构，故通过循环手工拼接
var apis = [].concat.apply([], registers);
export default apis;
