import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

interface INavMenu {
  isActive: boolean;
}

export const Nav = styled.nav`
  background: #000;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 10;
  align-items: center;
`;

export const NavMenu = styled.div<INavMenu>`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  min-height: 70px;
  font-size: 17px;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.active {
    background-color: #2b252e;
    border-bottom: 7px solid purple;
  }
`;
export const NavLinkLogo = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
