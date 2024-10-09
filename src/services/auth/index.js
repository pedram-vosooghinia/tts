import {api} from "../api";
const signinServices = (data) => api.post('/auth/signin', data);
const loginServices = (data) => api.post('/auth/login', data);
const logoutServices = () => api.get('/auth/logout');
export { signinServices, loginServices ,logoutServices};