<template>
  <view class="content">
    <map class="map" id="map1" ref="map1" :controls="controls" :scale="scale" :longitude="location.longitude" :latitude="location.latitude" :show-location="showLocation" :enable-3D="enable3D" :rotate="rotate" :skew="skew" :show-compass="showCompass" :enable-overlooking="enableOverlooking" :enable-zoom="enableZoom" :enable-scroll="enableScroll" :enable-rotate="enableRotate" :enable-satellite="enableSatellite" :enable-traffic="enableTraffic" :markers="markers" :polyline="polyline" :circles="circles" :polygons="polygons" :include-points="includePoints" @tap="maptap" @controltap="oncontroltap" @markertap="onmarkertap" @callouttap="oncallouttap" @poitap="onpoitap" @updated="onupdated" @regionchange="onregionchange"></map>
    <scroll-view class="scrollview" scroll-y="true">
      <!-- <view class="list-item">
                <text class="list-text">显示3D楼块</text>
                <switch :checked="enable3D" @change="enableThreeD" />
            </view>
            <view class="list-item">
                <text class="list-text">显示指南针</text>
                <switch :checked="showCompass" @change="changeShowCompass" />
            </view>
            <view class="list-item">
                <text class="list-text">开启俯视</text>
                <switch :checked="enableOverlooking" @change="changeEnableOverlooking" />
            </view>
            <view class="list-item">
                <text class="list-text">是否支持缩放</text>
                <switch :checked="enableZoom" @change="changeEnableZoom" />
            </view>
            <view class="list-item">
                <text class="list-text">是否支持拖动</text>
                <switch :checked="enableScroll" @change="changeEnableScroll" />
            </view>
            <view class="list-item">
                <text class="list-text">是否支持旋转</text>
                <switch :checked="enableRotate" @change="changeEnableRotate" />
            </view>
            <view class="list-item">
                <text class="list-text">是否开启卫星图</text>
                <switch :checked="enableSatellite" @change="changeEnableSatellite" />
            </view>
            <view class="list-item">
                <text class="list-text">是否开启实时路况</text>
                <switch :checked="enableTraffic" @change="changeEnableTraffic" />
            </view> -->
      <button class="button" @click="changeScale">changeScale</button>
      <!--部分功能H5端和支付宝小程序上无反应 故添加条件编译隐藏-->
      <!-- #ifndef H5 -->
      <button class="button" @click="changeRotate">changeRotate</button>
      <button class="button" @click="changeSkew">skew</button>
      <!-- #endif -->
      <button class="button" @click="addMarkers">addMarkers</button>
      <button class="button" @click="addPolyline">addPolyline</button>
      <!-- #ifdef MP-WEIXIN -->
      <button class="button" @click="addPolygons">addPolygons</button>
      <!-- #endif -->
      <button class="button" @click="addCircles">addCircles</button>
      <!-- #ifdef MP-WEIXIN -->
      <button class="button" @click="includePoint">includePoints</button>
      <!-- #endif -->
      <!-- #ifndef MP-ALIPAY -->
      <button class="button" @click="getCenterLocationDemo">getCenterLocation</button>
      <button class="button" @click="getRegionDemo">getRegion</button>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <button class="button" @click="translateMarkerDemo">translateMarker</button>
      <!-- #endif -->
      <!--<view>
        <text>注：部分功能仅小程序端支持</text>
        <uni-link href="http://192.168.251.163:9527/yu-app-guide/component/map.html" text="yu-app文档"></uni-link>
      </view>-->
    </scroll-view>
  </view>
</template>

