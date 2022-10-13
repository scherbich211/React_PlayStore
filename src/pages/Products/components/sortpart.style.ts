import colors from "@/styles/colors";
import styled from "styled-components";

export const WrapperCategory = styled.div<{ sort?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.sort ? "space-between" : "flex-start")};
`;

export const RadioButton = styled.div<{ pressed: boolean }>`
  height: 15px;
  width: 15px;
  border-radius: 10px;
  background-color: ${(props) => (props.pressed ? colors.PURPURE : colors.WHITE)};
  margin-right: 5px;
`;

export const CategoryName = styled.span`
  color: ${colors.LIGHT_GRAY};
  font-size: 20px;
  line-height: 22px;
  margin-top: 5px;
`;
