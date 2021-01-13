<!--
 * @Author: Aleyn He
 * @Date: 2020-07-03 15:48:59
 * @LastEditors: Aleyn He
 * @LastEditTime: 2020-07-14 16:23:10
 * @Description: 多语言演示页面
  1.底部tabbar，用yu.setTabBarItem的api动态设置文字；
  2.顶部的title，用yu.setNavigationBarTitle动态设置文字
  （如果每个页面都需要设置，可以使用 Vue.mixin）
--> 
<template>
  <view class="login">
    <view class="login-title">
      <view>{{ login.welcome }}</view>
    </view>
    <view class="login-content">
      <yu-input
        :placeholder="login.username"
        type="number"
        v-model="username"
        pre-icon="phone"
        confirmType="go"
      ></yu-input>
      <yu-input
        :placeholder="login.password"
        type="number"
        v-model="password"
        pre-icon="key"
        confirmType="go"
      ></yu-input>
      <button class="custom-btn" @tap="bindLogin" :btn-text="login.logIn">{{ login.logIn }}</button>
      <!--  #ifdef APP-FOX -->
      <button class="custom-btn" @tap="chooseImage" :btn-text="login.album">{{ login.album }}</button>
      <!--  #endif -->
    </view>
    <view class="login-content">
      <text class="switch-btn" @tap="switchFn('zh-CN')">简体</text>
      <text class="switch-btn" @tap="switchFn('zh-TW')">繁体</text>
      <text class="switch-btn" @tap="switchFn('en')">English</text>
    </view>
  </view>
</template>
<script>
import YuInput from "@/components/yu-input/index.vue";
import { setLanguage } from "@/locale";

export default {
  components: {
    YuInput
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    login() {
      // 取login下面的值
      return this.$t("login");
    }
  },
  methods: {
    bindLogin() {
      yu.switchTab({
        url: "/pages/tabBar/component/component"
      });
    },
    switchFn(locale) {
      setLanguage(locale, () => {
        yu.setNavigationBarTitle({
          title: this.login.title
        });
      });
    },
    chooseImage() {
      yu.chooseImage({
        success: function(res) {
          console.log(JSON.stringify(res.tempFilePaths));
        }
      });
    }
  },
  beforeMount() {
    // 时机不太对，应该可以考虑在页面路由跳转至去设置它
    // 标题title可以通过minxins来统一处理，此处仅演示多语言就没有去使用mixins
    yu.setNavigationBarTitle({
      title: this.$t("login").title
    });
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/entry.scss";

.switch-btn {
  width: 300rpx;
  margin: 40rpx;
}
.custom-btn {
  width: 600rpx;
  margin: 40rpx;
  background-color: transparent;
}
.login {
  width: 100%;
  padding: 136rpx 0;
  height: 100%;
  .login-title {
    text-align: center;
    view {
      @extend .font-24;
    }
    text {
      @extend .font-14;
      color: $text-grey-color;
    }
  }
  .yu-input {
    border-bottom: 1px solid $border-color;
  }
  .login-content {
    margin-top: 180rpx;
    padding: 0 60rpx;
  }
  .avator-info {
    text-align: center;
    .avator-text {
      @extend .font-21;
      color: $text-color;
      margin-top: 30rpx;
      font-weight: normal;
    }
  }
  //头像
  .avator {
    width: 168rpx;
    height: 168rpx;
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
    vertical-align: middle;
    background-color: $white-color;
    /deep/ .yu-image {
      height: 168rpx;
    }
    /deep/ .yu-image uni-image {
      height: 168rpx;
    }
  }
  .custom-btn {
    width: 580rpx;
    margin: 0 auto;
    margin-top: 40rpx;
  }
}
</style>