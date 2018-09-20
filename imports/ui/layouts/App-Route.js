import React from "react";
import { Switch, Route } from "react-router-dom";
import { propType } from "graphql-anywhere";
import { userFragment } from "../apollo-client/user";
import {
  ScrollToTop,
  RouteWithProps,
  AdminRoute
} from "../components/smart/route-wrappers";
import Authorization from "../services/authorization";
import MainLayout from './MainLayout/MainLayout'

const handleAuthentication = props => {
  alert('pepe')
  if (/access_token|id_token|error/.test(props.location.hash)) {
    Authorization.auth0.popup.callback();
  }
};

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Routes = props => (
  <ScrollToTop>
    <Switch>
      <Route
        path="/callback"
        render={props => {
          handleAuthentication(props);
          return (
            <div
              style={{
                height: "600pc",
                width: "500px",
                backgroundColor: "white",
                position: "fixed",
                zIndex: 10000
              }}
            />
          );
        }}
      />
      <RouteWithProps
        name="app"
        component={MainLayout}
        {...props}
      />
    </Switch>
  </ScrollToTop>
);

Routes.propTypes = {
  curUser: propType(userFragment) // eslint-disable-line
};

Routes.defaultProps = {
  curUser: null
};

export default Routes;
