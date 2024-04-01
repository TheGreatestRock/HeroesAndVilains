import axios from 'axios';

const AuthService = {
  login(credentials) {
    return axios.post('https://apidemo.iut-bm.univ-fcomte.fr/authapi/auth/signin', credentials);
  },
  getUser(login) {
    const xsrfToken = localStorage.getItem('xsrfToken');
    return axios.get(`https://apidemo.iut-bm.univ-fcomte.fr/authapi/user/getuser/${login}`, {
      headers: {
        'x-xsrf-token': xsrfToken,
      },
    });
  },
};

export default AuthService;
