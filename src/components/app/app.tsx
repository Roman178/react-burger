import React, { FC } from "react";
import Layout from "../layout/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Signup from "../../pages/signup/signup";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Signup />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPassword />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </Layout>
  );
};

export default App;
