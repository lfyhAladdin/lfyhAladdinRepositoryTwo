<!--
  插件市场下载的cwx-keyboard组件
  数字键盘
 
  使用方法：
  @param title [string] - 确认按钮文字， 确认按钮文字，默认“确认”
  @param btnColor [string] - 确认按钮背景色，默认“#E52B22”
  @events confirmEvent 确认点击，返回输入内容
 -->
<template>
	<view class='keyboard'>
		<view class='key-row'>
			<view class='key-cell cell_b' @click="_handleKeyPress(7)">7</view>
			<view class='key-cell cell_b' @click="_handleKeyPress(8)">8</view>
			<view class='key-cell cell_b' @click="_handleKeyPress(9)">9</view>
			<view class='key-cell cell_b'></view>
		</view>
		<view class='key-row'>
			<view class='key-cell cell_b' @click="_handleKeyPress(4)">4</view>
			<view class='key-cell cell_b' @click="_handleKeyPress(5)">5</view>
			<view class='key-cell cell_b' @click="_handleKeyPress(6)">6</view>
			<view class='key-cell cell_b'></view>
		</view>
		<view class='key-row'>
			<view class='key-cell cell_b' @click="_handleKeyPress(1)">1</view>
			<view class='key-cell cell_b' @click="_handleKeyPress(2)">2</view>
			<view class='key-cell cell_b' @click="_handleKeyPress(3)">3</view>
			<view class='key-cell cell_b'></view>
		</view>
		<view class="key-zero-and-point">
			<view class="a cell_b zero" @click="_handleKeyPress(0)">0</view>
			<view class="a cell_b point" @click="_handleKeyPress('.')">.</view>
		</view>
		<view @touchstart="touchstart" @touchend="touchend" class="key-confirm2" @click="_handleKeyPress('D')">
			<text>删除</text>
		</view>
		<view class='key-confirm' :style="{'background':btnColor}" @click="_handleKeyPress('S')">
			<view class="title">{{title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'yu-cwx-keyboard',

		props: {
			title: {
				default: '确认',
				type: String
			},
			btnColor: {
				default: '#E52B22'
			}
		},
		data() {
			return {
				num: '',
				Cdel: '',
				Time: ''
			};
		},
		watch: {
			num(val) {
				this.$emit('update:num', val);
			}
		},
		methods: {
			touchstart() {
				this.Time = setInterval(() => {
					if (this.num == '') {
						clearInterval();
					}
					this.num = this.num.substring(0, this.num.length - 1);
				}, 200);
			},
			touchend() {
				clearInterval(this.Time);
			},
			//处理按键
			_handleKeyPress(num) {
				//不同按键处理逻辑
				switch (String(num)) {
					//小数点
					case '.':
						this._handleDecimalPoint();
						break;
					//删除键
					case 'D':
						this._handleDeleteKey();
						break;
					//清空键
					case 'C':
						this._handleClearKey();
						break;
					//确认键
					case 'S':
						this._handleConfirmKey();
						break;
					default:
						this._handleNumberKey(num);
						break;
				}
			},
			//处理小数点函数
			_handleDecimalPoint() {
				yu.showToast({
					icon: 'none',
					title: '请输入数字',
					duration: 2000
				});
				return false;
				// //如果包含小数点，直接返回
				// if (this.num.indexOf('.') > -1) return false;
				// //如果小数点是第一位，补0
				// if (!this.num.length)
				// 	this.num = '0.';
				// //如果不是，添加一个小数点
				// else
				// 	this.num = this.num + '.';
			},
			//处理删除键
			_handleDeleteKey() {
				let S = this.num;
				//如果没有输入，直接返回
				if (!S.length) return false;
				//否则删除最后一个
				this.num = S.substring(0, S.length - 1);
			},

			//处理清空键
			_handleClearKey() {
				this.num = '';
			},

			//处理数字
			_handleNumberKey(num) {
				if (this.num.length == 6) {
					return;
				}
				let S = this.num;
				//如果有小数点且小数点位数不小于2
				if (S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
					this.num = S + num;
				//没有小数点
				if (!(S.indexOf('.') > -1)) {
					//如果第一位是0，只能输入小数点
					// if (num == 0 && S.length == 0)
					// 	this.num = '0.';
					// else {
					// if (S.length && Number(S.charAt(0)) === 0) return;
					this.num = S + num;
					// }
				}
			},

			//提交
			_handleConfirmKey() {
				let S = this.num;
				//未输入
				if (!S.length || S == 0) {
					uni.showToast({
						title: '请输入正确的数值',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				// //将 8. 这种转换成 8.00
				// if (S.indexOf('.') > -1 && S.indexOf('.') == (S.length - 1))
				// 	S = Number(S.substring(0, S.length - 1)).toFixed(2);
				// //保留两位
				// S = Number(S).toFixed(2);
				this.$emit('confirmEvent', S); //提交参数
			}
		}
	};
</script>

<style lang="scss" scoped>
	.cell_b {
		border-right: 1px solid #cccccc;
		border-bottom: 1px solid #cccccc;
	}

	.key-container {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.keyboard {
		flex: 1;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-top: 1px solid #cccccc;
		background: #f6f6f7;
	}

	.keyboard .key-row {
		display: flex;
		display: -webkit-flex;
		position: relative;
		height: 98rpx;
		line-height: 98rpx;
	}

	.keyboard .key-cell {
		flex: 1;
		-webkit-box-flex: 1;
		font-size: 52rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f6f6f7;
	}

	.keyboard .key-confirm {
		position: absolute;
		text-align: center;
		height: 200rpx;
		width: 25%;
		line-height: 200rpx;
		color: #ffffff;
		z-index: 5;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.keyboard .key-confirm2 {
		position: absolute;
		height: 200rpx;
		width: 25%;
		line-height: 200rpx;
		z-index: 9999;
		background: #f6f6f7;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.key-zero-and-point {
		display: flex;
		height: 98rpx;
		justify-content: center;
		align-items: center;
		width: 75%;
		font-size: 52rpx;
		.zero {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 66.66%;
			text-align: center;
			height: 100%;
			font-size: 52rpx;
		}
		.point {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 33.33%;
			text-align: center;
			height: 100%;
			font-size: 52rpx;
		}
	}
	.key-cell:active {
		color: white;
		background: black; //黑色
		opacity: 0.1; //这里重要，就是通过这个透明度来设置
	}
	.a:active,
	.key-confirm2:active {
		color: white;
		background: black; //黑色
		opacity: 0.1; //这里重要，就是通过这个透明度来设置
	}
</style>
