export interface SliderDataType {
  id: number;
  image_url: string;
  logo?: string;
  name?: string;
  title?: string;
}
export interface MainBannerSectionProps {
  data?: SliderDataType[];
  title?: string;
  link?: string;
  style?: string;
}
