import { useAppDispatch, useAppSelector, useVisiability } from "@/hooks";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "@/types/mockStore";
import { useSignInMutation, useSignUpMutation } from "@/api/user";
import { changeModalActive } from "@/redux/reducers/modal";
import { changeUser, changeUserIsSignedIn } from "@/redux/reducers/user";
import { useLocation, useNavigate } from "react-router-dom";
import { Route } from "@/utils/routing";
import CustomInput from "../CustomInput";
import * as S from "./authorization.style";

type FormState = {
  login: string;
  password: string;
  confirmPassword: string;
};

const matchRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const schemaSignUp = Yup.object().shape({
  login: Yup.string().min(3).required(),
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

const Authorization: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { type, active } = useAppSelector((state) => state.modal);
  const [isVisible, visible] = useVisiability(true);
  const [isVisibleConfirm, visibleConfirm] = useVisiability(true);

  const dispatch = useAppDispatch();

  const [signIn, { isSuccess: signInSucccess, data: signInData }] = useSignInMutation();
  const [signUp, { isSuccess: signUpSucccess, data: signUpData }] = useSignUpMutation();

  const signUpProp: boolean = type === "signUp";

  const {
    control,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm<FormState>({
    resolver: yupResolver(signUpProp ? schemaSignUp : schhemaSignIn),
    mode: "onChange",
    defaultValues: {
      login: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = () => {
    const user: IUser = {
      id: 0,
      login: getValues("login"),
      password: getValues("password"),
      description: "",
      profileImage: "",
      balance: "0",
    };
    if (signUpProp) {
      signUp(user);
    } else {
      signIn(user);
    }
  };

  useEffect(() => {
    if (signInSucccess && signInData) {
      dispatch(changeUserIsSignedIn(true));
      dispatch(changeUser(signInData));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigate((location.state?.from && location.state?.from?.pathname) || Route.Home);
      dispatch(changeModalActive(false));
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
    }
  }, [signInSucccess, signInData]);

  useEffect(() => {
    if (signUpSucccess && signUpData) {
      dispatch(changeUserIsSignedIn(true));
      dispatch(changeUser(signUpData));
      navigate(Route.Profile);
      dispatch(changeModalActive(false));
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
    }
  }, [signUpSucccess, signUpData]);

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
        <S.Title>Authorization</S.Title>
        <S.Close onClick={() => dispatch(changeModalActive(false))}>&times;</S.Close>
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
      {signUpProp && Boolean(errors.password) && (
        <S.HelperText error={Boolean(errors.password)}>
          Password must contain:{"\n"} &quot;a-z&quot;, &quot;A-Z&quot;, &quot;0-9&quot;, &quot;!@#$%^&*&quot;,
          &quot;min. 8 characters&quot;
        </S.HelperText>
      )}
      {signUpProp && (
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
          {signUpProp && Boolean(errors.confirmPassword) && (
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
