import React from "react";
import CustomInput from "@/components/CustomInput";
import * as S from "../adminModal.style";

interface IProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const DescriptionPart: React.FC<IProps> = (props) => {
  const { text, setText } = props;

  return (
    <S.ContainerInput>
      <span>Description</span>
      <div style={{ width: "75%" }}>
        <CustomInput
          textAreaOnChange={(e) => setText(e.target.value)}
          value={text}
          styleWrapper={{ height: "200px" }}
          textArea
          style={{ borderRadius: "0px" }}
          maxLength={300}
        />
      </div>
    </S.ContainerInput>
  );
};

export default DescriptionPart;
