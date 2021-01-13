<template>
  <view class="yu-image">
    <image class="image" :class="imageClassName" :src="imgUrl" :mode="mode" @error="errorFn" @load="loadFn" @tap="go2Fun"  :style="{borderRadius:borderRadius}"/>
  </view>
</template>
<script>
import { appEnv } from '@/config/app.config';
export default {
  name: 'yu-image',
  data() {
    return {
      mock: false
    };
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    needPre: {
      type: Boolean,
      default: false
    },
    borderRadius:{
      type:String,
      default:'8rpx'
    },
    imageData: {},
    mode: {
      type: String,
      default: 'widthFix'
    },
    'lazy-load': {
      type: Boolean,
      default: false
    },
    'fade-show': {
      type: Boolean,
      default: true
    },
    imageClassName: ''
  },
  computed: {
    imgUrl() {
      if (this.mock) {
        return this.src;
      }
      if (this.needPre) {
        return appEnv.assetsUrl + this.src;
      }
      return this.src;
    }
  },
  created() {},
  methods: {
    // 跳转 ，目前只做内链
    go2Fun() {
      if (this.imageData && this.imageData.jumpUrl&&this.imageData.jumpUrl!='null') {
        uni.navigateTo({
          url: this.imageData.jumpUrl
        });
      }
    },
    errorFn(e) {
      this.$emit('error', e);
    },
    loadFn(e) {
      this.$emit('load', e);
    }
  }
};
</script>
<style lang="scss" scoped>
.yu-image {
  line-height: 0;
  .image {
    width: 100%;
  }
}
</style>