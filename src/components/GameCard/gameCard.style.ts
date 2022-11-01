import colors from "@/styles/colors";
import styled from "styled-components";

// !FRONT PART
export const TextGame = styled.span`
  font-size: 22px;
  line-height: 28px;
  color: ${colors.WHITE};
`;

export const StarWrapper = styled.div`
  margin-inline: 10px;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

export const Img = styled.img`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: auto;
  width: 100%;
`;

export const TextWrapper = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-block: 5%;
  padding-inline: 10px;
  align-items: center;
  overflow: hidden;
  display: flex;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const FlipCardInner = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 0 8px 4px ${colors.PURPURE};
  border-radius: 10px;
  background-color: ${colors.BLACK};
`;

export const ListItem = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "21%")};
  height: 44rem;
  perspective: 1000px;
  margin-bottom: 3rem;
  :hover ${FlipCardInner} {
    transform: rotateY(180deg);
  }
`;

// !BACK PART
export const Back = styled.div`
  transform: rotateY(180deg);
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  padding-block: 2rem;
  padding-inline: 1rem;
  flex-direction: column;
`;

export const BackText = styled.h3`
  font-size: 20px;
  line-height: 24px;
  color: ${colors.LIGHT_GRAY};
  text-align: justify;
`;
export const BackTextAge = styled.h3`
  font-size: 20px;
  line-height: 24px;
  color: ${colors.LIGHT_GRAY};
  align-self: center;
`;
export const BackButton = styled.button`
  background-color: ${colors.PURPURE};
  border-radius: 10px;
  width: 50%;
  height: 45px;
  align-self: center;
  shape-outside: none;
  border: 0px;
  span {
    font-size: 18px;
    line-height: 22px;
    color: ${colors.WHITE};
    font-weight: 100;
  }
`;
