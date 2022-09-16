import styled from "styled-components";

export type IAlertTypes = "error" | "success" | "warning" | "primary" | "secondary" | "info";
interface IWrapperAlert {
  type: IAlertTypes;
  show: boolean;
}

const getTypeColor = (element?: IAlertTypes): string => {
  switch (element) {
    case "error":
      return "#842029";
    case "info":
      return "#055160";
    case "primary":
      return "#084298";
    case "secondary":
      return "#41464b";
    case "success":
      return "#0f5132";
    case "warning":
      return "#664d03";
    default:
      return "#055160";
  }
};
const getTypeBackColor = (element?: IAlertTypes): string => {
  switch (element) {
    case "error":
      return "#f8d7da";
    case "info":
      return "#d1e7dd";
    case "primary":
      return "#cfe2ff";
    case "secondary":
      return "#e2e3e5";
    case "success":
      return "#d1e7dd";
    case "warning":
      return "#fff3cd";
    default:
      return "#d1e7dd";
  }
};
const getTypeBorderColor = (element?: IAlertTypes): string => {
  switch (element) {
    case "error":
      return "#f5c2c7";
    case "info":
      return "#b6effb";
    case "primary":
      return "#b6d4fe";
    case "secondary":
      return "#d3d6d8";
    case "success":
      return "#badbcc";
    case "warning":
      return "#ffecb5";
    default:
      return "transparent";
  }
};

export const TextAlert = styled.span`
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    color: black;
  }
`;

export const WrapperAlert = styled.div<IWrapperAlert>`
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  display: ${(props) => (props.show ? "block" : "none")};
  color: ${(props) => getTypeColor(props.type)};
  background-color: ${(props) => getTypeBackColor(props.type)};
  border-color: ${(props) => getTypeBorderColor(props.type)};
`;
