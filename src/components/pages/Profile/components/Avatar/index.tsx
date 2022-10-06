import { AvatarWrapper, ButtonSubmit, NoAvatarBack, NoAvatarSquare, NoAvatarText } from "./avatar.styles";

const Avatar = () => {
  const pidor = 0;
  return (
    <AvatarWrapper>
      <NoAvatarBack>
        <NoAvatarSquare>
          <NoAvatarText>NO PICTURE</NoAvatarText>
        </NoAvatarSquare>
      </NoAvatarBack>
      <ButtonSubmit>
        <span>Change profile image</span>
      </ButtonSubmit>
    </AvatarWrapper>
  );
};

export default Avatar;
