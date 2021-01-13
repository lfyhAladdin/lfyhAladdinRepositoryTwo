/**
 * @created by helin3 2019-11-22
 * @updated by
 * @description 会话相关静态数据（菜单、控制点），模拟后台接口返回
 */

// 外链配置示例，浏览器打开与iframe打开
// { menuId: 'dm-22009', menuName: 'externalLink', upMenuId: 'dm-22000', menuIcon: '', funcId: 'externalLink', funcUrl: 'http://www.yusys.com.cn' },
// { menuId: 'dm-22010', menuName: 'iframeLink', upMenuId: 'dm-22000', menuIcon: '', funcId: 'iframeLink', funcUrl: 'iframelink=http%3A%2F%2Fwww.yusys.com.cn' },

// 菜单数据
const demoMenus = [
  // 一级菜单
  // { menuId: 'dm-10000', menuName: '首页', upMenuId: '0', menuIcon: 'component', funcId: 'dashboard', funcUrl: 'common/dashboard/index'},
  { menuId: 'dm-20000', menuName: '演示示例', upMenuId: '0', menuIcon: 'table' },

  // 二级菜单
  { menuId: 'dm-21000', menuName: '空白模板', upMenuId: 'dm-20000', menuIcon: 'table', funcId: 'blank', funcUrl: 'example/templates/blank/index' },
  { menuId: 'dm-23000', menuName: '模板示例', upMenuId: 'dm-20000', menuIcon: 'yu-icon-task' },

  // 三级菜单
  { menuId: 'dm-23100', menuName: '查询类', upMenuId: 'dm-23000', menuIcon: 'chart' },
  { menuId: 'dm-23200', menuName: '表单类', upMenuId: 'dm-23000', menuIcon: 'chart' },

  // 四级菜单
  { menuId: 'dm-23110', menuName: '授信申请', upMenuId: 'dm-23100', menuIcon: '', funcId: 'lpCrdtAppFetList', funcUrl: 'protal/inquiry/lpCrdtAppFetList/lpCrdtAppFetList' },
  { menuId: 'gm-23109', menuName: '普通查询（新）', upMenuId: 'dm-23100', menuIcon: '', funcId: 'exampleQuery1', funcUrl: 'example/templates/exampleQuery1' },
  { menuId: 'dm-23101', menuName: '普通查询', upMenuId: 'dm-23100', menuIcon: '', funcId: 'exampleQuery', funcUrl: 'example/templates/exampleQuery' },
  { menuId: 'dm-23102', menuName: '树+查询', upMenuId: 'dm-23100', menuIcon: '', funcId: 'exampleTree', funcUrl: 'example/templates/exampleTree' },
  { menuId: 'dm-23103', menuName: '查询+表单（编辑）', upMenuId: 'dm-23100', menuIcon: '', funcId: 'exampleEdit', funcUrl: 'example/templates/exampleEdit' },
  { menuId: 'dm-23104', menuName: '查询+表格（主从表）', upMenuId: 'dm-23100', menuIcon: '', funcId: 'searchTable', funcUrl: 'example/templates/searchTable' },
  { menuId: 'dm-23105', menuName: 'Tab页签+查询', upMenuId: 'dm-23100', menuIcon: '', funcId: 'tabSearch', funcUrl: 'example/templates/tabSearch' },
  { menuId: 'dm-23106', menuName: '查询嵌套表格', upMenuId: 'dm-23100', menuIcon: '', funcId: 'queryNestedTable', funcUrl: 'example/templates/queryNestedTable' },
  { menuId: 'dm-23107', menuName: '查询嵌套表单', upMenuId: 'dm-23100', menuIcon: '', funcId: 'queryNestedForm', funcUrl: 'example/templates/queryNestedForm' },
  { menuId: 'dm-23108', menuName: '高级查询', upMenuId: 'dm-23100', menuIcon: '', funcId: 'exampleMoreQuery', funcUrl: 'example/templates/exampleMoreQuery' },

  // 四级菜单
  { menuId: 'dm-23201', menuName: '普通表单（编辑）', upMenuId: 'dm-23200', menuIcon: '', funcId: 'exampleForm', funcUrl: 'example/templates/exampleForm' },
  { menuId: 'dm-23202', menuName: '普通表单（详情）', upMenuId: 'dm-23200', menuIcon: '', funcId: 'exampleFormInfo', funcUrl: 'example/templates/exampleFormInfo' },
  { menuId: 'dm-23203', menuName: '分组表单', upMenuId: 'dm-23200', menuIcon: '', funcId: 'exampleGroup', funcUrl: 'example/templates/exampleGroup' },
  { menuId: 'dm-23204', menuName: '表单+列表', upMenuId: 'dm-23200', menuIcon: '', funcId: 'tableList', funcUrl: 'example/templates/tableList' },
  { menuId: 'dm-23205', menuName: 'Tab页签表单', upMenuId: 'dm-23200', menuIcon: '', funcId: 'tabForm', funcUrl: 'example/templates/tabForm' },
  { menuId: 'dm-23206', menuName: '表单内嵌套Tabs', upMenuId: 'dm-23200', menuIcon: '', funcId: 'formNestTab', funcUrl: 'example/templates/formNestTab' },
  { menuId: 'dm-23207', menuName: 'Steps步骤表单', upMenuId: 'dm-23200', menuIcon: '', funcId: 'exampleSteps', funcUrl: 'example/templates/exampleSteps' }

];

// 控制点数据
const demoContrls = [
  { menuId: 'dm-23101', funcId: 'exampleQuery', contrCode: 'create', contrName: '新增' },
  { menuId: 'dm-23101', funcId: 'exampleQuery', contrCode: 'edit', contrName: '修改' },
  { menuId: 'dm-23101', funcId: 'exampleQuery', contrCode: 'detail', contrName: '详情' },
  { menuId: 'dm-23101', funcId: 'exampleQuery', contrCode: 'delete', contrName: '删除' },
  { menuId: 'dm-23101', funcId: 'exampleQuery', contrCode: 'export', contrName: '导出' },

  { menuId: 'dm-23102', funcId: 'exampleTree', contrCode: 'create', contrName: '新增' },
  { menuId: 'dm-23102', funcId: 'exampleTree', contrCode: 'edit', contrName: '修改' },
  { menuId: 'dm-23102', funcId: 'exampleTree', contrCode: 'detail', contrName: '详情' }
];

// 导出菜单&控制点数据
export default {
  demoMenus,
  demoContrls
};
