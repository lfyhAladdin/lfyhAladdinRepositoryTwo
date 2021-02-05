<template>
  <view class="switchingMechanism page">
    <view class="first-title"><text>选择机构</text></view>
    <view class="first-title-tips"><text>后续可在设置内修改</text></view>
    <view class="first-title-line"></view>
    <view class="mechanism-list">
      <view v-for="(mechanism,index) in mechanismlist" :key="index">
        <view :class='[mechanism.isDepartment ?"selected":"","mechanism"]' @click="changeMechanism(mechanism.orgId)">
          <view class="mechanism-logo"></view>
          <view class="mechanism-con">
            <text class="mechanism-name">{{mechanism.orgName}}</text>
            <text class="mechanism-position">{{mechanism.roleName}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import {RSAencode} from '@/static/js/util.js';
export default {
  data() {
    return {
      userOrgId:'',
      loginCode:'',
      mechanismlist: []
    };
  },
  onLoad() {
    let _this = this;
    /* 获取当前用户登录信息 */
    
    _this.loginCode= _this.userInfor.loginCode;
    /* 获取机构列表信息 */
    _this.mechanismlist= _this.userInfor.organList;
    /*  判断当前用户上次登录所属机构 */
    _this.userOrgId = _this.userInfor.orgId;
    _this.filterOrgan(_this.userOrgId)
  },
  onShow() {},
  onUnload() {},
  computed: {
    ...mapGetters(['userInfor'])
  },
  methods: {
    ...mapActions(["businessNumCommit"]),

    changeMechanism(orgid) {
      let _this = this;
      let data = {
        loginCode: RSAencode(_this.userInfor.loginCode),
        orgId: orgid,
      };
      this.$http
        .request({
          method: "GET",
          url: this.loginRelatedPostUrl + "api/adminsmuser/updateorgsign",
          header: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          },
          custom: { oauth: 1 },
          data: data
        })
        .then(
          res => {
            //改变orgID
            _this.userInfor.orgId=orgid;
            _this.filterOrgan(orgid);
            let userID = _this.userInfor.loginCode;
            let orgID=orgid;
            let data = {
              "userID": userID, //客户经理编号
              "orgID": orgID, //客户经理所属机构编号
            };
            _this.businessNumCommit(data);
            setTimeout(() => {
              yu.switchTab({
                url: "/pages/ebank/index/index"
              });
            }, 1600);
          },
          err => {}
        );
    },
    filterOrgan(orgid) {
      let that=this;
      let organlist = that.mechanismlist;
      for (let i = 0; i < organlist.length; i++) {
        if (orgid != organlist[i].orgId) {
          organlist[i].isDepartment = false;
        } else {
          organlist[i].isDepartment = true;
          that.userOrgId=organlist[i].orgId;
        }
      }
      that.mechanismlist = organlist;
      
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.switchingMechanism {
  height: 100%;
  background: #ffffff;
  padding: 137rpx 55rpx 0 55rpx;
  .first-title {
    height: 70rpx;
    line-height: 70rpx;
    text-align: left;
    font-size: 50rpx;
    color: #333333;
  }
  .first-title-tips {
    height: 33rpx;
    line-height: 33rpx;
    color: #999999;
    font-size: 24rpx;
    text-align: left;
    margin-top: 7rpx;
  }
  .first-title-line {
    background: #3b86f7;
    width: 75rpx;
    height: 9rpx;
    display: block;
    border-radius: 4.5rpx;
    margin-top: 15rpx;
  }
  .mechanism-list {
    margin-top: 79rpx;

    .mechanism {
      width: 650rpx;
      height: 180rpx;
      background-image: linear-gradient(270deg, #eff4f7 2%, #e2e7ec 100%);
      border-radius: 20rpx;
      display: flex;
      vertical-align: middle;
      align-items: center;
      margin-bottom: 40rpx;
      .mechanism-logo {
        width: 61rpx;
        height: 61rpx;
        background: url("~@/static/images/m-logo1.svg") center center no-repeat;
        background-size: 61rpx 61rpx;
        margin-left: 25rpx;
      }
      .mechanism-con {
        margin-left: 18rpx;
        .mechanism-name {
          height: 50rpx;
          line-height: 50rpx;
          color: #78818e;
          font-size: 36rpx;
          display: block;
        }
        .mechanism-position {
          height: 40rpx;
          line-height: 40rpx;
          font-size: 28rpx;
          color: #99a1ab;
          display: block;
        }
      }
    }
    .mechanism:hover {
      background-image: linear-gradient(90deg, #3b86f7 0%, #7fcbfa 100%);
      .mechanism-logo {
        background: url("~@/static/images/m-logo2.svg") center center no-repeat;
        background-size: 61rpx 61rpx;
      }
      .mechanism-con {
        .mechanism-name {
          color: #ffffff;
        }
        .mechanism-position {
          color: #ffffff;
        }
      }
    }
    .mechanism.selected {
      background-image: linear-gradient(90deg, #3b86f7 0%, #7fcbfa 100%);
      .mechanism-logo {
        background: url("~@/static/images/m-logo2.svg") center center no-repeat;
        background-size: 61rpx 61rpx;
      }
      .mechanism-con {
        .mechanism-name {
          color: #ffffff;
        }
        .mechanism-position {
          color: #ffffff;
        }
      }
    }
  }
}
.switchingMechanism::after {
  display: block;
  content: "";
  clear: both;
}
</style>
