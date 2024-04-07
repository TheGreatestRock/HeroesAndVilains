import axios from 'axios';

const AuthService = {
  async login(credentials) {
    console.log(credentials);
    var response = await axios.post('https://apidemo.iut-bm.univ-fcomte.fr/authapi/auth/signin', credentials);
    console.log(response);
    return response;
  },
  async getUser(login) {
    const xsrfToken = localStorage.getItem('xsrfToken');
    console.log(xsrfToken);
    var response = await axios.get(`https://apidemo.iut-bm.univ-fcomte.fr/authapi/user/getuser/${login}`, {
      headers: {
        'x-xsrf-token': xsrfToken,
      },
    });
    return response;
  },
};

export default AuthService;
