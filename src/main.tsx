import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
// start-path is 'images' because we have an alias 'images' in webpack.common.js
import { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/header/header";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";
import Products from "./components/pages/Products";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./sharedScreens/ErrorBounbary";

interface AppProps {
  // eslint-disable-next-line react/no-unused-prop-types
  nothing: boolean;
}

interface AppState {
  title: string;
}

class AppContainer extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
