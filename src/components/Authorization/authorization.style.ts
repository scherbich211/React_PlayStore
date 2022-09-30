import colors from "@/styles/colors";
import styled from "styled-components";

interface IButtonSubmit {
  disabled: boolean;
}
interface IHelperText {
  error: boolean;
}

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.h1`
  font-size: 24px;
  line-height: 26px;
  color: ${colors.GRAY};
  font-weight: 600;
`;
export const InputDefenition = styled.span`
  font-size: 18px;
  line-height: 26px;
  font-weight: 200;
  color: ${colors.GRAY};
  width: 45%;
`;

export const Close = styled.span`
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 48px;
  line-height: 28px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    color: ${colors.PURPURE};
  }
`;

export const ButtonSubmit = styled.button<IButtonSubmit>`
  background-color: ${(props) => (props.disabled ? colors.LIGHT_GRAY : colors.PURPURE)};
  border-radius: 10px;
  width: 30%;
  height: 45px;
  shape-outside: none;
  border: 0px;
  margin-left: 35%;
  margin-bottom: 20px;
  span {
    font-size: 18px;
    line-height: 22px;
    color: ${colors.WHITE};
    font-weight: 100;
  }
`;

export const HelperText = styled.span<IHelperText>`
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => (props.error ? colors.RED : colors.GRAY)};
`;
