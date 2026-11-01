export interface ApartmentType {
  id: string;
  zone: string;
  block: number;
  level: string;
  direction: string;
  vam: string;
  arse: string;
  naghoentegal: string;
  vazieatvahed: string;
  referrer: string;
  contact: string;
  price: number;
  description?: string;
}
export type CreateApartment = Omit<ApartmentType, "id">;
