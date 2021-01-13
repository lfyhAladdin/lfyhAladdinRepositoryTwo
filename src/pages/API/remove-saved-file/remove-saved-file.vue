<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <button type="primary" @tap="getSavedFileList(false)">获取文件列表</button>
      <view v-for="(file, i) in fileList" :key="i" class="file">
        <view class="file-path">{{ file.filePath }}</view>
        <button type="primary" @tap="removeSavedFile(file.filePath)">删除此文件</button>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '删除本地存储的文件',
        fileList: []
      };
    },
    onUnload() {
      this.savedFilePath = '';
    },
    methods: {
      getSavedFileList: function(isRemove) {
        var _this = this;
        yu.getSavedFileList({
          success: function(res) {
            let fileList = res.fileList;
            // #ifdef MP-ALIPAY
            fileList = res.fileList.map(item => {
              item.filePath = item.apFilePath;
              return item;
            })
	          // #endif
            _this.fileList = fileList;
            console.log(fileList)
            if (_this.fileList.length < 1 && !isRemove) {
              yu.showToast({
                title: `暂无文件，可先使用 接口-文件-保存文件到本地 保存之后再操作。`,
                icon: 'none',
                duration: 2000
              });
            }
            console.log('fileList：' + JSON.stringify(res.fileList));
          }
        });
      },
      removeSavedFile: function(path) {
        var _this = this;
        yu.removeSavedFile({
          filePath: path,
          success: function(res) {
            yu.showModal({
              content: JSON.stringify(res),
              showCancel: false
            });
            _this.getSavedFileList(true);
          },
          fail: err => {
            yu.showToast({
              title: `删除失败：${err.errMsg}`,
              icon: 'none',
              duration: 2000
            });
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
