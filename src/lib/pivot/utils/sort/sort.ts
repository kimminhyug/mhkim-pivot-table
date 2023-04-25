interface IDefaultSortProps<T> {
  data: T[];
  key?: string;
  order: 'asc' | 'desc';
  isLocaleCompare?: boolean;
}
export const defaultSort = <T>({ data, key, order = 'asc', isLocaleCompare = true }: IDefaultSortProps<T>): T[] => {
  return data.sort((a, b) => {
    const compareValue = key
      ? { a: a?.[key]?.toString(), b: b?.[key]?.toString() }
      : { a: a?.toString(), b: b?.toString() };
    if (!compareValue.a || !compareValue.b) return 0;
    if (isLocaleCompare) {
      const orderDecision = order === 'desc' ? -1 : 1;
      return (compareValue.a.localeCompare(compareValue.b, 'en', { numeric: true }) * orderDecision) as number;
    }

    const orderBy = order === 'asc' ? 1 : -1;
    if (compareValue.a > compareValue.b) {
      return 1 * orderBy;
    }
    if (compareValue.a < compareValue.b) {
      return -1 * orderBy;
    }
    return 0;
  });
};
