export default {
  state: {
    personalInformation: {},
  },
  getters: {
    personalInformation: state => state.personalInformation,
  },
  mutations: {
    personalInformationReplace(state, val) {
      console.log(val)
      state.personalInformation = val;
    },
  },
};