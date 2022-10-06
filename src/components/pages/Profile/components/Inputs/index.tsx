import CustomInput from "@/components/CustomInput";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputsWrapper from "./inputs.style";

type FormState = {
  username: string;
  description: string;
};

const schhema = Yup.object().shape({
  username: Yup.string().min(3),
  description: Yup.string(),
});

const Inputs = () => {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm<FormState>({
    resolver: yupResolver(schhema),
    mode: "onChange",
  });

  return (
    <InputsWrapper>
      <span>Username</span>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <CustomInput
            value={value === undefined ? value : value.trim()}
            onChange={onChange}
            type="text"
            error={Boolean(errors.username)}
            style={{ borderRadius: "0px" }}
          />
        )}
        name="username"
      />
      <span style={{ marginTop: "20px" }}>Profile description</span>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <CustomInput
            onChange={onChange}
            styleWrapper={{ height: "200px" }}
            textArea
            style={{ borderRadius: "0px" }}
            value={value === undefined ? value : value.trim()}
          />
        )}
        name="description"
      />
    </InputsWrapper>
  );
};

export default Inputs;
