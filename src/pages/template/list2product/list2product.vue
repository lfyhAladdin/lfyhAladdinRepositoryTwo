<!-- 
  @created by luyq1
  @description 商品列表
 -->
<template>
  <view class="account">
    <view class="list-box">
      <yu-pull-scroll ref="pullScroll" @pullDown="pullDown" @pullUp="loadData" :top="top" :bottom="bottom" content-class="bg-white" finishText="没有更多数据喽～" pulling-text="下拉可以刷新" loosing-text="释放立即刷新" loading-text="正在刷新">
        <view class="top-text">共有{{ shopSumCount }}家维护中</view>
        <view class="marginAuto" v-for="(item,index) in list" :key="index">
          <view class="flex" :class="{'show':showFang}">
            <view v-if="showFang" @click="chooseFn(item.shopId,index)" :class="{'on': onIndex === index}"></view>
            <view class="list-item flex">
              <view class="image-box">
                <yu-image class="head-img" :src="item.shopLogo" mode="heightFix"></yu-image>
                <view class="p">{{item.auditmessage}}</view>
              </view>
              <view class="center-box">
                <view class="title">{{item.shopName}}</view>
                <view class="address">地址：{{item.shopAddress}}</view>
                <view class="timeBox">创建时间：{{item.addTime | formatDate('YYYY-MM-DD HH:MM')}}</view>
              </view>
              <view class="right-box">
                <view class="title" v-if="item.auditstatus == 3 || item.auditstatus == 4" @click="goDetail(item)">更多</view>
                <view class="title" v-else @click="edit(item)">编辑</view>
              </view>
            </view>
          </view>
        </view>
      </yu-pull-scroll>
      <view style="height:20rpx"></view>
    </view>
  </view>
