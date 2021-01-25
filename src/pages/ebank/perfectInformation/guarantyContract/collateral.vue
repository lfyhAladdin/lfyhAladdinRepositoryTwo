<template>
  <view class="uni-container">
    <view :class="phoneSystem ?'pf-title pf-title-ios pf-titleThree':'pf-title pf-titleThree'">
      <img src="@/static/images/profession/pf-back.svg" @click="backpf">
      <text>押品信息</text>
      <text class="pf-text" @click="updateApplyInfo('TS')">暂存</text>
    </view>
    <view class="pf-content collateral-content">
      <view class="contract-ul">
        <view class="contract-li">
          <view class="beforeRed">押品类型</view>
          <view>
            <picker :range="clrTypeIdArr" :range-key="'value'" :value="clrTypeIdIndex" @change="pickerSelectorChange($event,'clrTypeId')">
              {{clrTypeIdArr[clrTypeIdIndex].value}}
            </picker>
            <img src="@/static/images/perfectInformation/formChooseArrow.svg">
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">押品名称</view>
          <view>
            <input class="uni-input" 
              placeholder="不动产登记证"  
              v-model="clrNameVal" 
              @focus="focusInput('clrName')"  
              @blur="blurInput($event,'clrName')"/>
            <text class="imgCross" v-show="clrNameFocus" @click="imgCrossClick('clrName')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
        <view class="collateral-site">
          <view class="contract-li">
            <view class="beforeRed">房屋地址</view>
            <view class="colladdress">
              <picker 
                mode="multiSelector" 
                :range="provincesList" 
                :value="provincesIndex"
                :range-key="'regionName'" 
                @columnchange="provincesColumnchange"
                @change="provincesChange">
                {{provinceZhi}},{{cityZhi}},{{areaZhi}}
              </picker>
              <img src="@/static/images/perfectInformation/formChooseArrow.svg">
            </view>
          </view>
          <view class="collateral-flex">
            <textarea 
              placeholder="请输入详细地址"  
              v-model="addressVal" 
              @focus="focusInput('address')"  
              @blur="blurInput($event,'address')" 
              auto-height fixed="true"/>
            <text class="imgCross" v-show="addressFocus" @click="imgCrossClick('address')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">小区名称</view>
          <view v-if="!residenceAddDis">
            <input class="uni-input" 
              placeholder="请输入"
              v-model="residenceAddVal" 
              @focus="focusInput('residenceAdd')"    
              @blur="blurInput($event,'residenceAdd')"/>
            <text class="imgCross" v-show="residenceAddFocus" @click="imgCrossClick('residenceAdd')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
          <view v-if="residenceAddDis">
            <text>{{residenceAddVal}}</text>
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">建筑面积（㎡）</view>
          <view>
            <input class="uni-input" 
              placeholder="请输入"  
              v-model="floorAreaVal" 
              @focus="focusInput('floorArea')"    
              @blur="blurInput($event,'floorArea')"/>
            <text class="imgCross" v-show="floorAreaFocus" @click="imgCrossClick('floorArea')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">房屋总价款（元）</view>
          <view>
            <!--<input class="uni-input" 
              placeholder="购入价"  
              v-model="totalPriceVal" 
              @focus="focusInput('totalPrice')"    
              @blur="blurInput($event,'totalPrice')"/>
            <text class="imgCross" v-show="totalPriceFocus" @click="imgCrossClick('totalPrice')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>-->
            <text>{{totalPriceVal}}</text>
          </view>
        </view>
        <view class="contract-li" v-if="distinguishOneTwo">
          <view class="beforeRed">房屋年限</view>
          <view>
            <input class="uni-input"  
              v-model="buyYearVal" 
              @focus="focusInput('buyYear')" 
              @blur="blurInput($event,'buyYear')"/>
            <text class="imgCross" v-show="buyYearFocus" @click="imgCrossClick('buyYear')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">土地使用权类型</view>
          <view>
            <picker :range="attribute_3Arr" :range-key="'value'" :value="attribute_3Index" @change="pickerSelectorChange($event,'attribute_3')">
              {{attribute_3Arr[attribute_3Index].value}}
            </picker>
            <img src="@/static/images/perfectInformation/formChooseArrow.svg">
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">总楼层</view>
          <view>
            <input class="uni-input"  
              v-model="storeyHeighttVal" 
              @focus="focusInput('storeyHeightt')" 
              @blur="blurInput($event,'storeyHeightt')"/>
            <text class="imgCross" v-show="storeyHeighttFocus" @click="imgCrossClick('storeyHeightt')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">房屋所在楼层</view>
          <view>
            <input class="uni-input"  
              v-model="realtyHeightVal" 
              @focus="focusInput('realtyHeight')"  
              @blur="blurInput($event,'realtyHeight')"/>
            <text class="imgCross" v-show="realtyHeightFocus" @click="imgCrossClick('realtyHeight')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
        <view class="contract-li" v-show="clrTypeIdFals">
          <view class="beforeRed">竣工时间</view>
          <view>
            <picker mode="date" fields="year" :value="completionDateVal" :start="startDate" :end="endDate" @change="dateChange($event,'completionDate')">
              {{completionDateVal}}
            </picker>
            <img src="@/static/images/perfectInformation/formChooseArrow.svg">
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">房屋结构</view>
          <view>
            <picker :range="number7Arr" :range-key="'value'" :value="number7Index" @change="pickerSelectorChange($event,'number7')">
              {{number7Arr[number7Index].value}}
            </picker>
            <img src="@/static/images/perfectInformation/formChooseArrow.svg">
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">户型</view>
          <view>
            <picker :range="houseTypeArr" :range-key="'value'" :value="houseTypeIndex" @change="pickerSelectorChange($event,'houseType')">
              {{houseTypeArr[houseTypeIndex].value}}
            </picker>
            <img src="@/static/images/perfectInformation/formChooseArrow.svg">
          </view>
        </view>
        <view class="contract-li">
          <view class="beforeRed">主抵押人（质押人）</view>
          <view>
            <text>{{ownerName1Val}}</text>
          </view>
        </view>
        <view class="contract-li">
          <view>其他抵押人（质押人）</view>
          <view @click="toMortgagor">
            <text>{{ypviceGuarantorNameVal}}</text>
            <img src="@/static/images/perfectInformation/formChooseArrow.svg">
          </view>
        </view>
        <view class="contract-li" v-if="distinguishOneTwo">
          <view class="beforeRed">抵押物评估方式</view>
          <view>
            <picker :range="currevalModeArr" :range-key="'value'" :value="currevalModeIndex" @change="pickerSelectorChange($event,'currevalMode')">
              {{currevalModeArr[currevalModeIndex].value}}
            </picker>
            <img src="@/static/images/perfectInformation/formChooseArrow.svg">
          </view>
        </view>
        <view class="contract-li" v-show="dcurrevalOrgDis">
          <view class="beforeRed">评估机构</view>
          <view @click="ratingAgencies">
            <text>{{dcurrevalOrgNameVal}}</text>
            <img src="@/static/images/perfectInformation/search.svg">
          </view>
        </view>
        <view class="contract-li" v-if="distinguishOneTwo">
          <view class="beforeRed">评估价值</view>
          <view>
            <input class="uni-input" 
              placeholder="请输入"  
              v-model="currevalValueVal" 
              @focus="focusInput('currevalValue')"
              @blur="blurInput($event,'currevalValue')"/>
            <text class="imgCross" v-show="currevalValueFocus" @click="imgCrossClick('currevalValue')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
        <view class="contract-li" v-if="distinguishOneTwo">
          <view class="beforeRed">认定价值</view>
          <!--<view>{{drCurrevalValueVal}}</view>-->
          <view>
            <input class="uni-input" 
              placeholder="请输入"  
              v-model="drCurrevalValueVal" 
              @focus="focusInput('drCurrevalValue')"    
              @blur="blurInput($event,'drCurrevalValue')"/>
            <text class="imgCross" v-show="drCurrevalValueFocus" @click="imgCrossClick('drCurrevalValue')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
        <view class="contract-li">
          <view>抵质押率</view>
          <view>{{guarantyRateVal}}</view>
        </view>
        <view class="contract-li">
          <view>备注（选填）</view>
          <view>
            <input class="uni-input" 
              placeholder="请输入备注信息"  
              v-model="mortgageUnitVal" 
              @focus="focusInput('mortgageUnit')"   
              @blur="blurInput($event,'mortgageUnit')"/>
            <text class="imgCross" v-show="mortgageUnitFocus" @click="imgCrossClick('mortgageUnit')">
              <img src="@/static/images/perfectInformation/cross.svg">
            </text>
          </view>
        </view>
      </view>
      <view class="contract-button">
        <button type="primary" @click="updateApplyInfo('save')">保存</button>
        <button type="primary" plain="true" @click="updateApplyInfo('delete')">删除</button>
      </view>
    </view>
  </view>
