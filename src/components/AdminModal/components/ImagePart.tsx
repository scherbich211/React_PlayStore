import * as S from "../adminModal.style";

interface IProps {
  imageSrc: string;
}
const ImagePart: React.FC<IProps> = (props) => (
  <div style={{ width: "30%" }}>
    <S.Title>Card Image</S.Title>
    <S.AvatarImage src={props.imageSrc} alt="avatar" />
  </div>
);
export default ImagePart;
