export interface ListPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface NormalizedList<T> {
  data: T[];
  meta: ListPaginationMeta;
}

type Dict = Record<string, unknown>;

const asDict = (value: unknown): Dict | null =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Dict)
    : null;

const asNumber = (value: unknown, fallback: number): number => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

export function normalizeMeta(
  raw: unknown,
  count: number,
  page: number,
  limit: number,
): ListPaginationMeta {
  const meta = asDict(raw) ?? {};
  const total = asNumber(meta.total, count);
  const resolvedLimit = Math.max(asNumber(meta.limit, limit), 1);
  const totalPages = Math.max(
    1,
    asNumber(meta.totalPages, Math.ceil(total / resolvedLimit)),
  );
  const resolvedPage = Math.max(1, asNumber(meta.page, page));

  return {
    total,
    page: resolvedPage,
    limit: resolvedLimit,
    totalPages,
    hasNextPage:
      typeof meta.hasNextPage === "boolean"
        ? meta.hasNextPage
        : resolvedPage < totalPages,
    hasPreviousPage:
      typeof meta.hasPreviousPage === "boolean"
        ? meta.hasPreviousPage
        : resolvedPage > 1,
  };
}

export function normalizeListResponse<T>(
  rawPayload: unknown,
  mapItem: (item: unknown, index: number) => T,
  page = 1,
  limit = 10,
  listKeys: string[] = ["data", "items", "projects", "tasks", "payments"],
): NormalizedList<T> {
  if (Array.isArray(rawPayload)) {
    const mapped = rawPayload.map(mapItem);
    return {
      data: mapped,
      meta: normalizeMeta(null, mapped.length, page, limit),
    };
  }

  const dict = asDict(rawPayload) ?? {};
  let rawList: unknown[] = [];

  for (const key of listKeys) {
    if (Array.isArray(dict[key])) {
      rawList = dict[key] as unknown[];
      break;
    }
  }

  const mapped = rawList.map(mapItem);
  return {
    data: mapped,
    meta: normalizeMeta(dict.meta ?? dict.pagination, mapped.length, page, limit),
  };
}
