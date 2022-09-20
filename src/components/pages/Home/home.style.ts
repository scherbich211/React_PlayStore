import colors from "@/styles/colors";
import styled from "styled-components";
import background from "../../../assets/images/background.png";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  padding-block: 4rem;
`;

export const Wrapper = styled.div`
  width: 90%;
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 2rem;
  min-height: 2rem;
  display: grid;
  align-self: center;
  margin-top: 3rem;
  padding: 3rem;
`;

export const Title = styled.span`
  color: ${colors.LIGHT_GRAY};
  font-size: 24px;
  line-height: 26px;
`;

export const Underline = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${colors.LIGHT_GRAY};
  border-radius: 2px;
  margin: 1rem 0 1rem;
`;
