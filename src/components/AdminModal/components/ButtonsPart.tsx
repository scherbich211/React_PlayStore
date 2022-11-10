import { useAddGameMutation, useEditGameMutation } from "@/api/user";
import { useAppDispatch, useAppSelector } from "@/hooks";
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
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
}

const ButtonsPart: React.FC<IProps> = (props) => {
  const { editCard, name, price, genre, route, descriptionBack, age, permission, errors, setIsModal, isModal } = props;
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { type } = useAppSelector((state) => state.modal);

  const [putNewCard, { isLoading: isLoadingEdit, isSuccess: isSuccessEdit }] = useEditGameMutation();
  const [postNewCard, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] = useAddGameMutation();

  const handleDelete = () => {
    setIsModal(true);
  };

  const handleSubmit = () => {
    const newData: IGameData = {
      id: editCard.id,
      name,
      price,
      genre,
      route:
        route === ""
          ? "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"
          : route,
      rating: 5,
      descriptionBack,
      age,
      permission,
    };
    if (type === "adminEdit") {
      putNewCard(newData);
    } else {
      postNewCard(newData);
    }
  };

  useEffect(() => {
    if (isSuccessEdit) {
      dispatch(changeModalActive(false));
      dispatch(clearCard());
      redirect(location.pathname);
    }
  }, [isSuccessEdit]);
  useEffect(() => {
    if (isSuccessAdd) {
      dispatch(changeModalActive(false));
      dispatch(clearCard());
      redirect(location.pathname);
    }
  }, [isSuccessAdd]);

  return (
    <S.ButtonsWrapper>
      <S.ButtonSubmit
        onClick={handleSubmit}
        disabled={
          isLoadingEdit ||
          Boolean(errors.category) ||
          Boolean(errors.price) ||
          Boolean(errors.image) ||
          Boolean(errors.name) ||
          permission.length === 0 ||
          isLoadingAdd ||
          isModal
        }
      >
        <span>Submit</span>
      </S.ButtonSubmit>
      {type === "adminEdit" && (
        <S.ButtonSubmit onClick={handleDelete} disabled={isLoadingEdit || isModal}>
          <span>Delete Card</span>
        </S.ButtonSubmit>
      )}
    </S.ButtonsWrapper>
  );
};

export default ButtonsPart;
