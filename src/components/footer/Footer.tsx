/* eslint-disable global-require */
import * as S from "./footer.style";

const array = [
  { link: "https://atari.com", logo: require("../../assets/images/atari.png") },
  { link: "https://blizzard.com", logo: require("../../assets/images/blizzard.png") },
  { link: "https://store.epicgames.com/", logo: require("../../assets/images/epic.png") },
  { link: "https://www.nintendo.com", logo: require("../../assets/images/nintendo.png") },
];

function Footer() {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>Incredible convenient</S.Title>
        <S.Row>
          {array.map((el) => (
            <S.Link href={el.link} key={el.link}>
              <S.Img src={el.logo} />
            </S.Link>
          ))}
        </S.Row>
      </S.Wrapper>
    </S.Container>
  );
}
export default Footer;
