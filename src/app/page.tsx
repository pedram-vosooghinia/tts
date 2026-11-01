import { ShowProductSection } from "@/components/home/products/ShowProductSection";
// import BannerSlider from "@/components/home/banner/BannerSlider";
export default async function Home() {

  return (
    <div className="ltr w-full flex flex-col gap-y-10 mx-10 pb-28 ">
      {/* <BannerSlider data={data} /> */}

      <ShowProductSection title="محصولات جدید" link="/products" fetchUrl="management/v1/products" />
      <ShowProductSection title="پرفروش ترین ها" link="/products" fetchUrl="management/v1/products" />
      <ShowProductSection title="تخفیف ها" link="/products" fetchUrl="management/v1/products" />
    </div>
  );
}
