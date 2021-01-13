<template>
  <view :class="['inputBox', className] ">
    <view class="headBox">
      <view class="firstTitle">
        <text class="left">{{title}}</text>
        <text class="right sub-title" v-if="subTitle">{{subTitle}}</text>
      </view>
      <view class="secondTitle" v-if="showDetail">
        <text class="left">{{detailText}}</text>
      </view>
    </view>
    <view class="bottomBox">
      <view class="bottomboScroll" :style="{'width': width + 'px'}">
        <view class="imageBox" v-for="(item,index) in imageList" :key="index">
          <yu-image class="image" :src="item"></yu-image>
          <view class="delete" @click="deleteFn(index)"></view>
          <view class="p">第{{index+1}}张</view>
        </view>
        <view ref="defaultImage" v-if="imageList.length < maxImage" class="defaultImage" :class="{'right': imageList.length == 0}" @click="chooseImage">上传图片</view>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script>
  import yuImage from '@/components/yu-image/index.vue';
  export default {
    components: { yuImage },
    name: 'yu-upload',
    props: {
      className: String, // 类名： maint-merchant
      // 上传地址
      uploadUrl: {
        type: String,
        default: '',
        required: true
      },
      urlList: {
        default: []
      },
      title: {
        type: String,
        default: '上传图片'
      },
      subTitle: {
        type: String,
        default: ''
      },
      detailText: {
        type: String,
        default: ''
      },
      showDetail: {
        type: Boolean,
        default: true
      },
      maxImage: {
        // 最大上传数量
        type: Number,
        default: 9
      },
      uploadType: {
        default: ''
      }
      // defaultParam:{
      //   default: {}
      // }
    },
    data() {
      return {
        imageList: this.urlList,
        lastAllCount: 0, // 最后一次选择总数
        lastSucCount: 0, // 最后一次上传成功的张数
        lastSubCount: 0 // 最后一次上传完成的总数
      };
    },
    computed: {
      width: function() {
        let len = this.imageList.length < this.maxImage ? this.imageList.length + 1 : this.imageList.length;
        let width = 130;
        if (document && document.querySelector('.defaultImage')) {
          width = parseInt(
            document.querySelector('.defaultImage').offsetWidth * (1 + 20 / 250)
          );
        }
        return width * len;
      }
    },
    watch: {
      urlList: function() {
        this.imageList = this.urlList;
      }
    },
    methods: {
      // 选中上传
      chooseImage() {
        let _this = this;
        let array = ['拍照', '相册'];
        yu.showActionSheet({
          itemList: array,
          success: function(res) {
            // #ifdef APP-FOX
            if (res.tapIndex === 0) {
              _this.captureImage();
            } else if (res.tapIndex === 1) {
              _this.chooseImages();
            }
            // #endif
            // #ifndef APP-FOX
	          yu.showModal({
	          	content: '此功能目前仅限于APP端使用！',
	          	showCancel: false
	          });
	          // #endif
          }
        });
      },
      // 拍照
      captureImage() {
        var options = {
          format: 'JPG',
          index: '1',
          videoMaximumDuration: ''
        };
        let _this = this;
        // 裁剪图片
        // type  0-相机；1-相册
        foxsdk.gallery.pickSingleImageWithEdit({ type: '0' }, ret => {
          console.log(
            'gallery/pick===status: ' +
              ret.status +
              ',message: ' +
              ret.message +
              ',payload: ' +
              JSON.stringify(ret.payload)
          );
          let path = ret.payload.path || '';
          let name = path.substring(path.lastIndexOf('/') + 1) || 'test.jpg';
          // 压缩处理图片
          _this.compressImage(path, name);
        });
      },
      // 从相册选择图片
      chooseImages: function() {
        let _this = this;
        // #ifdef APP-FOX
        let data = {
          pickType: '2',
          options: {
            filter: 'image',
            maximum: String(_this.maxImage - _this.imageList.length),
            sizeType: '0',
            filename: ''
          }
        };
        foxsdk.gallery.pick(data, ret => {
          if (ret.status == 0) {
            // _this.upoadFn(ret.payload.tempFiles[0].path);
            yu.showLoading({
              title: '加载中'
            });
            var resdata = ret.payload.tempFiles || [];
            console.log('pick data===', resdata);
            _this.lastAllCount = resdata.length;
            resdata.forEach(function(item) {
              // 压缩图片
              _this.compressImage(item.path, item.name);
            });
          } else {
            yu.showToast({
              icon: 'none',
              title: ret.data.message,
              duration: 2000
            });
          }
        });
        // #endif
      },
      //压缩图片
      compressImage(url, fileName) {
        let _this = this;
        // 转换绝路径
        foxsdk.io.convertLocalFileSystemURL('_doc/gallery/', home => {
          foxsdk.io.convertLocalFileSystemURL(
            url,
            url => {
              let options = {
                src: url,
                dst: home + fileName,
                overwrite: true,
                // quality: '6',
                // width: '50%',
                outSize: '100000'
              };
              // 压缩图片
              foxsdk.zip.compressImage(options, ret => {
                if (ret.status == 0) {
                  console.log('压缩图片路径====', ret.payload.target);
                  _this.createTask(ret.payload.target);
                }
              });
            },
            ret => {
              // sdkError
            }
          );
        });
      },
      // 创建上传任务
      createTask(imagePath) {
        let _this = this;
        let options = {
          filename: imagePath
        };
        // 创建上传任务
        let task = foxsdk.uploader.createUpload(this.uploadUrl, options, task => {
          let UploadState = foxsdk.uploader.UploadState;
          if (task.state == UploadState.Finished) {
            console.log('##uploader.createUpload上传成功回调##');
            console.log('task====', task);
            if (task.responseText && task.responseText.state) {
              var imgs = task.responseText.data || [];
              imgs.forEach(item => {
                _this.imageList.push(_this.$backend.ebankServiceYxImage + item.picPath);
              });
              _this.$emit('onChange',  this.imageList);
              _this.lastSucCount++;
            }
            _this.lastSubCount++;
            // 最后一次上传完成提示
            _this.lastToast();
          } else {
            console.log('##上传任务失败完成回调##\n' + JSON.stringify(task));
            _this.lastSubCount++;
            // 最后一次上传完成提示
            _this.lastToast();
          }
        });
        let path = imagePath;
        console.log(_this.$backend.ebankUploadText)
        task.addData(
          'text',
          _this.$backend.ebankUploadText + _this.uploadType,
          retObj => {
            console.log('##添加上传数据回调##\n' + JSON.stringify(retObj));
          }
        );
        // 添加上传文件
        task.addFile(path, {}, retObj => {
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
        }, 1000);
      },
      // 最后一次上传完成提示
      lastToast() {
        let _this = this;
        yu.hideLoading();
        if (this.lastSubCount == this.lastAllCount) {
          yu.showToast({
            icon: 'none',
            title: `本次上传成功：${this.lastSucCount},失败：${this.lastAllCount -
              this.lastSucCount}`,
            duration: 3000
          });
          setTimeout(function() {
            _this.lastSubCount = 0;
            _this.lastAllCount = 0;
            _this.lastSucCount = 0;
          }, 3000);
        }
      },
      // 删除图片
      deleteFn(index) {
        this.imageList.splice(index, 1);
        this.$emit('onChange', this.imageList);
      }
    }
  };
