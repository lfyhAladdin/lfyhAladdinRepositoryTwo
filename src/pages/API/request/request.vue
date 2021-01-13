<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-hello-text">
        请点击按钮向服务器发起请求
      </view>
      <view class="uni-textarea uni-common-mt">
        <textarea :value="res"></textarea>
      </view>
      <view class="uni-btn-v uni-common-mt">
        <button type="primary" @click="sendRequest" :loading="loading">发起请求（Callback）</button>
        <button type="primary" @click="sendRequest('promise')" :loading="loading">发起请求（Promise）</button>
        <button type="primary" @click="sendRequest('await')" :loading="loading">发起请求（Async/Await）</button>
      </view>
    </view>
  </view>
</template>
<script>
  // const requestUrl = 'https://unidemo.dcloud.net.cn/ajax/echo/text?name=yu-app';
  // const requestUrl = 'http://219.143.38.252:18080/yump-mgw/10000004/ebank/T01009';
  const requestUrl = 'https://www.easy-mock.com/mock/5f100cf2025b1d4dbcfc9cfd/example/yu-app';
  const duration = 2000;
  export default {
    data() {
      return {
        title: 'request',
        loading: false,
        res: ''
      };
    },
    methods: {
      sendRequest(mode) {
        this.loading = true;
        switch (mode) {
          case 'promise':
            this._requestPromise();
            break;
          case 'await':
            this._requestAwait();
            break;
          default:
            this._request();
            break;
        }
      },
      _request() {
        this.$http.request({
          url: requestUrl,
          data: {
            noncestr: Date.now()
          },
          method:'GET',
          success: res => {
            console.log('request success', res);
            yu.showToast({
              title: '请求成功',
              icon: 'success',
              mask: true,
              duration: duration
            });
            this.res = '请求结果 : ' + JSON.stringify(res);
            this.loading = false;
          },
          fail: err => {
            console.log('request fail', err);
            yu.showModal({
              content: err.errMsg,
              showCancel: false
            });
          },
          complete: () => {
            this.loading = false;
          }
        });
      },
      _requestPromise() {
        this.$http.request({
          url: requestUrl,
          data: {
            noncestr: Date.now()
          },
          method:'POST',
        }).then(res => {
          console.log('request success', res);
          yu.showToast({
            title: '请求成功',
            icon: 'success',
            mask: true,
            duration: duration
          });
          this.res = '请求结果 : ' + JSON.stringify(res);
          this.loading = false;
        }).catch(err => {
          console.log('request fail', err);
          yu.showModal({
            content: err.errMsg,
            showCancel: false
          });
          this.loading = false;
        });
      },
      async _requestAwait() {
        const [err, res] = await yu.request({
          url: requestUrl,
          dataType: 'text',
          data: {
            noncestr: Date.now()
          }
        });
        console.log(res);
        if (err) {
          console.log('request fail', err);
          yu.showModal({
            content: err.errMsg,
            showCancel: false
          });
        } else {
          console.log('request success', res);
          yu.showToast({
            title: '请求成功',
            icon: 'success',
            mask: true,
            duration: duration
          });
          this.res = '请求结果 : ' + JSON.stringify(res);
        }
        this.loading = false;
      }
    }
  };
</script>
