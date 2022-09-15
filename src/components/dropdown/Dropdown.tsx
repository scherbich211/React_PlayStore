import React, { useState } from "react";
import * as S from "./dropdown.style";

export const MenuItems = [
  {
    title: "Marketing",
    path: "/marketing",
  },
  {
    title: "Consulting",
    path: "/consulting",
  },
  {
    title: "Design",
    path: "/design",
  },
  {
    title: "Development",
    path: "/development",
  },
];
function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <S.DropdownWrapper
      onClick={
        MenuItems.length > 0
          ? handleClick
          : () => {
              console.log(1);
            }
      }
      show={click}
    >
      {MenuItems.map((item, index) => (
        <S.DropdownLinkWrapper to={item.path} onClick={() => setClick(false)}>
          {item.title}
        </S.DropdownLinkWrapper>
      ))}
    </S.DropdownWrapper>
  );
}

export default Dropdown;
