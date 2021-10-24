import React, { Component } from "react";
import callApi_V2 from "../../utils/apiCallerV2";
import callApi from "../../utils/apiCaller.js";
import { Link } from "react-router-dom";
class BikeOfOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBike: [],
      OwnerName: "",
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var ownerID = match.params.id;
      callApi(`owners/${ownerID}`, "GET", null).then((res) => {
        console.log(res.data.fullname);
        this.setState({
          listBike: res.data.listBike,
          OwnerName: res.data.fullname,
        });
      });
    }
  }

  getStatusName(status) {
    switch (status) {
      case 0:
        return "Available";
      case 1:
        return "Rented";
      case 2:
        return "Deleted";
      case 3:
        return "Pending";
      default:
        return "Unavailable";
    }
  }

  render() {
    const { listBike, OwnerName } = this.state;

    return (
      <div>
        <h2 className='page-header'>Bikes Of {OwnerName}</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <td>License Plate</td>
                      <td>Brand</td>
                      <td>Category</td>
                      <td>Color</td>
                      <td>Model Year</td>
                      <td>Status</td>
                    </thead>
                    <tbody>
                      {listBike.map((item) => (
                        <tr key={item.id}>
                          <td>{item.licensePlate}</td>
                          <td>{item.brandName}</td>
                          <td>{item.categoryName}</td>
                          <td>{item.color}</td>
                          <td>{item.modelYear}</td>
                          <td>{this.getStatusName(item.status)}</td>
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

export default BikeOfOwner;
