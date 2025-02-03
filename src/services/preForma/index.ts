import { api } from "@/services/api";
const postPreFormaService = <T>(data: T) => api.post("/preForma/add", data);

const deletePreFormaService = (id:number) =>
  api.delete(`/preForma/delete/`, { data: { orderId: id } });
export { postPreFormaService, deletePreFormaService };
