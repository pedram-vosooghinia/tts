import { api } from "../../../services/api";
const loginServices = <T>(data: T) => api.post("auth/login", data);
const getMeServices = () => api.get("/auth/me");
const signInServices = <T>(data: T) => api.post("auth/signIn", data);
const logoutServices = () => api.get("/auth/logout");
export { loginServices, getMeServices, signInServices, logoutServices };
