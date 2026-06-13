// import { getMainBanners } from "@/components/home/banner/getMainBanners";
import { MainProductSection } from "@/components/home/products/MainProductSection";
// import BannerSlider from "@/components/home/banner/BannerSlider";
import AddApartment from "@/components/dashboard/apartment/AddApartment";
export default async function Home() {
  // const data = await getMainBanners();
  // console.log("data", data);

  return (
    <div className="ltr w-full flex flex-col gap-y-10 mx-10 pb-28 ">
      {/* <BannerSlider data={data} /> */}

      <MainProductSection title="محصولات جدید" link="/products" />
      <AddApartment/>
    </div>
  );
}
