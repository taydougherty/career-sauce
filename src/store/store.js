import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser(state, user) {
      state.user = user
    },
    resetUser(state) {
      Object.assign(state.user, null)
    },
    resetToken(state) {
      Object.assign(state.token, null)
    },
    logOut(state) {
      Object.assign(state.isUserLoggedIn, false)
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    resetUser({ commit }) {
      commit('resetUser')
    },
    resetToken({ commit }) {
      commit('resetToken')
    },
    logOut({ commit }) {
      commit('logOut')
    }
  },
  getters: {
    UserId: state => {
      return state.user.id
    }
  }
})
