/* eslint-disable global-require */
import { useGetGamesQuery } from "@/api/user";
import GameCard from "@/components/GameCard";
import Loader from "@/components/Loader/loader.styles";
import { useAppDispatch } from "@/hooks";
import { setSnackBar } from "@/redux/reducers/alert";
import { addCart } from "@/redux/reducers/cart";
import { Time } from "@/types/alert";
import { ICartItem } from "@/types/cart";
import { IGameData } from "@/types/mockStore";
import WrapperList from "./gameList.style";

const GameList = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetGamesQuery();

  const handlePress = (value: IGameData) => {
    const dataToAdd: ICartItem = {
      id: value.id,
      date: new Date().toISOString(),
      platform: value.permission[0],
      amount: 1,
      name: value.name,
      price: value.price,
      permission: value.permission,
    };
    dispatch(addCart(dataToAdd));
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
