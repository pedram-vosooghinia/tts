import { api } from "@/services/api";

import type {
  Address,
  AddressApiResponse,
  AddressesResponse,
  AddressPaginationMeta,
  CreateAddressDto,
  UpdateAddressDto,
} from "../types/address.types";

type Dict = Record<string, unknown>;

const asDict = (value: unknown): Dict | null =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Dict)
    : null;

const asNumber = (value: unknown, fallback = 0): number => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

export const getAddressesKey = (page = 1, limit = 50) =>
  `/address?page=${page}&limit=${limit}`;

/** The API doesn't document its response schemas, so accept common field aliases. */
function normalizeAddress(raw: unknown, index: number): Address {
  const address = asDict(raw) ?? {};

  return {
    id: asNumber(address.id, index),
    privince: address.privince ? String(address.privince) : undefined,
    city: address.city ? String(address.city) : undefined,
    address: address.address ? String(address.address) : undefined,
    postal_code: address.postal_code ? String(address.postal_code) : undefined,
    reciver_mobile: address.reciver_mobile
      ? String(address.reciver_mobile)
      : undefined,
    description: address.description ? String(address.description) : undefined,
  };
}

function normalizeMeta(
  raw: unknown,
  count: number,
  page: number,
  limit: number,
): AddressPaginationMeta {
  const meta = asDict(raw) ?? {};
  const total = asNumber(meta.total, count);
  const totalPages = Math.max(
    1,
    asNumber(meta.totalPages, Math.ceil(total / Math.max(limit, 1))),
  );

  return {
    total,
    page: asNumber(meta.page, page),
    limit: asNumber(meta.limit, limit),
    totalPages,
    hasNextPage:
      typeof meta.hasNextPage === "boolean"
        ? meta.hasNextPage
        : page < totalPages,
    hasPreviousPage:
      typeof meta.hasPreviousPage === "boolean"
        ? meta.hasPreviousPage
        : page > 1,
  };
}

export const getAddressesService = async (
  page = 1,
  limit = 50,
): Promise<AddressesResponse> => {
  const res = await api.get(getAddressesKey(page, limit));
  const payload = res.data.data ?? res.data;

  if (Array.isArray(payload)) {
    return {
      data: payload.map(normalizeAddress),
      meta: normalizeMeta(null, payload.length, page, limit),
    };
  }

  const data = asDict(payload) ?? {};
  const list = data.addresses ?? data.items ?? data.data;
  const addresses = Array.isArray(list) ? list.map(normalizeAddress) : [];

  return {
    data: addresses,
    meta: normalizeMeta(data.meta ?? data.pagination, addresses.length, page, limit),
  };
};

export const getAddressService = async (id: number): Promise<Address | null> => {
  const res = await api.get<AddressApiResponse<Address>>(`/address/${id}`);
  const payload = res.data.data ?? res.data;

  return payload ? normalizeAddress(payload, 0) : null;
};

export const createAddressService = async (
  data: CreateAddressDto,
): Promise<Address | null> => {
  const res = await api.post<AddressApiResponse<Address>>("/address", data);
  const payload = res.data.data ?? res.data;

  return payload ? normalizeAddress(payload, 0) : null;
};

export const updateAddressService = async (
  id: number,
  data: UpdateAddressDto,
): Promise<Address | null> => {
  const res = await api.patch<AddressApiResponse<Address>>(
    `/address/${id}`,
    data,
  );
  const payload = res.data.data ?? res.data;

  return payload ? normalizeAddress(payload, 0) : null;
};

export const deleteAddressService = async (id: number): Promise<void> => {
  await api.delete(`/address/${id}`);
};
