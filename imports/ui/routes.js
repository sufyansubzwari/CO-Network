import React from "react";
import { Switch, Route } from "react-router-dom";
import { propType } from "graphql-anywhere";
import { userFragment } from "./apollo-client/user";
import {
  ScrollToTop,
  RouteWithProps,
  LoggedInRoute
} from "./components/smart/route-wrappers";
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
import ApplyJobs from "./pages/jobs/apply-jobs";
// innovators
import ListInnovators from "./pages/innovators/list-innovators";
import PostOrganization from "./pages/innovators/post-innovators";
// colloquiums
// import ListInnovators from "./pages/innovators/list-innovators";
import ListColloquiums from "./pages/colloquiums/list-colloquiums";
import PostColloquiums from "./pages/colloquiums/post-colloquiums";

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
        name="Events"
        path="/events/preview"
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
      <LoggedInRoute
        exact
        isSignUp
        name="SignUp"
        path="/sign-up"
        component={SignUpPage}
        {...props}
      />
      <LoggedInRoute
        exact
        name="User Profile"
        path="/profile"
        redirectTo={"/"}
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
        name="Jobs"
        path="/jobs/preview"
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
        name="Apply for Job"
        path="/apply-job"
        component={ApplyJobs}
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
        name="Innovators"
        path="/innovators/preview"
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
      <RouteWithProps
        exact
        name="Colloquiums"
        path="/colloquiums"
        component={ListColloquiums}
        {...props}
      />
      <RouteWithProps
        exact
        name="Colloquiums"
        path="/colloquiums/preview"
        component={ListColloquiums}
        {...props}
      />
      <RouteWithProps
        exact
        name="Colloquiums"
        path="/post-colloquium"
        component={PostColloquiums}
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
