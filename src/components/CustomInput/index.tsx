import React, { ReactNode } from "react";
import { Input, InputWrapper, RightDiv } from "./input.style";

interface ICustomInput {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  value?: string;
  placeholder?: string | undefined;
  right?: ReactNode;
  onRightPress?: () => void;
  type?: React.HTMLInputTypeAttribute | undefined;
  error?: boolean | undefined;
}

const CustomInput: React.FC<ICustomInput> = (props) => {
  const pidor = 0;
  return (
    <InputWrapper>
      <Input
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        maxLength={30}
        error={props.error}
      />
      {props.right ? <RightDiv onClick={props.onRightPress}>{props.right}</RightDiv> : null}
    </InputWrapper>
  );
};

export default CustomInput;
