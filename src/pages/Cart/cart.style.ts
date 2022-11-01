import colors from "@/styles/colors";
import styled from "styled-components";

interface IButtonSubmit {
  disabled: boolean;
}
export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-block: 4rem;
  padding-inline: 2%;
  min-height: 90vh;
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 2rem;
  min-height: 2rem;
  padding-block: 3rem;
  display: grid;
  align-self: center;
`;

export const Title = styled.span`
  color: ${colors.LIGHT_GRAY};
  font-size: 24px;
  line-height: 26px;
  text-align: "left";
  display: block;
  padding-left: 4rem;
`;

export const Underline = styled.div`
  height: 3px;
  background-color: ${colors.LIGHT_GRAY};
  border-radius: 2px;
  margin: 1rem 0 1rem;
  display: block;
  margin-inline: 2rem;
`;

export const InfoDiv = styled.div`
  display: flex;
  margin-inline: 10%;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 20px;
    line-height: 22px;
    color: ${colors.WHITE};
    font-weight: 100;
  }
`;

export const ButtonSubmit = styled.button<IButtonSubmit>`
  background-color: ${(props) => (props.disabled ? colors.LIGHT_GRAY : colors.PURPURE)};
  border-radius: 10px;
  height: 45px;
  shape-outside: none;
  border: 0px;
  padding-inline: 20px;
  span {
    font-size: 18px;
    line-height: 22px;
    color: ${colors.WHITE};
    font-weight: 100;
  }
`;
