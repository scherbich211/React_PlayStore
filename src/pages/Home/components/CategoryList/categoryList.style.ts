import colors from "@/styles/colors";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperList = styled.div`
  width: 100%;
  justify-content: space-between;
  margin-top: 3rem;
  flex-direction: row;
  display: flex;
`;

export const ListItem = styled(Link)`
  width: 27%;
  border: 2px solid ${colors.WHITE};
  border-bottom: 10px solid ${colors.WHITE};
  border-radius: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${colors.BLACK};
  padding-block: 2rem;
  text-decoration: none;
  :hover {
    border-color: ${colors.PURPURE};
  }
  h1 {
    color: ${colors.LIGHT_GRAY};
    font-size: 22px;
    line-height: 24px;
  }
`;

export const Img = styled.img`
  width: 35%;
  height: 35%;
`;
