import React, { Component } from "react";
import callApi_V2 from "../utils/apiCallerV2";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBooking: [],
      apiURL: "",
    };
  }

  componentDidMount() {
    callApi_V2("bookings", "GET", null).then((res) => {
      this.setState({
        listBooking: res.data,
      });
    });
  }
  render() {
    const { listBooking } = this.state;

    console.log(listBooking);
    return (
      <div>
        <h2 className='page-header'>Booking</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <td>Customer name</td>
                      <td>Owner Name</td>
                      <td>Bike</td>
                      <td>Day Rent</td>
                      <td>Day return Actual</td>
                      <td>Day return Expected</td>
                      <td>Price</td>
                      <td>Payment method</td>
                    </thead>
                    <tbody>
                      {/* <tr>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                      </tr> */}
                      {/* {listBooking.map((item) => (
                        <tr key={item.id}>
                          <td>Test</td>
                          <td>Test</td>
                          <td>Test</td>
                          <td>Test</td>
                          <td>Test</td>
                          <td>Test</td>
                          <td>Test</td>
                          <td>Test</td>
                        </tr>
                      ))} */}
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

export default Booking;
