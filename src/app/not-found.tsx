"use client";
import { Button } from "@/components/ui/button";
import notFoundImage from "@/public/images/notFoundImage.svg";
import Image from "next/image";
import { IoHome } from "react-icons/io5";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className=" flex justify-center items-center h-1/2  px-4 py-16 flex-wrap  ">
      <Image src={notFoundImage} alt="not-found-404" width={300} height={300} />
      <div className="mx-auto max-w-max">
        <main className="flex flex-col justify-center items-center gap-y-4">
          <p className="bg-gradient-to-br from-mainGold to-mainBlack bg-clip-text my-5 font-bold tracking-tight text-transparent text-5xl ">
            404
          </p>
          <h1 className="text-3xl font-bold text-center tracking-tight text-gray-900 ">
            این صفحه وجود ندارد.
          </h1>
          <p className="mt-1 text-base text-center  text-gray-500">
            لینکی که دنبال آن بودید وجود ندارد. لطفا از دکمه پایین به صفحه اصلی
            بروید.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="flex justify-between gap-4 bg-gradient-to-br from-mainGold to-mainblack hover:bg-gradient-to-br hover:from-mainBlack hover:to-mainGold"
          >
            <IoHome size={26} className="text-mainWhite" />
          </Button>
        </main>
      </div>
    </div>
  );
}
