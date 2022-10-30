import colors from "@/styles/colors";
import styled from "styled-components";

interface IButtonSubmit {
  disabled: boolean;
}

export const TableContainer = styled.table`
  margin-inline: 1rem;
  tr:nth-child(1) {
    border-bottom: 3px solid ${colors.LIGHT_GRAY};
    border-radius: 2px;
    line-height: 90px;
  }
`;

export const RowContaiener = styled.tr`
  border-bottom: 1px solid ${colors.LIGHT_GRAY};
  border-radius: 2px;
  line-height: 60px;
`;

export const CategoryName = styled.th`
  font-size: 24px;
  color: ${colors.LIGHT_GRAY};
`;

export const CategoryAttribute = styled.td<{ category?: number }>`
  font-size: 20px;
  text-align: center;
  color: ${colors.LIGHT_GRAY};
  :nth-child(${(props) => props.category}) {
    line-height: 20px;
    margin-top: 10px;
    padding-inline: 80px;
  }
  :nth-child(1) {
    width: 35%;
  }
  :nth-child(2) {
    width: 20%;
  }
  :nth-child(3) {
    width: 13%;
  }
  :nth-child(4) {
    width: 10%;
    padding-inline: 20px;
  }
  :nth-child(5) {
    width: 10%;
  }
  :nth-child(6) {
    width: 10%;
    line-height: 20px;
    margin-top: 10px;
    padding-inline: 2.5%;
  }
`;

export const ButtonSubmit = styled.button<IButtonSubmit>`
  background-color: ${(props) => (props.disabled ? colors.LIGHT_GRAY : colors.PURPURE)};
  border-radius: 10px;
  height: 45px;
  shape-outside: none;
  border: 0px;
  margin-block: 10px;
  padding-inline: 20px;
  margin-left: -60px;
  span {
    font-size: 18px;
    line-height: 22px;
    color: ${colors.WHITE};
    font-weight: 100;
  }
`;
