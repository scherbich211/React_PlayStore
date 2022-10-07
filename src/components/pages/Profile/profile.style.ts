import colors from "@/styles/colors";
import styled from "styled-components";

interface IButtonSubmit {
  disabled?: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-block: 4rem;
  min-height: 90vh;
`;

export const Wrapper = styled.div`
  width: 90%;
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 2rem;
  min-height: 2rem;
  display: grid;
  align-self: center;
  align-items: center;
  padding: 3rem;
`;

export const Title = styled.span`
  color: ${colors.GRAY};
  font-size: 24px;
  line-height: 26px;
`;

export const Underline = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${colors.GRAY};
  border-radius: 2px;
  margin: 1rem 0 1rem;
`;

export const ContentWrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 105px;
`;

export const ButtonSubmit = styled.button<IButtonSubmit>`
  background-color: ${(props) => (props.disabled ? colors.LIGHT_GRAY : colors.DARK_PURPURE)};
  border-radius: 10px;
  height: 45px;
  shape-outside: none;
  border: 0px;
  padding-inline: 10px;
  span {
    font-size: 18px;
    line-height: 22px;
    color: ${colors.WHITE};
    font-weight: 100;
  }
`;
