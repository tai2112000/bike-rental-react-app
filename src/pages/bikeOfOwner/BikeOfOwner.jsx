import React, { Component } from "react";
import callApi_V2 from "../../utils/apiCallerV2";
import callApi from "../../utils/apiCaller.js";
import { Link } from "react-router-dom";
import { getStorage, ref, getMetadata, getDownloadURL } from "firebase/storage";
import firebase from "../../firebase";
import styles from "./BikeOfOwner.css";
class BikeOfOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBike: [],
      OwnerName: "",
      defaultImgURL: "",
    };
  }

  componentDidMount = () => {
    var { match } = this.props;
    if (match) {
      var ownerID = match.params.id;
      callApi(`owners/${ownerID}`, "GET", null).then((res) => {
        this.setState({
          listBike: res.data.listBike,
          OwnerName: res.data.fullname,
        });
      });
    }

    const storage = getStorage();
    getDownloadURL(ref(storage, "BikeImages/defaultimage.jpg"))
      .then((url) => {
        this.setState({
          defaultImgURL: url,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onGetImgUrl(imgPath) {
    let fullPathUrl = "";
    const storage = getStorage();
    getDownloadURL(ref(storage, `BikeImages/${imgPath}`))
      .then((url) => {
        fullPathUrl = url;
        console.log(url);
      })
      .catch((error) => {
        console.log(error);
      });
    return fullPathUrl;
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
    const { listBike, OwnerName, defaultImgURL } = this.state;

    return (
      <div>
        <h2 className='page-header'>Bikes Of {OwnerName}</h2>
        <h4>img URL:</h4>
        <img
          className='imageContainer'
          src={this.onGetImgUrl("defaultimage.jpg")}
        />
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <td>Image</td>
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
                          <td>
                            <img
                              className='imageContainer'
                              src={
                                item.imgPath
                                  ? this.onGetImgUrl(item.imgPath)
                                  : defaultImgURL
                              }
                            />
                          </td>
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
