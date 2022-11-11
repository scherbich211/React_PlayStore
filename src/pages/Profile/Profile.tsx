import { useSaveProfile, useUserQuery } from "@/api/user";
import Loader from "@/components/Loader/loader.styles";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSnackBar } from "@/redux/reducers/alert";
import { changeModalActive, changeModalType } from "@/redux/reducers/modal";
import { changeUser } from "@/redux/reducers/user";
import { Time } from "@/types/alert";
import { IUser } from "@/types/mockStore";
import { useEffect, useMemo, useState } from "react";
import Avatar from "./components/Avatar";
import Inputs from "./components/Inputs";
import * as S from "./profile.style";

function Profile() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const [newUser, setNewUser] = useState<IUser>(user);
  const [valid, setIsValid] = useState(false);

  const [save, { isSuccess }] = useSaveProfile();
  const { isSuccess: getSuccess, data, isLoading, refetch } = useUserQuery();

  const handleSubmit = () => {
    save(newUser);
  };

  const handleChangePassword = () => {
    dispatch(changeModalActive(true));
    dispatch(changeModalType("password"));
  };

  useEffect(() => {
    if (getSuccess) {
      if (data) {
        dispatch(changeUser(data));
      }
    }
  }, [getSuccess]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      dispatch(
        setSnackBar({
          time: Time.MEDIUM,
          message: "Profile has been changed",
          notificationType: "info",
        })
      );
    }
  }, [isSuccess]);

  const memorizedAvar = useMemo(() => <Avatar newUser={newUser} setNewUser={setNewUser} />, [newUser.profileImage]);
  const memorizedInputs = useMemo(
    () => <Inputs newUser={newUser} setNewUser={setNewUser} setIsValid={setIsValid} />,
    [newUser.balance, newUser.description, newUser.login]
  );

  return (
    <S.Container>
      <S.Wrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <S.Title>{user.login} profile page</S.Title>
            <S.Underline />
            <S.ContentWrapper>
              {memorizedAvar}
              {memorizedInputs}
              <S.ButtonsWrapper>
                <S.ButtonSubmit onClick={handleSubmit} disabled={!valid}>
                  <span>Save profile</span>
                </S.ButtonSubmit>
                <S.ButtonSubmit onClick={handleChangePassword}>
                  <span>Change password</span>
                </S.ButtonSubmit>
              </S.ButtonsWrapper>
            </S.ContentWrapper>
          </>
        )}
      </S.Wrapper>
    </S.Container>
  );
}

export default Profile;
