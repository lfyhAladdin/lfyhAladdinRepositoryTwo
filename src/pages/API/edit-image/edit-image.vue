<template>
  <view>
    <page-head :title="title"></page-head>
    <view>
      <view class="btn-box">
        <picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex" mode="selector">
          <button type="primary" size="mini">图片剪裁</button>
        </picker>
      </view>
      <view class="uni-list list-pd">
        <view class="uni-list-cell cell-pd">
          <view class="uni-uploader">
            <view class="img-box">
              <view class="img-title" v-if="image">剪裁并转base64后的图片</view>  
              <image class="img" mode="widthFix" :src="image" :data-src="image"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '图片剪裁并转base64',
        image: '',
        sourceTypeIndex: 0,
        sourceType: ['拍照', '相册'],
      };
    },
    onUnload() {
			this.image = '';
			this.sourceTypeIndex = 0;
			this.sourceType = ['拍照', '相册'];
    },
    methods: {
      sourceTypeChange: function(e) {
        this.sourceTypeIndex = parseInt(e.detail.value);
        this.editImage();
      },
      editImage: function() {
        // #ifdef APP-FOX
        const data = { type: this.sourceTypeIndex + '' };
        foxsdk.gallery.pickSingleImageWithEdit(data, ret => {
          console.log('gallery/cropImage===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
          if (ret.status == 0) {
            foxsdk.logger.level.debug = false; // 取消桥接层打印，base64图片过大
            foxsdk.gallery.imageBase64(ret.payload.path, ret => {
              this.image = 'data:image/png;base64,' + (ret.payload.imageBase64 || '');
              foxsdk.logger.level.debug = true;
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
      }
    }
  };
</script>

<style>
  .cell-pd {
    padding: 22rpx 30rpx;
  }

  .btn-box {
    padding: 10rpx 0 30rpx;
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
