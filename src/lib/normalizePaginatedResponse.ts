export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

type Dict = Record<string, unknown>;

const asDict = (value: unknown): Dict | null =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Dict)
    : null;

const asNumber = (value: unknown, fallback = 0): number => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

export function normalizePaginatedResponse<T>(
  raw: unknown,
  page = 1,
  limit = 10,
): PaginatedResult<T> {
  if (Array.isArray(raw)) {
    const total = raw.length;
    return {
      data: raw as T[],
      meta: {
        total,
        page,
        limit,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  const obj = asDict(raw) ?? {};
  const listCandidate = obj.data ?? obj.items ?? obj.results;
  const items = Array.isArray(listCandidate) ? (listCandidate as T[]) : [];

  const metaObj = asDict(obj.meta ?? obj.pagination) ?? {};
  const total = asNumber(metaObj.total, items.length);
  const resolvedLimit = Math.max(1, asNumber(metaObj.limit, limit));
  const resolvedPage = Math.max(1, asNumber(metaObj.page, page));
  const totalPages = Math.max(
    1,
    asNumber(metaObj.totalPages, Math.ceil(total / resolvedLimit)),
  );

  return {
    data: items,
    meta: {
      total,
      page: resolvedPage,
      limit: resolvedLimit,
      totalPages,
      hasNextPage:
        typeof metaObj.hasNextPage === "boolean"
          ? metaObj.hasNextPage
          : resolvedPage < totalPages,
      hasPreviousPage:
        typeof metaObj.hasPreviousPage === "boolean"
          ? metaObj.hasPreviousPage
          : resolvedPage > 1,
    },
  };
}
