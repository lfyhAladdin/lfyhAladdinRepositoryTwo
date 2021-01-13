/**
 * form表单验证，用法eg：
 * <form @submit="formSubmit" @reset="formReset">
 *     <input class="uni-input" name="nickname" placeholder="请填写您的昵称" />
 * </form>
 * const  dataChecker = require("../../../common/dataChecker.js");
 * var rule = [
 *    {name:"nickname", checkType : "string", checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"}
 *  ];
 * var formData = e.detail.value;
 * var checkRes = dataChecker.check(formData, rule);
 * 根据业务需要，可以自行加入其它表单验证项
 */
module.exports = {
  error: '',
  check: function (data, rule) {
    for (var i = 0; i < rule.length; i++) {
      if (!rule[i].checkType) {
        return true;
      }
      if (!rule[i].name) {
        return true;
      }
      if (!rule[i].errorMsg) {
        return true;
      }
      if (!data[rule[i].name]) {
        this.error = rule[i].errorMsg; return false;
      }
      switch (rule[i].checkType) {
      case 'string':// 字符串类型
        var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
        if (!reg.test(data[rule[i].name])) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
      case 'int': // 整数
        var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
        if (!reg.test(data[rule[i].name])) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
        break;
      case 'between':// 数值范围
        if (!this.isNumber(data[rule[i].name])) {
          this.error = rule[i].errorMsg;
          return false;
        }
        var minMax = rule[i].checkRule.split(',');
        minMax[0] = Number(minMax[0]);
        minMax[1] = Number(minMax[1]);
        if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
          this.error = rule[i].errorMsg;
          return false;
        }
        break;
      case 'betweenD':// 自然数范围
        var reg = /^-?[1-9][0-9]?$/;
        if (!reg.test(data[rule[i].name])) {
          this.error = rule[i].errorMsg; return false;
        }
        var minMax = rule[i].checkRule.split(',');
        minMax[0] = Number(minMax[0]);
        minMax[1] = Number(minMax[1]);
        if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
          this.error = rule[i].errorMsg;
          return false;
        }
        break;
      case 'betweenF': // 浮点数值范围
        var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
        if (!reg.test(data[rule[i].name])) {
          this.error = rule[i].errorMsg; return false;
        }
        var minMax = rule[i].checkRule.split(',');
        minMax[0] = Number(minMax[0]);
        minMax[1] = Number(minMax[1]);
        if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
          this.error = rule[i].errorMsg;
          return false;
        }
        break;
      case 'same':// name与规则内容相同
        if (data[rule[i].name] != rule[i].checkRule) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
      case 'notsame':// name不能与规则内容相同
        if (data[rule[i].name] == rule[i].checkRule) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
      case 'email':// 邮箱地址
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reg.test(data[rule[i].name])) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
      case 'phoneno':// 手机号
        var reg = /^1[0-9]{10,10}$/;
        if (!reg.test(data[rule[i].name])) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
      case 'zipcode':// 邮编
        var reg = /^[0-9]{6}$/;
        if (!reg.test(data[rule[i].name])) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
      case 'reg':// 自定义正则规则
        var reg = new RegExp(rule[i].checkRule);
        if (!reg.test(data[rule[i].name])) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
      case 'in':// 性别
        if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
      case 'notnull':// 非空
        if (data[rule[i].name] == null || data[rule[i].name].length < 1) {
          this.error = rule[i].errorMsg; return false;
        }
        break;
      }
    }
    return true;
  },
  isNumber: function (checkVal) {
    var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
    return reg.test(checkVal);
  }
};