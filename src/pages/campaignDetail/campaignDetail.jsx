import React, { Component } from "react";
import callApi_V2 from "../../utils/apiCallerV2";
import callApi from "../../utils/apiCaller.js";
import styles from "./campaignDetail.css";
import Select from "react-select";
class campaignDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listVoucher: [],
      apiURL: "",
      id: "",
      description: "",
      areaId: "",
      expiredDate: "",
      startingDate: "",
      areaOptions: [],
      selectedArea: {
        label: null,
        value: null,
      },
      isShowSuccessful: 0,
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var campaignId = match.params.id;
      callApi_V2(`vouchers/campaignId/${campaignId}`, "GET", null).then(
        (res) => {
          this.setState({
            listVoucher: res.data,
          });
        }
      );
      callApi("areas", "GET", null).then((res) => {
        this.setState({
          areaOptions: res.data,
        });
      });
      callApi(`campaigns/${campaignId}`, "GET", null).then((res) => {
        var data = res.data;
        this.setState({
          id: data.id,
          description: data.description,
          areaId: data.areaId,
          expiredDate: data.expiredDate,
          startingDate: data.startingDate,
        });
      });
    }
  }
  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }
  ongetAreaName(areaId) {
    let areaName = "";
    this.state.areaOptions.map((area) => {
      if (areaId === area.id) {
        areaName = area.name;
      }
    });
    return areaName;
  }

  formatChangeDate = (date, format = "yyyy-mm-dd") => {
    let d = new Date(date);
    const map = {
      mm: d.getMonth() + 1,
      dd: d.getDate(),
      yy: d.getFullYear().toString().slice(-2),
      yyyy: d.getFullYear(),
    };
    return format.replace(/yyyy|mm|dd/gi, (matched) => map[matched]);
  };
  formatDate = (date, format = "yyyy-mm-dd") => {
    let d = new Date(date);
    const map = {
      mm: d.getMonth() + 1,
      dd: d.getDate(),
      yy: d.getFullYear().toString().slice(-2),
      yyyy: d.getFullYear(),
    };
    return format.replace(/yyyy|mm|dd/gi, (matched) => map[matched]);
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    var { id, description, areaId, expiredDate, startingDate } = this.state;
    callApi(`campaigns?id=${id}`, "PUT", {
      description: description,
      expiredDate: expiredDate,
      startingDate: startingDate,
    }).then(() => {
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
      listVoucher,
      id,
      description,
      areaId,
      expiredDate,
      startingDate,
      areaOptions,
      selectedArea,
      isShowSuccessful,
    } = this.state;
    const options = areaOptions.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    return (
      <div>
        <h2 className='page-header'>Campaign Detail</h2>
        {isShowSuccessful === 1 ? (
          <div className='saveSuccess'>Save Successful</div>
        ) : (
          <div style={{ height: `50px` }}></div>
        )}
        <form
          className='col-12'
          style={{ paddingBottom: `50px` }}
          onSubmit={this.onSave}
        >
          <div className='form-group'>
            <label style={{ width: `150px` }}>Description</label>
            <div className='Input'>
              <input
                placeholder='Description'
                name='description'
                type='text'
                value={description}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>area</label>
            <div className='Input'>
              <input
                placeholder='Area'
                name='description'
                type='text'
                value={this.ongetAreaName(areaId)}
                // onChange={this.onChange}
                disabled={true}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Starting Date</label>
            <div className='Input'>
              <input
                placeholder='Starting Date...'
                name='startingDate'
                type='date'
                value={this.formatChangeDate(startingDate)}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Expired Date</label>
            <div className='Input'>
              <input
                placeholder='Expired Date...'
                type='date'
                name='expiredDate'
                value={this.formatChangeDate(expiredDate)}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='buttonContainer' onClick={this.onSave}>
            <div></div>
            <div className='buttonSave'>
              {" "}
              <div>Save</div>
            </div>
          </div>
        </form>
        <h2 className='page-header'>Voucher Exits</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <td>Name</td>
                      <td>Description</td>
                      <td>Percent</td>
                      <td>MaxAmount</td>
                      <td>StartingDate</td>
                      <td>ExpiredDate</td>
                      <td>Items Remain</td>
                      {/* <td>Status</td> */}
                    </thead>
                    <tbody>
                      {listVoucher.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.discountPercent}</td>
                          <td>{item.discountAmount}</td>
                          <td>{this.formatDate(item.startingDate)}</td>
                          <td>{this.formatDate(item.expiredDate)}</td>
                          <td>{item.voucherItemsRemain}</td>
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

export default campaignDetail;