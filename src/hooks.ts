import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { useScreenProductsMutation } from "./api/user";
import { IGameData } from "./types/mockStore";
import { IFilter } from "./types/products";
import { AppDispatch, RootState } from "./types/redux";
import { lowToHight, heightToLow, filterGenres, filterAge } from "./utils/filter";

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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

const usePrevious = (value: string) => {
  const ref = useRef("");
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useFilteredGames = (
  name: "PC" | "Playstation 5" | "XBox One",
  filter: IFilter,
  searchText: string
): [Array<IGameData>, boolean] => {
  const [games, setGames] = useState<Array<IGameData>>([]);
  const jsonData = JSON.stringify(filter) + name + searchText;
  const myPreviousState = usePrevious(jsonData);
  const [filterStart, { data, isSuccess, isLoading }] = useScreenProductsMutation();

  useEffect(() => {
    if (myPreviousState !== undefined && !_.isEqual(myPreviousState, jsonData)) {
      setGames([]);
      filterStart({ screen: name, text: searchText === "" ? "empty" : searchText });
    }
  }, [name, filter, searchText]);

  useEffect(() => {
    if (isSuccess && data) {
      const a = filter.selectedType === "Low to Hight" ? lowToHight(data, filter) : heightToLow(data, filter);
      const b = filterGenres(a, filter);
      const c = filterAge(b, filter);
      setGames(c);
    }
  }, [isSuccess, data]);

  return [games, isLoading];
};

export const useMemoizedState = <T>(initialValue: T): [T, (val: T) => void] => {
  const [state, _setState] = useState<T>(initialValue);

  const setState = (newState: T) => {
    _setState((prev) => {
      if (!_.isEqual(newState, prev)) {
        return newState;
      }
      return prev;
    });
  };

  return [state, setState];
};

export default useMemoizedState;
