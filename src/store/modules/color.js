export default {
  state: {
    colorIndex: 0,
    colorList: ['#FF0000','#00FF00','#0000FF']
  },
  getters: {
    currentColor: state => state.colorList[state.colorIndex],
    colorIndex: state => state.colorIndex,
    colorList: state => state.colorList,
  },
  mutations: {
    setColorIndex(state,index){
      state.colorIndex = index
    }
  }
};