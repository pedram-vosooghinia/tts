// import { useRouter } from "next/navigation";
// import { logoutServices } from "@/services/auth";
// import useUserStore from "@/store/userStore";

const useLogout = () => {
  // const router = useRouter();
  // const { clearUser } = useUserStore();

  const logout = async () => {
  //   try {
  //     await logoutServices();
  //     toast.success("شما با موفقیت خارج شدید");
  //     clearUser();
  //     router.push("/");
  //   } catch (e) {
  //     toast.error(e?.response?.data?.message);
  //   }
  };

  return logout;
};

export default useLogout