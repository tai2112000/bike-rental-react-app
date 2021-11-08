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
      bikeInfo: "",
      listArea: [],
      listBike: [],
    };
  }

  componentDidMount() {
    callApi("bookings?status=0&pageNum=1", "GET", null).then((res) => {
      this.setState({
        listBooking: res.data.data,
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
    callApi("areas", "GET", null).then((res) => {
      this.setState({
        listArea: res.data,
      });
    });
    callApi("bikes?page=1", "GET", null).then((res) => {
      this.setState({
        listBike: res.data.data,
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

  onGetAreaId = (ownerId) => {
    let areaId = "";
    this.state.listOwner.map((owner) => {
      if (ownerId === owner.id) {
        areaId = owner.areaId;
      }
    });
    return areaId;
  };

  onGetAreaName = (areaId) => {
    let areaName = "";
    this.state.listArea.map((area) => {
      if (areaId === area.id) {
        areaName = area.name;
      }
    });
    return areaName;
  };

  onGetBikeName = (bikeId) => {
    let bikeName = "";
    this.state.listBike.map((bike) => {
      if (bikeId === bike.id) {
        bikeName = bike.categoryName;
      }
    });
    return bikeName;
  };

  onGetBikeLicensePlate = (bikeId) => {
    let bikeLicensePlate = "";
    this.state.listBike.map((bike) => {
      if (bikeId === bike.id) {
        bikeLicensePlate = bike.licensePlate;
      }
    });
    return bikeLicensePlate;
  };

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

  getStatusName(status) {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Inprocess";
      case 2:
        return "Finished";
      default:
        return "Canceled";
    }
  }

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
          <td>
            {this.onGetBikeName(row.bikeId)} -{" "}
            {this.onGetBikeLicensePlate(row.bikeId)}
          </td>
          <td>{this.formatDate(row.dayRent)}</td>
          <td>{this.formatDate(row.dayReturnActual)}</td>
          {row.status === 2 ? (
            <td>{this.formatDate(row.dayReturnExpected)}</td>
          ) : row.status === 0 || row.status === 1 ? (
            <td>waiting</td>
          ) : (
            <td>--</td>
          )}
          <td>{`${row.price}VND`}</td>
          <td>{this.onGetAreaName(this.onGetAreaId(row.ownerId))}</td>
          <td>{this.getStatusName(row.status)}</td>
        </tr>
      );
    });
    return listRow;
  }

  render() {
    const { listBooking } = this.state;

    return (
      <div>
        <h2 className="page-header">Bookings</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <div className="table-wrapper">
                  <table>
                    <tr>
                      <th>Customer name</th>
                      <th>Owner Name</th>
                      <th>Bike</th>
                      <th>Day Rent</th>
                      <th>Day return Actual</th>
                      <th>Day return Expected</th>
                      <th>Price</th>
                      <th>Area</th>
                      {/* <th>Payment method</th> */}
                      <th>Status</th>
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
