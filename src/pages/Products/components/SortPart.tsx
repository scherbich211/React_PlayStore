import SortDropdown from "@/components/SortDropdown/SortDropdown";
import { IFilter, TCriteria, criteria, type, genres, age, TType } from "@/types/products";
import React, { memo, useCallback } from "react";
import * as S from "../products.style";
import * as S1 from "./sortpart.style";

interface IProps {
  name: string;
  filter: IFilter;
  setFilter: (val: IFilter) => void;
}

const SortPart: React.FC<IProps> = (props) => {
  const { filter, setFilter, name } = props;

  const setSelectedCriteria = (value: TCriteria) => {
    setFilter({ ...filter, selectedCriteria: value });
  };
  // const setSelectedType = (value: TType) => {
  //   setFilter({ ...filter, selectedType: value });
  // };

  const setSelectedType = useCallback(
    (value: TType) => {
      setFilter({ ...filter, selectedType: value });
    },
    [filter]
  );

  return (
    <S.Wrapper width="25%">
      <S.Title category="title">{name}</S.Title>
      <S.Underline />
      <S1.Subtitle>Sort</S1.Subtitle>
      <S.Underline />
      <S1.WrapperCategory sort style={{ marginTop: "10px" }}>
        <S1.CategoryName>Criteria</S1.CategoryName>
        <SortDropdown
          array={criteria}
          selectedOption={filter.selectedCriteria}
          setSelectedOption={setSelectedCriteria}
        />
      </S1.WrapperCategory>
      <S1.WrapperCategory sort style={{ marginTop: "10px" }}>
        <S1.CategoryName>Type</S1.CategoryName>
        <SortDropdown array={type} selectedOption={filter.selectedType} setSelectedOption={setSelectedType} />
      </S1.WrapperCategory>
      <S1.Subtitle>Genres</S1.Subtitle>
      <S.Underline />
      {genres.map((el) => (
        <S1.WrapperCategory onClick={() => setFilter({ ...filter, selectedGenre: el })} key={el}>
          <S1.RadioButton pressed={el === filter.selectedGenre} />
          <S1.CategoryName>{el}</S1.CategoryName>
        </S1.WrapperCategory>
      ))}
      <S1.Subtitle>Age</S1.Subtitle>
      <S.Underline />
      {age.map((el) => (
        <S1.WrapperCategory onClick={() => setFilter({ ...filter, selectedAge: el })} key={el}>
          <S1.RadioButton pressed={el === filter.selectedAge} />
          <S1.CategoryName>
            {el}
            {el.length < 3 && "+"}
          </S1.CategoryName>
        </S1.WrapperCategory>
      ))}
    </S.Wrapper>
  );
};

function arePropsEqual(prevProps: IProps, nextProps: IProps) {
  return prevProps.name === nextProps.name && JSON.stringify(prevProps.filter) === JSON.stringify(nextProps.filter);
}

export default memo(SortPart, arePropsEqual);
