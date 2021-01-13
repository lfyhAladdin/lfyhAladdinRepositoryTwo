<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view v-if="savedFilePath" class="file-path">文件已保存至：{{ savedFilePath }}</view>
      <block v-else>
        <button type="primary" @tap="downloadImage">{{ title }}</button>
      </block>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '保存文件到本地',
        filePath: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
        savedFilePath: ''
      };
    },
    onUnload() {
      this.savedFilePath = '';
    },
    methods: {
      downloadImage: function() {
        var _this = this;
        // #ifdef H5
        yu.showToast({
          title: 'H5端暂不支持',
          icon: 'none',
          duration: 2000
        });
        return;
	      // #endif
        yu.showLoading({ title: '下载中' });
        yu.downloadFile({
          url: _this.filePath,
          success: res1 => {
            console.log('downloadFile success, res is', res1);
            yu.saveFile({
              tempFilePath: res1.tempFilePath,
              success: res2 => {
                _this.savedFilePath = res2.savedFilePath;
                yu.hideLoading();
                yu.showToast({
                  title: `文件已保存至：${res2.savedFilePath}`,
                  icon: 'none',
                  duration: 2000
                });
                console.log('savedFilePath：' + res2.savedFilePath);
              }
            });
          },
          fail: err => {
            console.log('downloadFile fail, err is:', err);
          }
        });
      }
    }
  };
</script>

<style>
.file-path {
  word-break: break-all;
}
</style>
