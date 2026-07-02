import { api } from "../api";
import { AxiosResponse } from "axios";
import { ResponseRequest } from "@/components/dashboard/apartment/apartments/DeleteDialog";
const addApartmentServices = <T>(data: T) => api.post("apartment/add", data);

const deleteApartmentServices = (
  id: string | number,
): Promise<AxiosResponse<ResponseRequest>> => {
  return api.delete(`/apartment/delete/${id}`);
};
export { addApartmentServices, deleteApartmentServices };
