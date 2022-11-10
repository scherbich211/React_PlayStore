import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import CheckboxS from "./checkbox.style";

interface IProps {
  isChecked: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const CheckBox: React.FC<IProps> = (props) => {
  const pidor = 0;
  return (
    <CheckboxS onClick={props.onPress} disabled={props.disabled} isChecked={props.isChecked}>
      {props.isChecked && <AiOutlineCheck style={{ position: "absolute" }} color="white" size={20} />}
    </CheckboxS>
  );
};

export default CheckBox;
