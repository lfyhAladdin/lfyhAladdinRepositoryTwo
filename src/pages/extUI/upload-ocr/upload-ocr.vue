<template>
  <view class="page">
    <uni-section title="通用文字识别" type="line"></uni-section>
    <view class="example-body">
      <yu-upload-ocr title="通用文字识别" ocrType="0" :uploadUrl="uploadUrl"  @onChange="textImgageChange" :deleteUrl="resultImage"></yu-upload-ocr>
    </view>
    <uni-section title="身份证识别" type="line"></uni-section>
    <view class="example-body">
      <yu-upload-ocr title="身份证识别" ocrType="1" :uploadUrl="uploadUrl"  @onChange="idCardImgageChange" :deleteUrl="resultImage"></yu-upload-ocr>
    </view>
    <uni-section title="银行卡识别" type="line"></uni-section>
    <view class="example-body">
      <yu-upload-ocr title="银行卡识别" ocrType="4" :uploadUrl="uploadUrl" @onChange="bankImgageChange" :deleteUrl="resultImage"></yu-upload-ocr>
    </view>
    <uni-section title="网络图片识别" type="line"></uni-section>
    <view class="example-body">
      <yu-upload-ocr title="网络图片识别" ocrType="5" :uploadUrl="uploadUrl" @onChange="netImgageChange" :deleteUrl="resultImage"></yu-upload-ocr>
    </view>
  </view>
</template>
<script>
  import uniSection from '@/components/uni-section/uni-section.vue';
  import yuUploadOcr from '@/components/yu-upload-ocr/yu-upload-ocr.vue';
  export default {
    components: { uniSection, yuUploadOcr },
    data() {
      return {
        uploadUrl: this.$backend.ebankServiceYxImage + '/public/upload/uploadImgNew',
        // uploadUrl: 'http://172.16.20.185:9102/mock-example/file/upload',
        resultImage: '',  
      };
    },

    created() {},

    methods: {
      textImgageChange(picPath, payload) {
        console.log(picPath);
        console.log(payload);
      },

      idCardImgageChange(picPath, payload) {
        console.log(picPath);
        console.log(payload);
      },

      bankImgageChange(picPath, payload) {
        console.log(picPath);
        console.log(payload);
      },

      netImgageChange(picPath, payload) {
        console.log(picPath);
        console.log(payload);
      },
    }
  };
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