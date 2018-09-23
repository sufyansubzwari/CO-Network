import React from "react";
import { Switch, Route } from "react-router-dom";
import { propType } from "graphql-anywhere";
import { userFragment } from "./apollo-client/user";
import { ScrollToTop, RouteWithProps } from "./components/smart/route-wrappers";
import LoadableWrapper from "./components/dumb/loadable-wrapper";

//
import HomePage from "./pages/home/home-page";
import SignUpPage from "./pages/sign-up-page";
import UserProfile from "./pages/user/user-profile";
import NotFoundPage from "./pages/not-found-page";
// events
import ListEvents from "./pages/events/list-events";
import PostEvent from "./pages/events/post-event";
// jobs
import ListJobs from "./pages/jobs/list-jobs";
import PostJob from "./pages/jobs/post-jobs";
// innovators
import ListInnovators from "./pages/innovators/list-innovators";
import PostOrganization from "./pages/innovators/post-innovators";

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
        component={HomePage}
        {...props}
      />
      <RouteWithProps
        exact
        name="Events"
        path="/events"
        component={ListEvents}
        {...props}
      />
      <RouteWithProps
        exact
        name="Post a Event"
        path="/post-event"
        component={PostEvent}
        {...props}
      />
      <RouteWithProps
        exact
        name="SignUp"
        path="/sign-up"
        component={SignUpPage}
        {...props}
      />
      <RouteWithProps
        exact
        name="User Profile"
        path="/profile"
        component={UserProfile}
        {...props}
      />
      <RouteWithProps
        exact
        name="Jobs"
        path="/jobs"
        component={ListJobs}
        {...props}
      />
      <RouteWithProps
        exact
        name="Post a Job"
        path="/post-job"
        component={PostJob}
        {...props}
      />
      <RouteWithProps
        exact
        name="Innovators"
        path="/innovators"
        component={ListInnovators}
        {...props}
      />
      <RouteWithProps
        exact
        name="Post a Organization"
        path="/post-organization"
        component={PostOrganization}
        {...props}
      />
      <RouteWithProps name="notFound" component={NotFoundPage} {...props} />
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
