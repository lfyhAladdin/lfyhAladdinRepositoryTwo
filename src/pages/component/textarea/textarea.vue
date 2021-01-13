<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-title uni-common-pl">输入区域高度自适应，不会出现滚动条</view>
		<view class="uni-textarea">
			<textarea @blur="bindTextAreaBlur" auto-height :show-count="false"/>
		</view>
		<view class="uni-title uni-common-pl">占位符字体是红色的textarea</view>
		<view class="uni-textarea">
			<textarea placeholder-style="color:#F76260" placeholder="占位符字体是红色的" :show-count="false"/>
		</view>
	</view>
</template>
<script>
/*
输入框长按会出现 粘贴和全选的按钮 但点击粘贴和全选不生效(禅道bug-4631), 是由于 my.getClipboard和my.setClipboard 需要企业支付宝账号才有权限调用. 
官方的textarea组件示例: 
                      https://opendocs.alipay.com/mini/component/textarea
剪切板的文档说明: 
              clipboard: https://opendocs.alipay.com/mini/api/clipboard
              setClipboard: https://opendocs.alipay.com/mini/api/klbkbp
*/
	export default {
		data() {
			return {
				title: 'textarea',
				focus: false
			}
		},
		methods: {
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			}
		}
	}
</script>

<style scoped>
/* #ifdef MP-ALIPAY */
.uni-textarea textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
/* #endif */
</style>
