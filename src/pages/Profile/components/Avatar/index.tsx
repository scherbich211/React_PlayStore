import { IUser } from "@/types/mockStore";
import React from "react";
import { AvatarImage, AvatarWrapper, ButtonSubmit, NoAvatarBack, NoAvatarSquare, NoAvatarText } from "./avatar.styles";

interface IChangeUser {
  newUser: IUser;
  setNewUser: React.Dispatch<React.SetStateAction<IUser>>;
}
const Avatar: React.FC<IChangeUser> = (props) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const changePhoto = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      props.setNewUser({ ...props.newUser, profileImage: reader.result ? reader.result.toString() : "" });
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleClearPhoto = () => {
    props.setNewUser({ ...props.newUser, profileImage: "" });
  };

  return (
    <AvatarWrapper>
      {props.newUser.profileImage !== "" ? (
        <AvatarImage src={props.newUser.profileImage} alt="avatar" />
      ) : (
        <NoAvatarBack>
          <NoAvatarSquare>
            <NoAvatarText>NO PICTURE</NoAvatarText>
          </NoAvatarSquare>
        </NoAvatarBack>
      )}
      {props.newUser.profileImage !== "" && (
        <ButtonSubmit onClick={handleClearPhoto}>
          <span>Clear Image</span>
        </ButtonSubmit>
      )}
      <ButtonSubmit onClick={handleClick}>
        <span>Change profile image</span>
      </ButtonSubmit>
      <input onChange={changePhoto} type="file" style={{ display: "none" }} ref={hiddenFileInput} />
    </AvatarWrapper>
  );
};

export default Avatar;
