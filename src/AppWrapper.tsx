import { Routes, Route } from "react-router-dom";
import Authorization from "./components/Authorization";
import ChangePassword from "./components/ChangePassword";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Header/Header";
import Modal from "./components/Modal";
import About from "./components/pages/About";
import Home from "./components/pages/Home/Home";
import Products from "./components/pages/Products";
import Profile from "./components/pages/Profile/Profile";
import { useAppSelector } from "./hooks";
import ProtectedRoute from "./sharedScreens/ProtectRoute/ProtectRoute";

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
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <Modal active={active}>
        {(type === "signIn" || type === "signUp") && <Authorization />}
        {type === "password" && <ChangePassword />}
      </Modal>
    </>
  );
};

export default AppWrapper;
