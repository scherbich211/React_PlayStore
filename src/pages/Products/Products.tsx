import SearchBar from "@/components/SearchBar";
import SortPart from "./components/SortPart";
import * as S from "./products.style";

function Products() {
  return (
    <S.Container>
      <S.ContainerRow>
        <SortPart />
        <S.ContainerColumn>
          <SearchBar />
          <S.Wrapper width="100%" />
        </S.ContainerColumn>
      </S.ContainerRow>
    </S.Container>
  );
}

export default Products;
