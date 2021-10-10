import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Areas from "../pages/Area";
import Booking from "../pages/Booking";
import Customers from "../pages/customer/Customers";
import Owner from "../pages/owner/Owner";
import Login from "./login/Login";
const Routes = () => {
  return (
    <Switch>
      <Route path='/login' exact component={Login} />
      <Route path='/' exact component={Dashboard} />
      <Route path='/areas' component={Areas} />
      <Route path='/booking' component={Booking} />
      <Route path='/customer' component={Customers} />
      <Route path='/owner' component={Owner} />
    </Switch>
  );
};

export default Routes;
