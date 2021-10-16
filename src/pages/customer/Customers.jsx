import React, { Component } from "react";
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
        searchResult: null,
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
  render() {
    const { listCustomer, searchInput, searchResult } = this.state;
    // console.log(searchInput);
    // console.log(listCustomer);
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
                      <td>Name</td>
                      <td>Phone Number</td>
                      <td>Reward Point</td>
                      <td>Band account</td>
                    </thead>
                    <tbody>
                      {searchResult ? (
                        <tr key={searchResult.id}>
                          <td>{searchResult.fullname}</td>
                          <td>{searchResult.phoneNumber}</td>
                          <td>{searchResult.rewardPoints}</td>
                          <td>{searchResult.isBanned}null</td>
                        </tr>
                      ) : (
                        listCustomer.map((item) => (
                          <tr key={item.id}>
                            <td>{item.fullname}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.rewardPoints}</td>
                            <td>{item.isBanned}null</td>
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
