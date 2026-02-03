import { getMainBanners } from "@/components/home/banner/getMainBanners";
import { MainProductSection } from "@/components/home/products/MainProductSection";
import BannerSlider from "@/components/home/banner/BannerSlider";
export default async function Home() {
  const data = await getMainBanners();
  return (
    <main className="ltr ">
      <BannerSlider data={data} />

      <MainProductSection title="محصولات جدید" />
    </main>
  );
}
