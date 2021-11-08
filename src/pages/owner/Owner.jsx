import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../utils/apiCaller";
import styles from "./Owner.css";
class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOwner: [],
      apiURL: "",
      areaOptions: [],
    };
  }

  componentDidMount() {
    callApi("owners?page=1", "GET", null).then((res) => {
      this.setState({
        listOwner: res.data.data,
      });
    });
    callApi("areas", "GET", null).then((res) => {
      this.setState({
        areaOptions: res.data,
      });
    });
  }

  async onDelete(id) {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(id),
    };
    const response = await fetch(
      "http://18.138.110.46/api/v1/owners",
      requestOptions
    );
    window.location.reload();
  }

  async onUnBanned(id) {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(id),
    };
    const response = await fetch(
      "http://18.138.110.46/api/v1/owners/unban",
      requestOptions
    );
    window.location.reload();
  }

  onGetAreaName(areaId) {
    let areaName = "";
    this.state.areaOptions.map((area) => {
      if (areaId === area.id) {
        areaName = area.name;
      }
    });
    return areaName;
  }

  render() {
    const { listOwner } = this.state;

    return (
      <div>
        <h2 className='page-header'>Owners</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Number Of Bike</th>
                      <th>Rating</th>
                      <th>Number Of Rating</th>
                      <th>Area</th>
                      <th>Status</th>
                      <th>Event</th>
                    </thead>
                    <tbody>
                      {listOwner.map((item) => (
                        <tr key={item.id}>
                          <td>{item.fullname}</td>
                          <td>{item.phoneNumber}</td>
                          <td>{item.address}</td>
                          <td>{item.numberOfBikes}</td>
                          <td>
                            {(Math.round(item.rating * 100) / 100).toFixed(2)}
                          </td>
                          <td>{item.numberOfRatings}</td>
                          <td>{this.onGetAreaName(item.areaId)}</td>
                          <td>{item.status === 1 ? "Banned" : "Active"}</td>
                          <td className='containerBtn'>
                            <Link
                              to={`bikeOfOwner/${item.id}`}
                              className='btnViewBike'
                            >
                              View Bike
                            </Link>
                            {item.status !== 1 ? (
                              <button
                                type='submit'
                                className='btnDelete'
                                onClick={() => this.onDelete(item.id)}
                              >
                                Ban
                              </button>
                            ) : (
                              <button
                                type='submit'
                                className='btnDelete'
                                onClick={() => this.onUnBanned(item.id)}
                              >
                                UnBanned
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Owner;
