import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi_V2 from "../../utils/apiCallerV2";
import styles from "./customer.css";
class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomer: [],
      apiURL: "",
      searchInput: "",
      searchResult: null,
    };
  }

  componentDidMount() {
    callApi_V2("admins/customers", "GET", null).then((res) => {
      this.setState({
        listCustomer: res.data,
      });
    });
  }

  onHandleChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSearch = () => {
    if (this.state.searchInput === "") {
      this.setState({
        searchResult: "",
      });
    } else {
      callApi_V2(
        `admins/customers/phone/${this.state.searchInput}`,
        "GET",
        null
      ).then((res) => {
        this.setState({
          searchResult: res.data,
        });
      });
    }
  };

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
      "http://18.138.110.46/api/v1/customers",
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
      "http://18.138.110.46/api/v1/customers/unban",
      requestOptions
    );
    window.location.reload();
  }

  render() {
    const { listCustomer, searchInput, searchResult } = this.state;
    return (
      <div>
        <h2 className='page-header'>Customers</h2>
        <div className='containerSearch'>
          <div className='SearchField'>
            <input
              type='text'
              placeholder='Search Phone here...'
              name='searchInput'
              value={searchInput}
              onChange={this.onHandleChange}
            />
            <i className='bx bx-search'></i>
          </div>
          <button className='buttonSearch' onClick={this.onSearch}>
            Search
          </button>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Reward Point</th>
                      <th>Status</th>
                    </thead>
                    <tbody>
                      {searchResult ? (
                        <tr key={searchResult.id}>
                          <td>{searchResult.fullname}</td>
                          <td>{searchResult.phoneNumber}</td>
                          <td>{searchResult.rewardPoints}</td>
                          <td>
                            {searchResult.status === 1 ? "Banned" : "Active"}
                          </td>
                          <td className='containerBtn'>
                            {searchResult.status !== 1 ? (
                              <button
                                type='submit'
                                className='btnDelete'
                                onClick={() => this.onDelete(searchResult.id)}
                              >
                                Ban
                              </button>
                            ) : (
                              <button
                                type='submit'
                                className='btnDelete'
                                onClick={() => this.onUnBanned(searchResult.id)}
                              >
                                UnBanned
                              </button>
                            )}
                          </td>
                        </tr>
                      ) : (
                        listCustomer.map((item) => (
                          <tr key={item.id}>
                            <td>{item.fullname}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.rewardPoints}</td>
                            <td>{item.status === 1 ? "Banned" : "Active"}</td>
                            <td className='containerBtn'>
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
                        ))
                      )}
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

export default Customers;
