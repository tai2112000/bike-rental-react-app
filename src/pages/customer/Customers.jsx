import React, { Component } from "react";
import callApi_V2 from "../../utils/apiCallerV2";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomer: [],
      apiURL: "",
    };
  }

  componentDidMount() {
    callApi_V2("admins/customers", "GET", null).then((res) => {
      this.setState({
        listCustomer: res.data,
      });
    });
  }
  render() {
    const { listCustomer } = this.state;

    console.log(listCustomer);
    return (
      <div>
        <h2 className='page-header'>customers</h2>
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
                      {listCustomer.map((item) => (
                        <tr key={item.id}>
                          <td>{item.fullname}</td>
                          <td>{item.phoneNumber}</td>
                          <td>{item.rewardPoints}</td>
                          <td>{item.isBanned}null</td>
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

export default Customers;
