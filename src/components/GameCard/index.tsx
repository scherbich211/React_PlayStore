import { Star } from "@/assets/svg/SVGIcons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { editCard } from "@/redux/reducers/admin";
import { changeModalActive, changeModalType } from "@/redux/reducers/modal";
import { IGameData } from "@/types/mockStore";
import * as S from "./gameCard.style";

interface IProps {
  card: IGameData;
  handlePress: (value: IGameData) => void;
  width?: string;
}

const GameCard: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const { isAdmin, isSignedIn } = useAppSelector((state) => state.user);
  const { name, route, price, descriptionBack, age, rating } = props.card;

  const chooseModal = () => {
    dispatch(changeModalActive(true));
    dispatch(changeModalType("adminEdit"));
    dispatch(editCard(props.card));
  };

  return (
    <S.ListItem width={props.width}>
      <S.FlipCardInner>
        <S.Front>
          <S.Img src={route} />
          <S.TextWrapper>
            <S.TextGame>{name}</S.TextGame>
            <S.TextGame>{price}</S.TextGame>
          </S.TextWrapper>
          <S.StarWrapper>
            {Array.from({ length: Number(rating) }, (_, index) => (
              <Star key={index} />
            ))}
          </S.StarWrapper>
        </S.Front>
        <S.Back>
          <S.BackText>{descriptionBack}</S.BackText>
          <S.BackTextAge>{age}+</S.BackTextAge>
          {isSignedIn && (
            <S.BackButton onClick={() => props.handlePress(props.card)}>
              <span>Add to cart</span>
            </S.BackButton>
          )}

          {isAdmin && (
            <S.BackButton onClick={chooseModal}>
              <span>Edit</span>
            </S.BackButton>
          )}
        </S.Back>
      </S.FlipCardInner>
    </S.ListItem>
  );
};

export default GameCard;
