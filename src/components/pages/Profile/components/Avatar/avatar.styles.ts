import colors from "@/styles/colors";
import styled from "styled-components";

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 20%;
`;

export const NoAvatarBack = styled.div`
  background-color: ${colors.LIGHT_GRAY};
  height: 25rem;
  border-radius: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoAvatarSquare = styled.div`
  width: 43%;
  height: 33%;
  border: 2px solid;
  border-color: ${colors.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const NoAvatarText = styled.span`
  font-size: 24px;
  line-height: 28px;
  color: ${colors.WHITE};
  text-align: center;
  width: 100%;
`;

export const ButtonSubmit = styled.button`
  background-color: ${colors.DARK_PURPURE};
  border-radius: 10px;
  height: 45px;
  shape-outside: none;
  border: 0px;
  margin-top: 20px;
  padding-inline: 10px;
  span {
    font-size: 18px;
    line-height: 22px;
    color: ${colors.WHITE};
    font-weight: 100;
  }
`;
