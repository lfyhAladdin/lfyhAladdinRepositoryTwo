<template>
	<view class="page">
		<uni-section title="yu-upload 上传单张图片" type="line"></uni-section>
		<view class="example-body">
	    <yu-upload uploadType="test" :maxImage="1" :uploadUrl="uploadUrl" :urlList="urlList1" @onChange="imagesChange"></yu-upload>  
		</view>
		<uni-section title="yu-upload 上传多张图片" type="line"></uni-section>
		<view class="example-body">
	    <yu-upload uploadType="test" :maxImage="9" :uploadUrl="uploadUrl" :urlList="urlList2" @onChange="imagesChange"></yu-upload>  
		</view>
	</view>
</template>
<script>
  import uniSection from '@/components/uni-section/uni-section.vue';
  import yuUpload from '@/components/yu-upload/yu-upload.vue';
	export default {
		components: { uniSection, yuUpload },
		data() {
			return {
				phone: 18633336666,
        uploadUrl: this.$backend.ebankServiceYxImage + '/public/upload/uploadImgNew',
        urlList1: [],
        urlList2: [],
			}
    },
		methods: {
      imagesChange(images) {
        console.log(images);
      },
		}
	}
</script>
<style>
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
</style>