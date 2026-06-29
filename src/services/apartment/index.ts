import { api } from "../api";
const addApartmentServices = <T>(data: T) => api.post("apartment/addApartment", data);
export { addApartmentServices };
