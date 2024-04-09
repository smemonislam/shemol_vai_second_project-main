import authService from "../services/auth.service";
import router from "../router";

const user = JSON.parse(localStorage.getItem("userF"));
const initialState = user ? { loggedIn: true } : { loggedIn: false };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, userData) {
      await authService.login(userData);
      commit("logMeIn");
    },

    async logout({ commit }) {
      try {
        await authService.logout();
      } finally {
        commit("logMeOut");
      }
    },

    async register({ commit }, userData) {
      await authService.register(userData);
      commit("logMeIn");
    },
  },
  mutations: {
    logMeIn(state) {
      state.loggedIn = true;
    },
    logMeOut(state) {
      state.loggedIn = false;
      router.push("/login");
    },
  },

  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
  },
};
