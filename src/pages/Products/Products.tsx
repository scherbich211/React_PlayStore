import GameCard from "@/components/GameCard";
import Loader from "@/components/Loader/loader.styles";
import SearchBar from "@/components/SearchBar";
import { useAppDispatch, useFilteredGames } from "@/hooks";
import { setSnackBar } from "@/redux/reducers/alert";
import { Time } from "@/types/alert";
import { IFilter } from "@/types/products";
import { getValueAtIndex } from "@/utils/mics";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SortPart from "./components/SortPart";
import * as S from "./products.style";

function Products() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<"PC" | "Playstation 5" | "XBox One">("PC");
  const [searchText, setSearchText] = useState("");

  const [filter, setFilter] = useState<IFilter>({
    selectedCriteria: "Name",
    selectedType: "Hight to Low",
    selectedGenre: "All genres",
    selectedAge: "All ages",
  });
  const [games, isLoading] = useFilteredGames(name, filter, searchText);

  const handlePress = () => {
    dispatch(
      setSnackBar({
        time: Time.MEDIUM,
        message: "added",
        notificationType: "info",
      })
    );
  };

  useEffect(() => {
    switch (getValueAtIndex(4)) {
      case "pc":
        return setName("PC");
      case "xbox":
        return setName("XBox One");
      case "playstation":
        return setName("Playstation 5");
      default:
        return setName("PC");
    }
  }, [location]);

  return (
    <S.Container>
      <S.ContainerRow>
        <SortPart name={name} filter={filter} setFilter={setFilter} />
        <S.ContainerColumn>
          <SearchBar products setTextSearch={setSearchText} />
          <S.Wrapper width="100%">
            <S.WrapperFlex>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {games.map((el) => (
                    <GameCard card={el} key={el.name} handlePress={handlePress} width="28%" />
                  ))}
                </>
              )}
            </S.WrapperFlex>
          </S.Wrapper>
        </S.ContainerColumn>
      </S.ContainerRow>
    </S.Container>
  );
}

export default Products;
