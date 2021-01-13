<template>
  <view class="account">
    <view class="list-wrap">
      <yu-pull-scroll ref="pullScroll" @pullDown="pullDown" @pullUp="loadData" :top="top" :bottom="bottom" content-class="bg-white" finishText="没有更多数据了～" pulling-text="下拉刷新" loosing-text="释放立即刷新" loading-text="正在刷新">
        <view class="list-box">
          <view class="list" v-for="(item,index) in list" :key="index">{{index + 1}}</view>
        </view>
      </yu-pull-scroll>
      <view style="height:20rpx"></view>
    </view>
  </view>
</template>
<script>
import YuPullScroll from "@/components/yu-pull-scroll/yu-pull-scroll.vue";
export default {
  components: { 
    YuPullScroll
  },
  data() {
    return {
      list: [],
      top: 108,
      bottom: 20,
      showFang: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      loadingType: 1, //1 还有更多数据 ，2 加载中， 3没有更多数据
    };
  },

	// #ifndef MP-ALIPAY
	created() {
		// #ifdef MP
		this.top = 0;
		// #endif
		this.refresh();
	},
	// #endif

	// #ifdef MP-ALIPAY
	mounted() {
		this.top = 0;
		this.refresh();
	},
	// #endif

  methods: {
    // 获取维护列表,state-是否加载首页数据 1-是
    getList(isRefresh) {
      if (isRefresh) {
        this.list = [];
        this.pageNo = 1;
      }
      setTimeout(() => {
        this.total = 58;
        if (this.list.length < this.total) {
          let data = [];
          for (var i = this.list.length, length = Math.min(this.list.length + this.pageSize, this.total); i < length; i++) {
            data.push(i);
          }
          this.list = this.list.concat(data);
          this.setPageInfo(); 
        }
      }, 600);
    },

    setPageInfo() {
      if (this.total > Number(this.pageNo) * Number(this.pageSize)) {
        this.loadingType = 1;
        this.$refs.pullScroll.success()
      } else {
        this.loadingType = 3;
        this.$refs.pullScroll.finish()
      }
      this.pageNo++
    },

    refresh () {
      this.$nextTick(() => {
        this.$refs.pullScroll.refresh();
      });
    },
    
    // 下拉刷新
    pullDown() {
      this.getList(true);
    },

    // 上拉加载
    loadData() {
      if (this.loadingType !== 3) {
        this.getList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list-box {
  margin: 0 -15px;
  .list {
    padding: 40rpx;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #dedede;
  }
}
</style>