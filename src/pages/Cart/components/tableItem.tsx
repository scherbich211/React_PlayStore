import CheckBox from "@/components/Checkbox";
import { ICartItem } from "@/types/cart";
import formate from "@/utils/dateTransform";
import React, { memo } from "react";
import { Amount, Paltform } from "./tableItemComponents";
import * as S from "./table.style";

interface IProps {
  el: ICartItem;
  changeItem: (value: ICartItem) => void;
  addToDelete: (id: number) => void;
  checkbox: Array<number>;
}

const TableItem: React.FC<IProps> = (props) => {
  const { el } = props;

  return (
    <S.RowContaiener key={el.id}>
      <S.CategoryAttribute>{el.name}</S.CategoryAttribute>
      <Paltform el={el} changeItem={props.changeItem} />
      <S.CategoryAttribute>{formate(el.date)}</S.CategoryAttribute>
      <Amount el={el} changeItem={props.changeItem} />
      <S.CategoryAttribute>{el.price}</S.CategoryAttribute>
      <S.CategoryAttribute>
        <CheckBox isChecked={props.checkbox.indexOf(el.id) !== -1} onPress={() => props.addToDelete(el.id)} />
      </S.CategoryAttribute>
    </S.RowContaiener>
  );
};

export default memo(TableItem);
