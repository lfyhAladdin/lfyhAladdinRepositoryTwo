<template>
	<view class="page">
		<uni-section title="基本用法" type="line"></uni-section>
		<view class="example-body">
			<yu-input placeholder="请输入"/>
		</view>
		<uni-section title="禁用状态" type="line"></uni-section>
		<view class="example-body">
			<yu-input placeholder="手机号" type="number" v-model="phone" :disabled="true"></yu-input>
		</view>
	</view>
</template>
<script>
  import yuInput from '@/components/yu-input/index.vue';
  import uniSection from '@/components/uni-section/uni-section.vue';
	export default {
		components: { yuInput, uniSection },
		data() {
			return {
				phone: 18633336666
			}
		},
		methods: {}
	}
</script>
<style>
	.example {
		padding: 0 15px;
	}

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
</style>