</template>
<script>
  import yuImage from '@/components/yu-image/index.vue';
  import YuPullScroll from '@/components/yu-pull-scroll/yu-pull-scroll.vue';
  export default {
    components: {
      yuImage,
      YuPullScroll
    },
    data() {
      return {
        list: [],
        top: 108,
        bottom: 20,
        showFang: false,
        shopSumCount: 0,
        resetPage: 1,
        pageNo: 1,
        total: 0,
        pageSize: 10,
        loadingType: 1 //1 还有更多数据 ，2 加载中， 3没有更多数据
      };
		},
		// #ifndef MP-ALIPAY
    onShow() {
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
      getList(state) {
        var _this = this;
        if (state) {
          _this.list = [];
          _this.pageNo = 1;
        }
        // this.$http
        //   .request({
        //     url: this.$backend.mockExampleService + '/T03008',
        //     custom: { loading: true },
        //     method: 'POST',
        //     data: {
        //       currentPage: _this.pageNo,
        //       pageSize: _this.pageSize,
        //       userId: 1,
        //       userName: _this.realname || ''
        //     }
        //   })
        //   .then(
        //     res => {
        //       if (res.data.code === 0) {
        //         this.list = res.data.data || [];
        //         _this.shopSumCount = res.data.count;

        //         if (this.list[0]) {
        //           this.total = res.data.data.count || this.list.length;
        //         }
        //         _this.setPageInfo(pullScroll);
        //         _this.currentPage += 1;
        //       } else {
        //         yu.showToast({
        //           icon: 'none',
        //           title: res.data.message,
        //           duration: 2000
        //         });
        //       }
        //     }, // 成功
        //     err => {
        //       yu.showToast({
        //         icon: 'none',
        //         title: '获取列表失败，请稍后再试',
        //         duration: 2000
        //       });
        //     } // 失败
        //   );

        var goods = [
          {
            transType: 'T07006',
            transDate: '1996-11-27',
            transTime: '11:21:32',
            balance: 78.73,
            amt: 96.7,
            flag: '0',
            rejectreason: '',
            shopId: '140000199910283014',
            shopLogo:
              'https://img.36krcdn.com/20200408/v2_c67c3edfe4b5446992b32fad93a44a75_img_png',
            shopName: '由好记向除设',
            staus: 1,
            shopAddress: '江苏省 南通市 崇川区',
            auditstatus: 5,
            auditmessage: '已审核',
            addTime: '2020-07-17T07:33:17.243Z'
          },
          {
            transType: 'T07006',
            transDate: '1999-04-18',
            transTime: '19:04:31',
            balance: 80.8,
            amt: 32.5,
            flag: '1',
            rejectreason: '',
            shopId: '410000198904150240',
            shopLogo:
              'https://img.36krcdn.com/20200411/v2_da4c26244cbc494c8e0e5918518e866c_img_png',
            shopName: '样清清影那',
            staus: 0,
            shopAddress: '四川省 乐山市 峨边彝族自治县',
            auditstatus: 5,
            auditmessage: '审核中',
            addTime: '2020-07-17T07:33:17.243Z'
          },
          {
            transType: 'T04005',
            transDate: '2009-04-01',
            transTime: '03:10:08',
            balance: 57,
            amt: 34.7,
            flag: '1',
            rejectreason: '',
            shopId: '450000198408279368',
            shopLogo:
              'https://img.36krcdn.com/20200406/v2_d2c6a686b4074a1eb43603e67d6ba204_img_png',
            shopName: '信果教影',
            staus: 1,
            shopAddress: '福建省 三明市 大田县',
            auditstatus: 3,
            auditmessage: '审核中',
            addTime: '2020-07-17T07:33:17.243Z'
          },
          {
            transType: 'T04005',
            transDate: '2007-04-19',
            transTime: '23:06:14',
            balance: 16.94,
            amt: 6.4,
            flag: '0',
            rejectreason: '',
            shopId: '540000199206281386',
            shopLogo:
              'https://img.36krcdn.com/20200411/v2_61c1766736df49a0b2d0213624c0ebd2_img_000?x-oss-process=image/resize,m_mfit,w_432,h_288/crop,w_432,h_288,g_center',
            shopName: '以率被除',
            staus: 1,
            shopAddress: '内蒙古自治区 鄂尔多斯市 准格尔旗',
            auditstatus: 1,
            auditmessage: '审核中',
            addTime: '2020-07-17T07:33:17.243Z'
          },
          {
            transType: 'T03002',
            transDate: '2005-11-28',
            transTime: '08:01:47',
            balance: 87.3,
            amt: 68.4,
            flag: '1',
            rejectreason: '',
            shopId: '450000197212079570',
            shopLogo:
              'https://img.36krcdn.com/20200406/v2_d2c6a686b4074a1eb43603e67d6ba204_img_png',
            shopName: '积去精法结',
            staus: 1,
            shopAddress: '山西省 长治市 壶关县',
            auditstatus: 5,
            auditmessage: '审核中',
            addTime: '2020-07-17T07:33:17.243Z'
          },
          {
            transType: 'T04005',
            transDate: '2003-10-18',
            transTime: '06:14:42',
            balance: 43.25,
            amt: 25,
            flag: '0',
            rejectreason: '',
            shopId: '320000198707015179',
            shopLogo:
              'https://img.36krcdn.com/20200411/v2_da4c26244cbc494c8e0e5918518e866c_img_png',
            shopName: '更重交整',
            staus: 1,
            shopAddress: '台湾 屏东县 潮州镇',
            auditstatus: 4,
            auditmessage: '审核中',
            addTime: '2020-07-17T07:33:17.243Z'
          },
          {
            transType: 'T07006',
            transDate: '1974-09-13',
            transTime: '08:12:23',
            balance: 32,
            amt: 91.04,
            flag: '0',
            rejectreason: '',
            shopId: '610000198108159217',
            shopLogo:
              'https://img.36krcdn.com/20200411/v2_da4c26244cbc494c8e0e5918518e866c_img_png',
            shopName: '种接国阶离示',
            staus: 1,
            shopAddress: '北京 北京市 怀柔区',
            auditstatus: 2,
            auditmessage: '已审核',
            addTime: '2020-07-17T07:33:17.243Z'
          },
          {
            transType: 'T03007',
            transDate: '1982-04-14',
            transTime: '03:34:00',
            balance: 92.18,
            amt: 44.87,
            flag: '1',
            rejectreason: '',
            shopId: '630000198009052717',
            shopLogo:
              'https://img.36krcdn.com/20200411/v2_da4c26244cbc494c8e0e5918518e866c_img_png',
            shopName: '空交四低',
            staus: 0,
            shopAddress: '重庆 重庆市 南岸区',
            auditstatus: 4,
            auditmessage: '已审核',
            addTime: '2020-07-17T07:33:17.243Z'
          },
          {
            transType: 'T03002',
            transDate: '2015-05-24',
            transTime: '06:24:33',
            balance: 100.7,
            amt: 85.29,
            flag: '0',
            rejectreason: '',
            shopId: '610000200908261738',
            shopLogo:
              'https://img.36krcdn.com/20200408/v2_c67c3edfe4b5446992b32fad93a44a75_img_png',
            shopName: '元近里',
            staus: 0,
            shopAddress: '宁夏回族自治区 吴忠市 利通区',
            auditstatus: 2,
            auditmessage: '审核中',
            addTime: '2020-07-17T07:33:17.243Z'
          },
          {
            transType: 'T03002',
            transDate: '2013-09-30',
            transTime: '17:54:18',
            balance: 76,
            amt: 36.7,
            flag: '1',
            rejectreason: '',
            shopId: '360000197101033738',
            shopLogo:
              'https://img.36krcdn.com/20200406/v2_d2c6a686b4074a1eb43603e67d6ba204_img_png',
            shopName: '至部极其般质',
            staus: 1,
            shopAddress: '安徽省 马鞍山市 其它区',
            auditstatus: 5,
            auditmessage: '审核中',
            addTime: '2020-07-17T07:33:17.243Z'
          }
        ];
        setTimeout(() => {
          var total = 58; // 假设总数据为58条
          this.total = total;
          this.shopSumCount = total;
          if (this.list.length < this.total) {
            let data = [];
            for (var i = this.list.length, length = Math.min(this.list.length + this.pageSize, this.total); i < length; i++) {
              data.push(goods[Math.floor(Math.random() * 10)]);
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
      // 刷新
      refresh() {
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
      },
      // 更多
      goDetail(item) {
        yu.showToast({
          icon: 'none',
          title: '更多内容：id为' + item.shopId
        });
      },
      // 编辑
      edit(item) {
        yu.showToast({
          icon: 'none',
          title: '触发编辑：id为' + item.shopId
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  page {
    background: $page-color-base;
  }
  .top-text {
    margin-top: 28rpx;
    margin-left: 30rpx;
    color: $font-color-base;
    font-size: 26rpx;
    line-height: 33rpx;
  }
  .list-item {
    background: $white-color;
    border-radius: 13rpx;
    margin-top: 30rpx;
    padding: 24rpx;
    box-sizing: border-box;
    flex: 1;
    & .image-box {
      position: relative;
      width: 128rpx;
      height: 128rpx;
      float: left;
      border-radius: 5rpx;
      overflow: hidden;
      & .p {
        position: absolute;
        bottom: -3px;
        right: -8px;
        width: 152rpx;
        transform: scale(0.8);
        height: 40rpx;
        line-height: 40rpx;
        color: $white-color;
        text-align: center;
        font-size: 20rpx;
        background: #000;
        border-radius: 6rpx 0px 6rpx 0px;
        opacity: 0.64;
      }
    }
    & .center-box {
      width: calc(100% - 288rpx);
      margin-left: 20rpx;
      & .title {
        font-size: 30rpx;
        line-height: 40rpx;
        height: 40rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        color: $font-color-dark;
      }
      & .address,
      & .timeBox {
        font-size: 24rpx;
        line-height: 30rpx;
        margin-top: 7rpx;
        overflow: hidden;
      }
      & .address {
        color: $font-color-light;
      }
      & .timeBox {
        color: #8a8a8a;
      }
    }
    &:after {
      content: '';
      width: 0;
      height: 0;
      display: block;
      clear: both;
    }
    & .right-box {
      width: 128rpx;
      & .title {
        height: 54rpx;
        line-height: 54rpx;
        background: $uni-color-primary;
        margin-top: 40rpx;
        text-align: center;
        color: $white-color;
        font-size: 26rpx;
        border-radius: 6rpx;
        padding: 0 30rpx;
      }
    }
  }
</style>