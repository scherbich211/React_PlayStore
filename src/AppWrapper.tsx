import { Routes, Route } from "react-router-dom";
import React from "react";
import AlertInfo from "./components/Alert/HOCAlert";
import Authorization from "./components/Authorization";
import ChangePassword from "./components/ChangePassword";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal";
import Home from "./pages/Home/Home";
import { useAppSelector } from "./hooks";
import NavBar from "./components/Header/header";
import AdminEdit from "./components/AdminModal";
import withSuspense from "./sharedScreens/Suspense";

const AppWrapper = () => {
  const { type, active } = useAppSelector((state) => state.modal);

  const ProfileContainer = React.lazy(() => import("./pages/Profile/Profile"));
  const ProductContainer = React.lazy(() => import("./pages/Products/Products"));
  const CartContainer = React.lazy(() => import("./pages/Cart/Cart"));
  const AboutContainer = React.lazy(() => import("./pages/About"));

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={withSuspense(AboutContainer)} />
        <Route path="/products/:name" element={withSuspense(ProductContainer)} />
        <Route path="/profile" element={withSuspense(ProfileContainer)} />
        <Route path="/cart" element={withSuspense(CartContainer)} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <Modal active={active}>
        {(type === "signIn" || type === "signUp") && <Authorization />}
        {type === "password" && <ChangePassword />}
        {(type === "adminEdit" || type === "adminAdd") && <AdminEdit />}
      </Modal>
      <AlertInfo />
    </>
  );
};

export default AppWrapper;
