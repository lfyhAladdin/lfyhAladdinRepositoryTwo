<template>
  <view class="information-box">
    <view class="pf-title pf-titleTwo">
      <img src="@/static/images/firstroom/backArrow.svg" @click="navigateBack">
      <text>{{title}}</text>
    </view>
    <view class="pf-content image-list-con">
      <view class="image-information" v-for="(item,index) in imagelists" :key="index">
        <view class="title" v-if="item.busiFileTypeName != 'undefined'" ><text class="title-line"></text><text>{{item.busiFileTypeName}}</text></view>
        <view class="image-list">
          <view class="item after-upload" v-for="(imageOne,i) in item.downloadImageDtoList" :key="i">
            <img v-if="item.isIDCard" @click="delImage(imageOne.busiFileType,imageOne.originName)" class="image-del" src="@/static/images/perfectInformation/imageDel.svg">
            <img class="image-con" :src="imageOne.base64CodeUrl">
          </view>
          <view class="item before-upload" v-if="item.isIDCard">
            <img class="image-del" src="@/static/images/perfectInformation/imageDel.svg">
            <img v-show="false" class="image-con">
            <view class="image-con upload-image" ref="uploadimg" :id="item.busiFileType" @click="upload">
            <img class="huiyuan_img" :src="idcard.image" mode="">
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import { pathToBase64, base64ToPath } from '@/static/js/imagetools.js';
export default {
  data: function() {
    return {
      title: "影像信息",
      serialNo: "", //申请编号
      imageInformations: "perfectInformation/imageInformation/imageInformation", //影像信息跳转
      iconcheck:0, //是否上传
      imageBatchNo:'',//图片版本批次号
      imageUpLoadDate:'',//图片上传时间
      idcard:{
        image:'./static/images/perfectInformation/imageUpload.svg'
      },//上传logo
      uploads:{
        image:''
      },
      imagelists:[],
      fromID:"",//影像信息二级菜单
      paramBusiFileTypeList:[],//影响信息参数
      //busiFileTypeListRes:[],//编号  数据字典查询结果

      filePartName:'LS_SQZL_P',//放款审核 出账后  值：LS_FKZL_P
      modelCode:'LS_SQZL',//放款审核 出账后  值：LS_FKZL
    };
  },
  computed:{
    ...mapGetters(['imageInformation','queryApplyInfoList','busiFileTypeListRes'])
  },
  onLoad(options) {
    // this.serialNo = this.queryApplyInfoList.applyNo; //申请编号
  },
  created(){
    this.fromID=localStorage.getItem('imgFromID');
    this.title=localStorage.getItem('imgFromID');
    this.serialNo = this.queryApplyInfoList.applyNo; //申请编号
    this.imageBatchNo = this.queryApplyInfoList.imageList[0].imageBatchNo;
    this.imageUpLoadDate = this.queryApplyInfoList.imageList[0].imageUpLoadDate;
    let itemlist=[];
    let arr=this.imageInformation;
    console.log(arr)
    for(let i=0; i< arr.length ; i++){
      if(this.fromID == arr[i].name){
        itemlist=arr[i].list;
      }
    }
   for(let i=0;i<itemlist.length ; i++){
      let param=itemlist[i].busiFileType;
      itemlist[i].busiFileTypeName=this.getBusiFileTypeName(this.busiFileTypeListRes[param]);
      if(param == "2012060101" || param == "2012060603" || param == "2012060501"){ //身份证、授权图片、客户须知图片不可删除
        itemlist[i].isIDCard=false;
      }else{
        itemlist[i].isIDCard=true;
      }
      for(let j=0;j < itemlist[i].downloadImageDtoList.length; j++){
        itemlist[i].downloadImageDtoList[j].base64CodeUrl='data:image/jpg;base64,' +itemlist[i].downloadImageDtoList[j].base64Code;
      }
    }
     
    this.imagelists=itemlist;
    console.log(this.imagelists)
    
  },
 
  methods: {
    // 预览图片单张
    previewImg(logourl) {
      let _this = this;
      let imgsArray = [];
      imgsArray[0] = logourl;
      uni.previewImage({
          current: 0,
          urls: imgsArray
      });
    },
    //返回上一页
    navigateBack() {
      //this.pageJump(this.imageInformations);
      yu.navigateBack();
      console.log(this.imagelists);
    },
    //base64路径拼接
    base64URL(param){
      return 'data:image/jpg;base64,' + param;
    },
    //数据字典查询 
    getListName(){
      let _this=this;
      let posturl="/api/dictionary/queryDictionaryList";
      let param={"dictionaryName": "busiFileType"};
      _this.interfaceRequest(
        posturl,
        param,
        "GET",
        function(res) {
          let result=res.data.data;
          _this.busiFileTypeListRes=result;
        },
        function(err) {}
      );
    },
    //截取字符串   照片名字
    getBusiFileTypeName(name){
      let arr=name.split('-');
      return arr[2];
    },
    /*******上传图片  start */
    //上传图片
    upload(e){
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera','album'], //拍照
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          
          foxsdk.gallery.imageBase64(tempFilePaths[0], entry => {
            let base64code = entry.payload.imageBase64;
            let base64='data:image/jpeg;base64,' + base64code;
            this.compressImages(base64,1,(data)=>{
              this.uploadImagePost(data, e.target.id);//调用上传图片方法
            });
          });
          this.iconcheck = 1;//点击后图片更改状态由0变成1
        },
        error: (e)=>{
          console.log(e);
        }
      });
    },
    //url转化为base64
    convertImgToBase64(url, callback, outputFormat){
      let canvas = document.createElement('CANVAS');
      let ctx = canvas.getContext('2d');
      let img = new Image();
      img.src = url;
      img.setAttribute("crossOrigin",'Anonymous');
      //img.crossOrigin = 'Anonymous';
      img.onload = function(){
        let width = img.width;
        let height = img.height;
        // 按比例压缩2倍       //设置压缩比例，最后的值越大压缩越高
        let rate = (width < height ? width / height : height / width) / 20;
        canvas.width = width * rate;
        canvas.height = height * rate;           //绘制新图
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);                                               //转base64
        let dataURL = canvas.toDataURL(outputFormat || 'image/jpg');
        callback.call(this, dataURL);   //回调函数传入base64的值
        canvas = null;
      };
    },
    //上传图片图片页面效果处理
    uploadImageResult(type,base64,filename){
      let base64url='data:image/jpeg;base64,' + base64;
      let param={
        "base64Code":base64,
        "base64CodeUrl":base64url,
        "busiFileType":type,
        "frontBackFlag":0,
        "psnTp":0,
        "originName":filename
      };
      for(let i=0;i<this.imagelists.length; i++){
        if(this.imagelists[i].busiFileType == type){
          this.imagelists[i].downloadImageDtoList.push(param);
        }
      }
      return this.imagelists;
    },
    //上传图片接口
    uploadImagePost(base64Code,bt){
      let postUrl='/api/imagehandle/uploadbynoanddate';
      let busiFileTypeList=[bt];
      let data={
        "busiSerialNo": this.imageBatchNo,
        "busiStartDate": this.imageUpLoadDate,
        "busiFileTypeList": busiFileTypeList,
        "filePartName": this.filePartName,
        "modelCode": this.modelCode,
        "uploadImageInVoList": [
          {
            "base64Code": base64Code,
            "frontBackFlag": "0",
            "psnTp": "0",
            "idNumber": ""
          }
        ]
      };
      yu.showToast({
        icon: "none",
        title: "图片开始上传",
        duration: 1000
      });
      this.interfaceRequest(postUrl, data, "post", (res) => {
        if(res.data.data.returnCode == 'Faild'){
          yu.showToast({
            icon: "none",
            title: res.data.data.returnDesc,
            duration: 3000
          });
          return;
        }
        yu.showToast({
          icon: "none",
          title: "图片上传成功",
          duration: 3000
        });
        let filename = res.data.data.uploadImageOutVoList[0].fileName;
        this.uploadImageResult(bt,base64Code,filename);
      },(err) => {});
    },
    /*******上传图片  end */
    /*******删除图片  start */
    //根据文件名删除图片delImage
    delImage(bt,filename){
      let _this=this;
      let postUrl='/api/imagehandle/deletebyfilename';
      let busiFileTypeList=[filename];
      let data={
        "busiSerialNo": _this.imageBatchNo,
        "busiStartDate": _this.imageUpLoadDate,
        "fileNameList": busiFileTypeList,
        "filePartName": _this.filePartName,
        "modelCode": _this.modelCode,
      };
       _this.interfaceRequest(
        postUrl,
        data,
        "post",
        function(res) {
          let result=res.data.data;
          yu.showToast({
            icon: "none",
            title: "图片删除成功",
            duration: 1500
          });
          //let filename=res.data.data.uploadImageOutVoList.fileName;
          _this.deleteImageResult(bt,filename);
        },
        function(err) {}
      );
    },
    //删除图片图片页面效果处理
    deleteImageResult(type,filename){
      let _this=this;
      for(let i=0;i<_this.imagelists.length; i++){
        for(let j=0;j<_this.imagelists[i].downloadImageDtoList.length; j++){
          if(_this.imagelists[i].downloadImageDtoList[j].originName === filename){
            _this.imagelists[i].downloadImageDtoList.splice(j,1);
          }
        }
      }

      let allimagelist=_this.imageInformation;
      for(let j=0; j<allimagelist.length ;j++){
        if(type.indexOf(allimagelist[j].id) != -1){
          allimagelist[j].list=_this.imagelists;
        }
      }
    },
    /*******删除图片  end */
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
uni-page-wrapper{
  background: #f6f8f9 !important;
  height: 100%;
}
uni-app{
    background: #f6f8f9 !important;
    height: 100%;
}
uni-page-body{
    background-color: #f6f8f9;
    height: 100%;
}
.information-box {
  background: #f6f8f9 !important;
  width: 100%;
  height: 100%;
}
.image-list-con{
  // margin-top: 135rpx;
  background: #f6f8f9 !important;
  .image-information {
    background: #f6f8f9;
    .title {
      padding-top: 30rpx;
      height: 45rpx;
      line-height: 45rpx;
      font-size: 32rpx;
      color: #333333;
      display: flex;
      vertical-align: middle;
      align-items: center;
      text{
        height: 45rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333435;
        line-height: 45rpx;
      }
      .title-line{
        width: 10rpx;
        height: 30rpx;
        background: #3B86F7;
        border-radius: 4rpx;
        display: inline-block;
        margin: 7.5rpx 17rpx  7.5rpx 33rpx;
      }
    }
    
    .image-list{
      background: #ffffff;
      margin-top: 20rpx;
      padding: 40rpx 31rpx;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 220rpx;
        height: 220rpx;
        background: #F6F8F9;
        position: relative;
        display: inline-flex; 
        justify-content: center;
        align-items: center;
        z-index: 2;
        margin:0 15rpx 15rpx 0;
        .image-del{
          width: 40rpx;
          height: 40rpx;
          position: absolute;
          top: 0;
          right: 0;
          z-index: 5;
          display: none;
        }
        .image-con{
          width: 200rpx;
          height: auto;
          max-height: 150rpx;
        }
      }
      .item::after{
        display: block;
        content: '';
        clear: both;
      }
      .item:nth-child(3n){
        margin-right: 0;
      }
      .item.after-upload{
        .image-del{display: block;}
        .upload-image{
          img{
            width: 200rpx;
            height: 150rpx;
          }
        }
      }
      .item.before-upload{
        
        .upload-image{
          display: flex;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
          position: absolute;
          width:100%;
          height:100%;
          img{
            width: 66rpx;
            height: 66rpx;
          }
        }
      }
    }
  }
}
.customize-head{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 62rpx 36rpx 18rpx 0;
  height: 50rpx;
  line-height: 50rpx;
  background: #ffffff;
  display: flex;
  vertical-align: middle;
  align-items: center;
  z-index: 5000;
  .ch-img{
    position: absolute;
    left: 0;
    top: 69rpx;
    width: 20rpx;
    height: 36rpx;
    margin-left: 36rpx;
    img{
      width: 20rpx;
      height: 36rpx;
    }
  }
  .ch-title{
    font-size: 36rpx;
    height: 50rpx;
    line-height: 50rpx;
    margin:0 auto;
    text-align: center;
    color: #333333;
  }
}
.cbutton {
  width: 620rpx;
  padding: 0;
  margin: 175rpx auto 280rpx auto;
  font-size: 36rpx;
  color: #edf6fe;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 50rpx;
  background: #3b86f7;
  border: 0rpx;
  text-align: center;
  box-shadow: 0rpx 10rpx 23rpx 0rpx rgba(#3b86f7, 0.4);
}
.cbutton:after {
  display: block;
  content: "";
  clear: both;
}
</style>
