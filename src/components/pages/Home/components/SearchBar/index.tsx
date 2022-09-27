import { useSearchMutation } from "@/api/user";
import Loader from "@/components/Loader/loader.styles";
import useDebounce from "@/hooks";
import { IGameData } from "@/types/user";
import { useEffect, useState } from "react";
import { SearchBlock, SearchPanel, StyledList } from "./searchBar.style";
import { NoElements, ResultElements } from "./searchBarComponents";

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Array<IGameData> | []>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [searchGames, { isLoading, isSuccess, data }] = useSearchMutation();

  document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pidor") as HTMLInputElement | null;
    if (input !== null) {
      input.addEventListener(
        "focus",
        () => {
          setShowSearch(true);
        },
        true
      );
      input.addEventListener(
        "blur",
        () => {
          setShowSearch(false);
        },
        true
      );
    }
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchGames(debouncedSearchTerm);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (isSuccess) {
      setIsSearching(false);
      if (data !== undefined) {
        setResults(data);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    setIsSearching(isLoading);
  }, [isLoading, searchTerm]);

  return (
    <SearchBlock id="pidor">
      <SearchPanel
        type="text"
        placeholder="Search"
        autoComplete="off"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {showSearch && (
        <StyledList>
          {isSearching ? (
            <Loader />
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>{results.length > 0 ? <ResultElements results={results} /> : <NoElements />}</>
          )}
        </StyledList>
      )}
    </SearchBlock>
  );
};

export default SearchBar;
