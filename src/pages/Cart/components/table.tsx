import { useAppDispatch, useAppSelector } from "@/hooks";
import { changeCart } from "@/redux/reducers/cart";
import { ICartItem } from "@/types/cart";
import { useEffect, useState } from "react";
import * as S from "./table.style";
import TableItem from "./tableItem";

const Table = () => {
  const dispatch = useAppDispatch();
  const { games } = useAppSelector((state) => state.cart);
  const [cartGames, setCartGames] = useState<Array<ICartItem>>(games);
  const [checkbox, setCheckbox] = useState<Array<number>>([]);

  const changeItem = (value: ICartItem) => {
    const findId = cartGames.findIndex((el) => el.id === value.id);
    const newData: Array<ICartItem> = cartGames.slice();
    newData.splice(findId, 1, value);
    dispatch(changeCart(newData));
  };

  const addToDelete = (id: number) => {
    if (checkbox.indexOf(id) === -1) {
      setCheckbox((prev) => [...prev, id]);
    } else {
      setCheckbox(checkbox.filter((item) => item !== id));
    }
  };

  const deleteData = () => {
    const newData: Array<ICartItem> = cartGames.slice();
    const deleteR = (el: number) => {
      dispatch(changeCart(newData.filter((it) => it.id !== el)));
      setCartGames(newData.filter((it) => it.id !== el));
    };
    checkbox.map((el) => newData.map((item) => item.id === el && deleteR(el)));
  };

  useEffect(() => {
    setCartGames(games);
  }, [games]);

  return (
    <S.TableContainer>
      <tbody>
        <S.RowContaiener>
          <S.CategoryName>Name</S.CategoryName>
          <S.CategoryName>Platform</S.CategoryName>
          <S.CategoryName>Order date</S.CategoryName>
          <S.CategoryName>Amount</S.CategoryName>
          <S.CategoryName>Price ($)</S.CategoryName>
          <S.CategoryName> </S.CategoryName>
        </S.RowContaiener>
      </tbody>
      {cartGames.length > 0 &&
        cartGames.map((el) => (
          <tbody key={el.id}>
            <TableItem el={el} changeItem={changeItem} addToDelete={addToDelete} checkbox={checkbox} />
          </tbody>
        ))}
      {cartGames.length > 0 && (
        <tbody>
          <S.RowContaiener>
            <S.CategoryAttribute />
            <S.CategoryAttribute />
            <S.CategoryAttribute />
            <S.CategoryAttribute />
            <S.CategoryAttribute />
            <S.CategoryAttribute style={{ width: "10%" }}>
              <S.ButtonSubmit disabled={false} onClick={deleteData}>
                <span>Remove</span>
              </S.ButtonSubmit>
            </S.CategoryAttribute>
          </S.RowContaiener>
        </tbody>
      )}
    </S.TableContainer>
  );
};

export default Table;
