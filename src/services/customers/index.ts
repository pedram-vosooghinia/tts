import { api } from "@/services/api";

const addCustomersService = <T>(data: T) => api.post("/customers/add", data);

export { addCustomersService };
