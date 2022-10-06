import { useAppSelector } from "@/hooks";
import Avatar from "./components/Avatar";
import Inputs from "./components/Inputs";
import * as S from "./profile.style";

function Profile() {
  // const [save] = useSaveProfile();
  // const [change] = useChangePassword();
  const { user } = useAppSelector((state) => state.user);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>{user.login} profile page</S.Title>
        <S.Underline />
        <S.ContentWrapper>
          <Avatar />
          <Inputs />
          <S.ButtonsWrapper>
            <S.ButtonSubmit>
              <span>Save profile</span>
            </S.ButtonSubmit>
            <S.ButtonSubmit>
              <span>Change password</span>
            </S.ButtonSubmit>
          </S.ButtonsWrapper>
        </S.ContentWrapper>
      </S.Wrapper>
    </S.Container>
  );
}

export default Profile;
