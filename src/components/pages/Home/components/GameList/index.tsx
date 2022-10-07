/* eslint-disable global-require */
import { useGetGamesMutation } from "@/api/user";
import GameCard from "@/components/GameCard";
import Loader from "@/components/Loader/loader.styles";
import { useAppDispatch } from "@/hooks";
import { setSnackBar } from "@/redux/reducers/alert";
import { Time } from "@/types/alert";
import WrapperList from "./gameList.style";

const GameList = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetGamesMutation();

  const handlePress = () => {
    dispatch(
      setSnackBar({
        time: Time.MEDIUM,
        message: "added",
        notificationType: "info",
      })
    );
  };

  return (
    <WrapperList>
      {!isLoading && data ? (
        <>
          {data.slice(0, 3).map((el) => (
            <GameCard card={el} key={el.name} handlePress={handlePress} />
          ))}
        </>
      ) : (
        <Loader />
      )}
    </WrapperList>
  );
};

export default GameList;
