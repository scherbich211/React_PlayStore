import { Routes, Route } from "react-router-dom";
import AlertInfo from "./components/Alert/HOCAlert";
import Authorization from "./components/Authorization";
import ChangePassword from "./components/ChangePassword";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Header/Header";
import Modal from "./components/Modal";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import Products from "./pages/Products";
import Profile from "./pages/Profile/Profile";
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
      <AlertInfo />
    </>
  );
};

export default AppWrapper;
