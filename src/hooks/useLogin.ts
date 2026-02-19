import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { loginServices } from "@/services/auth";
import useUserStore from "@/store/userStore";
import { LoginFormInputs } from "@/app/(home)/login/type";

export function useLogin() {
  const router = useRouter();
  const { addToUser } = useUserStore();

  const login = async (values: LoginFormInputs) => {
    try {
      const res = await loginServices(values);
      const userData = res.data.user;

      addToUser(userData);

      Cookies.set("user", JSON.stringify(userData), {
        expires: 1,
        sameSite: "strict",
      });

      toast.success("شما با موفقیت وارد شدید");
      router.push("/dashboard");
    } catch (error) {
      const err = error as AxiosError;
      const message =
        (err.response?.data as { message?: string })?.message ||
        "خطایی رخ داده است";
      toast.error(message);
      throw error;
    }
  };

  return { login };
}
