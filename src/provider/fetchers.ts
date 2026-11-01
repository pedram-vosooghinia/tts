import { api } from "@/services/api";

const fetcherApi = (url: string) => api.get(url).then((res) => res.data);
export { fetcherApi };
