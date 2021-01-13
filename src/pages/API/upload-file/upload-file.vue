<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="demo">
        <block v-if="imageSrc">
          <image :src="imageSrc" class="image" mode="widthFix"></image>
        </block>
        <block v-else>
          <view class="uni-hello-addfile" @click="chooseImage">+ 选择图片</view>
        </block>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: 'uploadFile',
        imageSrc: '',
        uploadUrl: this.$backend.ebankServiceYxImage + '/public/upload/uploadImgNew',
      };
    },
    onUnload() {
      this.imageSrc = '';
    },
    methods: {
      // 选择图片
      chooseImage: function() {
        // #ifdef APP-FOX
        var _this = this;
        yu.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album'],
          success: res => {
            var imageSrc = res.tempFilePaths[0];
            console.log(res);
            yu.showLoading({ title: '上传中' });
            this.createTask(imageSrc);
            // let url = 'http://inflex.oicp.net/mock-example/file/upload';
            // let options = { filename: imageSrc };
            // // 创建上传任务
            // let task = foxsdk.uploader.createUpload(url, options, task => {
            //   let UploadState = foxsdk.uploader.UploadState;
            //   console.log(task);
            //   console.log(UploadState);
            //   if (task.state == UploadState.Finished) {
            //     console.log('##上传任务成功完成回调##\n' + JSON.stringify(task));
            //   } else {
            //     console.log('##上传任务失败完成回调##\n' + JSON.stringify(task));
            //   }
            // });
          },
          fail: err => {
            console.log('chooseImage fail', err);
            // #ifdef MP
            yu.getSetting({
              success: res => {
                let authStatus = res.authSetting['scope.album'];
                if (!authStatus) {
                  yu.showModal({
                    title: '授权失败',
                    content:
                      'Hello yu-app需要从您的相册获取图片，请在设置界面打开相关权限',
                    success: res => {
                      if (res.confirm) {
                        yu.openSetting();
                      }
                    }
                  });
                }
              }
            });
            // #endif
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
        this.imageToBase64(imgName);
      },

      imageToBase64(url) {
        foxsdk.logger.level.debug = false;
        foxsdk.gallery.imageBase64(url, ret => {
          yu.hideLoading();
          if (ret.status == 0) {
            this.imageSrc = 'data:image/png;base64,' + ret.payload.imageBase64;
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
    }
  };
</script>

<style>
  .image {
    width: 100%;
  }

  .demo {
    background: #fff;
    padding: 50rpx;
  }
</style>
