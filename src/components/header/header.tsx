import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Route } from "@/utils/routing";
import { useIsAuthorizedQuery } from "@/api/user";
import { Bars, Nav, NavLink, NavMenu, NavLinkLogo } from "./header.style";
import Dropdown from "../Dropdown/Dropdown";

interface IProps {
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<IProps> = (props) => {
  const history = useNavigate();

  const { setActiveModal, setModal } = props;
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const { isSuccess, data, refetch } = useIsAuthorizedQuery();

  useEffect(() => {
    if (!authorized) {
      refetch();
    }
  }, [window.location.href]);

  useEffect(() => {
    if (isSuccess && data) {
      setAuthorized(data);
    }
  }, [isSuccess]);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
  };

  const onMouseEnter = () => {
    if (authorized) {
      if (window.innerWidth < 960) {
        setDropdown(false);
      } else {
        setDropdown(true);
      }
    }
  };

  const onMouseLeave = () => {
    if (authorized) {
      if (window.innerWidth < 960) {
        setDropdown(false);
      } else {
        setDropdown(false);
      }
    }
  };

  function delayAndGo(e: React.MouseEvent<HTMLDivElement, MouseEvent>, route: string) {
    closeMobileMenu();
    e.preventDefault();
    if (authorized) {
      history(route);
    } else {
      setModal("signIn");
      setActiveModal(true);
    }
  }

  return (
    <Nav>
      <NavLinkLogo to="/">
        <h1>Game Store</h1>
      </NavLinkLogo>
      <Bars onClick={handleClick} />
      <NavMenu>
        <NavLink
          onClick={() => {
            closeMobileMenu();
            history(Route.Home);
          }}
        >
          Home
        </NavLink>
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <NavLink onClick={(e) => delayAndGo(e, Route.Products)}>
            Products
            {dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </NavLink>
          {dropdown && <Dropdown />}
        </div>
        <NavLink onClick={(e) => delayAndGo(e, Route.About)}>About</NavLink>
        <NavLink
          onClick={() => {
            setActiveModal(true);
            setModal("signIn");
          }}
        >
          Sign In
        </NavLink>
        <NavLink
          onClick={() => {
            setActiveModal(true);
            setModal("signUp");
          }}
        >
          Sign Up
        </NavLink>
      </NavMenu>
    </Nav>
  );
};

export default NavBar;
