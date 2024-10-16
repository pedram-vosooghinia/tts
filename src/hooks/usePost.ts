import { mutate } from "swr";
import { api } from "@/services/api";
interface IusePost {
    postData: (data: unknown) => Promise<unknown>; 
  }
interface IusePostParams  {
    postUrl:string
    getUrl?:string
}
const usePost = ({postUrl, getUrl}:IusePostParams  ):IusePost => {
  const fetcher = (data:unknown) => api.post(postUrl, data).then((res) => res.data);

  const postData = async (data:unknown) => {
    const response = await fetcher(data);
    if (getUrl) {
      mutate(getUrl);
    }
    return response;
  };

  return { postData };
};

export default usePost;
