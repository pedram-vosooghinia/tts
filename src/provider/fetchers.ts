import { api, apiMixin } from "@/services/api";

const fetcherApi = (url: string) => api.get(url).then((res) => res.data);
const fetcherMixinApi = (url: string) =>
  apiMixin.get(url).then((res) => res.data);
export { fetcherApi, fetcherMixinApi };
