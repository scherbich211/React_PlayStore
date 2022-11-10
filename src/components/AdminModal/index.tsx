import React, { useEffect, useState } from "react";
import { changeModalActive } from "@/redux/reducers/modal";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { clearCard } from "@/redux/reducers/admin";
import * as S from "./adminModal.style";
import CustomInput from "../CustomInput";
import ImagePart from "./components/ImagePart";
import AgePart from "./components/AgePart";
import PlatformPart from "./components/PaltformPart";
import DescriptionPart from "./components/DescriptionPart";
import ButtonsPart from "./components/ButtonsPart";
import { FormState, inputs, schema, TPlatform } from "./constants";
import Modal from "../Modal";
import ConfirmModal from "./components/ConfirmModal";

const AdminEdit: React.FC = () => {
  const dispatch = useAppDispatch();

  const { editCard } = useAppSelector((state) => state.admin);
  const { type } = useAppSelector((state) => state.modal);

  const [imageSrc, setImageSrc] = useState(type === "adminEdit" ? editCard.route : "");
  const [text, setText] = React.useState<string>([editCard.descriptionBack].join("\n"));
  const [age, setAge] = useState<string>(type === "adminEdit" ? editCard.age : "3");
  const [platform, setPlatform] = useState<TPlatform>(editCard.permission);
  const [isModal, setIsModal] = useState(false);

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<FormState>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const setPLatformItem = (value: "Playstation 5" | "PC" | "XBox One") => {
    if (platform.includes(value) === false) {
      setPlatform((prev) => [...prev, value]);
    } else {
      setPlatform((prev) => prev.filter((el) => el !== value));
    }
  };

  const setSelectedAge = (value: string) => {
    setAge(value.replace(/[+\s]/g, ""));
  };

  useEffect(() => {
    setValue("name", editCard.name);
    setValue("category", editCard.genre);
    setValue("price", editCard.price);
    setValue("image", editCard.route);
  }, [editCard]);

  useEffect(() => {
    setImageSrc(getValues("image"));
  }, [watch("image")]);

  useEffect(() => {
    setText(editCard.descriptionBack);
  }, [editCard.descriptionBack]);

  useEffect(() => {
    setPlatform(editCard.permission);
  }, [editCard.permission]);

  useEffect(() => {
    setAge(type === "adminEdit" ? editCard.age : "3");
  }, [editCard.age]);

  return (
    <>
      <div style={{ width: "800px" }}>
        <S.RowWrapper style={{ marginBottom: "20px" }}>
          <S.Title>Edit Card</S.Title>
          <S.Close
            onClick={() => {
              dispatch(changeModalActive(false));
              dispatch(clearCard());
            }}
          >
            &times;
          </S.Close>
        </S.RowWrapper>
        <S.RowWrapper>
          <ImagePart imageSrc={imageSrc} />
          <div style={{ width: "65%" }}>
            <S.Title>Information</S.Title>
            {inputs.map((el) => (
              <S.ContainerInput key={el}>
                <span>{el.charAt(0).toUpperCase() + el.slice(1)}</span>
                <div style={{ width: "75%" }}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        type="text"
                        error={Boolean(errors[`${el}`])}
                        style={{ borderRadius: "0px" }}
                        maxLength={el === "image" ? 300 : 30}
                      />
                    )}
                    name={`${el}`}
                  />
                </div>
              </S.ContainerInput>
            ))}
            <DescriptionPart text={text} setText={setText} />
            <AgePart age={age} setSelectedAge={setSelectedAge} />
            <PlatformPart platform={platform} setPLatformItem={setPLatformItem} />
          </div>
        </S.RowWrapper>
        <ButtonsPart
          editCard={editCard}
          name={getValues("name")}
          price={getValues("price")}
          genre={getValues("category")}
          route={imageSrc}
          descriptionBack={text}
          age={age}
          permission={platform}
          errors={errors}
          setIsModal={setIsModal}
          isModal={isModal}
        />
      </div>
      <Modal active={isModal}>
        <ConfirmModal setIsModal={setIsModal} id={editCard.id} />
      </Modal>
    </>
  );
};

export default AdminEdit;
