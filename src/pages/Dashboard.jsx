import React, { Component, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

import statusCards from "../assets/JsonData/status-card-data.json";
import callApi_V2 from "../utils/apiCallerV2";
import callApi from "../utils/apiCaller";

const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const topCustomers = {
  head: ["user", "total orders", "total spending"],
  body: [
    {
      username: "john doe",
      order: "490",
      price: "$15,870",
    },
    {
      username: "frank iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "frank iva",
      order: "110",
      price: "$9,251",
    },
    {
      username: "anthony baker",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardList: [],
      apiURL: "",
      searchInput: "",
      searchResult: null,
    };
  }

  componentDidMount() {
    callApi_V2("admins/customers", "GET", null).then((res) => {
      this.setState({
        dashboardList: [
          ...this.state.dashboardList,
          {
            title: "Total Customers",
            icon: "bx bx-user-pin",
            link: "/customers",
            count: res.data.length,
          },
        ],
      });
    });
    callApi("owners?page=1", "GET", null).then((res) => {
      this.setState({
        dashboardList: [
          ...this.state.dashboardList,
          {
            title: "Total Owners",
            icon: "bx bx-id-card",
            link: "/owners",
            count: res.data.data.length,
          },
        ],
      });
    });
    callApi("bookings", "GET", null).then((res) => {
      this.setState({
        dashboardList: [
          ...this.state.dashboardList,
          {
            title: "Total Bookings",
            icon: "bx bx-cart",
            link: "/bookings",
            count: res.data.length,
          },
        ],
      });
    });
    callApi("areas", "GET", null).then((res) => {
      this.setState({
        dashboardList: [
          ...this.state.dashboardList,
          {
            title: "Total Areas",
            icon: "bx bx-map",
            link: "/areas",
            count: res.data.length,
          },
        ],
      });
    });
  }

  render() {
    const { dashboardList } = this.state;
    return (
      <div>
        <h2 className='page-header'>Dashboard</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              {dashboardList.map((item, index) => (
                <div className='col-6' key={index}>
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                    link={item.link}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
