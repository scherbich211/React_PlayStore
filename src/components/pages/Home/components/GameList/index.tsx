/* eslint-disable global-require */
import Alert from "@/components/Alert/alert";
import GameCard from "@/components/GameCard";
import { useState } from "react";
import { categoriesListData } from "./constants";
import WrapperList from "./gameList.style";

const GameList = () => {
  const [show, setShow] = useState(false);
  const handlePress = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <>
      <Alert type="info" message="hi" handle={() => console.log(1)} show={show} />
      <WrapperList>
        {categoriesListData.map((el) => (
          <GameCard card={el} key={el.name} handlePress={handlePress} />
        ))}
      </WrapperList>
    </>
  );
};

export default GameList;
