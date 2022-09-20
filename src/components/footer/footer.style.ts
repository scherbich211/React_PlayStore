import colors from "@/styles/colors";
import styled from "styled-components";

export const Container = styled.div`
  padding: 10px 30px 30px;
  background: ${colors.BLACK};

  @media (max-width: 1000px) {
    padding: 10px 20px 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Row = styled.div`
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  } */
  flex-direction: row;
`;

export const Link = styled.a`
  /* color: #fff;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    transition: 200ms ease-in;
  } */
`;

export const Title = styled.p`
  font-size: 20px;
  color: ${colors.WHITE};
  font-weight: bold;
`;

export const Img = styled.img`
  width: 70px;
  height: 50px;
  margin: 15px;
`;
