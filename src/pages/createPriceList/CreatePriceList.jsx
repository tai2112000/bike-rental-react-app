import React, { Component } from "react";
import "./createPriceList.css";
import callApi from "../../utils/apiCaller";
import Select from "react-select";

class CreateVoucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPrice: "",
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
    };
  }

  componentDidMount() {
    callApi("areas", "GET", null).then((res) => {
      this.setState({
        listArea: res.data,
      });
    });
    callApi("motorTypes", "GET", null).then((res) => {
      this.setState({
        listMotorType: res.data,
      });
    });
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
    e.preventDefault();
    const { selectedArea, selectedMotorType, txtPrice } = this.state;
    console.log(selectedArea,  selectedMotorType, txtPrice);

    callApi("pricelists", "POST", {
      motorTypeId: selectedMotorType.value,
      areaId: selectedArea.value,
      price: txtPrice,
    }).then((res) => {
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
    const { txtPrice, listArea, listMotorType, isShowSuccessful } = this.state;

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
        <h2 className="page-header">Create Price</h2>
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
              value={txtPrice}
              name="txtPrice"
              onChange={this.onChange}
            />
          </div>
          <button className="btn-create" type="submit">
            Create
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

export default CreateVoucher;
