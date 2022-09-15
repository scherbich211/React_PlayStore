import { Link } from "react-router-dom";
import styled from "styled-components";

interface IDropdown {
  show: boolean;
}
export const DropdownWrapper = styled.div<IDropdown>`
  display: block;
  background: red;
  width: 200px;
  position: absolute;
  list-style: none;
  text-align: start;
  @media screen and (max-width: 960px) {
    .fa-caret-down {
      display: none;
    }
  }
`;

export const DropdownLinkWrapper = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: #fff;
  padding: 16px;
  background: #1888ff;
  cursor: pointer;
  :hover {
    background: #5cabff;
  }
`;
