import { useEffect, useState } from "react";
import { resetSnackBar } from "../../redux/reducers/alert";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { WrapperAlert } from "./alert.style";

function AlertInfo() {
  const dispatch = useAppDispatch();

  const [display, setDisplay] = useState(false);

  const data = useAppSelector((state) => state.alert);

  const resetRedux = () => {
    dispatch(resetSnackBar());
    setDisplay(false);
  };

  const hideSnackBar = () => {
    setTimeout(resetRedux, 300);
  };

  const displaySnackBar = () => {
    setDisplay(true);
  };

  useEffect(() => {
    if (data.message) {
      displaySnackBar();
      if (data.time) {
        const timeout = setTimeout(hideSnackBar, data.time);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
    return function () {
      return null;
    };
  }, [data.message]);

  if (!display) {
    return null;
  }

  return (
    <WrapperAlert show={display} type={data.notificationType}>
      {data.message}
    </WrapperAlert>
  );
}

export default AlertInfo;
