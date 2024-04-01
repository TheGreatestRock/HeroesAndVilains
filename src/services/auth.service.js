import axios from 'axios';

const AuthService = {
  login(credentials) {
    var response = axios.post('https://apidemo.iut-bm.univ-fcomte.fr/authapi/auth/signin', credentials);
    console.log(response);
    return response;
  },
  getUser(login) {
    const xsrfToken = localStorage.getItem('xsrfToken');
    console.log(xsrfToken);
    return axios.get(`https://apidemo.iut-bm.univ-fcomte.fr/authapi/user/getuser/${login}`, {
      headers: {
        'x-xsrf-token': xsrfToken,
      },
    });
  },
};

export default AuthService;
