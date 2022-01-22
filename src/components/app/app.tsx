import React, { FC } from "react";
import Layout from "../layout/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../pages/home";

const App: FC = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
};

export default App;
