export default {
  state: {
    imageInformation: [
      {name:"身份证明资料",id:"20120601",list:[]},
      {name:"收入证明资料",id:"20120602",list:[]},
      {name:"用途证明资料",id:"20120603",list:[]},
      {name:"抵押房产资料",id:"20120604",list:[]},
      {name:"征信相关资料",id:"20120605",list:[]},
      {name:"系统生成表格",id:"20120606",list:[]},
    ],
    busiFileTypeListRes:[]
  },
  getters: {
    imageInformation: state => state.imageInformation,
    busiFileTypeListRes:state => state.busiFileTypeListRes,
  },
  mutations: {
    imageInformationReplace(state, val) {
      for(let j=0;j < state.imageInformation.length ; j++){
        let newarr=[]
        for(let i =0;i < val.length; i++){
          if(val[i].busiFileType.indexOf(state.imageInformation[j].id) != -1){
            newarr.push(val[i]);
          }
        }
        state.imageInformation[j].list=newarr;
      }
      //state.imageInformation = val;
    },
    busiFileTypeListResReplace(state, val){
      state.busiFileTypeListRes = val;
    },
  },
};