import React, { Component } from "react";
import callApi_V2 from "../../utils/apiCallerV2";
import callApi from "../../utils/apiCaller.js";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getStorage,
  getMetadata,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { getDatabase, ref, child, set, get } from "firebase/database";
class BookingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikeData: null,
      customerName: "",
      customerPhone: "",
      ownerName: "",
      ownerPhone: "",
      Bike: "",
      dateRent: "",
      dateReturnExpected: "",
      dateReturnActual: "",
      price: "",
      area: "",
      status: "",
      imageURL: "",
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var bookingID = match.params.bookingID;
      const storage = getStorage();
      callApi(`bookings/${bookingID}`, "GET", null).then((booking) => {
        console.log("res: " + booking.data);
        this.setState({
          dateRent: booking.data.dayRent,
          dateReturnExpected: booking.data.dayReturnExpected,
          dateReturnActual: booking.data.dayReturnActual,
          status: booking.data.status,
        });
        callApi(`customers/${booking.data.customerId}`, "GET", null).then(
          (customer) => {
            this.setState({
              customerName: customer.data.fullname,
              customerPhone: customer.data.phoneNumber,
            });
          }
        );

        callApi(`owners/${booking.data.ownerId}`, "GET", null).then((owner) => {
          this.setState({
            ownerName: owner.data.fullname,
            ownerPhone: owner.data.phoneNumber,
          });

          callApi(`areas/${owner.data.areaId}`, "GET", null).then((area) => {
            this.setState({
              area: area.data.name,
            });
          });
        });

        callApi(`bikes/${booking.data.bikeId}`, "GET", null).then((bike) => {
          this.setState({
            Bike:
              bike.data.categoryName +
              ", " +
              bike.data.color +
              ", " +
              bike.data.licensePlate,
          });
        });
      });

      const dbRef = ref(getDatabase());
      get(child(dbRef, `Evidences/${bookingID}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Get Image from fireabse store

            getDownloadURL(
              storageRef(
                storage,
                `BookingImages/${
                  snapshot.val().Path
                    ? snapshot.val().Path
                    : "defaultBookingImage.jpg"
                }`
              )
            )
              .then((url) => {
                console.log("URL: " + url);
                this.setState({
                  imageURL: url,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  formatDate = (date, format = "dd/mm/yyyy") => {
    let d = new Date(date);
    const map = {
      mm: d.getMonth() + 1,
      dd: d.getDate(),
      yy: d.getFullYear().toString().slice(-2),
      yyyy: d.getFullYear(),
    };
    return format.replace(/dd|mm|yyyy/gi, (matched) => map[matched]);
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

  render() {
    const {
      bikeData,
      customerName,
      customerPhone,
      ownerName,
      ownerPhone,
      Bike,
      dateRent,
      dateReturnExpected,
      dateReturnActual,
      price,
      area,
      status,
      imageURL,
    } = this.state;

    return (
      <div>
        <h2 className='page-header'>Booking Detail</h2>
        <h4 style={{ marginBottom: `20px` }}>
          Status: {this.getStatusName(status)}
        </h4>
        <div style={{ display: `flex`, justifyContent: `column` }}>
          <img
            className='col-6'
            style={{
              minHeight: `500px`,
              maxHeight: `500px`,
            }}
            src={imageURL}
            alt=''
          />
          <div className='col-6' style={{ paddingBottom: `50px` }}>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Customer Name</label>
              <div className='Input'>
                <input
                  placeholder='Customer Name'
                  name='Customer Name'
                  type='text'
                  value={customerName}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Customer Phone</label>
              <div className='Input'>
                <input
                  placeholder='Customer Phone'
                  name='Customer Phone'
                  type='text'
                  value={customerPhone}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Owner Name</label>
              <div className='Input'>
                <input
                  placeholder='Owner Name'
                  name='Owner Name'
                  type='text'
                  value={ownerName}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Owner Phone</label>
              <div className='Input'>
                <input
                  placeholder='Owner Phone'
                  name='Owner Phone'
                  type='text'
                  value={ownerPhone}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Bike</label>
              <div className='Input'>
                <input
                  placeholder='Bike'
                  name='Bike'
                  type='text'
                  value={Bike}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Date Rent</label>
              <div className='Input'>
                <input
                  placeholder='Date Rent'
                  name='Date Rent'
                  type='text'
                  value={this.formatDate(dateRent)}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Date Return Expected</label>
              <div className='Input'>
                <input
                  placeholder='Date Return Expected'
                  name='Date Return Expected'
                  type='text'
                  value={this.formatDate(dateReturnExpected)}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Date Return Actual</label>
              <div className='Input'>
                <input
                  placeholder='Date Return Actual'
                  name='Date Return Actual'
                  type='text'
                  value={this.formatDate(dateReturnActual)}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Area</label>
              <div className='Input'>
                <input
                  placeholder='area'
                  name='area'
                  type='text'
                  value={area}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingDetail;
