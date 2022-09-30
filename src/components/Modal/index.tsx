import React, { ReactNode } from "react";
import * as S from "./modal.style";

interface IProps {
  active: boolean;
  children: ReactNode;
}

const Modal: React.FC<IProps> = (props) => {
  const { active, children } = props;

  return (
    <S.ModalWrapper active={active}>
      <S.ModalContent onClick={(e) => e.stopPropagation()} active={active}>
        {children}
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

export default Modal;
