import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import * as S from "./sortdropdown.style";

interface IProps<T> {
  array: Array<T>;
  selectedOption: T;
  setSelectedOption: (value: T) => void;
}

export default function SortDropdown<T>(props: IProps<T>) {
  const { array, selectedOption, setSelectedOption } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: T) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <S.Container onClick={toggling}>
      <S.DropDownContainer>
        <S.DropDownHeader>{selectedOption || "PC"}</S.DropDownHeader>
        {isOpen && (
          <S.DropDownListContainer>
            <S.DropDownList>
              {array.map((option) => (
                <S.ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </S.ListItem>
              ))}
            </S.DropDownList>
          </S.DropDownListContainer>
        )}
      </S.DropDownContainer>
      {isOpen ? <AiFillCaretUp size={22} /> : <AiFillCaretDown size={22} />}
    </S.Container>
  );
}
