import { useAppDispatch, useAppSelector, useVisiability } from "@/hooks";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useChangePassword, useUserQuery } from "@/api/user";
import { changeModalActive } from "@/redux/reducers/modal";
import { changeUser } from "@/redux/reducers/user";
import CustomInput from "../CustomInput";
import * as S from "./changePassword.style";

type FormState = {
  password: string;
  confirmPassword: string;
};

const matchRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const schema = Yup.object().shape({
  password: Yup.string().matches(matchRegExp).required(),
  confirmPassword: Yup.string().when("password", {
    is: (value: string | unknown[]) => value && value.length > 0,
    then: Yup.string()
      .oneOf([Yup.ref("password")], "Both passwords need to be the same")
      .required(),
  }),
});

const ChangePassword: React.FC = () => {
  const { type, active } = useAppSelector((state) => state.modal);
  const [isVisible, visible] = useVisiability(true);
  const [isVisibleConfirm, visibleConfirm] = useVisiability(true);

  const dispatch = useAppDispatch();

  const [changePassword, { isSuccess }] = useChangePassword();
  const { isSuccess: getSuccess, data: userData, isLoading, refetch } = useUserQuery();

  const {
    control,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm<FormState>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = () => {
    const newPasswrod = {
      password: getValues("password"),
    };
    changePassword(newPasswrod);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (getSuccess) {
      if (userData) {
        dispatch(changeUser(userData));
        dispatch(changeModalActive(false));
      }
    }
  }, [getSuccess]);

  useEffect(() => {
    reset(
      {},
      {
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      }
    );
  }, [type, active]);

  return (
    <>
      <S.RowWrapper style={{ marginBottom: "20px" }}>
        <S.Title>Change password</S.Title>
        <S.Close onClick={() => dispatch(changeModalActive(false))}>&times;</S.Close>
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
      {Boolean(errors.password) && (
        <S.HelperText error={Boolean(errors.password)}>
          Password must contain:{"\n"} &quot;a-z&quot;, &quot;A-Z&quot;, &quot;0-9&quot;, &quot;!@#$%^&*&quot;,
          &quot;min. 8 characters&quot;
        </S.HelperText>
      )}
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
      {Boolean(errors.confirmPassword) && (
        <S.HelperText error={Boolean(errors.confirmPassword)}>Both passwords must match.</S.HelperText>
      )}
      <S.ButtonSubmit disabled={!isValid || isLoading} style={{ marginTop: "20px" }} onClick={handleSubmit}>
        <span>Submit</span>
      </S.ButtonSubmit>
    </>
  );
};

export default ChangePassword;
