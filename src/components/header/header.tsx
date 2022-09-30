import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useAuth } from "@/AuthProvider";
import { Route } from "@/utils/routing";
import colors from "@/styles/colors";
import { Bars, Nav, NavLink, NavMenu, NavLinkLogo, NavButton } from "./header.style";
import Dropdown from "../Dropdown/Dropdown";

interface IProps {
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<IProps> = (props) => {
  const { authorized, onLogout, user } = useAuth();
  const { setActiveModal, setModal } = props;
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const chooseModal = (value: string) => {
    setActiveModal(true);
    setModal(value);
  };

  return (
    <Nav>
      <NavLinkLogo to="/">
        <h1>Game Store</h1>
      </NavLinkLogo>
      <Bars onClick={handleClick} />
      <NavMenu>
        <NavLink to={Route.Home} onClick={closeMobileMenu}>
          Home
        </NavLink>
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <NavLink to={Route.Products} onClick={closeMobileMenu}>
            Products
            {dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </NavLink>
          {dropdown && <Dropdown />}
        </div>
        <NavLink to={Route.About} onClick={closeMobileMenu}>
          About
        </NavLink>
        {authorized ? (
          <>
            <NavLink to={Route.Profile} onClick={closeMobileMenu}>
              <div style={{ flexDirection: "row" }}>
                <AiOutlineUser style={{ marginRight: "5px" }} size={28} />
                {user?.login}
              </div>
            </NavLink>
            <NavButton>
              <AiOutlineShoppingCart size={28} color={colors.GRAY} />
            </NavButton>
            <NavButton onClick={onLogout}>
              <RiLogoutBoxRFill size={28} color={colors.GRAY} />
            </NavButton>
          </>
        ) : (
          <>
            <NavButton onClick={() => chooseModal("signIn")}>Sign In</NavButton>
            <NavButton onClick={() => chooseModal("signUp")}>Sign Up</NavButton>
          </>
        )}
      </NavMenu>
    </Nav>
  );
};

export default NavBar;
