import { api } from "../api"; 
const tokenServices = <T>(data: T) => api.post("auth/token", data);
const signInServices = <T>(data: T) => api.post("auth/signIn", data);
const logoutServices = () => api.get("/auth/logout");
export {  tokenServices,signInServices, logoutServices };