</template>

<script>
  import filter from '@/utils/filters';  //格式化金额、证件号等
  import {mapGetters, mapMutations, mapActions } from 'vuex';
  export default {
    components: {},
    data() {
      const currentDate = this.getDate({format: true});
      return {
        collateralTypeIndex: 1,
        contractTypeArr: [
          {
            'key': '01',
            'value': '测试1'
          },
          {
            'key': '02',
            'value': '测试2'
          },
        ],
        completionDateVal: currentDate,
        provincesIndex: [0,0,0],
        provincesList: [
          [
            {
              'regionId': '110000',
              'regionName': '北京市',
              'regionParentId': '000000'
            }
          ],
          [
            {
              'regionId': '110100',
              'regionName': '北京市',
              'regionParentId': '110000'
            }
          ],
          [
            {
              'regionId': '110101',
              'regionName': '东城区',
              'regionParentId': '110100'
            }
          ]
        ],
        // provincesListData: [],  //省市区三级级联数据--全部
        clrTypeIdIndex: 0,
        clrTypeIdArr: [
          {
            'key': '10100100100',
            'value': '普通商品房'
          }
        ],
        attribute_3Index: 0,
        attribute_3Arr: [
          {
            'key': '01',
            'value': '出让'
          }
        ],
        number7Index: 0,
        number7Arr: [
          {
            'key': '40',
            'value': '钢砼结构'
          }
        ],
        houseTypeIndex: 0,
        houseTypeArr: [
          {
            'key': '1',
            'value': '三室两厅'
          }
        ],
        currevalModeIndex: 0,
        currevalModeArr: [
          {
            'key': '1',
            'value': '内部评估'
          }
        ],
        provinceVal: '110000',
        cityVal: '110100',
        areaVal: '110101',
        provinceZhi: '北京市',
        cityZhi: '北京市',
        areaZhi: '东城区',
        addressVal: '',
        addressFocus: false,
        clrTypeIdVal: '10100100100',
        attribute_3Val: '01',
        number7Val: '40',
        houseTypeVal: '1',
        currevalModeVal: '1',
        clrNameVal: '不动产登记证',
        clrNameFocus: false,
        residenceAddVal: '',  //一手房默认项目名称，不可修改；二手房可输
        residenceAddFocus: false,
        residenceAddDis: true,
        floorAreaVal: '',
        floorAreaFocus: false,
        totalPriceVal: '',
        // totalPriceFocus: false,
        storeyHeighttVal: '',
        storeyHeighttFocus: false,
        realtyHeightVal: '',
        realtyHeightFocus: false,
        currevalValueVal: '',
        currevalValueFocus: false,
        drCurrevalValueVal: '',
        drCurrevalValueFocus: false,
        guarantyRateVal: '',
        mortgageUnitVal: '',
        mortgageUnitFocus: false,
        dcurrevalOrgIDVal: '',
        dcurrevalOrgNameVal: '',
        buyYearVal: '',
        buyYearFocus: '',
        orderNoVal: '',  //订单编号
        applyNoVal: '',  //申请编号
        businessTypeVal: '',  //业务品种
        collateralArrBox: [
          'clrTypeId',
          'attribute_3',
          'number7',
          'houseType',
          'currevalMode'
        ],
        relativeSumMoney: '',  //担保合同中的担保金额relativeSum，抵质押率 = 本金担保金额/认定价值；
        certtypeVal: '',  //抵押人（出质人）证件类型，不可修改
        certIdVal: '',  //抵押人（出质人）证件号码，不可修改
        ownerName1Val: '',  //抵押人（出质人）名称，不可修改
        ypviceGuarantorNameVal: '',  //其他担保人姓名
        distinguishOneTwo: false,  //一手房false;二手房true
        dcurrevalOrgDis: false,  //评估机构默认不显示
        preventResubmit: true,  //防重复提交
        clrTypeIdFals: true,  //竣工时间默认显示
        requiredField:[
          {
            'key': 'clrName',
            'value': '押品名称',
            'boolean': true,
            'checkOut': false,
          },
          {
            'key': 'address',
            'value': '详细地址',
            'boolean': true,
            'checkOut': false,
          },
          {
            'key': 'residenceAdd',
            'value': '小区名称',
            'boolean': false,
            'checkOut': true,
          },
          {
            'key': 'floorArea',
            'value': '建筑面积',
            'boolean': true,
            'checkOut': false,
          },
          // {
          //   'key': 'totalPrice',
          //   'value': '房屋总价款',
          //   'boolean': true,
          //   'checkOut': false,
          // },
          {
            'key': 'storeyHeightt',
            'value': '总层数',
            'boolean': true,
            'checkOut': false,
          },
          {
            'key': 'realtyHeight',
            'value': '房屋所在楼层',
            'boolean': true,
            'checkOut': false,
          },
          {
            'key': 'currevalValue',
            'value': '评估价值',
            'boolean': false,
            'checkOut': true,
          },
          {
            'key': 'drCurrevalValue',
            'value': '认定价值',
            'boolean': false,
            'checkOut': true,
          },
          {
            'key': 'buyYear',
            'value': '房屋年限',
            'boolean': false,
            'checkOut': true,
          },
        ],
        clrIdVal: '',  //押品编号
      }
    },
    onLoad() {
      console.log(123)
    },
    onReady() {},
    onShareAppMessage() {},
    computed: {
      ...mapGetters([
        'queryDictionaryListObj',
        'gcSerialNo',
        'queryApplyInfoList',
        'ypguarantorNameFVal',
        'ypmainMortgagorObj',
        'ypviceMortgagorArr',
        'collateralInputList',
        'collateralPickerList',
        'approvalIngList',
        'provincesListData'
      ]),
      startDate() {
        return this.getDate('start');
      },
      endDate() {
        return this.getDate('end');
      }
    },
    created(){
      // console.log(this.queryApplyInfoList.clrList)
      // console.log('押品信息')
      // console.log(this.ypguarantorNameFVal);
      // console.log(this.ypmainMortgagorObj)
      // console.log(this.collateralInputList)
      console.log(this.approvalIngList)
      console.log('订单编号')
     
      this.deassignValue();
    },
    methods: {
      ...mapMutations(['collateralInputListReplace','collateralPickerListReplace']),
      ...mapActions(['queryApplyInfoCommit']),
      //修改/编辑押品时，重新赋值
      deassignValue(){
        this.orderNoVal = this.approvalIngList.orderNo;
        this.applyNoVal = this.approvalIngList.serialNo;
        this.businessTypeVal = this.approvalIngList.businessType;
        this.totalPriceVal = Number(this.queryApplyInfoList.businessSum) + Number(this.queryApplyInfoList.firstValue);
        
        this.certtypeVal = this.queryApplyInfoList.customerCertType;  
        this.certIdVal = this.queryApplyInfoList.customerCertID;  
        this.ownerName1Val = this.queryApplyInfoList.fullName;
        this.residenceAddVal = this.queryApplyInfoList.projectName;

        if(this.ypviceMortgagorArr.length > 0){
          this.ypviceGuarantorNameVal = this.ypviceMortgagorArr[0].guarantorName;
        }

        if(this.approvalIngList.businessType2 != undefined && this.approvalIngList.businessType2.includes('一手')){
          this.distinguishOneTwo = false;
          this.residenceAddDis = true;
          this.requiredField.forEach(item=>{
            if(item.checkOut){
              item.boolean = false;
            }
          });
          this.guarantyRateVal = (this.queryApplyInfoList.businessSum / this.totalPriceVal).toFixed(2);
        }else{
          this.distinguishOneTwo = true;
          this.residenceAddDis = false;
          this.requiredField.forEach(item=>{
            if(item.checkOut){
              item.boolean = true;
            }
          })
        }

        this.relativeSumMoney = this.queryApplyInfoList.guarantyList[0].relativeSum;
        
        let obj2 = this.queryDictionaryListObj;  //给各个下拉框赋值
        if(Object.keys(obj2).length != 0){
          for(let k in obj2){
            if(obj2[k] != ''){
              this[k] = obj2[k];
            }
          };
        };
        if(this.queryApplyInfoList.clrList != null){
          let clrListArrSZ = this.queryApplyInfoList.clrList[0];
          console.log(clrListArrSZ)
          console.log('押品信息')
          for(let k in clrListArrSZ){
            if(clrListArrSZ[k] != ''){
              this[`${k}Val`] = clrListArrSZ[k];
            }
          };
        }
        this.collateralArrBox.forEach((item,index)=>{
          this[`${item}Arr`].forEach((item1,index1)=>{
            if(item1.key == this[`${item}Val`]){
              this[`${item}Index`] = index1;
            }
          });
        });
        let obj3 = this.collateralPickerList;
        let obj = this.collateralInputList;
        if(Object.keys(obj).length != 0){
          console.log(obj)
          for(let k in obj){
            if(obj[k] != ''){
              this[k] = obj[k];
            }
          };
        }
        if(Object.keys(obj3).length != 0){
          for(let k in obj3){
            if(obj3[k] != ''){
              this[k] = obj3[k];
            }
          };
        };
        if(this.currevalModeVal == '2'){
          this.dcurrevalOrgDis = true;
        }else{
          this.dcurrevalOrgDis = false;
        }
        console.log(this.provinceVal,this.cityVal,this.areaVal)
        this.provincesMate(this.provinceVal,this.cityVal,this.areaVal);
      },
      provincesObj(v){
        let obj = {
          'regionId': v.regionId,
          'regionName': v.regionName,
          'regionParentId': v.regionParentId
        }
        return obj;
      },
      //获取省市区三级级联数据
      regionListAllQuery(){
        let arr = this.provincesListData;
        this.provincesList[0] = arr.map((v)=>{return this.provincesObj(v);});
        if(this.areaZhi == this.provinceZhi){
          this.provincesList[1] = [];
          this.provincesList[2] = [];
        }else{
          this.provincesList[1] = arr[this.provincesIndex[0]].children.map((v)=>{return this.provincesObj(v);});
          this.provincesList[2] = arr[this.provincesIndex[0]].children[this.provincesIndex[1]].children.map((v)=>{return this.provincesObj(v);});
        }
        // console.log(this.provincesListData);
        // console.log(this.provincesList)
        // console.log(this.provinceZhi,this.cityZhi,this.areaZhi)
      },
      //地址三级联动
      provincesColumnchange(event){
        let e = event.detail;
        let arr = this.provincesListData;
        // console.log(event)
        this.provincesIndex[e.column] = e.value;
        //省级不会变，不需要重新赋值
        if(arr[this.provincesIndex[0]].children.length == 0){
          this.provincesList[1] = [];
          this.provincesList[2] = [];
        }else{
          this.provincesList[1] = arr[this.provincesIndex[0]].children.map((v)=>{return this.provincesObj(v);});
          this.provincesList[2] = arr[this.provincesIndex[0]].children[this.provincesIndex[1]].children.map((v)=>{return this.provincesObj(v);});
        }
      },
      provincesChange(e){
        // console.log(e)
        this.provincesIndex = e.target.value;
        this.provinceVal = this.provincesList[0][this.provincesIndex[0]].regionId;
        this.provinceZhi = this.provincesList[0][this.provincesIndex[0]].regionName;
        if(this.provincesList[1].length == 0){
          this.cityVal = this.provinceVal;
          this.areaVal = this.provinceVal;
          this.cityZhi = this.provinceZhi;
          this.areaZhi = this.provinceZhi;
        }else{
          this.cityVal = this.provincesList[1][this.provincesIndex[1]].regionId;
          this.areaVal = this.provincesList[2][this.provincesIndex[2]].regionId;
          this.cityZhi = this.provincesList[1][this.provincesIndex[1]].regionName;
          this.areaZhi = this.provincesList[2][this.provincesIndex[2]].regionName;
        };
        // console.log(this.provinceZhi,this.cityZhi,this.areaZhi)
        // console.log(this.provinceVal,this.cityVal,this.areaVal)
        this.collateralInputListReplace({
          'key': 'provinceVal',
          'value': this.provinceVal,
        });
        this.collateralInputListReplace({
          'key': 'cityVal',
          'value': this.cityVal,
        });
        this.collateralInputListReplace({
          'key': 'areaVal',
          'value': this.areaVal,
        });
      },
      //地址与后台返回的值相匹配
      provincesMate(province,city,area){
        this.provincesListData.forEach((item,index)=>{
          if(item.regionId == province){
            this.provincesIndex[0] = index;
            this.provinceZhi = item.regionName;
            console.log(item)
            if(item.children.length == 0){
              this.provincesIndex[1] = 0;
              this.provincesIndex[2] = 0;
              this.cityZhi = this.provinceZhi;
              this.areaZhi = this.provinceZhi;
              return;
            }
            item.children.forEach((item1,index1)=>{
              if(item1.regionId == city){
                this.provincesIndex[1] = index1;
                this.cityZhi = item1.regionName;
                item1.children.forEach((item2,index2)=>{
                  if(item2.regionId == area){
                    this.provincesIndex[2] = index2;
                    this.areaZhi = item2.regionName;
                  }
                })
              }
            })
          }
        });
        // console.log(this.provinceZhi,this.cityZhi,this.areaZhi)
        // console.log(this.provincesIndex)
        this.regionListAllQuery();
      },
      //下拉选择框
      pickerSelectorChange(e,name){
        console.log(e)
        this[`${name}Index`] = e.target.value;
        this[`${name}Val`] = this[`${name}Arr`][this[`${name}Index`]].key;
        this.collateralInputListReplace({
          'key': `${name}Val`,
          'value': this[`${name}Arr`][this[`${name}Index`]].key,
        });
        this.collateralPickerListReplace({
          'key': `${name}Index`,
          'value': e.target.value,
        });
        if(name == 'currevalMode'){
          if(this.currevalModeVal == '2'){
            this.dcurrevalOrgDis = true;
          }else{
            this.dcurrevalOrgDis = false;
          }
        }
        if(name == 'clrTypeId'){
          if(this.clrTypeIdVal == '10110100100' || this.clrTypeIdVal == '10110100110'){
            this.clrTypeIdFals = false;
          }else{
            this.clrTypeIdFals = true;
          }
        }
      },
      //日期选择
      dateChange(e,name){
        console.log(e)
        this[`${name}Val`] = e.target.value.slice(0,4);
        this.collateralInputListReplace({
          'key': `${name}Val`,
          'value': e.target.value,
        });
      },
      //输入框
      blurInput(e,name){
        this[`${name}Val`] = e.target.value;
        // this[`${name}Focus`] = false;
        this.collateralInputListReplace({
          'key': `${name}Val`,
          'value': e.target.value,
        });
        if(this.distinguishOneTwo){
          if(name == 'drCurrevalValue'){
            this.guarantyRateVal = (this.queryApplyInfoList.businessSum / this.drCurrevalValueVal).toFixed(2);
            this.collateralInputListReplace({
              'key': 'guarantyRateVal',
              'value': this.guarantyRateVal,
            });
          }
        };
      },
      focusInput(name){
        this[`${name}Focus`] = true;
      },
      imgCrossClick(name){
        this[`${name}Val`] = '';
        this.collateralInputListReplace({
          'key': `${name}Val`,
          'value': '',
        });
        this[`${name}Focus`] = false;
        // if(name == 'totalPrice'){
        //   this.guarantyRateVal = '';
        // }
      },
      //申请信息更新
      updateApplyInfo(e){
        //TS暂存  save保存  delete删除
        if(!this.preventResubmit){
          yu.showModal({
            content: '操作进行中，请稍等',
            showCancel: false,
            cancelText: "确定",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
            }
          });
          return;
        };
        let data = {};
        let clrListObj = [];
        let otherClrList = [];
        if(this.currevalModeVal != '2'){
          this.dcurrevalOrgIDVal = '';
          this.dcurrevalOrgNameVal = '';
        }
        if(e == 'TS' || e == 'save'){
          if(e == 'save'){
            let requiredFieldArr = this.requiredField;
            console.log(requiredFieldArr)
            for(let i=0; i<requiredFieldArr.length; i++){
              if(requiredFieldArr[i].boolean && this[`${requiredFieldArr[i].key}Val`] == ''){
                console.log(requiredFieldArr[i])
                yu.showToast({
                  title: requiredFieldArr[i].value+'为必输项，请输入后再提交',
                  icon: 'none',
                  duration: 3000
                });
                return;
              }
            }
          };
          clrListObj =  [{
            'gcSerialNo': this.gcSerialNo,  //担保合同号
            'clrId': this.clrIdVal,  //押品编号
            'clrTypeId': this.clrTypeIdVal,  //押品类型
            'clrName': this.clrNameVal,  //押品名称
            'province': this.provinceVal,  //所在省/直辖市
            'city': this.cityVal,  //所在城市
            'area': this.areaVal,  //所在区域
            'address': this.addressVal,  //房屋详细地址
            'residenceAdd': this.residenceAddVal,  //小区名称
            'floorArea': this.floorAreaVal,  //建筑面积（平方米）
            'totalPrice': this.totalPriceVal,  //房屋总价款（元）
            'buyYear': this.buyYearVal,  //房屋年限
            'attribute_3': this.attribute_3Val,  //土地使用权类型
            'storeyHeightt': this.storeyHeighttVal,  //总层数
            'realtyHeight': this.realtyHeightVal,  //房屋所在楼层
            'completionDate': this.completionDateVal,  //竣工时间
            'number7': this.number7Val,  //房屋结构
            'houseType': this.houseTypeVal,  //户型
            'ownerType': '02',  //抵押人（出质人）客户类型
            'ownerName1': this.ownerName1Val,  //抵押人（出质人）名称
            'certtype': this.certtypeVal,  //抵押人（出质人）证件类型
            'certId': this.certIdVal,  //抵押人（出质人）证件号码
            'currevalMode': this.currevalModeVal,  //抵质押物评估方式
            'dcurrevalOrgID': this.dcurrevalOrgIDVal,  //价值评估机构编号
            'dcurrevalOrgName': this.dcurrevalOrgNameVal,  //价值评估机构名称
            'currevalDate': '',  //价值评估时间
            'currevalValue': this.currevalValueVal,  //评估价值（元）
            'drCurrevalValue': this.drCurrevalValueVal,  //认定价值（元）
            'limitValue': this.queryApplyInfoList.businessSum,  //本次担保金额
            'guarantyRate': this.guarantyRateVal,  //抵质押率
            'mortgageUnit': this.mortgageUnitVal,  //备注
          }];
          otherClrList = this.ypviceMortgagorArr;
          if(otherClrList.length > 0){
            data = {
              'orderNo': this.orderNoVal,
              'applyNo': this.applyNoVal,
              'businessType': this.businessTypeVal,  //业务品种
              'listName': 'clrList',  //更新列表名称
              'clrList': clrListObj,
              'otherClrList': otherClrList
            };
          }else{
            data = {
              'orderNo': this.orderNoVal,
              'applyNo': this.applyNoVal,
              'businessType': this.businessTypeVal,  //业务品种
              'listName': 'clrList',  //更新列表名称
              'clrList': clrListObj,
            };
          }
        }else{
          // clrListObj = [];
          data = {
            'orderNo': this.orderNoVal,
            'applyNo': this.applyNoVal,
            'businessType': this.businessTypeVal,  //业务品种
            'listName': 'clrList',  //更新列表名称
            'clrList': [],
          };
        };
        this.preventResubmit = false;
        yu.showLoading();
        this.interfaceRequest('/api/credit/updateApplyInfo',data,"post",(res)=>{
          console.log(res.data.data)
          yu.hideLoading();
          this.preventResubmit = true;
          if(res.data.data.returnCode != 'Success'){
            yu.showToast({
              title: res.data.data.returnDesc,
              icon: 'none',
              duration: 3000
            });
            return;
          };
          if(e == 'TS'){
            yu.showToast({
              title: '暂存成功',
              image: './static/images/perfectInformation/success.svg',
              duration: 2000
            });
            yu.showModal({
              title: "暂存成功",
              content: res.data.data.returnDesc,
              showCancel: false,
              confirmText: "我知道了",
              success: res => {
                // if (res.confirm) {
                //   console.log("用户点击确定");
                // }
              }
            });
            this.queryApplyInfoCommit({
              'orderNo': this.orderNoVal,
              'applyNo': this.applyNoVal,
            }); //重新调'申请信息查询'接口，确保担保合同信息列表准确
          }else{
            yu.showToast({
              title: res.data.data.returnDesc,
              icon: 'none',
              duration: 3000
            });
            setTimeout(()=>{
              this.queryApplyInfoCommit({
                'orderNo': this.orderNoVal, 
                'applyNo': this.applyNoVal,
                'routerTrue': true,
                'routerTo': 'guarantyContract',
                'routerJumpWay': 'navigateTo'
              }); //重新调'申请信息查询'接口，确保担保合同信息列表准确
            },3000);
          }
        },(err)=>{
          console.log(err)
          yu.hideLoading();
          this.preventResubmit = true;
          yu.showToast({
            title: '3.12更新失败，请联系管理员',
            icon: 'none',
            duration: 3000
          });
        });
      },
      //抵押人(质押人)
      toMortgagor(){
        yu.navigateTo({
          url: 'mortgagor?applyPhase=02',
        });
      },
      //日期选择器
      getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // let day = date.getDate();

        if (type === 'start') {
            year = year - 30;
        } else if (type === 'end') {
            year = year + 30;
        }
        // month = month > 9 ? month : '0' + month;;
        // day = day > 9 ? day : '0' + day;
        // return `${year}-${month}-${day}`;
        return (year).toString();
      },
      //返回
      backpf(){
        yu.showModal({
          title: '确定返回？',
          content: '数据还未提交，点确定后编辑过的内容将不保存',
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              yu.navigateTo({
                url: 'newGuarantyContract',
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
      // //评估机构
      ratingAgencies(){
        yu.navigateTo({
          url: 'ratingAgencies',
        });
      },
    }
  }
</script>

<style lang='scss'>
  @import '~@styles/uni-nvue.css';
  .uni-container{
    background-color: #FFFFFF;
    padding: 0 0 30rpx 0;
    .collateral-content{
      .contract-li{
        .imgCross{
          img{
            margin-left: 0;
          }
        }
      }
      .contract-li:last-of-type{
        border-bottom: 2rpx solid #E5E5E5;
      }
      .collateral-site{
        border-bottom: 2rpx solid #E5E5E5;
        .contract-li{
          border-bottom: none;
          padding: 30rpx 40rpx 10rpx 10rpx;
        }
        .collateral-flex{
          display: flex;
          align-items: center;
          padding: 0 0 10rpx 24rpx;
          .uni-input{
            .uni-input-placeholder{
              color: #C7C9CD;
            }
          }
          uni-textarea{
            font-size: 14px;
            width: 100%;
            color: #999999;
          }
          .imgCross{
            img{
              height: 24rpx;
              margin-right: 40rpx;
            }
          }
        }
        
      }

    }
  }
</style>