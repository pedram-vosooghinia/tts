import { api } from "../api";
const signinServices = <T>(data: T) => api.post("/auth/signin", data);
const loginServices = <T>(data: T) => api.post("/auth/login", data);
const logoutServices = () => api.get("/auth/logout");
export { signinServices, loginServices, logoutServices };
