import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:4000/v1';
axios.defaults.headers.common.authorization = localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
