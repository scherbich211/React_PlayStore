import CustomInput from "@/components/CustomInput";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "@/types/mockStore";
import React, { useEffect } from "react";
import { useDebounce } from "@/hooks";
import InputsWrapper from "./inputs.style";
import ParseTextarea from "./description";

type FormState = {
  username: string;
  description: string;
};

const schhema = Yup.object().shape({
  username: Yup.string().min(3),
  description: Yup.string(),
});
interface IChangeUser {
  newUser: IUser;
  setNewUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const Inputs: React.FC<IChangeUser> = (props) => {
  const {
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FormState>({
    resolver: yupResolver(schhema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("username", props.newUser.login);
    setValue("description", props.newUser.description);
  }, []);

  const debouncedLogin = useDebounce(watch("username"), 500);
  const debouncedDescription = useDebounce(watch("description"), 500);

  useEffect(() => {
    if (debouncedLogin) {
      props.setNewUser({ ...props.newUser, login: debouncedLogin });
    }
  }, [debouncedLogin]);

  useEffect(() => {
    if (debouncedDescription) {
      props.setNewUser({ ...props.newUser, description: debouncedDescription });
    }
  }, [debouncedDescription]);

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
        name="description"
        render={({ field: { onChange } }) => <ParseTextarea onChange={onChange} value={[props.newUser.description]} />}
        control={control}
      />
    </InputsWrapper>
  );
};

export default Inputs;
