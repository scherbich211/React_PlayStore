import CheckBox from "@/components/Checkbox";
import CustomInput from "@/components/CustomInput";
import SortDropdown from "@/components/SortDropdown/SortDropdown";
import { ICartItem } from "@/types/cart";
import formate from "@/utils/dateTransform";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import * as S from "./table.style";

interface IProps {
  el: ICartItem;
  changeItem: (value: ICartItem) => void;
  addToDelete: (id: number) => void;
  checkbox: Array<number>;
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

const TableItem: React.FC<IProps> = (props) => {
  const { el } = props;
  const [category, setCategory] = useState<"PC" | "Playstation 5" | "XBox One">(el.platform);
  const setSelectedCriteria = (value: "PC" | "Playstation 5" | "XBox One") => {
    setCategory(value);
  };

  const {
    control,
    formState: { errors, isValid },
    getValues,
    watch,
    setValue,
  } = useForm<FormState>({
    resolver: yupResolver(schemaAmount),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("amount", el.amount.toString());
  }, [el]);

  useEffect(() => {
    const newData: ICartItem = {
      id: el.id,
      name: el.name,
      price: el.price,
      date: el.date,
      platform: category,
      permission: el.permission,
      amount: Number(getValues("amount")),
    };
    props.changeItem(newData);
  }, [watch("amount"), category]);

  return (
    <S.RowContaiener key={el.id}>
      <S.CategoryAttribute>{el.name}</S.CategoryAttribute>
      <S.CategoryAttribute category={el.permission.length === 1 ? -1 : 2}>
        {el.permission.length === 1 ? (
          el.platform
        ) : (
          <SortDropdown array={el.permission} selectedOption={category} setSelectedOption={setSelectedCriteria} />
        )}
      </S.CategoryAttribute>
      <S.CategoryAttribute>{formate(el.date)}</S.CategoryAttribute>
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
      <S.CategoryAttribute>{el.price}</S.CategoryAttribute>
      <S.CategoryAttribute>
        <CheckBox isChecked={props.checkbox.indexOf(el.id) !== -1} onPress={() => props.addToDelete(el.id)} />
      </S.CategoryAttribute>
    </S.RowContaiener>
  );
};

export default TableItem;
