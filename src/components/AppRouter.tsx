import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";

import { privateRoutes, publicRoutes, RouteNames } from "../router";

export const AppRouter = () => {
  const { state } = useGlobalContext();
  const { isAuth } = state;
  return (
    <Container>
      {isAuth ? (
        <Switch>
          {privateRoutes.map((route) => (
            <Route
              path={route.path}
              exact={route.exact}
              component={route.component}
              key={route.path}
            />
          ))}
          <Redirect to={RouteNames.EVENT} />
        </Switch>
      ) : (
        <Switch>
          {publicRoutes.map((route) => (
            <Route
              path={route.path}
              exact={route.exact}
              component={route.component}
              key={route.path}
            />
          ))}
          <Redirect to={RouteNames.LOGIN} />
        </Switch>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

