import { api } from "@/services/api";
const editProductTetisanService = <T>(data: T) =>
  api.post("/proxy/editProduct",  data );

export {
  editProductTetisanService,
};
