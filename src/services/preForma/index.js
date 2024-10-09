import { api } from "@/services/api";

const postPreFormaService = (data) => api.post("/preForma/add", data);
const deletePreFormaService = (id) =>
  api.delete(`/preForma/delete/`, { data: { orderId: id } });
export { postPreFormaService, deletePreFormaService };
