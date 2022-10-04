import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
// start-path is 'images' because we have an alias 'images' in webpack.common.js
import ReactDom from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./sharedScreens/ErrorBoundary/ErrorBounbary";
import store from "./redux/store";
import Loader from "./components/Loader/loader.styles";
import AppWrapper from "./AppWrapper";

const persistor = persistStore(store);
const loader = <Loader />;

const AppContainer = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={loader}>
          <AppWrapper />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
);

ReactDom.render(<AppContainer />, document.getElementById("app"));
