<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-common-mt">
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            <view class="uni-label">图片来源</view>
          </view>
          <view class="uni-list-cell-right">
            <picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex" mode="selector">
              <view class="uni-input">{{sourceType[sourceTypeIndex]}}</view>
            </picker>
          </view>
        </view>
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            <view class="uni-label">图片质量</view>
          </view>
          <view class="uni-list-cell-right">
            <picker :range="sizeType" @change="sizeTypeChange" :value="sizeTypeIndex" mode="selector">
              <view class="uni-input">{{sizeType[sizeTypeIndex]}}</view>
            </picker>
          </view>
        </view>
      </view>
      <view class="btn-box">
        <button type="primary" size="mini" @click="compressImage">压缩</button>
      </view>
      <view class="uni-list list-pd">
        <view class="uni-list-cell cell-pd">
          <view class="uni-uploader">
            <view class="uni-uploader__input-box" v-if="!image">
              <view class="uni-uploader__input" @tap="chooseImage"></view>
            </view>
            <view class="img-box">
              <view class="img-title" v-if="image">原图</view>  
              <image class="img" mode="widthFix" :src="image" :data-src="image"></image>
              <view class="img-title" v-if="compressedImage">压缩后的图片</view>  
              <image class="img" mode="widthFix" :src="compressedImage" :data-src="compressedImage"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import permision from '@/common/permission.js';
  var sourceType = [['camera'], ['album'], ['camera', 'album']];
  var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
  export default {
    data() {
      return {
        title: '图片压缩',
        image: '',
        imageAbsolute: '', // 平台绝对路径
        compressedImage: '',
        sourceTypeIndex: 2,
        sourceType: ['拍照', '相册', '拍照或相册'],
        sizeTypeIndex: 2,
        sizeType: ['压缩', '原图', '压缩或原图']
      };
    },
    onUnload() {
			this.image = '';
			this.imageAbsolute = '';
			this.sourceTypeIndex = 2;
			this.sourceType = ['拍照', '相册', '拍照或相册'];
			this.sizeTypeIndex = 2;
			this.sizeType = ['压缩', '原图', '压缩或原图'];
    },
    methods: {
      sourceTypeChange: function(e) {
        this.sourceTypeIndex = parseInt(e.detail.value);
      },
      sizeTypeChange: function(e) {
        this.sizeTypeIndex = parseInt(e.detail.value);
      },
      compressImage: function() {
        if (!this.imageAbsolute) {
          yu.showModal({
            content: '请先选择要压缩的图片！',
            showCancel: false
          });
          return;
        }
        yu.compressImage({
          src: this.imageAbsolute,
          quality: 20,
          success: res => {
            console.log(res.tempFilePath);
            // #ifdef APP-FOX
            foxsdk.logger.level.debug = false; // 取消桥接层打印，base64图片过大
            foxsdk.gallery.imageBase64(res.tempFilePath, ret => {
              this.compressedImage = 'data:image/png;base64,' + (ret.payload.imageBase64 || '');
              foxsdk.logger.level.debug = true;
            });
            // #endif
            // #ifndef APP-FOX
            this.compressedImage = res.tempFilePath;
            // #endif
          }
        })
      },
      chooseImage: async function() {
        // #ifdef APP-PLUS
        // TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
        if (this.sourceTypeIndex !== 2) {
          let status = await this.checkPermission();
          if (status !== 1) {
            return;
          }
        }
        // #endif
        // #ifdef APP-FOX
        yu.chooseImage({
          sourceType: sourceType[this.sourceTypeIndex],
          sizeType: sizeType[this.sizeTypeIndex],
          count: 1,
          success: res => {
            foxsdk.logger.level.debug = false; // 取消桥接层打印，base64图片过大
            foxsdk.gallery.imageBase64(res.tempFilePaths[0], ret => {
              this.image = 'data:image/png;base64,' + (ret.payload.imageBase64 || '');
              foxsdk.logger.level.debug = true;
            });
            this.imageAbsolute = res.tempFilePaths[0];
          },
          fail: err => {
            // #ifdef APP-PLUS
            if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
              this.checkPermission(err.code);
            }
            // #endif
            // #ifdef MP
            yu.getSetting({
              success: res => {
                let authStatus = false;
                switch (this.sourceTypeIndex) {
                  case 0:
                    authStatus = res.authSetting['scope.camera'];
                    break;
                  case 1:
                    authStatus = res.authSetting['scope.album'];
                    break;
                  case 2:
                    authStatus =
                      res.authSetting['scope.album'] &&
                      res.authSetting['scope.camera'];
                    break;
                  default:
                    break;
                }
                if (!authStatus) {
                  yu.showModal({
                    title: '授权失败',
                    content: 'Hello yu-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
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
      async checkPermission(code) {
        let type = code ? code - 1 : this.sourceTypeIndex;
        let status = permision.isIOS
          ? await permision.requestIOS(sourceType[type][0])
          : await permision.requestAndroid(
              type === 0
                ? 'android.permission.CAMERA'
                : 'android.permission.READ_EXTERNAL_STORAGE'
            );

        if (status === null || status === 1) {
          status = 1;
        } else {
          yu.showModal({
            content: '没有开启权限',
            confirmText: '设置',
            success: function(res) {
              if (res.confirm) {
                permision.gotoAppSetting();
              }
            }
          });
        }
        return status;
      }
    }
  };
</script>

<style>
  .cell-pd {
    padding: 22rpx 30rpx;
  }

  .btn-box {
    padding: 40rpx 0 30rpx;
    text-align: center;
  }

  .uni-uploader-head {
    text-align: center;
  }

  .img-box {
    padding: 20rpx;
  }
  .img-box .img-title {
    text-align: center;
  }
  .img-box .img {
    width: 100%;
    margin-bottom: 20rpx;
  }
</style>
