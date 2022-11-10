import SortDropdown from "@/components/SortDropdown/SortDropdown";
import React from "react";
import * as S from "../adminModal.style";
import { ageArr } from "../constants";

interface IProps {
  age: string;
  setSelectedAge: (value: string) => void;
}

const AgePart: React.FC<IProps> = (props) => {
  const { age, setSelectedAge } = props;
  return (
    <S.ContainerInput>
      <span>Age</span>
      <div style={{ width: "25%" }}>
        <SortDropdown
          array={ageArr}
          selectedOption={age.toString().indexOf("+") === -1 ? `${age}+` : age}
          setSelectedOption={setSelectedAge}
        />
      </div>
    </S.ContainerInput>
  );
};
export default AgePart;
