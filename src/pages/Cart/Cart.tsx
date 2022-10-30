import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSnackBar } from "@/redux/reducers/alert";
import { changeCart } from "@/redux/reducers/cart";
import { Time } from "@/types/alert";
import * as S from "./cart.style";
import Table from "./components/table";

function Cart() {
  const dispatch = useAppDispatch();
  const {
    user: { user },
    cart: { games },
  } = useAppSelector((state) => state);

  const sumValues = () => {
    const result = games.reduce((a, b) => a + Number(b.price) * b.amount, 0);
    return result;
  };
  const handlePress = () => {
    dispatch(changeCart([]));
    dispatch(
      setSnackBar({
        time: Time.MEDIUM,
        message: "You bought games",
        notificationType: "info",
      })
    );
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>Cart page</S.Title>
        <Table />
        <S.InfoDiv>
          <span>Games cost: {sumValues()}$</span>
          <span>Your balance: {user.balance}$</span>
          <S.ButtonSubmit
            disabled={sumValues() > Number(user.balance) || games.length === 0 || games.some((el) => el.amount <= 0)}
            onClick={handlePress}
          >
            <span>Buy</span>
          </S.ButtonSubmit>
        </S.InfoDiv>
      </S.Wrapper>
    </S.Container>
  );
}

export default Cart;
