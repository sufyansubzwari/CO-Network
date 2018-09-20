import React from "react";
import { Switch, Route } from "react-router-dom";
import { propType } from "graphql-anywhere";
import { userFragment } from "./apollo-client/user";
import {
  ScrollToTop,
  RouteWithProps
} from "./components/smart/route-wrappers";
import LoadableWrapper from "./components/dumb/loadable-wrapper";

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Routes = props => (
  <ScrollToTop>
    <Switch>
      <RouteWithProps
        exact
        name="home"
        path="/"
        component={LoadableWrapper({
          loader: () => import("./pages/home/home-page"),
          delay: 0
        })}
        {...props}
      />
      <RouteWithProps
        exact
        name="Events"
        path="/events"
        component={LoadableWrapper({
          loader: () => import("./pages/events/list-events"),
          delay: 0
        })}
        {...props}
      />
      <RouteWithProps
        exact
        name="Post a Event"
        path="/post-event"
        component={LoadableWrapper({
          loader: () => import("./pages/events/post-event"),
          delay: 0
        })}
        {...props}
      />
      <RouteWithProps
        exact
        name="SignUp"
        path="/sign-up"
        component={LoadableWrapper({
          loader: () => import("./pages/sign-up-page"),
          delay: 0
        })}
        {...props}
      />
      <RouteWithProps
        exact
        name="User Profile"
        path="/profile"
        component={LoadableWrapper({
          loader: () => import("./pages/user/user-profile"),
          delay: 0
        })}
        {...props}
      />
      <RouteWithProps
        exact
        name="Jobs"
        path="/jobs"
        component={LoadableWrapper({
          loader: () => import("./pages/jobs/list-jobs"),
          delay: 0
        })}
        {...props}
      />
      <RouteWithProps
        exact
        name="Post a Job"
        path="/post-job"
        component={LoadableWrapper({
          loader: () => import("./pages/jobs/post-jobs"),
          delay: 0
        })}
        {...props}
      />
      <RouteWithProps
        exact
        name="Innovators"
        path="/innovators"
        component={LoadableWrapper({
          loader: () => import("./pages/innovators/list-innovators"),
          delay: 0
        })}
        {...props}
      />
      <RouteWithProps
        exact
        name="Post a Organization"
        path="/post-organization"
        component={LoadableWrapper({
          loader: () => import("./pages/innovators/post-innovators"),
          delay: 0
        })}
        {...props}
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
