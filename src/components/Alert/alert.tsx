import React, { ReactElement, useState } from "react";
import { IAlertTypes, TextAlert, WrapperAlert } from "./alert.style";

interface IProps {
  children?: ReactElement;
  type: IAlertTypes;
  message: string;
  handle?: () => void;
}

function Alert(props: IProps) {
  const { children, type, message, handle } = props;
  const [isShow, setIsShow] = useState(true);

  const renderElAlert = () => children && React.cloneElement(children);

  const handleClose = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsShow(false);
    handle && handle();
  };

  return (
    <WrapperAlert show={isShow} type={type}>
      <TextAlert onClick={handleClose}>&times;</TextAlert>
      {children ? renderElAlert() : message}
    </WrapperAlert>
  );
}

export default Alert;
