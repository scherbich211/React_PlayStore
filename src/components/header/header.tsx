import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { changeCart } from "../../redux/reducers/cart";
import { changeAdmin, changeLogOut } from "../../redux/reducers/user";
import { useLogOutMutation } from "../../api/user";
import { changeModalActive, changeModalType } from "../../redux/reducers/modal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import colors from "../../styles/colors";
import { Route } from "../../utils/routing";
import { Bars, Nav, NavLink, NavMenu, NavLinkLogo, NavButton } from "./header.style";
import Dropdown from "../dropdown/Dropdown";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isSignedIn, isAdmin } = useAppSelector((state) => state.user);

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [clear] = useLogOutMutation();

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
    dispatch(changeModalActive(true));
    dispatch(changeModalType(value));
  };

  const handleLogOut = () => {
    clear();
    navigate(Route.Home);
    dispatch(changeLogOut());
    dispatch(changeCart([]));
    isAdmin && dispatch(changeAdmin(false));
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
          <NavLink to={Route.Products} onClick={closeMobileMenu} style={{ pointerEvents: "none" }}>
            Products
            {dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </NavLink>
          {dropdown && <Dropdown />}
        </div>
        <NavLink to={Route.About} onClick={closeMobileMenu}>
          About
        </NavLink>
        {isSignedIn ? (
          <>
            <NavLink to={Route.Profile} onClick={closeMobileMenu}>
              <div style={{ flexDirection: "row" }}>
                <AiOutlineUser style={{ marginRight: "5px" }} size={28} />
                {user?.login}
              </div>
            </NavLink>
            <NavLink to={Route.Cart} onClick={closeMobileMenu}>
              <AiOutlineShoppingCart size={28} color={colors.GRAY} />
            </NavLink>
            <NavButton onClick={() => handleLogOut()}>
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
