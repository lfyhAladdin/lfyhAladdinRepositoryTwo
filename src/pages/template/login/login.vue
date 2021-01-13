<template>
	<view class="wrapper" :style="{ height: screenHeight - immergeBottom - 44 + 'px' }">
		<view class="page-title">
			<view class="text-amplify">你好，</view>
			<view>欢迎来到<text class="text-protrude">宇信移动平台</text></view>
		</view>
		<view v-if="loginType !== '1'" class="login-form form-wrapper">
			<view class="input-box">
				<input class="default-input" v-model="pwdFormdata.account" placeholder="请输入账号" @blur="temporaryRepair" />
			</view>
			<view class="input-box">
				<input class="default-input" v-model="pwdFormdata.password" placeholder="请输入密码" :password="!showPassword" />
				<yu-icons type="eye" :color="showPassword ? '#007aff' : '#999'" size="24" @click="changePassword" />
			</view>
			<view class="yu-btn-group">
				<button class="submit-btn" :class="clickable ? 'click-able' : ''" @click="pwdLogin">
					登 录
				</button>
			</view>
		</view>
		<view v-else class="login-form form-wrapper">
			<view class="input-box">
				<input class="default-input" v-model="phoneFormdata.phoneNo" placeholder="请输入手机号" maxlength="11" @blur="temporaryRepair" />
				<button class="send-btn" :type="sendCodeType" size="mini" @click="sendCode" :disabled="disabledSendCodeBtn">
					<text v-if="disabledSendCodeBtn">重新获取({{ sendCodeBtnText }}s)</text>
					<text v-else>{{ sendCodeBtnText }}</text>
				</button>
			</view>
			<view class="input-box">
				<input class="default-input" v-model="phoneFormdata.verifyCode" :disabled="disabledVerifyCode" type="number" placeholder="请输入验证码" maxlength="6" />
			</view>
			<view class="yu-btn-group">
				<button class="submit-btn" :class="phoneNoLoginClickable ? 'click-able' : ''" @click="phoneNoLogin">
					登 录
				</button>
			</view>
		</view>
		<view class="login-style">
			<view class="title">
				<text>切换登录方式</text>
			</view>
			<view class="flex-box flex-ac flex-pa">
				<view v-for="(value, typeKey) in loginTypeObj" @tap.stop="switchLoginType(typeKey)" :key="typeKey">
					<view class="white">{{ value }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { createNamespacedHelpers, mapGetters } from 'vuex';
	const { mapState } = createNamespacedHelpers('oauth');
	import iosrepair from '@/utils/mixins/iosrepair.js';
	export default {
		components: {},
		mixins: [iosrepair],
		data: function() {
			return {
				pwdFormdata: {
					account: '',
					password: ''
				},
				phoneFormdata: {
					phoneNo: '',
					verifyCode: ''
				},
				showPassword: false,
				disabledSendCodeBtn: false,
				disabledVerifyCode: true,
				sendCodeType: 'primary',
				sendCodeBtnText: '发送验证码',
				count: 60,
				timer: '',
				loginType: '0',
				loginTypeObj: {
					'0': '密码',
					'1': '短信',
					'2': '指纹',
					'3': '手势'
				},
				uuid: '', // 设备id
				currentGesturePayload: {},
				resData: {
					// 假定的接口返回的数据
					smallbankname: '滨海分行',
					headimg:
						'http://mockplat.dfyusys.com:8890/Image/headImg/abc1b5dc-571c-4870-a56b-6cefef35f4a3.png',
					phone: '18876522003',
					messagecount: 6,
					rolename: '网点管理员',
					bankname: '滨海分行',
					id: '9527',
					type: '0',
					account: '6903',
					realname: '陈静2',
					accessToken: 'xx',
					refreshToken: 'xx',
					lastRefreshTime: Date.now()
				}
			};
		},

		computed: {
			clickable: function() {
				return this.pwdFormdata.account && this.pwdFormdata.password;
			},

			phoneNoLoginClickable() {
				return this.phoneFormdata.phoneNo && this.phoneFormdata.verifyCode;
			},
			...mapState(['userInfo'])
		},

		onShow() {
			// #ifdef APP-FOX
			this.setStatusFontColor('dark');
			this.getLocalName();
			this.getUUID();
			// #endif
		},

		methods: {
			// 获取local用户名和用户id
			async getLocalName() {
				let _this = this;
				await yu.getStorage({
					key: 'userInfo',
					complete: function(res) {
						console.log('getLocalName---');
						console.log(res);
						if (res.errMsg == 'getStorage:ok') {
							let userInfo = res.data || {};
							_this.userId = userInfo.userId;
							_this.pwdFormdata.account = userInfo.account || '';
							_this.currentGesture(); // 获取当前手势信息
						}
					}
				});
			},

			switchLoginType(type) {
				this.loginType = type;
				if (type === '2') {
					this.fingerPrintVerification();
				} else if (type === '3') {
					this.openUnlock();
				}
			},

			changePassword: function() {
				this.showPassword = !this.showPassword;
			},

			// 密码登录
			pwdLogin(e) {
				if (!this.pwdFormdata.account) {
					yu.showToast({
						icon: 'none',
						title: '请输入账号',
						duration: 2000
					});
					return;
				} else if (!this.pwdFormdata.password) {
					yu.showToast({
						icon: 'none',
						title: '请输入密码',
						duration: 2000
					});
					return;
				}
				let data = {
					userName: this.pwdFormdata.account,
					passWord: this.pwdFormdata.password
				};
				yu.showLoading({ title: '' });
				this.$store
					.dispatch('oauth/login', data)
					.then(res => {
						yu.hideLoading();
						this.loginSucceed(res);
					})
					.catch(error => {
						yu.hideLoading();
						console.log(error);
					});
			},

			// 登录成功
			loginSucceed(userInfo) {
				// 存储登录账号和用户id到storage
				console.log('loginSucceed---');
				console.log(userInfo);
				yu.setStorage({
					key: 'userInfo',
					data: { account: userInfo.account, userId: userInfo.id },
					fail: function(error) {
						console.error('用户信息储存异常');
					}
				});
				yu.showToast({
					icon: 'none',
					title: '登录成功',
					duration: 1500
				});
				setTimeout(() => {
					yu.switchTab({
						url: '/pages/tabBar/template/template'
					});
				}, 1500);
			},

			// 发送验证码
			sendCode() {
				const reg = /^1[3-9][0-9]\d{8}$/;
				if (reg.test(this.phoneFormdata.phoneNo)) {
					this.disabledSendCodeBtn = true;
					this.disabledVerifyCode = false;
					this.sendCodeBtnText = 60;
					this.sendCodeType = 'default';
					this.countDown();
				} else {
					yu.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					});
				}
			},

			// 倒计时
			countDown() {
				this.timer = setInterval(() => {
					this.sendCodeBtnText -= 1;
					if (this.sendCodeBtnText <= 0) {
						this.disabledSendCodeBtn = false;
						this.sendCodeBtnText = '发送验证码';
						this.sendCodeType = 'primary';
						clearInterval(this.timer);
					}
				}, 1000);
			},

			// 手机号 短信登录
			phoneNoLogin() {
				if (!this.phoneFormdata.verifyCode) {
					yu.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
				} else {
					let data = {
						userName: this.phoneFormdata.phoneNo,
						passWord: this.phoneFormdata.verifyCode
					};
					yu.showLoading({ title: '' });
					this.$store
						.dispatch('oauth/login', data)
						.then(res => {
							yu.hideLoading();
							this.loginSucceed(res.account);
						})
						.catch(error => {
							yu.hideLoading();
							console.log(error);
						});
				}
			},

			// 指纹登录
			fingerPrintVerification() {
				// #ifdef APP-FOX
				// 使用指纹登录需要确保有userId (userId是之前通过账号密码登录后 通过yu.setStorage保存的)
				if (this.userId) {
					foxsdk.touchid.fingerPrintVerification(ret => {
						yu.showToast({
							title: ret.message,
							icon: 'none',
							duration: 2000
						});
						console.log(
							'touchid/fingerPrintVerification===status: ' +
								ret.status +
								',message: ' +
								ret.message +
								',payload: ' +
								JSON.stringify(ret.payload)
						);
						if (ret.status == 0) {
							// 通过设备id（uuid） 和 userId 去接口拿用户数据
							// this.resData 为假定的接口返回的用户数据
							this.$store.commit('oauth/setTokens', this.resData);
							this.$store.commit('oauth/setSessions', this.resData);
							this.loginSucceed(this.resData);
						}
					});
				} else {
					yu.showToast({
						icon: 'none',
						title: '暂无userId，首次登录需要使用账号密码登录！',
						duration: 1500
					});
				}
				// #endif
				// #ifndef APP-FOX
				yu.showModal({
					content: '此功能目前仅限于APP端使用！',
					showCancel: false
				});
				// #endif
			},

			// 手势登录
			openUnlock() {
				// #ifdef APP-FOX
				// 使用手势登录需要确保有userId (userId是之前通过账号密码登录后 通过yu.setStorage保存的)
				if (this.userId) {
					if (this.currentGesturePayload.gesturePswd) {
						// 已设置了手势
						var data = {
							unlockType: '1',
							userIdentify: this.userId,
							maxErrorTimes: '5',
							gesturePswd: 'xxxxx'
						};
						foxsdk.gesture.openUnlock(data, ret => {
							console.log(
								'gesture/openUnlock---status: ' +
									ret.status +
									',message: ' +
									ret.message +
									',payload: ' +
									JSON.stringify(ret.payload)
							);
							if (ret.status == 0) {
								// 通过设备id（uuid） 和 userId 去接口拿用户数据
								// this.resData 为假定的接口返回的用户数据
								this.$store.commit('oauth/setTokens', this.resData);
								this.$store.commit('oauth/setSessions', this.resData);
								this.loginSucceed(this.resData);
							}
						});
					} else {
						yu.showToast({
							icon: 'none',
							title: '请先设置手势',
							duration: 1500
						});
						setTimeout(() => {
							yu.navigateTo({ url: '/pages/API/gesture/gesture' });
						}, 1600);
					}
				} else {
					yu.showToast({
						icon: 'none',
						title: '暂无userId，首次登录需要使用账号密码登录！',
						duration: 1500
					});
				}
				// #endif
				// #ifndef APP-FOX
				yu.showModal({
					content: '此功能目前仅限于APP端使用！',
					showCancel: false
				});
				// #endif
			},

			// 获取当前手势信息
			currentGesture() {
				// #ifdef APP-FOX
				var data = { userIdentify: this.userId };
				foxsdk.gesture.currentGesture(data, ret => {
					this.currentGesturePayload = ret.payload;
					console.log(
						'gesture/currentGesture---status: ' +
							ret.status +
							',message: ' +
							ret.message +
							',payload: ' +
							JSON.stringify(ret.payload)
					);
				});
				// #endif
			},

			// 获取设备id
			getUUID() {
				// #ifdef APP-FOX
				foxsdk.device.getUUID(ret => {
					if (ret.status != 0) {
						this.uuid = ret.uuid;
					}
					console.log(
						'device/getUUID===status: ' +
							ret.status +
							',message: ' +
							ret.message +
							',payload: ' +
							JSON.stringify(ret.payload)
					);
				});
				// #endif
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import './authenCommon.scss';
	.input-placeholder {
		padding-left: 10rpx;
		color: #bcbcbc;
	}
	/deep/ .yu-input {
		.input-placeholder {
			color: #bcbcbc;
		}
	}
	.input-box {
		display: flex;
		align-items: center;
    justify-content: center;
    height: 110rpx;
		border-bottom: 1rpx solid #dddddd;
		.default-input {
			flex: 1;
			height: 109rpx;
			text-indent: 0;
			padding: 20rpx 0;
			box-sizing: border-box;
		}
		.uni-eye-active {
			color: #007aff;
		}
	}

	.yu-btn-group {
		.text-btn {
			margin-top: 48rpx;
			padding-bottom: 48rpx;
			text-align: center;
			font-size: 28rpx;
			color: #676767;
		}
	}

	.login-style {
		margin: 0 auto;
		margin-top: 120rpx;
		margin-bottom: 80rpx;
		bottom: 0rpx;
		text-align: center;
		.title {
			position: relative;
			width: 312rpx;
			height: 38rpx;
			margin: 0 auto 20rpx;
			font-size: 26rpx;
			line-height: 38rpx;
			border-top: 2rpx solid #c4c4c4;
		}
		text {
			position: absolute;
			width: 196rpx;
			padding: 0 4rpx;
			top: -19rpx;
			left: 0;
			right: 0;
			margin: auto;
			color: #c4c4c4;
			background-color: #fff;
		}
		.white {
			padding: 16rpx;
			font-size: 28rpx;
			border-radius: 50%;
			color: #fff;
			background-color: #ccc;
		}
	}
</style>
