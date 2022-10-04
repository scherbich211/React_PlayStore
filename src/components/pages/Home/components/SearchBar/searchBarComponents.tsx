import { IGameData } from "@/types/mockStore";
import React from "react";

interface IResultElements {
  results: Array<IGameData>;
}
export const ResultElements: React.FC<IResultElements> = (props) => (
  <>
    {props.results.map((el) => (
      <span key={el.id}>{el.name}</span>
    ))}
  </>
);

export const NoElements = () => <span>No elements</span>;
