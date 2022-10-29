import colors from "@/styles/colors";
import styled from "styled-components";

export const Container = styled.div`
  border: 2px solid ${colors.WHITE};
  flex-direction: row;
  display: flex;
  align-items: center;
  min-width: 60%;
  position: relative;
  justify-content: space-between;
`;

export const DropDownContainer = styled("div")`
  width: 10.5em;
`;

export const DropDownHeader = styled("div")`
  padding: 0.4em 1em 0.4em 1em;
  font-weight: 500;
  font-size: 1.3rem;
  color: ${colors.GRAY};
`;

export const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 10;
  background-color: black;
  width: 100%;
  border: 2px solid ${colors.WHITE};
`;

export const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  box-sizing: border-box;
  color: ${colors.GRAY};
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.4em;
  }
`;

export const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.4em;
  cursor: pointer;
  :hover {
    color: ${colors.PURPURE};
  }
`;
