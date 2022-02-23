import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import "./index.css";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { store } from "./services/store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