<script>
  const testMarkers = [
    {
      id: 0,
      latitude: 39.989631,
      longitude: 116.481018,
      title: '方恒国际 阜通东大街6号',
      zIndex: '1',
      rotate: 0,
      width: 20,
      height: 20,
      anchor: {
        x: 0.5,
        y: 1
      },
      callout: {
        content: '方恒国际 阜通东大街6号',
        color: '#00BFFF',
        fontSize: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333300',
        bgColor: '#CCFF99',
        padding: '5',
        display: 'ALWAYS'
      }
    },
    {
      id: 1,
      latitude: 39.908692,
      longitude: 116.397477,
      title: '天安门',
      zIndex: '1',
      iconPath: '/static/images/location.png',
      width: 40,
      height: 40,
      anchor: {
        x: 0.5,
        y: 1
      },
      callout: {
        content: '首都北京\n天安门',
        color: '#00BFFF',
        fontSize: 12,
        borderRadius: 2,
        borderWidth: 0,
        borderColor: '#333300',
        bgColor: '#CCFF11',
        padding: '1',
        display: 'ALWAYS'
      }
    }
  ];
  const testPolyline = [
    {
      points: [
        {
          latitude: 39.925539,
          longitude: 116.279037
        },
        {
          latitude: 39.925539,
          longitude: 116.520285
        }
      ],
      color: '#FFCCFF',
      width: 7,
      dottedLine: true,
      arrowLine: true,
      borderColor: '#000000',
      borderWidth: 2
    },
    {
      points: [
        {
          latitude: 39.938698,
          longitude: 116.275177
        },
        {
          latitude: 39.966069,
          longitude: 116.289253
        },
        {
          latitude: 39.944226,
          longitude: 116.306076
        },
        {
          latitude: 39.966069,
          longitude: 116.322899
        },
        {
          latitude: 39.938698,
          longitude: 116.336975
        }
      ],
      color: '#CCFFFF',
      width: 5,
      dottedLine: true,
      arrowLine: true,
      borderColor: '#CC0000',
      borderWidth: 3
    }
  ];
  const testPolygons = [
    {
      points: [
        {
          latitude: 39.781892,
          longitude: 116.293413
        },
        {
          latitude: 39.7876,
          longitude: 116.391842
        },
        {
          latitude: 39.733187,
          longitude: 116.417932
        },
        {
          latitude: 39.704653,
          longitude: 116.338255
        }
      ],
      fillColor: '#FFCCFF',
      strokeWidth: 3,
      strokeColor: '#CC99CC',
      zIndex: 11
    },
    {
      points: [
        {
          latitude: 39.8876,
          longitude: 116.518932
        },
        {
          latitude: 39.781892,
          longitude: 116.518932
        },
        {
          latitude: 39.781892,
          longitude: 116.428932
        },
        {
          latitude: 39.8876,
          longitude: 116.428932
        }
      ],
      fillColor: '#CCFFFF',
      strokeWidth: 5,
      strokeColor: '#CC0000',
      zIndex: 3
    }
  ];
  const testCircles = [
    {
      latitude: 39.996441,
      longitude: 116.411146,
      radius: 15000,
      strokeWidth: 5,
      color: '#CCFFFF',
      fillColor: '#CC0000'
    },
    {
      latitude: 40.096441,
      longitude: 116.511146,
      radius: 12000,
      strokeWidth: 3,
      color: '#CCFFFF',
      fillColor: '#FFCCFF'
    },
    {
      latitude: 39.896441,
      longitude: 116.311146,
      radius: 9000,
      strokeWidth: 1,
      color: '#CCFFFF',
      fillColor: '#CC0000'
    }
  ];
  const testIncludePoints = [
    {
      latitude: 39.989631,
      longitude: 116.481018
    },
    {
      latitude: 39.908692,
      longitude: 116.397477
    }
  ];
  module.exports = {
    data() {
      return {
        location: {
          longitude: 116.397477,
          latitude: 39.908692
        },
        controls: [
          {
            id: 1,
            position: {
              left: 5,
              top: 180,
              width: 30,
              height: 30
            },
            iconPath: '/static/images/yu.png',
            clickable: true
          }
        ],
        showLocation: false,
        scale: 13,
        showCompass: true,
        enable3D: true,
        enableOverlooking: true,
        enableOverlooking: true,
        enableZoom: true,
        enableScroll: true,
        enableRotate: true,
        enableSatellite: false,
        enableTraffic: false,
        polyline: [],
        markers: [],
        polygons: [],
        circles: [],
        includePoints: [],
        rotate: 0,
        skew: 0
      };
    },
    onLoad() {},
    onReady() {
      this.map = yu.createMapContext('map1', this);
    },
    methods: {
      changeScale() {
        this.scale = this.scale == 9 ? 15 : 9;
      },
      changeRotate() {
        this.rotate = this.rotate == 90 ? 0 : 90;
      },
      changeSkew() {
        this.skew = this.skew == 30 ? 0 : 30;
      },
      enableThreeD(e) {
        this.enable3D = e.detail.value;
      },
      changeShowCompass(e) {
        this.showCompass = e.detail.value;
      },
      changeEnableOverlooking(e) {
        this.enableOverlooking = e.detail.value;
      },
      changeEnableZoom(e) {
        this.enableZoom = e.detail.value;
      },
      changeEnableScroll(e) {
        this.enableScroll = e.detail.value;
      },
      changeEnableRotate(e) {
        this.enableRotate = e.detail.value;
      },
      changeEnableSatellite(e) {
        this.enableSatellite = e.detail.value;
      },
      changeEnableTraffic(e) {
        this.enableTraffic = e.detail.value;
      },
      addMarkers() {
        this.markers = testMarkers;
      },
      addPolyline() {
        this.polyline = testPolyline;
      },
      addPolygons() { // 支付宝小程序上无反应
        this.polygons = testPolygons;
      },
      addCircles() {
        this.circles = testCircles;
      },
      includePoint() {
        this.includePoints = testIncludePoints;
      },
      getCenterLocationDemo() {
        this.map.getCenterLocation({
          success: ret => {
            console.log(JSON.stringify(ret));
            yu.showModal({
              content: JSON.stringify(ret)
            });
          }
        });
      },
      getRegionDemo() {
        this.map.getRegion({
          success: ret => {
            console.log(JSON.stringify(ret));
            yu.showModal({
              content: JSON.stringify(ret)
            });
          }
        });
      },
      translateMarkerDemo() {
        this.map.translateMarker(
          {
            markerId: 1,
            destination: {
              latitude: 39.989631,
              longitude: 116.481018
            },
            duration: 2000
          },
          ret => {
            console.log(JSON.stringify(ret));
            yu.showModal({
              content: JSON.stringify(ret)
            });
          }
        );
      },
      maptap(e) {
        yu.showModal({
          content: JSON.stringify(e)
        });
      },
      onmarkertap(e) {
        yu.showModal({
          content: JSON.stringify(e)
        });
      },
      oncontroltap(e) {
        yu.showModal({
          content: JSON.stringify(e)
        });
      },
      oncallouttap(e) {
        yu.showModal({
          content: JSON.stringify(e)
        });
      },
      onupdated(e) {
        console.log(JSON.stringify(e));
      },
      onregionchange(e) {
        console.log(JSON.stringify(e));
      },
      onpoitap(e) {
        yu.showModal({
          content: JSON.stringify(e)
        });
      }
    }
  };
</script>

<style>
  .content {
    flex: 1;
  }

  .map {
    width: 750rpx;
    height: 250px;
    background-color: #f0f0f0;
  }

  .scrollview {
    flex: 1;
    padding: 10px;
  }

  .list-item {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    padding: 5px 0px;
  }

  .list-text {
    flex: 1;
  }

  .button {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
