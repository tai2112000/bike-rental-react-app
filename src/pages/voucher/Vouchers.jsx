import React, { Component } from "react";
import { Link } from "react-router-dom";
// import callApi_V2 from "../../utils/apiCallerV2";
import callApi from "../../utils/apiCaller";

class Vouchers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listVoucher: [],
      listCampaign: [],
      apiURL: "",
    };
  }

  componentDidMount() {
    callApi("vouchers", "GET", null).then((res) => {
      this.setState({
        listVoucher: res.data,
      });
    });
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
  }

  onGetCampaignName = (campaignId) => {
    let campaignName = "";
    this.state.listCampaign.map((campaign) => {
      if (campaignId === campaign.id) {
        campaignName = campaign.description;
      }
    });
    return campaignName;
  };

  formatDate = (date, format = "mm/dd/yy") => {
    let d = new Date(date);
    const map = {
      mm: d.getMonth() + 1,
      dd: d.getDate(),
      yy: d.getFullYear().toString().slice(-2),
      yyyy: d.getFullYear(),
    };
    return format.replace(/mm|dd|yy/gi, (matched) => map[matched]);
  };

  renderRowCampaign(data = []) {
    let listRow = (
      <tr>
        <rd>No Row</rd>
      </tr>
    );
    listRow = data.map((row, index) => {
      return (
        <tr key={index}>
          <td>{this.onGetCampaignName(row.campaignId)}</td>
          <td>{row.name}</td>
          <td>{row.description}</td>
          <td>{row.discountPercent}</td>
          <td>{row.discountAmount}</td>
          <td>{this.formatDate(row.startingDate)}</td>
          <td>{this.formatDate(row.expiredDate)}</td>
          <td>{row.voucherItemsRemain}</td>
        </tr>
      );
    });
    return listRow;
  }

  render() {
    const { listVoucher } = this.state;
    return (
      <div>
        <h2 className='page-header'>Vouchers</h2>
        <Link to='/createVoucher'>
          <button className='btn-create'>Create Voucher</button>
        </Link>
        <br />
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <td>Campaign</td>
                      <td>Name</td>
                      <td>Description</td>
                      <td>Discount Percent</td>
                      <td>Discount Amount</td>
                      <td>Starting Date</td>
                      <td>Expired Date</td>
                      <td>Remain</td>
                    </thead>
                    <tbody>{this.renderRowCampaign(listVoucher)}</tbody>
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

export default Vouchers;
