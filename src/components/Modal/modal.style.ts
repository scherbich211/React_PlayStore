import styled from "styled-components";

interface IModalWrapper {
  active: boolean;
}
interface IModalContent {
  active: boolean;
}

export const ModalWrapper = styled.div<IModalWrapper>`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  opacity: ${(props) => (props.active ? 1 : 0)};
  pointer-events: ${(props) => (props.active ? "all" : "none")};
  max-height: 100vh;
  overflow-y: auto;
`;

export const ModalContent = styled.div<IModalContent>`
  padding-block: 20px;
  padding-inline: 30px;
  border-radius: 8px;
  min-width: 600px;
  background-color: #121212;
  transform: ${(props) => (props.active ? "scale(1)" : "scale(0.5)")};
  transition: ${(props) => (props.active ? 0 : "0.4s all")};
  margin-block: auto;
`;
