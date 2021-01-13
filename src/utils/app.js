/**
 * 主要封装业务相关，页面操作相关的公共方法
 * 挂载到Vue的实例对象上面
 * usage： this.$yuApp.xxx
 */
import Vue from 'vue'
class yuApp extends Vue {
	constructor(arg) {
		super()
	}
	
	/**
	 * App全局数据获取
	 */
	getGlobalData = (name)=>{
		return getApp().globalData[name];
	}
	
	/**
	 * 检查App版本更新:资源包差量更新+整包更新
	 */
	updateApp = ()=>{
		// #ifdef APP-PLUS
		let platform = uni.getSystemInfoSync().platform;
		//更新
		//获取应用信息
		plus.runtime.getProperty(plus.runtime.appid, widgetInfo=> {
			
			this.$yuApi.post('appUpdate.do',{
				version: widgetInfo.version,//资源版本
				name: widgetInfo.name,//应用名称
				appid:widgetInfo.appid,//应用id
				appType:platform ,//平台类型 ios/android 其他值不合法
				appMac:"与App相关信息进行MD5,部分字段不能出现在请求数据中"
			},{
				loading:false,
			}).then(result=>{
				var data = result.data;
				if(data.status == 'canceled'){//发布状态 canceled / normal
					return;
				}
				//方案一
				/* var appview = plus.webview.create('/hybrid/html/app-update.html','plus-appupdate',{
					background:'transparent'
				},{
					content: data.content,
					updateUrl: data.updateUrl,
					isForce:data.isForce,//是否强制升级
					updateStyle:data.updateStyle,//升级方式 wgt/package/wgtu
					publishMode:data.publishMode ,//发布模式: production/development
					versionNum:data.versionNum //package或者wgt版本号
				})
				appview.addEventListener('titleUpdate',function(){
					appview.show('fade-in',150)
				}) */
				//方案二
				let params = this.$yuUtil.objParseParam({
					content: encodeURIComponent(data.content),
					updateUrl: data.updateUrl,
					isForce:data.isForce,//是否强制升级
					updateStyle:data.updateStyle,//升级方式 wgt/package/wgtu
					publishMode:data.publishMode ,//发布模式: production/development
					versionNum:data.versionNum //package或者wgt版本号
				});
				uni.navigateTo({
					url:`/pages/public/appUpdate?${params}`
				})
			})
			
		}); 
		// #endif
	}
	
	/**
	 * 消息推送或者schema唤起App的页面跳转
	 */
	awakeApp = ()=>{
		// #ifdef APP-PLUS
		return new Promise((resolve)=>{
			setTimeout(()=>{
				resolve(plus.runtime.arguments)
			}, 100);
		});
		// #endif
	}
	/**
	 * App退栈逻辑处理,eg:
	 * 1.超时清空会话
	 * 2.清空密码输入信息
	 */
	pauseApp = ()=>{
		// #ifdef APP-PLUS
		plus.runtime.arguments = '';
		this.emit('appPop');
		// #endif
	}
	
	/**
	 * 绑定全局触发事件
	 * 支持vue+nvue
	 */
	on = (eventName,func=()=>{})=>{
		if(!eventName){
			return;
		}
		uni.$on(eventName,(data)=>{
			func(data)
		});
	}
	
	/**
	 * 解绑全局事件
	 */
	off = (eventName)=>{
		if(!eventName){
			return;
		}
		uni.$off(eventName);
	}
	
	/**
	 * 绑定一次全局事件，emit触发后自动解绑
	 */
	once = (eventName,func=()=>{})=>{
		if(!eventName){
			return;
		}
		uni.$once(eventName,(data)=>{
			func.call(this,data)
		});
	}
	/**
	 * 触发全局监听事件
	 */
	emit = (eventName,data={})=>{
		if(!eventName){
			return;
		}
		uni.$emit(eventName,data)
	}
	
	/**
	 * 登陆成功后，逻辑处理公共函数
	 */
	logonAfter = (data)=>{
		this.$yuStorage.setItemSync('sessionId',data && data.sessionId);
		if(this.$appConf.touristMode){
			//TODO 处理登陆成功后直接进入目标页面
			this.$yuRouter.back();
		}else{
			this.$yuRouter.reLaunch({
				route:this.$routesConf.main
			})
		}
	}
	
	/**
	 * 登出成功后，逻辑处理公共函数
	 */
	logoutAfter = ()=>{
		//await storage.removeItemSync('sessionId',data && data.sessionId);
	}
	
	/**
	 * 上一个页面栈实例对象
	 */
	prePage = ()=>{
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		// #ifdef H5
		return prePage;
		// #endif
		return prePage.$vm;
	}
	/**
	 * 上一个页面窗体对象
	 */
	preUniWebview = ()=>{
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		// #ifdef APP-PLUS
		return prePage.$getAppWebview();
		// #endif
		return null;
	}
	
	/**
	 * 获取当前webview对象
	 */
	getCurrentWebview = ()=>{
		// #ifdef APP-PLUS
		return this.$mp.page.$getAppWebview();
		// #endif
		return this.$vm;
	}
	
