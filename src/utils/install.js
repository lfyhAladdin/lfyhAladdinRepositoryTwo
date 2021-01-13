/**
 * @created by anonymous 2019-12-09
 * @updated by
 * @description APP全局插件（组件、图标、过滤器、工具方法等）安装
 */
import { backend } from '@/config/app.config';
import http from '@/utils/request';
import mixins from '@/utils/mixins';
import filters from '@/utils/filters';
import globalMethod from '@/static/js/globalmethods';
/**
 * 安装插件，注意方法里面使用时vue对象时是小写的变量
 * @param {Object} vue Vue对象
 */
const install = function(vue) {
	// 注入到实例上
	vue.prototype.$backend = backend;
	vue.prototype.$http = http;
	vue.prototype.globalMethod=globalMethod;
	// 全局混入
  vue.mixin(mixins);
	// 全局注入过滤器
	Object.keys(filters).forEach((key) => {
		vue.filter(key, filters[key]);
	});
};

export default install;
