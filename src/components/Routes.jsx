import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Areas from "../pages/Area";
import Booking from "../pages/Booking";
import Customers from "../pages/customer/Customers";
import Owner from "../pages/owner/Owner";
import Login from "./login/Login";
import Campaign from "../pages/campaign/Campaign";
const Routes = () => {
  return (
    <Switch>
      <Route path='/login' exact component={Login} />
      <Route path='/' exact component={Dashboard} />
      <Route path='/areas' component={Areas} />
      <Route path='/bookings' component={Booking} />
      <Route path='/customers' component={Customers} />
      <Route path='/owners' component={Owner} />
      <Route path='/campaigns' component={Campaign} />
    </Switch>
  );
};

export default Routes;
