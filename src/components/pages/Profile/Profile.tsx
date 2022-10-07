import { useSaveProfile, useUserQuery } from "@/api/user";
import Loader from "@/components/Loader/loader.styles";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { changeUser } from "@/redux/reducers/user";
import { IUser } from "@/types/mockStore";
import { useEffect, useState } from "react";
import Avatar from "./components/Avatar";
import Inputs from "./components/Inputs";
import * as S from "./profile.style";

function Profile() {
  const [save, { isSuccess }] = useSaveProfile();
  const { isSuccess: getSuccess, data, isLoading, refetch } = useUserQuery();
  // const [change] = useChangePassword();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (getSuccess) {
      if (data) {
        dispatch(changeUser(data));
      }
    }
  }, [getSuccess]);

  const [newUser, setNewUser] = useState<IUser>(user);

  const handleSubmit = () => {
    save(newUser);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

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
              <Avatar newUser={newUser} setNewUser={setNewUser} />
              <Inputs newUser={newUser} setNewUser={setNewUser} />
              <S.ButtonsWrapper>
                <S.ButtonSubmit onClick={handleSubmit}>
                  <span>Save profile</span>
                </S.ButtonSubmit>
                <S.ButtonSubmit>
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
