<!--会员权益-->
<template>
  <view class="yu-member-right" :style="{paddingTop: immergeTop + 'px', marginTop: -immergeTop + 'px', height: (screenHeight - immergeBottom - 44) + 'px'}">
    <view class="yu-member-top">
      <!-- 特权列表-->
      <yu-tab-tag :values="privileges" :current="curPriv" @clickItem="onClickItem"></yu-tab-tag>
    </view>
    <!--特权详情列表-->
    <swiper class="swiper" :style="{'height' : 'calc(100% - 230px)', 'max-height' : swipeHeight + 'px'}"  @change='scollSwiper' :current='curPriv'>
      <swiper-item class="swiper-item" v-for="(v,i) in priviDetail" :key='i'>
        <!-- 使用 scroll-view 来滚动内容区域 -->
        <scroll-view scroll-y="true" style="height: 100%;" class="scroll-view_v">
          <view :class="{'yu-member-right__content':true, 'active': curPriv == i}">
            <view class="title">适用对象</view>
            <view class="yu-member-right__list">
              <view class="yu-right-item flex">
                <text class="flex-item6">会员等级</text>
                <text class="flex-item6">{{privileges[curPriv].title=='白银特权' ? '会员等级特权' : privileges[curPriv].title}}</text>
              </view>
              <label class="yu-right-item flex" v-for="(m,j) in v" :key="j">
                <text class="flex-item6">{{levelNames[m.usrGrdval]}}会员</text>
                <text class="flex-item6">{{m.desc}}</text>
              </label>
            </view>
            <view class="title">特权说明</view>
            <text class="desc">会员可用成长值兑换相对应会员等级的奖券，等级越高 可兑换的奖券越多</text>
            <view class="tip flex flex-center">最终解释权归宇信银行所有</view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <button class="custom-btn fixed position-bottom" @tap="toMask" :style="{'bottom': immergeBottom + 'px'}">做任务升特权</button>
  </view>
