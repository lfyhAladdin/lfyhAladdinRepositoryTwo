<template>
	<view class="uni-padding-wrap">
		<page-head :title="title"></page-head>
		<button class="button" @click="setTabBarBadge">{{ !hasSetTabBarBadge ? '设置tab徽标' : '移除tab徽标' }}</button>
		<button class="button" @click="showTabBarRedDot">{{ !hasShownTabBarRedDot ?  '显示红点' : '移除红点'}}</button>
		<button class="button" @click="customStyle">{{ !hasCustomedStyle ? '自定义Tab样式' : '移除自定义样式'}}</button>
		<button class="button" @click="customItem">{{ !hasCustomedItem ? '自定义Tab信息' : '移除自定义信息' }}</button>
		<button class="button" @click="hideTabBar">{{ !hasHiddenTabBar ? '隐藏TabBar' : '显示TabBar' }}</button>
		<view class="btn-area">
			<button class="button" type="primary" @click="navigateBack">返回上一级</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'tababr',
				hasSetTabBarBadge: false,
				hasShownTabBarRedDot: false,
				hasCustomedStyle: false,
				hasCustomedItem: false,
				hasHiddenTabBar: false
			}
    },
    watch: {
      title: (val) => {
        console.log(val);
      }
    },
    created () {
      console.log(this.title)
    },
		destroyed() {
			if (this.hasSetTabBarBadge) {
				yu.removeTabBarBadge({
					index: 1
				})
			}
			if (this.hasShownTabBarRedDot) {
				yu.hideTabBarRedDot({
					index: 1
				})
			}
			if (this.hasHiddenTabBar) {
				yu.showTabBar()
			}
			if (this.hasCustomedStyle) {
				yu.setTabBarStyle({
					color: '#7A7E83',
					selectedColor: '#007AFF',
					backgroundColor: '#F8F8F8',
					borderStyle: 'black'
				})
			}

			if (this.hasCustomedItem) {
				let tabBarOptions = {
					index: 1,
					text: '接口',
					iconPath: '/static/images/api.png',
					selectedIconPath: '/static/images/apiHL.png'
				}
				yu.setTabBarItem(tabBarOptions)
			}
		},
		methods: {
			navigateBack() {
				this.$emit('unmount')
			},
			setTabBarBadge() {
				if(this.hasShownTabBarRedDot){
					yu.hideTabBarRedDot({
						index: 1
					})
					this.hasShownTabBarRedDot = !this.hasShownTabBarRedDot
				}
				if (!this.hasSetTabBarBadge) {
					yu.setTabBarBadge({
						index: 1,
						text: '1'
					})
				} else {
					yu.removeTabBarBadge({
						index: 1
					})
				}
				this.hasSetTabBarBadge = !this.hasSetTabBarBadge
			},
			showTabBarRedDot() {
				if(this.hasSetTabBarBadge) {
					yu.removeTabBarBadge({
						index: 1
					})
					this.hasSetTabBarBadge = !this.hasSetTabBarBadge
				}
				if (!this.hasShownTabBarRedDot) {
					yu.showTabBarRedDot({
						index: 1
					})
				} else {
					yu.hideTabBarRedDot({
						index: 1
					})
				}
				this.hasShownTabBarRedDot = !this.hasShownTabBarRedDot
			},
			hideTabBar() {
				if (!this.hasHiddenTabBar) {
					yu.hideTabBar()
				} else {
					yu.showTabBar()
				}
				this.hasHiddenTabBar = !this.hasHiddenTabBar
			},
			customStyle() {
				if (this.hasCustomedStyle) {
					yu.setTabBarStyle({
						color: '#7A7E83',
						selectedColor: '#007AFF',
						backgroundColor: '#F8F8F8',
						borderStyle: 'black'
					})
				} else {
					yu.setTabBarStyle({
						color: '#FFF',
						selectedColor: '#007AFF',
						backgroundColor: '#000000',
						borderStyle: 'black'
					})
				}
				this.hasCustomedStyle = !this.hasCustomedStyle
			},
			customItem() {
				let tabBarOptions = {
					index: 1,
					text: '接口',
					iconPath: '/static/images/api.png',
					selectedIconPath: '/static/images/apiHL.png'
				}
				if (this.hasCustomedItem) {
					yu.setTabBarItem(tabBarOptions)
				} else {
					tabBarOptions.text = 'API'
					yu.setTabBarItem(tabBarOptions)
				}
				this.hasCustomedItem = !this.hasCustomedItem
			}
		}
	}
</script>

<style>
	.button {
		margin-top: 30rpx;
        margin-left: 0;
        margin-right: 0;
	}

	.btn-area {
		padding-top: 30rpx;
	}
</style>
