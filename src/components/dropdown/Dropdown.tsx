import { useState } from "react";
import { MenuItems } from "../../utils/routing";
import * as S from "./dropdown.style";

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
        <S.DropdownLinkWrapper to={item.path} onClick={() => setClick(false)} key={index.toString() + item.title}>
          {item.title}
        </S.DropdownLinkWrapper>
      ))}
    </S.DropdownWrapper>
  );
}

export default Dropdown;
