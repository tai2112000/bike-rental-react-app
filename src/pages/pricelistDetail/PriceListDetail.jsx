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
      newPrice: "",
      listArea: [],
      selectedArea: {
        label: null,
        value: null,
      },
      listMotorType: [],
      selectedMotorType: {
        label: null,
        value: null,
      },
      isShowSuccessful: 0,
      isDisableEdit: true,
      isDisableCreateVoucher: false,
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
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
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    const { selectedArea, selectedMotorType, newPrice } = this.state;
    console.log("area: ",selectedArea, "type: ", selectedMotorType, "price: ", newPrice);
    callApi(
      `pricelists?area=${selectedArea.value}&motorTypeId=${selectedMotorType.value}&price=${newPrice}`,
      "PUT",
      {
        motorTypeId: selectedMotorType.value,
        areaId: selectedArea.value,
        price: newPrice,
      }
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
      newPrice,
      listArea,
      listMotorType,
      isShowSuccessful,
      isDisableEdit,
      isDisableCreateVoucher,
    } = this.state;
    const areaOptions = listArea.map((item) => ({
        label: item.name,
        value: item.id,
      }));
  
      const typeOptions = listMotorType.map((item) => ({
        label: item.name,
        value: item.id,
      }));

    return (
      <div>
        <h2 className="page-header">Price List Detail</h2>
        <form onSubmit={this.onSave}>
          <div className="selectfiled">
            <label>Area: </label>
            <br />
            <Select
              className="col-6"
              onChange={(value) =>
                this.setState({
                  selectedArea: value,
                })
              }
              options={areaOptions}
            />
          </div>
          <div className="selectfiled">
            <label>Type: </label>
            <br />
            <Select
              className="col-6"
              onChange={(value) =>
                this.setState({
                  selectedMotorType: value,
                })
              }
              options={typeOptions}
            />
          </div>
          <div>
            <label>Price: </label>
            <br />
            <input
              className="input col-6"
              type="text"
              value={newPrice}
              name="newPrice"
              onChange={this.onChange}
            />
          </div>
          <button className="btn-create" type="submit">
            Edit
          </button>
        </form>
        {isShowSuccessful === 1 ? (
          <div className="saveSuccess">Create Successful</div>
        ) : (
          <div style={{ height: `50px` }}></div>
        )}
      </div>
    );
  }
}

export default pricelistDetail;
