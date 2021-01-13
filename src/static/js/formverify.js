export default {
  install (Vue) {
    // 姓名校验
    Vue.prototype.checkName = function (customerName) {
      var reg = /^[\u4E00-\u9FA5\.]{2,20}$/g;
      if(customerName==''){
        this.verifyName.isTipShow = true;
        this.verifyName.tipText = '姓名不能为空';
      }else if(!reg.test(customerName)){
        this.verifyName.isTipShow = true
        this.verifyName.tipText = '姓名只能输入中文和“.”，2-20个字';
      }
    }
    // 曾用名校验
    Vue.prototype.checkNameUsed = function (customerName,idx) {
      var reg = /^[\u4E00-\u9FA5\.]{2,20}$/g;
      if(customerName!='' && !reg.test(customerName)){
        this.personInfor.nameUsedList[idx].isTipShow=true
      }
    }
    //身份证号校验
    Vue.prototype.checkIdcard = function (idcard) {
      var reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if(idcard==''){
        this.verifyIdcard.isTipShow = true;
        return;
      }
      if(reg.test(idcard)){
        this.verifyIdcard.isTipShow = false
        if(idcard[16]%2==0){
          this.personInfor.sex='女'
        }else{
          this.personInfor.sex='男'
        }
        this.personInfor.birthday=idcard.substring(6,10)+'-'+idcard.substring(10,12)+'-'+idcard.substring(12,14)
      }else{
        this.verifyIdcard.isTipShow = true
      }
    }
    // 手机号校验
    Vue.prototype.checkPhone = function (phone) {
      var reg = /^1\d{10}$/g;
      if(phone==''){
        this.verifyPhone.isTipShow = true;
        this.verifyPhone.tipText = '请输入11位手机号码';
      }else if(!reg.test(phone)){
        this.verifyPhone.isTipShow = true
        this.verifyPhone.tipText = '请输入11位有效手机号码';
      }
    }
    // 个人年收入校验
    Vue.prototype.checkYearIncome = function (income) {
      var reg = /^1\d{10}$/g;
      if(income==''){
        this.verifyYearIncome.isTipShow = true;
        this.verifyYearIncome.tipText = '个人年收入不能为空';
      }
    }

    // 邮编校验
    Vue.prototype.checkPostCode = function (postcode) {
      var reg = /^\d{6}$/g;
      if(postcode==''){
        this.verifyPostcode.isTipShow = true;
        this.verifyPostcode.tipText = '居住地址邮编不能为空';
      }else if(!reg.test(postcode)){
        this.verifyPostcode.isTipShow = true;
        this.verifyPostcode.tipText = '请输入6位数字';
      }
    }

    // 单位名称校验
    Vue.prototype.checkCompanyName = function (name) {
      var reg = /^[\u4e00-\u9fa5\(\)（）\da-zA-Z&]{1,40}$/gi;
      if(name==''){
        this.verifyCompanyName.isTipShow = true;
        this.verifyCompanyName.tipText = '单位名称不能为空';
      }else if(!reg.test(name)){
        this.verifyCompanyName.isTipShow = true;
        this.verifyCompanyName.tipText = '请输入合法的单位名称';
      }
    }

    // 单位地址校验
    Vue.prototype.checkCompanyAddress = function (address) {
      // var reg1 = /^.+(区|镇).+(路|街).+号.+号楼.+单元.+(室|户).*$/gi;
      // var reg2 = /^.+(路|街).+号.+号楼.+单元.+(室|户).*$/gi;
      // var reg3 = /^.+县.+(路|街).+号.+号楼.+单元.+(室|户).*$/gi;
      // var reg4 = /^.+县.+(镇|乡).+(路|街).+号.+号楼.+单元.+(室|户).*$/gi;
      // var reg5 = /^.+(区|镇).+小区.+号楼.+单元.+(室|户).*$/gi;
      // var reg6 = /^.+小区.+号楼.+单元.+(室|户).*$/gi;
      // var reg7 = /^.+县.+小区.+号楼.+单元.+(室|户).*$/gi;
      // var reg8 = /^.+县.+(镇|乡).+小区.+号楼.+单元.+(室|户).*$/gi;
      // var reg9 = /^.+(路|街|里).+号.+(室|户).*$/gi;
      // var reg10 = /^.+(镇|乡).+村.+(组|屯).+号.*$/gi;
      // var reg11 = /^.+(镇|乡|街).+(村|屯).+(组|号).*$/gi;
      // if(address==''){
      //   this.verifyCompanyAddress.isTipShow = true;
      //   this.verifyCompanyAddress.tipText = '单位地址不能为空';
      //   return;
      // }
      // if(reg1.test(address) || reg2.test(address) || reg3.test(address) || reg4.test(address) || reg5.test(address) || reg6.test(address) || reg7.test(address) || reg8.test(address) || reg9.test(address) || reg10.test(address) || reg11.test(address)){
      //   console.log('地址合法')
      // }else{
      //   this.verifyCompanyAddress.isTipShow = true;
      //   this.verifyCompanyAddress.tipText = '请输入合法的单位地址';
      // }
    }

    // 单位电话校验
    Vue.prototype.checkTelephone = function (telephone) {
      var reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/gi;
      if(telephone==''){
        this.verifyTelephone.isTipShow = true;
        this.verifyTelephone.tipText = '单位电话不能为空';
      }else if(!reg.test(telephone)){
        this.verifyTelephone.isTipShow = true;
        this.verifyTelephone.tipText = '请输入合法的单位电话';
      }
    }



    Vue.prototype.$bus = new Vue()
  }
}
