import { useAppDispatch } from "@/hooks";
import React from "react";
import { changeModalActive } from "@/redux/reducers/modal";
import { useLocation } from "react-router-dom";
import { useDeleteGameMutation } from "@/api/user";
import { clearCard } from "@/redux/reducers/admin";
import { redirect } from "@/utils/mics";
import * as S from "../../Authorization/authorization.style";
import { ButtonSubmit } from "../adminModal.style";

interface IProps {
  id: number;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmModal: React.FC<IProps> = (props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [deleteCard, { isLoading, isSuccess }] = useDeleteGameMutation();

  const handleDelete = () => {
    deleteCard(props.id.toString());
  };

  React.useEffect(() => {
    if (isSuccess) {
      props.setIsModal(false);
      dispatch(changeModalActive(false));
      dispatch(clearCard());
      redirect(location.pathname);
    }
  }, [isSuccess]);

  return (
    <>
      <S.RowWrapper style={{ marginBottom: "20px" }}>
        <S.Title>Are you sure?</S.Title>
        <S.Close onClick={() => dispatch(changeModalActive(false))}>&times;</S.Close>
      </S.RowWrapper>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonSubmit disabled={isLoading} style={{ marginTop: "20px" }} onClick={handleDelete}>
          <span>Submit</span>
        </ButtonSubmit>
        <ButtonSubmit disabled={isLoading} style={{ marginTop: "20px" }} onClick={() => props.setIsModal(false)}>
          <span>No</span>
        </ButtonSubmit>
      </div>
    </>
  );
};

export default ConfirmModal;
