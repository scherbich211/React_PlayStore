import { Routes, Route } from "react-router-dom";
import AlertInfo from "./components/Alert/HOCAlert";
import Authorization from "./components/Authorization";
import ChangePassword from "./components/ChangePassword";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Profile from "./pages/Profile/Profile";
import { useAppSelector } from "./hooks";
import ProtectedRoute from "./sharedScreens/ProtectRoute/ProtectRoute";
import Cart from "./pages/Cart/Cart";
import NavBar from "./components/Header/header";
import AdminEdit from "./components/AdminModal";

const AppWrapper = () => {
  const { type, active } = useAppSelector((state) => state.modal);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:name"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
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
