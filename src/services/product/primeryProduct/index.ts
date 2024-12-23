import { api,apiStrapi, apiFile } from "@/services/api";
const uploadImageService = (fileData: FormData) =>
  apiFile.post("/image/upload", fileData);
const deleteImageService = <T>(data: T) =>
  api.delete("/image/delete", { data });
const uploadPrimeryService = <T>(data: T) =>
  apiStrapi.post("/image/delete", { data });
const deletePrimeryService = <T>(data: T) =>
  api.delete("/product/primeryProduct/delete", { data });
const getPrimeryService = () =>
  api.get(`/api/primeries`);
export {getPrimeryService,uploadPrimeryService, deletePrimeryService, deleteImageService, uploadImageService };
