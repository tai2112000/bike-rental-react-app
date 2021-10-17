import React, { Component } from "react";
import "./createarea.css";
import callApi from "../../utils/apiCaller";
import Select from "react-select";

class CreateVoucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPostalCode: "",
      txtName: "",
      isShowSuccessful: 0,
    };
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
      const {
      txtPostalCode,
      txtName

    } = this.state;

    callApi("areas", "POST", {
        postalCode: txtPostalCode,
        name: txtName
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
    const {
      txtPostalCode,
      txtName,
      isShowSuccessful
    } = this.state;

    return (
      <div>
        <h2 className="page-header">Create Area</h2> 
        <form onSubmit={this.onSave}>
          <div>
            <label>Postal Code: </label>
            <br />
            <input
              className="input col-6"
              type="text"
              value={txtPostalCode}
              name="txtPostalCode"
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Name: </label>
            <br />
            <input
              className="input col-6"
              type="text"
              value={txtName}
              name="txtName"
              onChange={this.onChange}
            />
          </div>
          <button className="btn-create" type="submit">
            Create
          </button>
        </form>
        {isShowSuccessful === 1 ? (
          <div className='saveSuccess'>Create Successful</div>
        ) : (
          <div style={{ height: `50px` }}></div>
        )}
      </div>
    );
  }
}

export default CreateVoucher;
