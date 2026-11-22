// import { ShowProductSection } from "@/components/home/products/ShowProductSection";
import { Container } from "@/components/ui/container";
// import BannerSlider from "@/components/home/banner/BannerSlider";
export default async function Home() {
  // const data = await getMainBanners();

  return (
    <Container className="ltr flex flex-col gap-y-10 pb-28">
      {/* <BannerSlider data={data} /> */}
      {/* <MainProductSection title="محصولات جدید" link="/products" /> */}
    </Container>
  );
}
