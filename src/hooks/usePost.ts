// import { mutate } from "swr";
// import { api } from "@/services/api";

// const usePost = (postUrl, getUrl) => {
//   const fetcher = (data) => api.post(postUrl, data).then((res) => res.data);

//   const postData = async (data) => {
//     const response = await fetcher(data);
//     if (getUrl) {
//       mutate(getUrl);
//     }
//     return response;
//   };

//   return { postData };
// };

// export default usePost;
