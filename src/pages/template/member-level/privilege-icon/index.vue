<template>
  <view :class="{
        'yu-privilege-icon':true,
        'default': iconType === 'default',
        'gold': iconType === 'gold',
        'silver': iconType === 'silver',
        'blackgold': iconType === 'blackgold',
        'active': isActive
        }" @tap.stop="onClick">
    <view class="yu-privilege-icon__icon">
			<!-- #ifndef MP-->
      <yu-svg-icon v-if="!iconText" :type="icon"></yu-svg-icon>
			<!-- #endif -->
      <text v-if="iconText" class="text icon-text">{{iconText}}<span>%</span></text>
      <view :class="{'yu-privilege-icon__explain':true,'grey': iconText}">{{subTitle}}</view>
      <!--渐变-->
      <view class="gradient"></view>
    </view>
    <text class="text" v-if="title">{{title}}</text>
  </view>
</template>
<script>
  export default {
    name: 'privilege-icon',
    props: {
      title: String,
      icon: String,
      iconText: String,
      //图标下方文字
      subTitle: String,
      //图标类型：default:会员中心 gold:黄金特权；silver:白银和钻石特权，blackgold：黑镜特权
      iconType: {
        type: String,
        default: 'default'
      },
      //是否激活特权
      isActive: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    methods: {
      //点击
      onClick() {
        this.$emit('on-tap');
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '@styles/base.scss';
  $white-color: #fff;
  $text-grey-color3: #d8d9e2;
  $text-grey-color5: #585A5E;
  $apple-golden2: #f3dac3;
  $apple-golden4: #e8caae;
  $bg-color3: #383838;
  $bg-color4: #b7b7c6;
  $bg-color6: #505059;

  .yu-privilege-icon {
    display: inline-block;
    //默认 白银|钻石
    &.default {
      .yu-privilege-icon__icon {
        .svg-icon,
        .icon-text {
          color: $text-grey-color3;
        }
      }
      text {
        color: $white-color;
      }
    }
    //默认激活颜色
    &.default.active {
      .gradient {
        background: linear-gradient(
          180deg,
          rgba(243, 218, 195, 0.9) 0%,
          rgba(56, 56, 56, 0.9) 100%
        );
      }
    }
    //激活样式
    .gradient {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    //黄金会员
    &.gold {
      .yu-privilege-icon__icon {
        background: $apple-golden4;
      }
      //图标颜色  渐变色图标
      .svg-icon,
      .icon-text {
        color: $white-color;
      }
    }
    &.gold.active {
      .svg-icon,
      .icon-text {
        color: $apple-golden2;
      }
      .gradient {
        background: $bg-color3;
      }
    }

    //钻石会员 |白银会员
    &.silver {
      .yu-privilege-icon__icon {
        background: $bg-color4;
      }
      .svg-icon,
      .icon-text {
        color: $white-color;
      }
    }
    &.silver.active {
      .svg-icon,
      .icon-text {
        color: $apple-golden2;
      }
      .gradient {
        background: $bg-color3;
      }
    }

    //黑金会员未被激活内容
    &.blackgold,
    &.blackgold.active {
      .yu-privilege-icon__icon {
        background: $bg-color3;
      }
      .svg-icon,
      .icon-text {
        color: $apple-golden2;
      }
      .gradient {
        color: $bg-color3;
      }
    }

    //图标
    .yu-privilege-icon__icon {
      position: relative;
      background: $bg-color6;
      width: 96rpx;
      height: 96rpx;
      line-height: 96rpx;
      border-radius: 50%;
      text-align: center;
      margin: 0 auto 12rpx;
      text {
        @extend .font-18;
        color: $apple-golden2;
      }
      span {
        font-size: 24rpx;
      }
    }

    &.active,
    &.blackgold {
      .yu-privilege-icon__explain {
        background: linear-gradient(
          90deg,
          rgba(255, 225, 148, 1) 0%,
          rgba(220, 181, 109, 1) 100%
        );
      }
    }
    .yu-privilege-icon__explain {
      position: absolute;
      left: -12rpx;
      right: -12rpx;
      bottom: -12rpx;
      margin: auto;
      z-index: 40;
      background:$text-grey-color3;
      border-radius: 16rpx;
      color: $text-color;
      @extend .font-10;
    }
    .yu-privilege-icon__explain.grey {
      color: $text-grey-color5;
    }
    .svg-icon {
      position: relative;
      font-size: 48rpx;
      z-index: 30;
    }
    .icon-text {
      position: relative;
      z-index: 30;
    }
    .text {
      @extend .font-12;
    }
  }
</style>