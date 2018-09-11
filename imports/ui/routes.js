import React from "react";
import { Switch, Route } from "react-router-dom";
import { propType } from "graphql-anywhere";
import { userFragment } from "./apollo-client/user";
import {
  ScrollToTop,
  RouteWithProps,
  AdminRoute
} from "./components/smart/route-wrappers";
import Authorization from "./authorization";
import LoadableWrapper from "./components/dumb/loadable-wrapper";
//
import HomePage from "./pages/home-page";
import ListEvents from "./pages/events/list-events";
import ListJobs from "./pages/jobs/list-jobs";
import ListInnovators from "./pages/innovators/list-innovators";
import PostEvent from "./pages/events/post-event";

const handleAuthentication = props => {
  alert("dasdasdasd");
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
      <Route exact name="Home" path="/" render={() => <HomePage />} />
      <Route name="Events" path="/events" render={() => <ListEvents />} />
      <Route name="Jobs" path="/jobs" render={() => <ListJobs />} />
      <Route
        name="Innovators"
        path="/innovators"
        render={() => <ListInnovators />}
      />
      <Route
        name="Post a Event"
        path="/post-event"
        render={() => <PostEvent />}
      />
      <AdminRoute
        exact
        name="admin"
        path="/admin"
        component={LoadableWrapper({
          loader: () => import("./pages/admin/admin-page")
        })}
        redirectTo="/login"
        {...props}
      />
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
      <Route
        name="notFound"
        component={LoadableWrapper({
          loader: () => import("./pages/not-found-page")
        })}
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
