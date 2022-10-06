import colors from "@/styles/colors";
import styled from "styled-components";

const InputsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-inline: 5%;
  height: 100%;
  span {
    font-size: 22px;
    line-height: 24px;
    align-self: flex-start;
    color: ${colors.GRAY};
    margin-bottom: 10px;
  }
`;

export default InputsWrapper;
