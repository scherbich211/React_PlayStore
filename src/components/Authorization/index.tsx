import { useVisiability } from "@/hooks";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "@/types/user";
import { useAuth } from "@/AuthProvider";
import CustomInput from "../CustomInput";
import * as S from "./authorization.style";

interface IProps {
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  signUp: boolean;
}

type FormState = {
  login: string;
  password: string;
  confirmPassword: string;
};

const matchRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const schemaSignUp = Yup.object().shape({
  login: Yup.string().required(),
  password: Yup.string().matches(matchRegExp).required(),
  confirmPassword: Yup.string().when("password", {
    is: (value: string | unknown[]) => value && value.length > 0,
    then: Yup.string()
      .oneOf([Yup.ref("password")], "Both passwords need to be the same")
      .required(),
  }),
});

const schhemaSignIn = Yup.object().shape({
  login: Yup.string().required(),
  password: Yup.string().required(),
});

const Authorization: React.FC<IProps> = (props) => {
  const { onLogin, onSingUp } = useAuth();
  const { setActiveModal, signUp } = props;
  const [isVisible, visible] = useVisiability(true);
  const [isVisibleConfirm, visibleConfirm] = useVisiability(true);

  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormState>({
    resolver: yupResolver(signUp ? schemaSignUp : schhemaSignIn),
    mode: "onChange",
  });

  const handleSubmit = () => {
    const user: IUser = {
      id: 0,
      login: getValues("login"),
      password: getValues("password"),
    };
    if (signUp) {
      onSingUp && onSingUp(user);
    } else {
      onLogin && onLogin(user);
    }
  };

  return (
    <>
      <S.RowWrapper style={{ marginBottom: "20px" }}>
        <S.Title>Authorization</S.Title>
        <S.Close onClick={() => setActiveModal(false)}>&times;</S.Close>
      </S.RowWrapper>
      <S.RowWrapper style={{ marginBottom: "30px" }}>
        <S.InputDefenition>Login</S.InputDefenition>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              value={value === undefined ? value : value.trim()}
              onChange={onChange}
              error={Boolean(errors.login)}
            />
          )}
          name="login"
        />
      </S.RowWrapper>
      <S.RowWrapper style={{ marginBottom: "10px" }}>
        <S.InputDefenition>Password</S.InputDefenition>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              value={value === undefined ? value : value.trim()}
              onChange={onChange}
              type={isVisible ? "password" : "text"}
              right={isVisible ? <AiFillEyeInvisible size={28} /> : <AiFillEye size={28} />}
              error={Boolean(errors.password)}
              onRightPress={visible}
            />
          )}
          name="password"
        />
      </S.RowWrapper>
      {signUp && Boolean(errors.password) && (
        <S.HelperText error={Boolean(errors.password)}>
          Password must contain:{"\n"} &quot;a-z&quot;, &quot;A-Z&quot;, &quot;0-9&quot;, &quot;!@#$%^&*&quot;,
          &quot;min. 8 characters&quot;
        </S.HelperText>
      )}
      {signUp && (
        <>
          <S.RowWrapper style={{ marginBottom: "10px", marginTop: "20px" }}>
            <S.InputDefenition>Repeat password</S.InputDefenition>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  value={value === undefined ? value : value.trim()}
                  onChange={onChange}
                  error={Boolean(errors.confirmPassword)}
                  type={isVisibleConfirm ? "password" : "text"}
                  right={isVisibleConfirm ? <AiFillEyeInvisible size={28} /> : <AiFillEye size={28} />}
                  onRightPress={visibleConfirm}
                />
              )}
              name="confirmPassword"
            />
          </S.RowWrapper>
          {signUp && Boolean(errors.confirmPassword) && (
            <S.HelperText error={Boolean(errors.confirmPassword)}>Both passwords must match.</S.HelperText>
          )}
        </>
      )}
      <S.ButtonSubmit disabled={!isValid} style={{ marginTop: "20px" }} onClick={handleSubmit}>
        <span>Submit</span>
      </S.ButtonSubmit>
    </>
  );
};

export default Authorization;
