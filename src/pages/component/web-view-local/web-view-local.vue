<template>
	<view>
		<web-view src="/hybrid/html/local.html" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		methods: {
			getMessage(e) {
				yu.showModal({
					content: JSON.stringify(e.detail),
					showCancel: false
				})
			}
		}
	}
</script>

<style>

</style>
