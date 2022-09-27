/* eslint-disable global-require */
import { useGetGamesMutation } from "@/api/user";
import Alert from "@/components/Alert/alert";
import GameCard from "@/components/GameCard";
import Loader from "@/components/Loader/loader.styles";
import { useState } from "react";
import WrapperList from "./gameList.style";

const GameList = () => {
  const [show, setShow] = useState(false);

  const { data, isLoading } = useGetGamesMutation();

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
        {!isLoading && data ? (
          <>
            {data.games.slice(0, 3).map((el) => (
              <GameCard card={el} key={el.name} handlePress={handlePress} />
            ))}
          </>
        ) : (
          <Loader />
        )}
      </WrapperList>
    </>
  );
};

export default GameList;
