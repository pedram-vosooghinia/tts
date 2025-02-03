import { debounce } from "lodash";
import { useMemo } from "react";

const useDebounce = <T extends (...args: string[]) => void>(callback: T, delay: number) => {
  return useMemo(() => debounce(callback, delay), [callback, delay]);
};

export default useDebounce;
