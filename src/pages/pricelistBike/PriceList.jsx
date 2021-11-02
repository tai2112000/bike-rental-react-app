import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../utils/apiCaller";

class Pricelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPrice: [],
      listMotorType: [],
      listArea: [],
      apiURL: "",
    };
  }

  componentDidMount() {
    callApi("pricelists", "GET", null).then((res) => {
      this.setState({
        listPrice: res.data,
      });
    });
    callApi("motorTypes", "GET", null).then((res) => {
      this.setState({
        listMotorType: res.data,
      });
    });
    callApi("areas", "GET", null).then((res) => {
      this.setState({
        listArea: res.data,
      });
    });
  }

  onGetBikeType = (motorTypeId) => {
    let bikeType = "";
    this.state.listMotorType.map((motorType) => {
      if (motorTypeId === motorType.id) {
        bikeType = motorType.name;
      }
    });
    return bikeType;
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

  render() {
    const { listPrice } = this.state;

    console.log(listPrice);
    return (
      <div>
        <h2 className="page-header">Price List</h2>
        <Link to="/createpricelists">
          <button className="btn-create">Create Price</button>
        </Link>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <td>Area</td>
                      <td>Type</td>
                      <td>Price</td>
                    </thead>
                    <tbody>
                      {listPrice.map((item) => (
                        <tr key={item.id}>
                          <td>{this.onGetAreaName(item.areaId)}</td>
                          <td>{this.onGetBikeType(item.motorTypeId)}</td>
                          <td>{item.price}</td>
                          <Link
                              to={`pricelistdetail/${item.areaId}&${item.motorTypeId}&${this.onGetBikeType(item.motorTypeId)}`}
                              className='btnView'
                            >
                              View
                            </Link>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>``
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pricelist;
