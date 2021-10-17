import React, { Component } from "react";
import callApi from "../utils/apiCaller";
import callApi_V2 from "../utils/apiCallerV2";
class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBooking: [],
      listCustomer: [],
      listOwner: [],
      listBikeId: [],
      bikeInfo: "",
    };
  }

  componentDidMount() {
    callApi("bookings", "GET", null).then((res) => {
      this.setState({
        listBooking: res.data,
        listBikeId: res.data.bikeId,
      });
    });
    callApi_V2("admins/customers", "GET", null).then((res) => {
      this.setState({
        listCustomer: res.data,
      });
    });
    callApi(`owners?size=23`, "GET", null).then((res) => {
      this.setState({
        listOwner: res.data.data,
      });
    });
  }

  onGetCustomerName = (customerId) => {
    let customerName = "";
    this.state.listCustomer.map((customer) => {
      if (customerId === customer.id) {
        customerName = customer.fullname;
      }
    });
    return customerName;
  };

  onGetOwnerName = (ownerId) => {
    let ownerName = "";
    this.state.listOwner.map((owner) => {
      if (ownerId === owner.id) {
        ownerName = owner.fullname;
      }
    });
    return ownerName;
  };

  // onGetOwnerName = (ownerId) => {
  //   let ownerName = "";
  //   callApi(`owners/${ownerId}`, "GET", null).then((res) => {
  //     ownerName = res.data.fullname;
  //   });
  //   console.log(ownerName);
  // };

  // async onGetBikeInformation(bikeId) {
  //   // let bikeName = "";
  //   // callApi(`bikes/${bikeId}`, "Get", null).then((res) => {
  //   //   console.log("BIke Name" + res.bikeName);
  //   // });
  //   const name = await callApi(`bikes/${bikeId}`, "Get", null);
  //   console.log(name.data.categoryName);
  // }

  formatDate = (date, format = "mm/dd/yy") => {
    let d = new Date(date);
    const map = {
      mm: d.getMonth() + 1,
      dd: d.getDate(),
      yy: d.getFullYear().toString().slice(-2),
      yyyy: d.getFullYear(),
    };
    return format.replace(/mm|dd|yy/gi, (matched) => map[matched]);
  };

  renderRowBooking(data = []) {
    let listRow = (
      <tr>
        <rd>No Row</rd>
      </tr>
    );
    listRow = data.map((row, index) => {
      return (
        <tr key={index}>
          <td>{this.onGetCustomerName(row.customerId)}</td>
          <td>{this.onGetOwnerName(row.ownerId)}</td>
          <td>Bike</td>
          <td>{this.formatDate(row.dayRent)}</td>
          <td>{this.formatDate(row.dayReturnActual)}</td>
          <td>{this.formatDate(row.dayReturnExpected)}</td>
          <td>{`${row.price}VND`}</td>
          {/* <td>Test</td> */}
          <td>{row.status}</td>
        </tr>
      );
    });
    return listRow;
  }

  render() {
    const { listBooking, listOwner, listBikeId } = this.state;
    console.log(listBikeId);
    return (
      <div>
        <h2 className='page-header'>Bookings</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <tr>
                      <td>Customer name</td>
                      <td>Owner Name</td>
                      <td>Bike</td>
                      <td>Day Rent</td>
                      <td>Day return Actual</td>
                      <td>Day return Expected</td>
                      <td>Price</td>
                      {/* <td>Payment method</td> */}
                      <td>Status</td>
                    </tr>
                    <tbody>{this.renderRowBooking(listBooking)}</tbody>
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
