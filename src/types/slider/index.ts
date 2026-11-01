export interface SliderDataType {
  id: number;
  image_url: string;
  logo?: string;
  name?: string;
  title?: string;
}
export interface ShowBannerSectionProps {
  data?: SliderDataType[];
  title?: string;
  link?: string;
  style?: string;
  fetchUrl?: string
}
