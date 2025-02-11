import { api } from "@/services/api";
const editProductTetisanService = <T>(data: T) =>
  api.post("/proxy/editProduct", data);
const addOrEditProductTtsService = <T>(data: T) =>
  api.post("/products/addOrEdit", data);

export { editProductTetisanService, addOrEditProductTtsService };
