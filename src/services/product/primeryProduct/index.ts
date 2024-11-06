import { api, apiFile } from "@/services/api";
const uploadImageService = (fileData: FormData) =>
  apiFile.post("/image/upload", fileData);
const deleteImageService = () =>
  api.delete("/image/delete");
// const deleteImageService = <T>(data: T) =>
//   api.delete("/image/delete", { data });
const deletePrimeryService = <T>(data: T) =>
  api.delete("/product/primeryProduct/delete", { data });

export { deletePrimeryService, deleteImageService, uploadImageService };
