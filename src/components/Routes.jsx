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
import CampaignDetail from "../pages/campaignDetail/campaignDetail";
import CreateCampaign from "../pages/createCampaign/CreateCampaign";
import CreateArea from "../pages/arena/CreateArea";
import BikeOfOwner from "../pages/bikeOfOwner/BikeOfOwner";
import Pricelist from "../pages/pricelistBike/PriceList";
import CreatePriceList from "../pages/createPriceList/CreatePriceList";
import PriceListDetail from "../pages/pricelistDetail/PriceListDetail";
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
      <Route path='/pricelists' component={Pricelist} />
      <Route path='/createpricelists' component={CreatePriceList} />
      <Route
        path='/createVoucher/:id'
        component={({ match, history }) => (
          <CreateVoucher match={match} history={history} />
        )}
      />
      <Route
        path='/campaignDetail/:id'
        component={({ match }) => <CampaignDetail match={match} />}
      />
      <Route
        path='/pricelistdetail/:areaId&:motorTypeId&:motorName&:oldPrice'
        component={({ match }) => <PriceListDetail match={match} />}
      />
      <Route
        path='/bikeOfOwner/:id'
        component={({ match }) => <BikeOfOwner match={match} />}
      />
      <Route
        path='/createCampaign'
        component={({ history }) => <CreateCampaign history={history} />}
      />
      <Route path='/createArea' component={CreateArea} />
    </Switch>
  );
};

export default Routes;
