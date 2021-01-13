<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <!-- <button type="primary" @tap="getSavedFileList">获取文件列表</button>
      <view v-for="(file, index) in fileList" :key="index" class="file">
        <view class="file-path">{{ file.filePath }}</view>
        <button v-if="file.filePath.indexOf('.zip') > -1" type="primary" @tap="decompress(file.filePath)">解压此文件</button>
        <button v-else type="primary" @tap="compress(file.filePath)">压缩此文件</button>
      </view> -->
      <button type="primary" @tap="compress" style="margin-bottom: 40rpx">压缩文件</button>
      <button @tap="decompress">解压文件</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '文件压缩、解压',
        fileList: []
      };
    },
    onUnload() {
      this.savedFilePath = '';
    },
    methods: {
      getSavedFileList: function() {
        var _this = this;
        yu.getSavedFileList({
          success: function(res) {
            _this.fileList = res.fileList;
            console.log('fileList：' + JSON.stringify(res.fileList));
          }
        });
      },
      compress: function() {
        // #ifdef APP-FOX
        let src = '_doc/';
        let zipfile = '_doc/data.zip';
        foxsdk.zip.compress(src, zipfile, ret => {
          if (ret.status != 0) {
            yu.showToast({
              title: `${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('zip/compress===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
      decompress: function() {
        // #ifdef APP-FOX
        let target = '_doc/';
        let zipfile = '_doc/data.zip';
        foxsdk.zip.decompress(zipfile, target, ret => {
          if (ret.status != 0) {
            yu.showToast({
              title: `${ret.message}`,
              icon: 'none',
              duration: 2000
            });
          }
          console.log('zip/decompress===status: ' + ret.status + ',message: ' + ret.message + ',payload: ' + JSON.stringify(ret.payload));
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
  .file-path {
    word-break: break-all;
  }
</style>
