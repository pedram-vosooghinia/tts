import { api } from "@/services/api";

const getMainProductService = ({ offset, limit }) =>
  api.get("/product/mainProduct/get", { params: { offset, limit } });
const searchMainProductService = (data) =>
  api.post("/product/mainProduct/search", data);

const postMainProductService = (data) =>
  api.post("/product/mainProduct/add", data);

const deleteMainService = (data) =>
  api.delete("/product/mainProduct/delete", { data });

const updateMainProductService = (productId, data) =>
  api.put(`/product/mainProduct/update/${productId}`, data);
const checkProductExistService = (barcode) =>
  api.get(`/product/mainProduct/check?barcode=${barcode}`);
export {
  searchMainProductService,
  updateMainProductService,
  deleteMainService,
  getMainProductService,
  postMainProductService,
  checkProductExistService,
};
