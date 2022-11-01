import { Star } from "@/assets/svg/SVGIcons";
import { IGameData } from "@/types/mockStore";
import * as S from "./gameCard.style";

interface IProps {
  card: IGameData;
  handlePress: (value: IGameData) => void;
  width?: string;
}

const GameCard: React.FC<IProps> = (props) => {
  const { name, route, price, descriptionBack, age, rating } = props.card;

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
          <S.BackButton onClick={() => props.handlePress(props.card)}>
            <span>Add to cart</span>
          </S.BackButton>
        </S.Back>
      </S.FlipCardInner>
    </S.ListItem>
  );
};

export default GameCard;
