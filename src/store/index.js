import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cpu: null,
    mem: null,
    memswap: null,
    percpu: null,
  },
  mutations: {
    setData(state, payload) {
      state.cpu = payload.cpu;
      state.mem = payload.mem;
      state.memswap = payload.memswap;
      state.percpu = payload.percpu;
    },
  },
  actions: {},
  modules: {},
});
