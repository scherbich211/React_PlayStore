import SortDropdown from "@/components/SortDropdown/SortDropdown";
import { getValueAtIndex } from "@/utils/mics";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { age, criteria, genres, TAge, TCriteria, TGenres, TType, type } from "../constants";
import * as S from "../products.style";
import * as S1 from "./sortpart.style";

const SortPart = () => {
  const location = useLocation();
  const [name, setName] = useState("PC");
  const [selectedCriteria, setSelectedCriteria] = useState<TCriteria>("Name");
  const [selectedType, setSelectedType] = useState<TType>("Hight to Low");
  const [selectedGenre, setSelectedGenre] = useState<TGenres>("All genres");
  const [selectedAge, setSelectedAge] = useState<TAge>("All ages");

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
    <S.Wrapper width="25%">
      <S.Title category="title">{name}</S.Title>
      <S.Underline />
      <S1.Subtitle>Sort</S1.Subtitle>
      <S.Underline />
      <S1.WrapperCategory sort style={{ marginTop: "10px" }}>
        <S1.CategoryName>Criteria</S1.CategoryName>
        <SortDropdown array={criteria} selectedOption={selectedCriteria} setSelectedOption={setSelectedCriteria} />
      </S1.WrapperCategory>
      <S1.WrapperCategory sort style={{ marginTop: "10px" }}>
        <S1.CategoryName>Type</S1.CategoryName>
        <SortDropdown array={type} selectedOption={selectedType} setSelectedOption={setSelectedType} />
      </S1.WrapperCategory>
      <S1.Subtitle>Genres</S1.Subtitle>
      <S.Underline />
      {genres.map((el) => (
        <S1.WrapperCategory onClick={() => setSelectedGenre(el)}>
          <S1.RadioButton pressed={el === selectedGenre} />
          <S1.CategoryName>{el}</S1.CategoryName>
        </S1.WrapperCategory>
      ))}
      <S1.Subtitle>Genres</S1.Subtitle>
      <S.Underline />
      {age.map((el) => (
        <S1.WrapperCategory onClick={() => setSelectedAge(el)}>
          <S1.RadioButton pressed={el === selectedAge} />
          <S1.CategoryName>{el}</S1.CategoryName>
        </S1.WrapperCategory>
      ))}
    </S.Wrapper>
  );
};

export default SortPart;
