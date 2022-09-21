import { useState } from "react";
import { SearchBlock, SearchPanel, StyledList } from "./searchBar.style";

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);

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
  return (
    <SearchBlock id="pidor">
      <SearchPanel type="text" placeholder="Search" autoComplete="off" />
      {showSearch && (
        <StyledList>
          <span>No elements</span>
        </StyledList>
      )}
    </SearchBlock>
  );
};

export default SearchBar;
