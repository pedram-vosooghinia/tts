import { api, apiFile } from "@/services/api";
const addProductService = <T>(data: T) => api.post("/products/add", data);
const uploadImageService = (fileData: FormData) =>
  apiFile.post("/image/upload", fileData);
const deleteImageService = <T>(data: T) =>
  api.delete("/image/delete", { data });
const deletePrimeryService = <T>(data: T) =>
  api.delete("/product/primeryProduct/delete", { data });
export {
  addProductService,
  uploadImageService,
  deleteImageService,
  deletePrimeryService,
};
