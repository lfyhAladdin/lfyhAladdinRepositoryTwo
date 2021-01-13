<template>
  <view class="root">
    <page-head :title="title"></page-head>
    <view class="page-body">
      <view class="new-page__text-box">
        <text class="new-page__text">从上个页面接收到参数：{{data}}</text>
      </view>
      <view class="new-page__color" @click="setColorIndex(colorIndex>1?0:colorIndex+1)" :style="{backgroundColor:currentColor}">
        <text class="new-page__color-text">点击改变颜色</text>
      </view>
      <view class="new-page__text-box">
        <text class="new-page__text">点击上方色块使用vuex在页面之间进行通讯</text>
      </view>
      <view class="new-page__button">
        <button class="new-page__button-item" @click="navToVue">跳转到页面2</button>
      </view>
    </view>
  </view>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        title: '新页面1',
        data: ''
      };
    },
    computed: {
      ...mapGetters(['currentColor', 'colorIndex', 'colorList'])
    },
    onLoad(e) {
      if (e.data) {
        this.data = e.data;
      }
      yu.$on('postMsg', res => {
        yu.showModal({
          content: `收到yu.$emit消息:${res.msg}`,
          showCancel: false
        });
      });
    },
    onUnload() {
      yu.$off('postMsg');
    },
    methods: {
      ...mapMutations(['setColorIndex']),
      navToVue() {
        yu.navigateTo({
          url: 'new-vue-page-2'
        });
      }
    }
  };
</script>
<style>
  page {
    display: flex;
    min-height: 100%;
  }

  .new-page__text {
    font-size: 14px;
    color: #666666;
  }

  .root {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .page-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .new-page__text-box {
    padding: 20px;
  }

  .new-page__color {
    display: flex;
    width: 200px;
    height: 100px;
    justify-content: center;
    align-items: center;
  }

  .new-page__color-text {
    font-size: 14px;
    color: #ffffff;
    line-height: 30px;
    text-align: center;
  }

  .new-page__button-item {
    margin-top: 15px;
    width: 300px;
  }
</style>
