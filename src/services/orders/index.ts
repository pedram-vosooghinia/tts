import { api } from "@/services/api";
const postOrderService = <T>(data: T) => api.post("/orders/add", {data});

const deletePreFormaService = (id:number) =>
  api.delete(`/preForma/delete/`, { data: { orderId: id } });
export { postOrderService, deletePreFormaService };
