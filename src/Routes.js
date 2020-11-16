import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TwitterNPS from "./containers/TwitterNPS";
import MockInterview from "./containers/MockInterview";
import SeriesAPricing from "./containers/SeriesAPricing/SeriesAPricing";

export default ({ childProps }) => (
  <Switch>
    <Redirect exact from="/" to="nps" />
    <Route path="/nps" exact component={TwitterNPS} props={childProps} />
    <Route
      path="/interview"
      exact
      component={MockInterview}
      props={childProps}
    />
    <Route
      path="/series-a"
      exact
      component={SeriesAPricing}
      props={childProps}
    />
    {/* catch all unmatched routes */}
  </Switch>
);
