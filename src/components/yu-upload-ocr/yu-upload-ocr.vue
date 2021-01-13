<template>
  <view class="inputBox imageBox">
    <view class="inputBoxLeft">{{title}}</view>
    <view class="inputBoxRight" @click="chooseImage">
      <view class="defaultImage" v-if="!ocrImageUrl">上传图片</view>
      <yu-image class="headImage" v-if="ocrImageUrl" :src="ocrImageUrl"></yu-image>
    </view>
  </view>
</template>

<script>
  import yuImage from '@/components/yu-image/index.vue';
  export default {
    components: { yuImage },
    name: 'yu-upload-ocr',
    props: {
      uploadUrl: {
        default: ''
      },
      deleteUrl: {
        default: ''
      },
      title: {
        default: ''
      },
      ocrType: { // '0': '通用文字识别', '1': '身份证识别', '2': '身份证正面识别', '3': '身份证背面识别', '4': '银行卡识别', '5': '网络图片识别', '6': '驾驶证证识别', '7': '行驶证识别', '8': '车牌识别', '9': '营业执照识别', '10': '票据识别', '11': 'iOCR识别'
        type: String,
        default: '0'
      },
      uploadType: {
        default: 'shopologo'
      }
    },
    data() {
      return {
        ocrImageUrl: this.deleteUrl,
        payload: {} // 识别结果
      };
    },
    computed: {},
    watch: {
      deleteUrl: function() {
        this.ocrImageUrl = this.deleteUrl;
      }
    },
    mounted() {},
    methods: {
      chooseImage() {
        // #ifdef APP-FOX
        foxsdk.ocr.startOCR(this.ocrType, ret => {
          console.log('ocr/startOCR===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
          if (ret.status == 0) {
            this.payload = ret.payload;
            this.createTask(ret.payload.imagePath);
            yu.showLoading({
              title: '上传中'
            });
          } else {
            yu.showToast({
              icon: 'none',
              title: ret.message,
              duration: 3000
            });
          }
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
					content: '此功能目前仅限于APP端使用！',
					showCancel: false
				});
        // #endif
      },

      // 创建上传任务
      createTask(imagePath) {
        let _this = this;
        let task = foxsdk.uploader.createUpload(this.uploadUrl, {filename: imagePath}, task => {
          let UploadState = foxsdk.uploader.UploadState;
          if (task.state == UploadState.Finished) {
            console.log('##上传任务成功完成回调##\n');
            console.log(task.responseText.data);
            if (task.responseText && task.responseText.state) {
              _this.success(task.responseText.data, imagePath);
            } else {
              yu.showToast({
                icon: 'none',
                title: '上传失败请稍后再试',
                duration: 2000
              });
              yu.hideLoading();
            }
          } else {
            yu.showToast({
              icon: 'none',
              title: '上传任务失败请稍后再试',
              duration: 2000
            });
          }
        });
        task.addData('text', _this.$backend.ebankUploadText + _this.uploadType, retObj => {
          console.log('##添加上传数据回调##\n' + JSON.stringify(retObj));
        });
        // 添加上传文件
        task.addFile(imagePath, {}, retObj => {
          console.log('##添加上传文件回调##\n' + JSON.stringify(retObj));
          if (retObj.status != 0) {
            yu.hideLoading();
            yu.showToast({
              icon: 'none',
              title: ret.message,
              duration: 3000
            });
          }
        });
        setTimeout(function() {
          task.start();
        }, 100);
      },

      // 上传成功回调
      success(data, imgName) {
        console.log('返回数据======', data);
        this.$emit('onChange', data[0].picPath, this.payload);
        this.imageToBase64(imgName);
      },

      imageToBase64(url) {
        foxsdk.logger.level.debug = false;
        foxsdk.gallery.imageBase64(url, ret => {
          yu.hideLoading();
          if (ret.status == 0) {
            this.ocrImageUrl = 'data:image/png;base64,' + ret.payload.imageBase64;
          } else {
            yu.showToast({
              icon: 'none',
              title: ret.message,
              duration: 3000
            });
          } 
          foxsdk.logger.level.debug = true;
        });
      }
    },
  };
</script>
<style lang="scss" scoped>
  $fontColor97: #979797;
  $fontColor19: #191919;
  $redColor: #e52b22;
  $fontColor59: #595959;
  .inputBox {
    padding: 0 24rpx;
    box-sizing: border-box;
    margin-bottom: 28rpx;
    &:after {
      content: '';
      width: 0;
      height: 0;
      display: block;
      clear: both;
    }
  }
  .inputBoxLeft {
    float: left;
    width: 180rpx;
    height: 180rpx;
    line-height: 180rpx;
    font-size: 26rpx;
    color: $fontColor59;
    overflow: hidden;
  }
  .imageBox.inputBox {
    & .inputBoxRight {
      height: 180rpx;
      width: 250rpx;
      line-height: 180rpx;
      padding: 0;
      float: right;
      border: none;
      // border: 1px solid #D6D6D6;
      overflow: hidden;
      & .defaultImage {
        position: relative;
        height: 176rpx;
        width: 246rpx;
        line-height: 250rpx;
        font-size: 22rpx;
        border: 2rpx solid #d6d6d6;
        color: $fontColor97;
        overflow: hidden;
        text-align: center;
        border-radius: 5rpx;
				box-sizing: border-box;
        &:after {
          content: '';
          width: 44rpx;
          height: 3rpx;
          background: $fontColor97;
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        &:before {
          content: '';
          width: 3rpx;
          height: 44rpx;
          background: $fontColor97;
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      & .headImage {
        height: 180rpx;
        width: 250rpx;
        border-radius: 5rpx;
      }
    }
  }
</style>
