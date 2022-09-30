import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
// start-path is 'images' because we have an alias 'images' in webpack.common.js
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/Header/Header";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About";
import Products from "./components/pages/Products";
import Footer from "./components/Footer/Footer";
import ErrorBoundary from "./sharedScreens/ErrorBoundary/ErrorBounbary";
import Modal from "./components/Modal";
import Authorization from "./components/Authorization";

const AppContainer = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [modal, setModal] = useState("");

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <NavBar setActiveModal={setActiveModal} setModal={setModal} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:name" element={<Products />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <Modal active={activeModal}>
          {modal === "signIn" && <Authorization setActiveModal={setActiveModal} signUp={false} />}
          {modal === "signUp" && <Authorization setActiveModal={setActiveModal} signUp />}
        </Modal>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

ReactDom.render(<AppContainer />, document.getElementById("app"));
