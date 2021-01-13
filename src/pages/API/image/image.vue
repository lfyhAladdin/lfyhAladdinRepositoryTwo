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

        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            <view class="uni-label">数量限制</view>
          </view>
          <view class="uni-list-cell-right">
            <picker :range="count" @change="countChange" mode="selector">
              <view class="uni-input">{{count[countIndex]}}</view>
            </picker>
          </view>
        </view>
      </view>

      <view class="uni-list list-pd">
        <view class="uni-list-cell cell-pd">
          <view class="uni-uploader">
            <view class="uni-uploader-head">
              <view class="uni-uploader-title">点击可预览选好的图片</view>
              <view class="uni-uploader-info">{{imageList.length}}/9</view>
            </view>
            <view class="uni-uploader-body">
              <view class="uni-uploader__files">
                <block v-for="(image, index) in imageList" :key="index">
                  <view class="uni-uploader__file">
                    <image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage(index)"></image>
                  </view>
                </block>
                <view class="uni-uploader__input-box">
                  <view class="uni-uploader__input" @tap="chooseImage"></view>
                </view>
              </view>
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
        title: '选择图片并预览',
        imageList: [],
        imageListAbsolute: [], // 平台绝对路径
        sourceTypeIndex: 2,
        sourceType: ['拍照', '相册', '拍照或相册'],
        sizeTypeIndex: 2,
        sizeType: ['压缩', '原图', '压缩或原图'],
        countIndex: 8,
        count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      };
    },
    onUnload() {
			this.imageList = [];
			this.imageListAbsolute = [];
			this.sourceTypeIndex = 2;
			this.sourceType = ['拍照', '相册', '拍照或相册'];
			this.sizeTypeIndex = 2;
			this.sizeType = ['压缩', '原图', '压缩或原图'];
			this.countIndex = 8;
    },
    methods: {
      sourceTypeChange: function(e) {
        this.sourceTypeIndex = parseInt(e.detail.value);
      },
      sizeTypeChange: function(e) {
        this.sizeTypeIndex = parseInt(e.detail.value);
      },
      countChange: function(e) {
        this.countIndex = e.detail.value;
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

        if (this.imageList.length === 9) {
          let isContinue = await this.isFullImg();
            console.log('是否继续?', isContinue);
          if (!isContinue) {
            return;
          }
        }
        yu.chooseImage({
          sourceType: sourceType[this.sourceTypeIndex],
          sizeType: sizeType[this.sizeTypeIndex],
          count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
          success: res => {
            // #ifdef APP-FOX
            console.log(res)
            let filePaths = [];
            if (this.sizeTypeIndex === 0) { // 压缩
              filePaths = res.tempFiles;
            } else {
              filePaths = res.tempFilePaths;
            }
            console.log(filePaths)
            yu.showLoading({ title: '正在转base64...' });
            var pathArr = [];
            foxsdk.logger.level.debug = false // 取消桥接层打印，base64图片过大
            filePaths.forEach((item, index) => {
              const path = this.sizeTypeIndex === 0 ? item.compressPath : item;
              pathArr.push(path);
              foxsdk.gallery.imageBase64(path, ret => {
                console.log(ret)
                this.imageList.push('data:image/png;base64,' + (ret.payload.imageBase64 || ''));
                if (index === res.tempFilePaths.length - 1) {
                  setTimeout(function() {
                    yu.hideLoading();
                  }, 600);
                } 
              });
            });
            this.imageListAbsolute = this.imageListAbsolute.concat(pathArr);
            // #endif
            // #ifndef APP-FOX
            this.imageList = this.imageList.concat(res.tempFilePaths);
            // #endif
          },
          fail: err => {
            // #ifdef APP-FOX
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
                  // yu.showModal({
                  //   title: '授权失败',
                  //   content: 'Hello yu-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
                  //   success: res => {
                  //     if (res.confirm) {
                  //       yu.openSetting();
                  //     }
                  //   }
                  // });
                }
              }
            });
            // #endif
          }
        });
      },
      isFullImg: function() {
        return new Promise(res => {
          yu.showModal({
            content: '已经有9张图片了,是否清空现有图片？',
            success: e => {
              if (e.confirm) {
                this.imageList = [];
                this.imageListAbsolute = [];
                res(true);
              } else {
                res(false);
              }
            },
            fail: () => {
              res(false);
            }
          });
        });
      },
      // imageToBase64(url) {
      //   foxsdk.logger.level.debug = false;
      //   foxsdk.gallery.imageBase64(url, ret => {
      //     yu.hideLoading();
      //     if (ret.status == 0) {
      //       this.ocrImageUrl = 'data:image/png;base64,' + ret.payload.imageBase64;
      //     } else {
      //       yu.showToast({
      //         icon: 'none',
      //         title: ret.message,
      //         duration: 3000
      //       });
      //     } 
      //     foxsdk.logger.level.debug = true;
      //   });
      // },
      previewImage: function(index) {
        console.log('previewImage/index---' + index);
        // #ifdef APP-FOX
        const images = this.imageListAbsolute;
        console.log(images)
        foxsdk.gallery.previewImage({'current': index + 1 + '', 'urls': images, 'indicator': 'default'}, ret => { // current 从1开始, 且为字符串类型
          console.log('gallery/previewImage===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.previewImage({
          current: index,
          urls: this.imageList
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

  .list-pd {
    margin-top: 50rpx;
  }
</style>
