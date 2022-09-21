import colors from "@/styles/colors";
import styled from "styled-components";

export const SearchBlock = styled.div`
  width: 80%;
  margin-top: 20px;
  justify-content: center;
  display: flex;
  align-self: center;
`;

export const SearchPanel = styled.input`
  color: ${colors.WHITE};
  width: 95%;
  opacity: 0.8;
  height: 2.7rem;
  background-color: ${colors.BLACK};
  padding-left: 10px;
  outline: none;
  box-sizing: border-box;
  border-radius: 1rem;
  border: 2px solid ${colors.WHITE};
  :focus {
    border-color: ${colors.PURPURE};
  }
  cursor: pointer;
  :hover {
    border-color: ${colors.PURPURE};
  }
`;

export const StyledList = styled.div`
  width: 76%;
  z-index: 2;
  position: absolute;
  margin-top: 2.7rem;
  border: 1px solid none;
  border-radius: 10px;
  padding: 10px;
  background-color: ${colors.BLACK};
  display: flex;
  flex-direction: column;
`;
