import CheckBox from "@/components/Checkbox";
import React from "react";
import * as S from "../adminModal.style";
import { platfromArr } from "../constants";

interface IProps {
  platform: ("Playstation 5" | "PC" | "XBox One")[];
  setPLatformItem: (value: "Playstation 5" | "PC" | "XBox One") => void;
}

const PlatformPart: React.FC<IProps> = (props) => {
  const { platform, setPLatformItem } = props;

  return (
    <>
      <S.Title>Platform</S.Title>
      {platfromArr.map((el) => (
        <S.ContainerInput key={el}>
          <span>{el}</span>
          <div
            style={{
              width: "20px",
            }}
          >
            <CheckBox isChecked={platform.includes(el)} onPress={() => setPLatformItem(el)} />
          </div>
        </S.ContainerInput>
      ))}
    </>
  );
};
export default PlatformPart;
