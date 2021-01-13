<template>
  <view>
    <page-head :title="title"></page-head>
		<view v-if="hasLogin" class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">用户信息: </view>
			<view class="uni-helllo-text">
				<view>账号：{{ userInfo.account }}</view>
				<view>电话：{{ userInfo.phone }}</view>
				<view>用户id：{{ userInfo.userId }}</view>
				<view>所属支行：{{ userInfo.bankname }}</view>
				<view>角色：{{ userInfo.rolename }}</view>
			</view>
      <button type="warn" @click="logout">退出登录</button>
		</view>
    <view v-else  class="uni-padding-wrap uni-common-mt">
      <view class="tip-text">暂未登录</view>
      <button type="primary" @click="toLogin">去登录</button>
    </view>
  </view>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: '用户信息'
    };
  },
  
	computed: {
    ...mapGetters(['hasLogin', 'userInfo']),
  },

  created() {
    console.log(this.hasLogin);
    console.log(this.userInfo);
    // this.hasLogin = true;
  },
  
  methods: {
    logout() {
      console.log('logout')
      this.$store.commit('oauth/logout');
    },

    toLogin() {
      yu.navigateTo({ url: '/pages/template/login/login' });
    }
  },
};
</script>

<style>
uni-button {
  margin-top: 30rpx;
}
.tip-text {
  margin-top: 40rpx;
  text-align: center;
}
</style>