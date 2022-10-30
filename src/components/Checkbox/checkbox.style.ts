/* eslint-disable no-nested-ternary */
import colors from "@/styles/colors";
import styled from "styled-components";

interface ICheckbox {
  isChecked: boolean;
  disabled?: boolean;
}

const CheckboxS = styled.div<ICheckbox>`
  align-items: "center";
  justify-content: "center";
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 6;
  border-color: ${(props) => (props.disabled ? "#ADADAD" : props.isChecked ? colors.PURPURE : "#4B4B4B")};
  border-width: 2;
  background-color: ${(props) => (props.isChecked ? colors.PURPURE : colors.GRAY)};
`;

export default CheckboxS;
