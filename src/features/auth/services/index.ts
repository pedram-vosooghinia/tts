import { api } from "../../../services/api";
const loginServices = <T>(data: T) => api.post("auth/login", data);

const registerServices = <T>(data: T) => api.post("auth/register", data);
export { loginServices, registerServices };
