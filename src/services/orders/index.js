import { api } from "@/services/api";

const postOrderService = (data) => api.post("/orders/add", {data});
const updatePayOrderService = (id, data) =>
  api.put(`/orders/updatePay/${id}`, data);
const acountingOrderService = (data) =>
  api.put("/orders/acounting", data);
const updateOrderService = (data) =>
  api.put("/orders/updateOrder", data);
export {
  postOrderService,
  updatePayOrderService,
  acountingOrderService,
  updateOrderService
};
