import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
import Select from "react-select";
import callApi_V2 from "../../utils/apiCallerV2";
import styles from "./Campaign.css";
import { Link } from "react-router-dom";
class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCampaign: [],
      areaOptions: [],
      selectedArea: {
        label: null,
        value: null,
      },
    };
  }

  componentDidMount() {
    callApi("campaigns?page=1", "GET", null).then((res) => {
      this.setState({
        listCampaign: res.data.data,
      });
    });
    callApi("areas", "GET", null).then((res) => {
      this.setState({
        areaOptions: res.data,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedArea.value != null) {
      callApi_V2(
        `campaigns/areaId/${this.state.selectedArea.value}`,
        "GET",
        null
      ).then((res) => {
        if (prevState.listCampaign === this.state.listCampaign) {
          this.setState({
            listCampaign: res.data,
          });
        }
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

  ongetAreaName(areaId) {
    let areaName = "";
    this.state.areaOptions.map((area) => {
      if (areaId === area.id) {
        areaName = area.name;
      }
    });
    return areaName;
  }

  async onDelete(id) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(id),
    };
    const response = await fetch(
      "http://18.138.110.46/api/v1/campaigns",
      requestOptions
    );
    window.location.reload();
  }

  render() {
    const { listCampaign, areaOptions } = this.state;

    const options = areaOptions.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    return (
      <div>
        <h2 className='page-header'>Campaigns</h2>
        <Link to='/createCampaign'>
          <button className='btn-create'>Create Campaign</button>
        </Link>
        <div className='row'>
          <h3
            className='col-2'
            style={{
              display: `flex`,
              flexDirection: `row`,
              alignItems: `center`,
            }}
          >
            Select Area
          </h3>
          <Select
            className='col-6'
            style={{ marginBottom: "20px" }}
            onChange={(value) =>
              this.setState({
                selectedArea: value,
              })
            }
            options={options}
          />
          <div className='col-12' style={{ marginTop: `20px` }}>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <th>Description</th>
                      <th>Area</th>
                      <th>Starting Date</th>
                      <th>Expired Date</th>
                      <th>Status</th>
                      <th>Event</th>
                    </thead>
                    <tbody>
                      {listCampaign.map((item) => (
                        <tr key={item.id}>
                          <td>{item.description}</td>
                          <td>{this.ongetAreaName(item.areaId)}</td>
                          <td>{this.formatDate(item.startingDate)}</td>
                          <td>{this.formatDate(item.expiredDate)}</td>
                          <td>
                            {item.status === 1 ? "Unavailable" : "Available"}
                          </td>
                          <td className='containerBtn'>
                            <Link
                              to={`campaignDetail/${item.id}`}
                              className='btnView'
                            >
                              View
                            </Link>
                            {item.status !== 1 ? (
                              <button
                                type='submit'
                                className='btnDelete'
                                onClick={() => this.onDelete(item.id)}
                              >
                                Delete
                              </button>
                            ) : (
                              <></>
                            )}
                          </td>
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

export default Campaign;
