import colors from "@/styles/colors";
import styled from "styled-components";

interface IInput {
  error?: boolean;
}

export const Input = styled.input<IInput>`
  margin-top: 2px;
  min-height: 56px;
  padding-inline: 15;
  border: 2px solid;
  border-color: ${(props) => (props.error ? colors.RED : colors.WHITE)};
  background-color: transparent;
  position: relative;
  width: 100%;
  border-radius: 15px;
  min-height: 60;
  display: flex;
  outline: none;
  color: ${colors.GRAY};
  font-size: 16px;
  padding-left: 10px;
  :focus {
    border-color: ${(props) => (props.error ? colors.RED : colors.PURPURE)};
  }
`;
export const InputArea = styled.textarea<IInput>`
  margin-top: 2px;
  min-height: 56px;
  padding-inline: 15;
  border: 2px solid;
  border-color: ${(props) => (props.error ? colors.RED : colors.WHITE)};
  background-color: transparent;
  position: relative;
  width: 100%;
  border-radius: 15px;
  min-height: 60;
  display: flex;
  outline: none;
  color: ${colors.GRAY};
  font-size: 16px;
  padding-left: 10px;
  :focus {
    border-color: ${(props) => (props.error ? colors.RED : colors.PURPURE)};
  }
`;

export const RightIcon = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 55px;
  right: 5px;
  color: white;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 60;
  display: flex;
`;

export const RightDiv = styled.div`
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  top: 10px;
  right: 5px;
`;
