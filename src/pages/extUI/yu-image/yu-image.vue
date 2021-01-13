<template>
  <view class="page">
    <uni-section title="yu-image 图片" type="line"></uni-section>
    <view class="example-body">
      <yu-image :src="imgUrl"></yu-image>
    </view>
  </view>
</template>
<script>
  import uniSection from '@/components/uni-section/uni-section.vue';
  import yuImage from '@/components/yu-image/index.vue';
  export default {
    components: { uniSection, yuImage },
    data() {
      return {
        imgUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',  
      };
    },
    methods: {}
  };
</script>
<style>
  .example-body {
    flex-direction: column;
    padding: 15px;
    background-color: #ffffff;
  }
</style>