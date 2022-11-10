import colors from "@/styles/colors";
import styled from "styled-components";

interface IButtonSubmit {
  disabled?: boolean;
}

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  :nth-child(2) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  line-height: 26px;
  color: ${colors.GRAY};
  font-weight: 600;
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

export const AvatarImage = styled.img`
  height: 25rem;
  border-radius: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerInput = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  span {
    font-size: 20px;
    line-height: 22px;
    color: ${colors.GRAY};
    width: "25%";
  }
`;

export const ButtonsWrapper = styled.div`
  margin-top: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ButtonSubmit = styled.button<IButtonSubmit>`
  background-color: ${(props) => (props.disabled ? colors.LIGHT_GRAY : colors.DARK_PURPURE)};
  border-radius: 10px;
  height: 45px;
  shape-outside: none;
  border: 0px;
  padding-inline: 15px;
  margin-inline: 20px;
  span {
    font-size: 18px;
    line-height: 22px;
    color: ${colors.WHITE};
    font-weight: 100;
  }
`;
