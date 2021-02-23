export default {
  state: {
    personalInformation: {}
  },
  getters: {
    personalInformation: state => state.personalInformation
  },
  mutations: {
    personalInformationReplace(state, val) {
      state.personalInformation = val;
    }
  },
};