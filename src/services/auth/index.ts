import { api } from "../api"; 
import { apiStrapi } from "../api";
// const signinServices = <T>(data: T) => apiStrapi.post("auth/local/register", data);
const loginServices = <T>(data: T) => apiStrapi.post("auth/local", data);
const tokenServices = <T>(data: T) => api.post("auth/token", data);
const logoutServices = () => api.get("/auth/logout");
export {  loginServices,tokenServices, logoutServices };

