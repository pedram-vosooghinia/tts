import { api } from "../../../services/api";
const loginServices = <T>(data: T) => api.post("auth/login", data);

const registerServices = <T>(data: T) => api.post("auth/register", data);
export { loginServices, registerServices };

export const getMeServices = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};
