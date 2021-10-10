import React, { Component } from "react";

import Table from "../components/table/Table";

import customerList from "../assets/JsonData/customers-list.json";
import callApi from "../utils/apiCaller";

const customerTableHead = [
  //   "",
  //   "name",
  //   "email",
  //   "phone",
  //   "total orders",
  //   "total spend",
  //   "location",

  "Postal Code",
  "Area name",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.postalCode}</td>
    <td>{item.name}</td>
    {/* <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.total_orders}</td>
    <td>{item.total_spend}</td>
    <td>{item.location}</td> */}
  </tr>
);

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArea: [],
      apiURL: "",
    };
  }

  componentDidMount() {
    callApi("areas?page=1", "GET", null).then((res) => {
      this.setState({
        listArea: res.data.data,
      });
    });
  }
  render() {
    const { listArea } = this.state;

    console.log(listArea);
    return (
      <div>
        <h2 className='page-header'>customers</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <table>
                  <thead>
                    <th>Postal Code</th>
                    <th>Name</th>
                  </thead>
                  <tbody>
                    {listArea.map((item) => (
                      <tr key={item.id}>
                        <td>{item.postalCode}</td>
                        <td>{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Customers;
