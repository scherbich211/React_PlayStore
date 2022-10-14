import { useGetGamesMutation } from "@/api/user";
import GameCard from "@/components/GameCard";
import Loader from "@/components/Loader/loader.styles";
import SearchBar from "@/components/SearchBar";
import { useAppDispatch } from "@/hooks";
import { setSnackBar } from "@/redux/reducers/alert";
import { Time } from "@/types/alert";
import SortPart from "./components/SortPart";
import * as S from "./products.style";

function Products() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetGamesMutation();

  const handlePress = () => {
    dispatch(
      setSnackBar({
        time: Time.MEDIUM,
        message: "added",
        notificationType: "info",
      })
    );
  };
  return (
    <S.Container>
      <S.ContainerRow>
        <SortPart />
        <S.ContainerColumn>
          <SearchBar />
          <S.Wrapper width="100%">
            <S.WrapperFlex>
              {!isLoading && data ? (
                <>
                  {data.map((el) => (
                    <GameCard card={el} key={el.name} handlePress={handlePress} width="28%" />
                  ))}
                </>
              ) : (
                <Loader />
              )}
            </S.WrapperFlex>
          </S.Wrapper>
        </S.ContainerColumn>
      </S.ContainerRow>
    </S.Container>
  );
}

export default Products;
