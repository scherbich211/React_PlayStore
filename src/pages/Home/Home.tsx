import { ReactNode } from "react";
import CategoriesList from "./components/CategoryList";
import SearchBar from "./components/SearchBar";
import GameList from "./components/GameList";
import * as S from "./home.style";

export type THomeComponent = {
  title: "Categories" | "New games";
  renderComponent: ReactNode;
};
export const homeComponent: THomeComponent[] = [
  { title: "Categories", renderComponent: <CategoriesList /> },
  { title: "New games", renderComponent: <GameList /> },
];
const Home = () => (
  <S.Container>
    <SearchBar />
    {homeComponent.map((el) => (
      <S.Wrapper key={el.title}>
        <S.Title>{el.title}</S.Title>
        <S.Underline />
        {el.renderComponent}
      </S.Wrapper>
    ))}
  </S.Container>
);

export default Home;
