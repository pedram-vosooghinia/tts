
interface ApiBannerItem {
  id: number;
  image_url: string;
  url: string | null;
  website_link: string | null;
  main: boolean;
  show_place: string;
}

export async function getMainBanners() {
  try {
    const res = await fetch(
      "https://api.dasbedas.com/api/v2/main/ads/multiple?show_place=main_page",
      {
        next: {
          revalidate: 3600,
          tags: ["main-slider"],
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch banners");
    }

    const data: ApiBannerItem[] = await res.json();

    return data;
  } catch  {
    return [];
  }
}
