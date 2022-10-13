import colors from "@/styles/colors";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-block: 4rem;
  padding-inline: 2%;
  min-height: 90vh;
`;
export const ContainerRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
`;

export const ContainerColumn = styled.div`
  width: 72%;
  display: flex;
  flex-direction: column;
  div:nth-child(1) {
    margin-bottom: 20px;
  }
`;

export const Wrapper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 2rem;
  min-height: 2rem;
  padding: 3rem;
`;

export const Title = styled.span<{ category?: "title" | "filt" }>`
  color: ${colors.LIGHT_GRAY};
  font-size: 24px;
  line-height: 26px;
  text-align: ${(props) => (props.category === "title" ? "center" : "left")};
  display: block;
`;

export const Subtitle = styled.span`
  color: ${colors.LIGHT_GRAY};
  font-size: 22px;
  line-height: 24px;
  margin-top: 20px;
`;

export const Underline = styled.div`
  display: flex;
  height: 3px;
  background-color: ${colors.LIGHT_GRAY};
  border-radius: 2px;
  margin: 1rem 0 1rem;
`;
