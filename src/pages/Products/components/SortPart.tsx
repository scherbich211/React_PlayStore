import SortDropdown from "@/components/SortDropdown/SortDropdown";
import { getValueAtIndex } from "@/utils/mics";
import { useState } from "react";
import { Criteria, TCriteria, TType, Type } from "../constants";
import * as S from "../products.style";
import * as S1 from "./sortpart.style";

const SortPart = () => {
  const [selectedCriteria, setSelectedCriteria] = useState<TCriteria>("Name");
  const [selectedType, setSelectedType] = useState<TType>("Hight to Low");
  const mainText = () => {
    switch (getValueAtIndex(4)) {
      case "default":
        return "Products";
      case "pc":
        return "PC";
      case "xbox":
        return "XBox One";
      case "playstation":
        return "Playstation 5";
      default:
        return "Products";
    }
  };
  return (
    <S.Wrapper width="25%">
      <S.Title category="title">{mainText()}</S.Title>
      <S.Underline />
      <S.Subtitle>Sort</S.Subtitle>
      <S.Underline />
      <S1.WrapperCategory sort style={{ marginTop: "10px" }}>
        <S1.CategoryName>Criteria</S1.CategoryName>
        <SortDropdown array={Criteria} selectedOption={selectedCriteria} setSelectedOption={setSelectedCriteria} />
      </S1.WrapperCategory>
      <S1.WrapperCategory sort style={{ marginTop: "10px" }}>
        <S1.CategoryName>Type</S1.CategoryName>
        <SortDropdown array={Type} selectedOption={selectedType} setSelectedOption={setSelectedType} />
      </S1.WrapperCategory>
    </S.Wrapper>
  );
};

export default SortPart;
