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
      pages: 1,
      showNext: true,
    };
    // this.onNext = this.onNext.bind(this);
    // this.onPrev = this.onPrev.bind(this);
  }

  componentDidMount() {
    callApi("campaigns?page=1", "GET", null).then((res) => {
      // res = null => not display btn next
      if (res === null || res.data.data.length > 8) {
        this.setState({
          showNext: false,
          listCampaign: res.data.data,
        });
      } else {
        this.setState({
          listCampaign: res.data.data,
          showNext: true,
        });
      }
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
          // res < 8 => dont display next
          if (res.data.length < 8 || res.data.length > 8) {
            this.setState({
              showNext: false,
            });
          } else
            this.setState({
              showNext: true,
            });
          //
          this.setState({
            listCampaign: res.data,
          });
        }
      });
    }

    if (prevState.pages !== this.state.pages) {
      callApi(`campaigns?page=${this.state.pages}`, "GET", null).then((res) => {
        // res < 8 khi chuyen trang cuoi' cung`: dont show next
        if (res.data.data.length < 8) {
          this.setState({
            showNext: false,
          });
        } else
          this.setState({
            showNext: true,
          });
        this.setState({
          listCampaign: res.data.data,
        });
      });
    }
  }
  formatDate = (date, format = "dd/mm/yy") => {
    let d = new Date(date);
    const map = {
      mm: d.getMonth() + 1,
      dd: d.getDate(),
      yy: d.getFullYear().toString().slice(-2),
      yyyy: d.getFullYear(),
    };
    return format.replace(/dd|mm|yy/gi, (matched) => map[matched]);
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

  // async onDelete(id) {
  //   console.log();
  //   callApi("campaigns", "DELETE", JSON.stringify(id)).then((res) => {
  //     console.log(res);
  //   });
  // }
  async onDelete(id) {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    };
    const response = await fetch(
      "http://52.74.12.123/api/v1/campaigns",
      requestOptions
    );
    const res = await response.json();
    if (res === true) {
      window.location.reload();
    }
  }

  onNext(currentPage) {
    if (currentPage === this.state.pages) {
      this.setState({
        pages: currentPage + 1,
      });
    }
  }

  onPrev(currentPage) {
    if (currentPage === this.state.pages) {
      if (currentPage != 0 && currentPage > 1) {
        this.setState({
          pages: currentPage - 1,
        });
      }
    }
  }
  render() {
    const { listCampaign, areaOptions, pages, showNext } = this.state;

    const options = areaOptions.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    // console.log("asasa:" + options.label);
    return (
      <div>
        <h2 className='page-header'>Campaigns</h2>
        <Link to='/createCampaign'>
          <button className='btn-create'>Create Campaign</button>
        </Link>
        <div className='row'>
          <h3 className='col-2'>Select Area</h3>
          <Select
            className='col-6'
            style={{ marginBottom: "20px" }}
            // defaultValue={options[0]}
            onChange={(value) =>
              this.setState({
                selectedArea: value,
              })
            }
            options={options}
          />
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <td>Description</td>
                      <td>Area</td>
                      <td>Starting Date</td>
                      <td>Expired Date</td>
                      <td>Status</td>
                      <td>Event</td>
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
          <div className={("col-12", "groupPaging")}>
            {pages > 1 ? (
              <div
                className={("col-2", "onClick")}
                onClick={() => this.onPrev(pages)}
              >
                Prev
              </div>
            ) : (
              <div className='col-2'></div>
            )}
            {showNext ? (
              <div
                className={("col-2", "onClick")}
                onClick={() => this.onNext(pages)}
              >
                Next
              </div>
            ) : (
              <div className='col-2'></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Campaign;
