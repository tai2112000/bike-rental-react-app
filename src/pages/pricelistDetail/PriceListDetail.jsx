import React, { Component } from "react";
import callApi_V2 from "../../utils/apiCallerV2";
import callApi from "../../utils/apiCaller.js";
// import "./pricelistDetail/priceListDetail.css"
import Select from "react-select";
import { Link } from "react-router-dom";
class pricelistDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaId: "",
      areaName:"",
      motorTypeId:"",
      motorTypeName:"",
      newPrice: "",
      listArea: [],
      isShowSuccessful: 0,
      isDisableEdit: true,
      isDisableCreateVoucher: false,
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var motorName = match.params.motorName;
      var areaId = match.params.areaId;
      var motorTypeId = match.params.motorTypeId;
      this.setState(
        {
          motorName: motorName,
          motorTypeId: motorTypeId
        }
      )
      callApi("motorTypes", "GET", null).then((res) => {
        
        this.setState({
          listMotorType: res.data
        })
      
      });
      callApi(`areas/${areaId}`, "GET", null).then((res) => {
        var data = res.data;
        this.setState({
          areaId: data.id,
          areaName: data.name,
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  onGetMotorTypeName(motorTypeId) {
    let motorTypeName = "";
    this.state.listMotorType.map((motor) => {
      if (motorTypeId === motor.id) {
        motorTypeName = motor.name;
      }
    });
    return motorTypeName;
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSave = async (e) => {
    const { areaId, motorTypeId, newPrice } = this.state;
    var { history } = this.props;
    console.log(
      "area: ",
      areaId,
      "type: ",
      motorTypeId,
      "price: ",
      newPrice
    );
    callApi(
      `pricelists?areaId=${areaId}&motorTypeId=${motorTypeId}&price=${newPrice}`,
      "PUT",
      null
    ).then(() => {
      this.setState({
        isShowSuccessful: 1,
      });
      this.timer = setTimeout(() => {
        if (this.state.isShowSuccessful === 1)
          this.setState({ isShowSuccessful: -1 });
      }, 3 * 1000); // 3s
    });
  };

  render() {
    const {
      motorName,
      motorTypeName,
      motorTypeId,
      newPrice,
      areaName,
      listArea,
      listMotorType,
      isShowSuccessful,
      isDisableEdit,
      isDisableCreateVoucher,
    } = this.state;
    console.log(this.props);

    return (
      <div>
        <h2 className='page-header'>Price List Detail</h2>
        <form onSubmit={this.onSave}>
        <div>
            <label>Area: </label>
            <br />
            <input
              className='input col-6'
              type='text'
              value={areaName}
              name='areaName'
              onChange={this.onChange}
              disabled={isDisableEdit}
            />
          </div>
          <div>
            <label>Type: </label>
            <br />
            <input
              className='input col-6'
              type='text'
              value={motorName}
              name='motorName'
              onChange={this.onChange}
              disabled={isDisableEdit}
            />
          </div>
          <div>
            <label>Price: </label>
            <br />
            <input
              className='input col-6'
              type='text'
              value={newPrice}
              name='newPrice'
              onChange={this.onChange}
            />
          </div>
          <div className='buttonSave'>
            <div onClick={this.onSave}>Save</div>
          </div>
        </form>
        {isShowSuccessful === 1 ? (
          <div className='saveSuccess'>Edited</div>
        ) : (
          <div style={{ height: `50px` }}></div>
        )}
      </div>
    );
  }
}

export default pricelistDetail;
