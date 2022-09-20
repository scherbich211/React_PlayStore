import routing from "@/utils/routing";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Dropdown from "../Dropdown/Dropdown";
import { Bars, Nav, NavLink, NavMenu, NavLinkLogo } from "./header.style";

function NavBar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
  return (
    <Nav>
      <NavLinkLogo to="/">
        <h1>Game Store</h1>
      </NavLinkLogo>
      <Bars onClick={handleClick} />
      <NavMenu isActive={click}>
        {routing.map((el) => (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {el.name !== "Products" ? (
              <NavLink to={el.route} onClick={closeMobileMenu}>
                {el.name}
              </NavLink>
            ) : (
              <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <NavLink to={el.route} onClick={closeMobileMenu}>
                  {el.name}
                  {dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </NavLink>
                {dropdown && <Dropdown />}
              </div>
            )}
          </>
        ))}
      </NavMenu>
    </Nav>
  );
}

export default NavBar;
