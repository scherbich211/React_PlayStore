import React, { ReactNode } from "react";
import { Input, InputArea, InputWrapper, RightDiv } from "./input.style";

interface ICustomInput {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  value?: string;
  placeholder?: string | undefined;
  right?: ReactNode;
  onRightPress?: () => void;
  type?: React.HTMLInputTypeAttribute | undefined;
  error?: boolean | undefined;
  style?: React.CSSProperties | undefined;
  styleWrapper?: React.CSSProperties | undefined;
  textArea?: boolean;
  textAreaOnChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomInput: React.FC<ICustomInput> = (props) => {
  const pidor = 0;

  return (
    <InputWrapper style={props.styleWrapper}>
      {props.textArea ? (
        <InputArea
          placeholder={props.placeholder}
          value={props.value}
          maxLength={150}
          error={props.error}
          style={props.style}
          onChange={props.textAreaOnChange}
        />
      ) : (
        <Input
          onChange={props.onChange}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
          type={props.type}
          value={props.value}
          maxLength={30}
          error={props.error}
          style={props.style}
        />
      )}

      {props.right ? <RightDiv onClick={props.onRightPress}>{props.right}</RightDiv> : null}
    </InputWrapper>
  );
};

export default CustomInput;
