import React, { Component } from "react";
import "./createcampaign.css";
import callApi from "../../utils/apiCaller";
import Select from "react-select";
import { Link } from "react-router-dom";

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtDescription: "",
      dateStart: "",
      dateEnd: "",

      listArea: [],
      selectedArea: {
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
    console.log(this.state);
    console.log(this.state.selectedArea.value);
    const { txtDescription, selectedArea, dateStart, dateEnd } = this.state;
    var { history } = this.props;
    callApi("campaigns", "POST", {
      description: txtDescription,
      areaId: selectedArea.value,
      startingDate: dateStart,
      expiredDate: dateEnd,
    }).then((res) => {
      this.setState({
        isShowSuccessful: 1,
      });
      if (res) {
        history.goBack();
      }
    });
  };

  render() {
    const { txtDescription, dateStart, dateEnd, listArea, isShowSuccessful } =
      this.state;

    const options = listArea.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    return (
      <div>
        <h2 className="page-header">Create Campaign</h2>

        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label style={{ width: `150px` }}>Area</label>

            <Select
              className="selectedfield"
              onChange={(value) =>
                this.setState({
                  selectedArea: value,
                })
              }
              options={options}
            />
          </div>
          <div className="form-group">
            <label style={{ width: `150px` }}>Description</label>
            <div className="Input">
              <input
                type="text"
                value={txtDescription}
                name="txtDescription"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Starting Date</label>
            <div className='Input'>
            <input
              type="date"
              value={dateStart}
              name="dateStart"
              onChange={this.onChange}
            />
          </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>End Date</label>
            <div className='Input'>
            <input
              type="date"
              value={dateEnd}
              name="dateEnd"
              onChange={this.onChange}
            />
          </div>
          </div>
          <button className="btn-create li" type="submit">
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

export default CreateCampaign;
