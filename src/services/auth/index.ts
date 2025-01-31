import { api } from "../api"; 
const tokenServices = <T>(data: T) => api.post("auth/token", data);
const logoutServices = () => api.get("/auth/logout");
export {  tokenServices, logoutServices };

