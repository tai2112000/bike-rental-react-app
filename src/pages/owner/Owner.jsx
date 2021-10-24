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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    };
    const response = await fetch(
      "http://52.74.12.123/api/v1/owners",
      requestOptions
    );
    const res = await response.json();
    if (res === true) {
      window.location.reload();
    }
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
                      <td>Name</td>
                      <td>Phone Number</td>
                      <td>Address</td>
                      <td>Number Of Bike</td>
                      <td>Rating</td>
                      <td>Number Of Rating</td>
                      <td>Area</td>
                      <td>Status</td>
                      <td>Event</td>
                    </thead>
                    <tbody>
                      {listOwner.map((item) => (
                        <tr key={item.id}>
                          <td>{item.fullname}</td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            {item.address === null ? "Done have" : item.address}
                          </td>
                          <td>{item.numberOfBikes}</td>
                          <td>{item.rating}</td>
                          <td>{item.numberOfRatings}</td>
                          <td>{this.onGetAreaName(item.areaId)}</td>
                          <td>{item.status === 1 ? "Deactive" : "Active"}</td>
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
                                Delete
                              </button>
                            ) : (
                              <button
                                type='submit'
                                className='btnActive'
                                // onClick={() => this.onDelete(item.id)}
                              >
                                Delete
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
