export interface Address {
  id: number;
  privince?: string;
  city?: string;
  address?: string;
  postal_code?: string;
  reciver_mobile?: string;
  description?: string;
}

export interface CreateAddressDto {
  privince: string;
  city: string;
  address: string;
  reciver_mobile: string;
  postal_code?: string;
  description?: string;
}

export type UpdateAddressDto = Partial<CreateAddressDto>;

export interface AddressPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AddressesResponse {
  data: Address[];
  meta: AddressPaginationMeta;
}

export interface AddressApiResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}
