import CustomInput from "@/components/CustomInput";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { ICartItem } from "@/types/cart";
import SortDropdown from "@/components/SortDropdown/SortDropdown";
import * as S from "./table.style";

interface IProps {
  el: ICartItem;
  changeItem: (value: ICartItem) => void;
}

type FormState = {
  amount: string;
};

const schemaAmount = Yup.object().shape({
  amount: Yup.string()
    .min(0)
    .max(2)
    .matches(/(?<!-)(?<!\d)[1-9][0-9]*\d*(?:\.\d{0,2})?/)
    .required(),
});

function arePropsEqual1(prevProps: IProps, nextProps: IProps) {
  return JSON.stringify(prevProps.el.amount) === JSON.stringify(nextProps.el.amount);
}
function arePropsEqual2(prevProps: IProps, nextProps: IProps) {
  return JSON.stringify(prevProps.el.platform) === JSON.stringify(nextProps.el.platform);
}

export const Amount: React.FC<IProps> = React.memo((props) => {
  const { el, changeItem } = props;
  const {
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormState>({
    resolver: yupResolver(schemaAmount),
    mode: "onChange",
    defaultValues: {
      amount: el.amount.toString(),
    },
  });

  useEffect(() => {
    const newData: ICartItem = {
      id: el.id,
      name: el.name,
      price: el.price,
      date: el.date,
      platform: el.platform,
      permission: el.permission,
      amount: Number(getValues("amount")),
    };
    changeItem(newData);
  }, [watch("amount")]);

  return (
    <S.CategoryAttribute>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <CustomInput
            value={value === undefined ? value : value.trim()}
            onChange={onChange}
            type="number"
            error={Boolean(errors.amount)}
            style={{ borderRadius: "0", minHeight: "40px", height: "40px" }}
          />
        )}
        name="amount"
      />
    </S.CategoryAttribute>
  );
}, arePropsEqual1);

export const Paltform = React.memo(({ el, changeItem }: { el: ICartItem; changeItem: (value: ICartItem) => void }) => {
  const [category, setCategory] = useState<"PC" | "Playstation 5" | "XBox One">(el.platform);
  const setSelectedCriteria = (value: "PC" | "Playstation 5" | "XBox One") => {
    setCategory(value);
  };

  useEffect(() => {
    const newData: ICartItem = {
      id: el.id,
      name: el.name,
      price: el.price,
      date: el.date,
      platform: category,
      permission: el.permission,
      amount: el.amount,
    };
    changeItem(newData);
  }, [category]);

  return (
    <S.CategoryAttribute category={el.permission.length === 1 ? -1 : 2}>
      {el.permission.length === 1 ? (
        el.platform
      ) : (
        <SortDropdown array={el.permission} selectedOption={category} setSelectedOption={setSelectedCriteria} />
      )}
    </S.CategoryAttribute>
  );
}, arePropsEqual2);
