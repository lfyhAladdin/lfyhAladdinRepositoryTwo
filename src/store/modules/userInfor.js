export default {
  state: {
    userInfor: {},
  },
  getters: {
    userInfor: state => state.userInfor,
  },
  mutations: {
    userInforReplace(state, val) {
      console.log(val)
      state.userInfor = val;
    },
  },
};