	/**
	 * 根据__uni_WebviewId__获取webview对象
	 */
	getWebviewById = (id)=>{
		// #ifdef APP-PLUS
		return plus.webview.getWebviewById(id)
		// #endif
		return null;
	}
	
	/**
	 * @description 根据指定页面路径，返回到业务首页
	 * 注意:此方法只限于返回业务首页
	 * 若需要返回首页则使用reLaunch或者switchTab
	 */
	backToHome = ()=>{
		var len = getCurrentPages().length - 2;
		len = len < 1 ? 1 : len;
		this.$yuRouter.back(len)
	}
	
	/**
	 * 面包屑
	 */
	toast = (title, duration=1500, mask=false, icon='none',position='bottom')=>{
		//统一提示方便全局修改
		if(Boolean(title) === false){
			return;
		}
		uni.showToast({
			title,
			duration,
			mask,
			icon,
			position
		});
	}
	
	/**
	 * 显示遮罩等待框，内容自定义
	 */
	loading = (title,mask=true)=>{
		if(!title){
			return;
		}
		uni.showLoading({
			title:title,
			mask:mask,
			success: () => {
			},
			fail: () => {
			}
		})
	}
	
	/**
	 * 关闭遮罩等待框，必须与loading成对出现
	 */
	unloading = ()=>{
		uni.hideLoading();
	}
	
	/**
	 * App警告框，系统原生弹出框，Android与iOS存在UI差异
	 * @param {type}  content 警告内容
	 * @param {type}  title   标题，默认为全局配置标题
	 * @param {type}  style 自定义样式，见html5+
	 */
	alert = (content,title=this.$appConf.appName)=>{
		return new Promise(resolve=>{
			uni.showModal({
				title:title,
				confirmColor:"#007AFF",
				confirmText:"确认",
				content:content,
				showCancel:false,
				duration: 1500,
				success: (res) => {
					resolve();
				}
			})
		})
	}
	
	/**
	 * 对话框
	 * @param {type}  content 内容
	 * @param {type}  title 标题，默认为全局配置标题
	 */
	confirm = (content,title=this.$appConf.appName)=>{
		return new Promise((resolve,reject)=>{
			uni.showModal({
				title:title,
				confirmColor:"#007AFF",
				confirmText:"确认",
				cancelColor:"#007AFF",
				cancelText:"取消",
				content:content,
				showCancel:true,
				success: (res) => {
					if(res.confirm){
						resolve();
					}else if(res.cancel){
						reject();
					}
				}
			})
		})
	}
	
	/**
	 * 功能菜单
	 * @param {type}
	 */
	actionsheet = (itemList)=>{
		if(!itemList || itemList.length == 0){
			return;
		}
		return new Promise((resolve)=>{
			uni.showActionSheet({
				itemList: itemList,
				success: res => {
					resolve(res);
				},
				fail: () => {},
				complete: () => {}
			});
		})
	}
	
	/**
	 * 首页连续点击安卓物理键返回按钮退出App
	 * 覆盖默认退出App提示信息。
	 * 在首页onBackPress钩子函数中调用即可
	 * usage: return this.$yuApp.quitApp()
	 */
	quitApp = (()=>{
		var backtime = 0;
		return ()=>{
			// #ifdef APP-PLUS
			backtime++;
			if(backtime>1){
				plus.runtime.quit();
			}else{
				this.toast('再按一次退出应用')
			}
			setTimeout(()=>{
				backtime = 0;
			}, 1000);
			return true;
			// #endif
		}
	})()
	
	showLayer = (title,content)=>{
		uni.navigateTo({
			url:`/pages/public/myLayer?title=${title}&content=${content}`
		})
	}
	/**
	 * 获取当前App网络类型
	 */
	getNetType = ()=>{
		
		// #ifdef APP-PLUS
			var types = {}; 
			types[plus.networkinfo.CONNECTION_UNKNOW] = "Unknown connection"; 
			types[plus.networkinfo.CONNECTION_NONE] = "None connection"; 
			types[plus.networkinfo.CONNECTION_ETHERNET] = "Ethernet connection"; 
			types[plus.networkinfo.CONNECTION_WIFI] = "WiFi connection"; 
			types[plus.networkinfo.CONNECTION_CELL2G] = "Cellular 2G connection"; 
			types[plus.networkinfo.CONNECTION_CELL3G] = "Cellular 3G connection"; 
			types[plus.networkinfo.CONNECTION_CELL4G] = "Cellular 4G connection";
			return types[plus.networkinfo.getCurrentType()];
		// #endif
		
		return window.navigator.connection.effectiveType||'unkown'
	}
	
	/**
	 * 获取当前用户代理信息
	 */
	getUserAgent = ()=>{
		// #ifdef APP-PLUS
		return plus.navigator.getUserAgent();
		// #endif
		return window.navigator.userAgent;
	}
	
}

module.exports = new yuApp;