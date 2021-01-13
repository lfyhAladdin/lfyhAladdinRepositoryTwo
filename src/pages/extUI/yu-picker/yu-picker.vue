<template>
  <view class="page">
    <uni-section title="region 省市区选择" type="line"></uni-section>
    <view class="example-body">
      <view class="padding30" @tap="regionRegionVisible=true">省市区</view>
      <view class="result">选择结果：{{regionResult.result}}</view>
      <yu-picker :visible.sync="regionRegionVisible" mode="region" :value="defaultRegion" default-type="value" :hide-area="false" @confirm="regionOnConfirm($event,'region')" @cancel="onCancel" ref="region"></yu-picker>
    </view>
    <uni-section title="date 日期选择" type="line"></uni-section>
    <view class="example-body">
      <view class="item" @tap="dateVisible=true">日期</view>
      <view class="result">选择结果：{{dateResult.result}}</view>
      <yu-picker :visible.sync="dateVisible" mode="date" startYear="2017" endYear="2029" value="2020-04-08 16:45:45" :current="false" fields="second" @confirm="dateOnConfirm($event,'date1')" @cancel="onCancel" :disabled-after="false" ref="date1"></yu-picker>
    </view>
    <uni-section title="shortTerm 短期日期时间" type="line"></uni-section>
    <view class="example-body">
      <view class="item" @tap="shortTermVisible=true">短期日期时间</view>
      <view class="result">选择结果：{{shortTermResult.result}}</view>
      <yu-picker :visible.sync="shortTermVisible" mode="shortTerm" value="2020-04-08 13:18:00" :current="true" expand="60" @confirm="shortTermOnConfirm($event,'shortTerm')" @cancel="onCancel" ref="shortTerm"></yu-picker>
    </view>
    <uni-section title="range 日期区间" type="line"></uni-section>
    <view class="example-body">
      <view class="item" @tap="rangeVisible=true">日期区间</view>
      <view class="result">选择结果：{{rangeResult.result}}</view>
      <yu-picker :visible.sync="rangeVisible" mode="range" startYear="2017" endYear="2030" :value="rangeVal" :current="true" @confirm="rangeOnConfirm($event,'range')" @cancel="onCancel" ref="range"></yu-picker>
    </view>
    <uni-section title="linkage 自定义多级联动" type="line"></uni-section>
    <view class="example-body">
      <view class="item" @tap="linkageVisible=true">自定义多级联动</view>
      <view class="result">选择结果：{{linkageResult.result}}</view>
      <yu-picker :visible.sync="linkageVisible" mode="linkage" :value="defaultRegion1" :options="options" :level="4" default-type="id" :default-props="defaultProps1" @confirm="linkageOnConfirm($event,'linkage')" @cancel="onCancel" ref="linkage"></yu-picker>
    </view>
  </view>
</template>

<script>
  import uniSection from '@/components/uni-section/uni-section.vue';
  import yuPicker from '@/components/yu-picker/yu-picker.vue';
  export default {
    components: { uniSection, yuPicker },
    data() {
      return {
        regionRegionVisible: false,
        regionResult: {
          result: ''
        },

        defaultRegion: ['150000', '150100', '150103'],
        dateVisible: false,
        dateResult: {
          result: ''
        },

        shortTermVisible: false,
        shortTermResult: {
          result: ''
        },

        rangeVisible:false,
				rangeResult:{
					result:""
				},
				rangeVal:['2018-12-12','2020-04-02'],

        linkageVisible: false,
        linkageVisible: false,
        linkageResult: {
          result: ''
        },
        defaultProps1: {
          label: 'name',
          value: 'id',
          children: 'child'
        },
        defaultRegion1: ['120000', '120100', '120101', '12010102'],
        options: [
          {
            id: '110000',
            name: '北京市',
            child: [
              {
                id: '110100',
                name: '北京市',
                child: [
                  {
                    id: '110101',
                    name: '东城区',
                    child: [
                      {
                        id: '11010101',
                        name: '小区1'
                      },
                      {
                        id: '11010102',
                        name: '小区2'
                      }
                    ]
                  },
                  {
                    id: '110102',
                    name: '西城区'
                  },
                  {
                    id: '110105',
                    name: '朝阳区'
                  },
                  {
                    id: '110106',
                    name: '丰台区'
                  },
                  {
                    id: '110107',
                    name: '石景山区'
                  },
                  {
                    id: '110108',
                    name: '海淀区'
                  },
                  {
                    id: '110109',
                    name: '门头沟区'
                  },
                  {
                    id: '110111',
                    name: '房山区'
                  },
                  {
                    id: '110112',
                    name: '通州区'
                  },
                  {
                    id: '110113',
                    name: '顺义区'
                  },
                  {
                    id: '110114',
                    name: '昌平区'
                  },
                  {
                    id: '110115',
                    name: '大兴区'
                  },
                  {
                    id: '110116',
                    name: '怀柔区'
                  },
                  {
                    id: '110117',
                    name: '平谷区'
                  },
                  {
                    id: '110118',
                    name: '密云区'
                  },
                  {
                    id: '110119',
                    name: '延庆区'
                  }
                ]
              }
            ]
          },
          {
            id: '120000',
            name: '天津市',
            child: [
              {
                id: '120100',
                name: '天津市',
                child: [
                  {
                    id: '120101',
                    name: '和平区',
                    child: [
                      {
                        id: '12010101',
                        name: '小区3'
                      },
                      {
                        id: '12010102',
                        name: '小区4'
                      }
                    ]
                  },
                  {
                    id: '120102',
                    name: '河东区'
                  },
                  {
                    id: '120103',
                    name: '河西区'
                  },
                  {
                    id: '120104',
                    name: '南开区'
                  },
                  {
                    id: '120105',
                    name: '河北区'
                  },
                  {
                    id: '120106',
                    name: '红桥区'
                  },
                  {
                    id: '120110',
                    name: '东丽区'
                  },
                  {
                    id: '120111',
                    name: '西青区'
                  },
                  {
                    id: '120112',
                    name: '津南区'
                  },
                  {
                    id: '120113',
                    name: '北辰区'
                  },
                  {
                    id: '120114',
                    name: '武清区'
                  },
                  {
                    id: '120115',
                    name: '宝坻区'
                  },
                  {
                    id: '120116',
                    name: '滨海新区'
                  },
                  {
                    id: '120117',
                    name: '宁河区'
                  },
                  {
                    id: '120118',
                    name: '静海区'
                  },
                  {
                    id: '120119',
                    name: '蓟州区'
                  }
                ]
              }
            ]
          }
        ]
      };
    },
    methods: {
      regionOnConfirm(res) {
        this.regionResult = res;
        console.log(res);
      },

      dateOnConfirm(res) {
        this.dateResult = res;
        console.log(res);
      },

      shortTermOnConfirm(res) {
        this.shortTermResult = res;
        console.log(res);
      },

      rangeOnConfirm(res) {
        this.rangeResult = res;
        console.log(res);
      },

      linkageOnConfirm(res) {
        this.linkageResult = res;
        console.log(res);
      },

      onCancel() {},
    }
  };
</script>

<style lang="scss">
  .example-body {
    flex-direction: column;
    padding: 30rpx;
    background-color: #ffffff;
  }
</style>
