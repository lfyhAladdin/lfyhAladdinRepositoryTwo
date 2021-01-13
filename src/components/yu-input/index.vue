<!--业务组件：输入框
/**
* 组件名称 输入框封装，带前后图标设定及输入框后插槽设计
* @module @/components/yu-input/index.vue
* @desc 带清除，前置图标 或后置图标的输入框
* @author luyq1
* @date  2019.12.04
* 
*/
-->
<template>
  <view :class="{
    'yu-input': true,
    'has-pre': preIcon,
    'has-rear': rearIcon || displayable_,
    'has-clear': clearable_
    }">
    <!--前置图标-->
    <!--#ifndef MP-ALIPAY-->
    <yu-svg-icon v-if="preIcon" class="pre-icon" :type="preIcon"/>
    <!--#endif-->
    <!--内容-->
    <input class="input" :type="showPassword ? 'text' : type" :placeholder="placeholder" :focus="isFocus" :password="type==='password'&&!showPassword" :value="value" :disabled="disabled" @focus="onFocus" @blur.stop="onBlur" @input="onInput" @confirm="onConfirm" :confirm-type="confirmType" :maxlength="maxlength">
    <!--后置图标-->
    <!--密码可见图标-->
    <!--#ifndef MP-ALIPAY-->
    <yu-svg-icon v-if="displayable_" class="rear-icon pwd" :type="eye" @on-tap="display" />
    <!--自定义后置图标-->
    <yu-svg-icon v-else-if="rearIcon" class="rear-icon" :type="rearIcon" @on-tap="rearClick" />
    <!-- 清空图标 -->
    <yu-svg-icon v-if="clearable_ && isFocus && value.length" class="clear-icon" type="delete1-x" @on-tap="clearValue('value')" />
    <!--#endif-->
    <view class="define-slot">
      <slot></slot>
    </view>
  </view>

</template>
<script>
import YuSvgIcon from "@/components/yu-svg-icon";
import iosrepair from '@/utils/mixins/iosrepair.js'
export default {
  mixins: [iosrepair],
  name: 'yu-input',
  components: {
    YuSvgIcon
  },
  props: {
    //前置图标
    preIcon: String,
    //后置图标
    rearIcon: String,
    //输入类型
    type: String,
    //值
    value: [String, Number],
    //占位字符
    placeholder: String,
    maxlength: Number,
    disabled: {
      type: Boolean,
      default: false
    },
    //键盘文字
    confirmType: {
      type: String,
      default: 'done'
    },
    //是否显示清除按钮
    clearable: {
      type: [Boolean, String],
      default: false
    },
    //是否显示密码可见按钮
    displayable: {
      type: [Boolean, String],
      default: false
    },
    //自动获取焦点
    focus: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      //显示密码明文
      showPassword: false,
      //是否获取焦点
      isFocus: false,
      inputVal: '',
      eye: 'eye-closed-x'
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  computed: {
    // inputType () {
    //   const type = this.type;
    //   return type === "password" ? "password" : type;
    // },
    clearable_ () {
      return String(this.clearable) !== "false";
    },
    displayable_ () {
      return String(this.displayable) !== "false";
    },
    focus_ () {
      this.isFocus = this.focus;
      return String(this.focus) !== "false";
    }
  },
  methods: {
    clearValue (e) {
      let _this = this;
      this.$emit("input", '');
      setTimeout(function () {
        _this.onFocus();
      }, 500);
    },
    display () {
      this.showPassword = !this.showPassword;
      this.eye = this.showPassword ? 'eye-x' : 'eye-closed-x';
    },
    onFocus () {
      this.isFocus = true;
      this.$emit('focus');
    },
    onConfirm () {
      this.$emit('confirm');
    },
    onBlur (e) {
      this.temporaryRepair();
      let _this = this;
      setTimeout(function () {
        _this.isFocus = false;
      }, 50);
      yu.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.$emit('blur');
    },
    onInput (e) {
      //解决IOS光标错位问题
      if (e.target.value.length == 0) {
        let _this = this;
        setTimeout(function () {
          _this.$emit("input", '');
          // _this.focus();
        }, 50);
      } else {
        this.$emit("input", e.target.value);
      }
    },
    rearClick () {
      this.$emit('on-rear');
    }
  }
}
</script>
<style lang="scss">
@import "@styles/base.scss";
.yu-input {
  position: relative;
  height: 80rpx;
  border-bottom: 1rpx solid #dddddd;
  &.has-clear {
    padding-right: 48rpx;
  }

  .input {
    display: block;
    height: calc(100% - 1rpx);
    line-height: 100%;
    padding: 0;
    position: relative;
    background-color: transparent;
  }
  //前置和后置图标样式
  .pre-icon,
  .rear-icon,
  .clear-icon {
    position: absolute;
    top: 18rpx;
		font-size: 40rpx;
		z-index: 99;
    color: $text-grey-color;
  }
  .pre-icon {
    left: 0;
  }
  //后置图标和清空图标位置
  .rear-icon,
  .clear-icon {
    right: 0;
  }
  &.has-pre {
    padding-left: 54rpx;
  }
  &.has-rear {
    padding-right: 54rpx;
    .clear-icon {
      right: 54rpx;
    }
  }
  .input {
    @extend .font-16;
  }
  //清空图标
  &.has-clear.has-rear {
    padding-right: 108rpx; //128rpx;
  }
  .clear-icon {
    right: 0;
    padding: 3rpx;
    z-index: 30; 
  }
  .rear-icon.pwd {
    color: $text-color;
  }
  //自定义插槽样式
  .define-slot {
    position: absolute;
    right: 2rpx;
    top: 0;
  }
}
</style>