</template>
<script>
  import YuTabTag from './tab-tag.vue';
  export default {
    components: {
      YuTabTag
      // YuMembBar
    },
    data() {
      return {
        scrollTop: 0,
        curPriv: 0,
        swipeHeight: 380,
        levelNames: ['', '白银', '白金', '黄金', '黑金'],
        privileges: [
          {
            id: 0,
            icon: 'memb-medal',
            title: '勋章特权'
          },
          {
            id: 1,
            icon: 'memb-cake',
            title: '生日特权'
          },
          {
            id: 2,
            icon: 'memb-money',
            title: '奖券特权',
            sub: '10元'
          },
          {
            id: 3,
            icon: '',
            text: '0.1',
            sub: '全账户',
            title: '理财加息券'
          },
          {
            id: 4,
            icon: 'memb-gift',
            title: '升级奖励'
          },
          {
            id: 5,
            icon: 'memb-rocket',
            title: '积分加速'
          },
          {
            id: 6,
            icon: 'memb-compassion',
            title: '节日关怀'
          },
          {
            id: 7,
            icon: 'member2',
            title: '钻石特权'
          }
        ],
        priviDetail: [
          [
            {
              usrGrdval: 1,
              desc: '白银勋章特权'
            },
            {
              usrGrdval: 2,
              desc: '白金勋章特权'
            },
            {
              usrGrdval: 3,
              desc: '黄金勋章特权'
            },
            {
              usrGrdval: 4,
              desc: '黑金勋章特权'
            }
          ],
          [
            {
              usrGrdval: 1,
              desc: '白银生日特权'
            },
            {
              usrGrdval: 2,
              desc: '白金生日特权'
            },
            {
              usrGrdval: 3,
              desc: '黄金生日特权'
            },
            {
              usrGrdval: 4,
              desc: '黑金生日特权'
            }
          ],
          [
            {
              usrGrdval: 1,
              desc: '10元优惠券'
            },
            {
              usrGrdval: 2,
              desc: '15元优惠券'
            },
            {
              usrGrdval: 3,
              desc: '20元优惠券'
            },
            {
              usrGrdval: 4,
              desc: '30元优惠券'
            }
          ],
          [
            {
              usrGrdval: 1,
              desc: '10元理财加息券'
            },
            {
              usrGrdval: 2,
              desc: '15元理财加息券'
            },
            {
              usrGrdval: 3,
              desc: '20元理财加息券'
            },
            {
              usrGrdval: 4,
              desc: '30元理财加息券'
            }
          ],
          [
            {
              usrGrdval: 1,
              desc: '10积分升级奖励'
            },
            {
              usrGrdval: 2,
              desc: '15积分升级奖励'
            },
            {
              usrGrdval: 3,
              desc: '20积分升级奖励'
            },
            {
              usrGrdval: 4,
              desc: '30积分升级奖励'
            }
          ],
          [
            {
              usrGrdval: 1,
              desc: '0.5倍积分加速'
            },
            {
              usrGrdval: 2,
              desc: '1倍积分加速'
            },
            {
              usrGrdval: 3,
              desc: '1.5倍积分加速'
            },
            {
              usrGrdval: 4,
              desc: '3倍积分加速'
            }
          ],
          [
            {
              usrGrdval: 1,
              desc: '白银节日关怀'
            },
            {
              usrGrdval: 2,
              desc: '白金节日关怀'
            },
            {
              usrGrdval: 3,
              desc: '黄金节日关怀'
            },
            {
              usrGrdval: 4,
              desc: '黑金节日关怀'
            }
          ],
          [
            {
              usrGrdval: 1,
              desc: '白银特权'
            },
            {
              usrGrdval: 2,
              desc: '白金特权'
            },
            {
              usrGrdval: 3,
              desc: '黄金特权'
            },
            {
              usrGrdval: 4,
              desc: '黑金特权'
            }
          ]
        ]
      };
    },
    computed: {
      memberLevel: () => {
        return {
          usrGrdval: 4,
          grdGrwval: '',
          upgrdTm: ''
        };
      }
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    created(){
      this.privileges[7].title= `${this.levelNames[this.memberLevel.usrGrdval]}特权`;
    },
    mounted(){
      if (window) {
        this.swipeHeight = window.innerHeight - this.$el.children[1].offsetHeight - this.$el.children[3].offsetHeight + 10;
      }
    },
    onShow() {
      if (this.scrollTop > 22) {
        this.setStatusFontColor();
      } else {
        this.setStatusFontColor('light');
      }
    },
    onLoad(param) {
      this.curPriv = param.activeId || 0;
    },
    methods: {
      //点击特权图标
      rightClick(data) {
        let oldCurPriv = this.curPriv;
        this.curPriv = data.id;
        this.privileges[this.curPriv].has = true;
        this.privileges[oldCurPriv].has = false;
      },
      onClickItem(val) {
        this.curPriv = val.currentIndex;
      },
      scollSwiper(e) {
        this.curPriv = e.target.current;
      },
      //去做任务
      toMask() {}
    }
  };
</script>
<style lang="scss" scoped>
  @import '@styles/base.scss';
  $member-black-bg: #383838;
  $text-grey-color: #999999;
  $member-light-red1: #fff7f0;
  $member-light-red2: #fffcfa;

  .yu-member-right {
    background: $member-black-bg;
    height: 100%;
    overflow-y: hidden;
  }
  .yu-member-top {
    padding-top: 126rpx;
    margin-top: -44px;
    //特权列表
    .scroll-view_v {
      white-space: nowrap;
      padding-left: 40rpx;
      padding-bottom: 34rpx;
      height: 180rpx;
      .scroll-view-item_v {
        margin-right: 64rpx;
      }
    }
  }
  //面板设定
  .yu-member-right__content {
    display: inline-block;
    margin-top: 86rpx;
    // width: 650rpx;
    background: #fff;
    height: 100%;
    border-radius: 16px 16px 0px 0px;
    padding: 24rpx 30rpx 0;
    margin-left: 30rpx;
    position: relative;
    box-sizing: border-box;
    .title {
      @extend .font-16;
      padding-top: 32rpx;
    }
    .desc,
    .tip {
      padding-top: 10rpx;
      @extend .font-12;
      color: $text-grey-color;
    }
    .tip {
      position: fixed;
      bottom: 56rpx;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    &.active {
      margin-top: 0;
    }
  }
  /deep/ .swiper-item {
    // #ifndef MP-ALIPAY
    width: calc(100% - 100rpx) !important;
    margin-right: -30rpx;
    margin-left: 40rpx;
    // #endif
    // #ifdef MP-ALIPAY
    width: 100% !important;
    scroll-view {
      width: calc(100% - 100rpx);
      margin: 0 65rpx 0 35rpx;
    }
    // #endif
  }
  /deep/ .uni-scroll-view div {
    height: 100%;
  }

  //下方面板内容
  .yu-member-right__list {
    margin-top: 34rpx;
    .yu-right-item {
      @extend .font-12;
      text-align: center;
      line-height: 70rpx;
    }
    .yu-right-item:nth-child(odd) {
      background: $member-light-red1;
    }
    .yu-right-item:nth-child(even) {
      background: $member-light-red2;
    }
  }

  //底部固定去做任务按钮
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 0;
    @extend .font-16;
  }
</style>