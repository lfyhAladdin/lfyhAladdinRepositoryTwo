<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <button v-if="fileObj" type="primary" @tap="removeFile">删除创建的本地文件</button>
      <button v-else type="primary" @tap="getFile">创建或打开文件</button>
      <view v-if="fileObj">
        <view>文件名：{{fileObj.name}}</view>
        <view class="file">文件路径：{{fileObj.fullPath}}</view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        title: '创建、打开或删除文件',
        fileObj: null
      };
    },

    methods: {
      getFile() {
        // #ifdef APP-FOX
        let url = '_downloads/';
        foxsdk.io.resolveLocalFileSystemURL(url, entry => {
          entry.getFile('test.txt', { create: true }, entry1 => {
            // 返回test目录操作对象
            this.fileObj = entry1;
            console.log(entry1);
            yu.showToast({
              title: `已创建${entry1.name}`,
              icon: 'none',
              duration: 2000
            });
          }, err => {
            yu.showToast({
              title: `${err.message}`,
              icon: 'none',
              duration: 2000
            });
          })
        }, ret => {
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },

      removeFile() {
        // #ifdef APP-FOX
        let url = this.fileObj.fullPath;
        foxsdk.io.resolveLocalFileSystemURL(url, entry => {
          entry.remove(ret => {
            console.log(ret);
            yu.showToast({
              title: `${ret.message}`,
              icon: 'none',
              duration: 2000
            });
            this.fileObj = null;
          }, err => {
            yu.showToast({
              title: `${err.message}`,
              icon: 'none',
              duration: 2000
            });
          })
        }, ret => {
          yu.showToast({
            title: `${ret.message}`,
            icon: 'none',
            duration: 2000
          });
        });
        // #endif
        // #ifndef APP-FOX
        yu.showModal({
          content: '此功能目前仅限于APP端使用！',
          showCancel: false
        });
        // #endif
      },
    }
  };
</script>

<style>
.file {
  word-break: break-all;
}
</style>
