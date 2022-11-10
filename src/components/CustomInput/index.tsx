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
  maxLength?: number;
}

const CustomInput: React.FC<ICustomInput> = (props) => {
  const {
    onChange,
    onBlur,
    value,
    placeholder,
    right,
    onRightPress,
    type,
    error,
    style,
    styleWrapper,
    textArea,
    textAreaOnChange,
    maxLength,
  } = props;

  return (
    <InputWrapper style={styleWrapper}>
      {textArea ? (
        <InputArea
          placeholder={placeholder}
          value={value}
          maxLength={maxLength || 150}
          error={error}
          style={style}
          onChange={textAreaOnChange}
        />
      ) : (
        <Input
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          type={type}
          value={value}
          maxLength={maxLength || 30}
          error={error}
          style={style}
        />
      )}

      {right ? <RightDiv onClick={onRightPress}>{right}</RightDiv> : null}
    </InputWrapper>
  );
};

export default CustomInput;
