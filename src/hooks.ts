import { useCallback, useEffect, useState } from "react";

export const useVisiability = (initialState: boolean): [boolean, () => void] => {
  const [isVisible, setVisibility] = useState(initialState);
  const visible = useCallback(() => setVisibility(!isVisible), [isVisible]);
  return [isVisible, visible];
};

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

type Props = {
  ref: React.RefObject<HTMLDivElement>;
};

export const useOnFocusElement = ({ ref }: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!event.target) {
      setIsFocus(false);
    }
    if (ref.current && !ref.current?.contains(event.target as Node)) {
      setIsFocus(false);
    }
  }, []);

  useEffect(() => {
    if (isFocus) {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }
    return undefined;
  }, [isFocus]);

  const onFocus = useCallback(() => setIsFocus(true), []);

  return {
    onFocus,
    isFocus,
    setIsFocus,
  };
};
