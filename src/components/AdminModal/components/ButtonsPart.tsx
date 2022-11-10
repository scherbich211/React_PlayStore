import { useDeleteGameMutation, useEditGameMutation } from "@/api/user";
import { useAppDispatch } from "@/hooks";
import { clearCard } from "@/redux/reducers/admin";
import { changeModalActive } from "@/redux/reducers/modal";
import { IGameData } from "@/types/mockStore";
import { redirect } from "@/utils/mics";
import React, { useEffect } from "react";
import { FieldErrorsImpl } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as S from "../adminModal.style";

interface IProps {
  editCard: IGameData;
  name: string;
  price: string;
  genre: string;
  route: string;
  descriptionBack: string;
  age: string;
  permission: Array<"PC" | "Playstation 5" | "XBox One">;
  errors: FieldErrorsImpl<{
    name: string;
    category: string;
    price: string;
    image: string;
  }>;
}

const ButtonsPart: React.FC<IProps> = (props) => {
  const { editCard, name, price, genre, route, descriptionBack, age, permission, errors } = props;
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [deleteCard, { isLoading, isSuccess }] = useDeleteGameMutation();
  const [putNewCard, { isLoading: isLoadingEdit, isSuccess: isSuccessEdit }] = useEditGameMutation();

  const handleDelete = () => {
    deleteCard(editCard.id.toString());
  };

  const handleSubmit = () => {
    const newData: IGameData = {
      id: editCard.id,
      name,
      price,
      genre,
      route,
      rating: 5,
      descriptionBack,
      age,
      permission,
    };
    console.log(newData);
    putNewCard(newData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(changeModalActive(false));
      dispatch(clearCard());
      redirect(location.pathname);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessEdit) {
      dispatch(changeModalActive(false));
      dispatch(clearCard());
      redirect(location.pathname);
    }
  }, [isSuccessEdit]);
  return (
    <S.ButtonsWrapper>
      <S.ButtonSubmit
        onClick={handleSubmit}
        disabled={
          isLoadingEdit ||
          isLoading ||
          Boolean(errors.category) ||
          Boolean(errors.price) ||
          Boolean(errors.image) ||
          Boolean(errors.name)
        }
      >
        <span>Submit</span>
      </S.ButtonSubmit>
      <S.ButtonSubmit onClick={handleDelete} disabled={isLoadingEdit || isLoading}>
        <span>Delete Card</span>
      </S.ButtonSubmit>
    </S.ButtonsWrapper>
  );
};

export default ButtonsPart;
