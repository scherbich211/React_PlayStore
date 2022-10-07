import CustomInput from "@/components/CustomInput";
import React from "react";

const ParseTextarea = ({ value = [], onChange }: { value: Array<string>; onChange: (...event: unknown[]) => void }) => {
  const [text, setText] = React.useState<string>(value.join("\n"));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: string } = e.target;
    setText(string);
    onChange(string);
  };

  return (
    <CustomInput
      textAreaOnChange={handleChange}
      value={text}
      styleWrapper={{ height: "200px" }}
      textArea
      style={{ borderRadius: "0px" }}
    />
  );
};
export default ParseTextarea;
