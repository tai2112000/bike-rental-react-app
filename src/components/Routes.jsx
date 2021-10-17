import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Areas from "../pages/Area";
import Booking from "../pages/Booking";
import Customers from "../pages/customer/Customers";
import Owner from "../pages/owner/Owner";
import Login from "./login/Login";
import Campaign from "../pages/campaign/Campaign";
import Vouchers from "../pages/voucher/Vouchers";
import CreateVoucher from "../pages/createVoucher/CreateVoucher";
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
      <Route path='/vouchers' component={Vouchers} />
      <Route path='/createVoucher' component={CreateVoucher} />
    </Switch>
  );
};

export default Routes;
