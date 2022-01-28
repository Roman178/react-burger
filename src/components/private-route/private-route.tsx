import React, { FC } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector } from "../../services/hooks";

interface IPrivateRouteProps {
  path: string;
  exact?: boolean;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({ children, ...rest }) => {
  const userIsLoggedIn = useSelector((store) => store.user.isLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) => {
        return userIsLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
