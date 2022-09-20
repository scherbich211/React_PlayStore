/* eslint-disable global-require */
import { Star } from "@/assets/svg/SVGIcons";
import * as S from "./gameList.style";

const categoriesListData = [
  {
    name: "Assasin",
    price: "29.99",
    route: require("../../../../../assets/images/assasin.jpg"),
    descriptionBack:
      "The word assassin, pronounced 'uh-SASS-in' describes a person who murders a prominent person, like a political or religious leader. Often, this person is hired to kill, though he or she might act on personal motivations.",
    age: "12+",
  },
  {
    name: "Cyberpunk",
    price: "29.99",
    route: require("../../../../../assets/images/cyberpunk.jpg"),
    descriptionBack:
      "In science fiction circles, 'cyberpunk' is a genre that often features countercultural antiheroes trapped in a dehumanizing high-tech future. Its roots extend back to the technical fiction of the 1940s and 50s, but it was years before it matured.",
    age: "12+",
  },
  {
    name: "League of Legends",
    price: "29.99",
    route: require("../../../../../assets/images/lol.jpg"),
    descriptionBack:
      "What is League of Legends? League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the others base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.",
    age: "12+",
  },
];

const GameList = () => (
  <S.WrapperList>
    {categoriesListData.map((el) => (
      <S.ListItem key={el.name}>
        <S.FlipCardInner>
          <S.Front>
            <S.Img src={el.route} />
            <S.TextWrapper>
              <S.TextGame>{el.name}</S.TextGame>
              <S.TextGame>{el.price}</S.TextGame>
            </S.TextWrapper>
            <S.StarWrapper>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} />
              ))}
            </S.StarWrapper>
          </S.Front>
          <S.Back>
            <S.BackText>{el.descriptionBack}</S.BackText>
            <S.BackTextAge>{el.age}</S.BackTextAge>
            <S.BackButton>
              <span>Add to cart</span>
            </S.BackButton>
          </S.Back>
        </S.FlipCardInner>
      </S.ListItem>
    ))}
  </S.WrapperList>
);

export default GameList;
