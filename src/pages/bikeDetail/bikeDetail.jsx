import React, { Component } from "react";
import callApi_V2 from "../../utils/apiCallerV2";
import callApi from "../../utils/apiCaller.js";
import Select from "react-select";
import { Link } from "react-router-dom";
import { getStorage, ref, getMetadata, getDownloadURL } from "firebase/storage";
class BikeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikeData: null,
      brandId: "",
      categoryName: "",
      color: "",
      licensePlate: "",
      modelYear: "",
      status: "",
      imageURL: "",
      brandName: "",
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var bikeID = match.params.bikeID;
      const storage = getStorage();
      callApi(`bikes/${bikeID}`, "GET", null).then((res) => {
        this.setState({
          brandId: res.data.brandId,
          categoryName: res.data.categoryName,
          color: res.data.color,
          modelYear: res.data.modelYear,
          status: res.data.status,
          licensePlate: res.data.licensePlate,
        });

        callApi(`brands/${res.data.brandId}`, "GET", null).then((res) => {
          this.setState({
            brandName: res.data.name,
          });
        });

        getDownloadURL(
          ref(
            storage,
            `BikeImages/${
              res.data.imgPath ? res.data.imgPath : "defaultimage.jpg"
            }`
          )
        )
          .then((url) => {
            this.setState({
              imageURL: url,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  render() {
    const {
      brandId,
      categoryName,
      color,
      modelYear,
      status,
      licensePlate,
      brandName,
      imageURL,
    } = this.state;
    return (
      <div>
        <h2 className='page-header'>Bike Detail</h2>
        <div style={{ display: `flex`, justifyContent: `column` }}>
          <img
            className='col-6'
            style={{
              minHeight: `500px`,
            }}
            src={imageURL}
            alt=''
          />
          <div className='col-6' style={{ paddingBottom: `50px` }}>
            <div className='form-group'>
              <label style={{ width: `150px` }}>License Plate</label>
              <div className='Input'>
                <input
                  placeholder='License Plate'
                  name='License Plate'
                  type='text'
                  value={licensePlate}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Brand</label>
              <div className='Input'>
                <input
                  placeholder='Brand'
                  name='Brand'
                  type='text'
                  value={brandName}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Category</label>
              <div className='Input'>
                <input
                  placeholder='Category'
                  name='Category'
                  type='text'
                  value={categoryName}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Color</label>
              <div className='Input'>
                <input
                  placeholder='Color'
                  name='Color'
                  type='text'
                  value={color}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Model Year </label>
              <div className='Input'>
                <input
                  placeholder='Model Year'
                  name='Model Year'
                  type='text'
                  value={modelYear}
                  disabled={true}
                />
              </div>
            </div>
            <div className='form-group'>
              <label style={{ width: `150px` }}>Status</label>
              <div className='Input'>
                <input
                  placeholder='Status'
                  name='Status'
                  type='text'
                  value={
                    status === 0
                      ? "Available"
                      : status === 1
                      ? "Rent"
                      : status === 2
                      ? "Delete"
                      : status === 3
                      ? "Pending"
                      : "Unavailable"
                  }
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

export default BikeDetail;