</script>
<style lang="scss" scoped>
  $fontColor97: #979797;
  $fontColor19: #191919;
  $redColor: #e52b22;
  $fontColor59: #595959;
  $borderColor: #d8d8d8;

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
  .headBox {
    & .firstTitle {
      font-size: 26rpx;
      line-height: 30rpx;
      color: $fontColor19;
    }
    .sub-title {
      color: $fontColor97;
      font-size: 24rpx;
      line-height: 30rpx;
    }
    & .secondTitle {
      margin-top: 4rpx;
      & .left {
        color: $fontColor97;
        float: left;
        font-size: 24rpx;
        line-height: 30rpx;
      }
      & .right {
        float: right;
        color: $redColor;
        font-size: 24rpx;
        line-height: 30rpx;
      }
      &:after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        clear: both;
      }
    }
  }
  .bottomBox {
    height: 210rpx;
    min-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    margin-top: 30rpx;
    & .bottomboScroll {
      min-width: 100%;
      margin-top: 20rpx;
      & .imageBox {
        position: relative;
        float: left;
        margin-right: 20rpx;
        width: 250rpx;
        height: 180rpx;

        & .image {
          width: 250rpx;
          height: 180rpx;
          overflow: hidden;
          border-radius: 5rpx;
        }
        & .delete {
          position: absolute;
          right: -10rpx;
          top: -10rpx;
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          background: $redColor;
          &:after {
            content: '';
            width: 18rpx;
            height: 4rpx;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            background: #fff;
            transform: translateX(-50%) translateY(-50%);
          }
        }
      }
      &:after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        clear: both;
      }
    }
  }
  .inputBoxLeft {
    float: left;
    width: 180rpx;
    height: 180rpx;
    line-height: 180rpx;
    font-size: 26rpx;
    color: $fontColor19;
    overflow: hidden;
  }
  .defaultImage {
    position: relative;
    height: 180rpx;
    width: 246rpx;
    line-height: 250rpx;
    font-size: 22rpx;
    border: 2rpx solid #d6d6d6;
    color: #979797;
    overflow: hidden;
    text-align: center;
    border-radius: 5rpx;
		box-sizing: border-box;
    &:after {
      content: '';
      width: 44rpx;
      height: 2rpx;
      background: $fontColor97;
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    &:before {
      content: '';
      width: 4rpx;
      height: 44rpx;
      background: $fontColor97;
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  .headImage {
    height: 180rpx;
    width: 250rpx;
    border-radius: 5rpx;
  }
  .right {
    float: right;
  }

  // 维护商业界面样式
  view.inputBox.maint-merchant {
    margin: 0 30rpx;
    padding: 36rpx 0 26rpx;
    border-bottom: 1px dashed $borderColor;
    .defaultImage {
      border-color: $fontColor97;
      border-radius: 6rpx;
    }
  }
  view.inputBox.maint-merchant:last-child {
    border-bottom: none;
  }
  .p {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 36rpx;
    line-height: 36rpx;
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0 0 5rpx 5rpx;
    font-size: 26rpx;
  }
</style>
