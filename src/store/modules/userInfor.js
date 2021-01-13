export default {
  state: {
    userInfor: {},
  },
  getters: {
    userInfor: state => state.userInfor,
  },
  mutations: {
    userInforReplace(state, val) {
      state.userInfor = val;
    },
  },
};