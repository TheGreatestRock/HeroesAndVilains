import AuthService from '@/services/auth.service';

const state = {
  xsrfToken: localStorage.getItem('xsrfToken') || '',
  jwt: localStorage.getItem('jwt') || '',
};

const getters = {
  isAuthenticated: state => !!state.jwt,
  xsrfToken: state => state.xsrfToken,
};

const mutations = {
  SET_XSRF_TOKEN(state, xsrfToken) {
    state.xsrfToken = xsrfToken;
    localStorage.setItem('xsrfToken', xsrfToken);
  },
  SET_JWT(state, jwt) {
    state.jwt = jwt;
    localStorage.setItem('jwt', jwt);
  },
  LOGOUT(state) {
    state.xsrfToken = '';
    state.jwt = '';
    localStorage.removeItem('xsrfToken');
    localStorage.removeItem('jwt');
    state.login = '';
    state.user = null;
  },
  SET_LOGIN(state, login) {
    state.login = login;
  },
};

const actions = {
  async login({ commit }, credentials) {
    const response = await AuthService.login(credentials);
    console.log(response);
    commit('SET_XSRF_TOKEN', response.data.data.xsrfToken);
    commit('SET_JWT', response.data.jwt);
  },
  async logout({ commit }) {
    commit('LOGOUT');
  },
  async getUser({ commit }, login) {
    const response = await AuthService.getUser(login);
    commit('SET_LOGIN', response.data.login);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
