import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import "./index.css";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { store } from "./services/store";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
