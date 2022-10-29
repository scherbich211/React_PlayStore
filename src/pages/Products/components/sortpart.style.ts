import colors from "@/styles/colors";
import styled from "styled-components";

export const WrapperCategory = styled.div<{ sort?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.sort ? "space-between" : "flex-start")};
  align-items: center;
`;

export const RadioButton = styled.div<{ pressed: boolean }>`
  height: 15px;
  width: 15px;
  border-radius: 10px;
  border: 4px solid ${(props) => (props.pressed ? colors.PURPURE : colors.GRAY)};
  margin-right: 10px;
  margin-top: 5px;
  background-color: ${colors.WHITE};
`;

export const CategoryName = styled.span`
  color: ${colors.LIGHT_GRAY};
  font-size: 20px;
  line-height: 22px;
  margin-top: 5px;
`;

export const Subtitle = styled.span`
  color: ${colors.LIGHT_GRAY};
  font-size: 22px;
  line-height: 24px;
  display: block;
  padding-top: 30px;
`;
