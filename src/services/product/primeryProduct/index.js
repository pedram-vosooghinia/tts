import { api, apiFile } from "@/services/api";
const uploadImageService = (fileData) =>
  apiFile.post("/image/upload", fileData);
const deleteImageService = (data) => api.delete("/image/delete", { data });
const deletePrimeryService = (data) =>
  api.delete("/product/primeryProduct/delete", { data });

export {
  deletePrimeryService,
  deleteImageService,
  uploadImageService,
};
