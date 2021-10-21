import React, { Component } from "react";
import "./createvoucher.css";
import callApi from "../../utils/apiCaller";
import Select from "react-select";

class CreateVoucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtVoucherName: "",
      txtDescription: "",
      txtDiscountPercent: "",
      txtMaxAmount: "",
      txtRemain: "",
      dateStart: "",
      dateEnd: "",

      campaignId: "",
      campaignDescription: "",

      listCampaign: [],
      selectedCampaign: {
        label: null,
        value: null,
      },
      isShowSuccessful: 0,
    };
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
    var { match } = this.props;
    if (match) {
      var campaignId = match.params.id;
      this.setState({
        campaignId: campaignId,
      });
    }
    callApi(`campaigns/${campaignId}`, "GET", null).then((res) => {
      var data = res.data;
      this.setState({
        campaignDescription: data.description,
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
    const {
      txtVoucherName,
      txtDescription,
      txtDiscountPercent,
      txtMaxAmount,
      txtRemain,
      dateStart,
      dateEnd,
      campaignId,
    } = this.state;

    callApi(
      "vouchers",
      "POST",
      {
        name: txtVoucherName,
        description: txtDescription,
        discountPercent: txtDiscountPercent,
        discountAmount: txtMaxAmount,
        startingDate: dateStart,
        expiredDate: dateEnd,
        voucherItemsRemain: txtRemain,
        campaignId: campaignId,
      },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjODdiYjYzLTFlNDktNDZjNC1hNTBiLWMxNjE5Yjk4NDY0NCIsInJvbGUiOiIyIiwiZXhwIjoxNjM0ODMwODQ5fQ.XRaVeCRJGkySGJOi9naQq4o0KdBLmAP-ImYyTD39x2Y"
    ).then((res) => {
      console.log(res);
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
      txtVoucherName,
      txtDescription,
      txtDiscountPercent,
      txtMaxAmount,
      txtRemain,
      dateStart,
      dateEnd,
      isShowSuccessful,
      campaignDescription,
    } = this.state;

    return (
      <div>
        <h2 className='page-header'>Create Voucher</h2>
        <form onSubmit={this.onSave}>
          <div className='selectfiled'>
            <label>For Campaign: </label>
            <label>{campaignDescription}</label>
          </div>
          <div>
            <label>Voucher Name: </label>
            <br />
            <input
              className='input col-6'
              type='text'
              value={txtVoucherName}
              name='txtVoucherName'
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Description: </label>
            <br />
            <textarea
              className='textarea col-6'
              type='text'
              value={txtDescription}
              name='txtDescription'
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Discount Percent: </label>
            <br />
            <input
              className='input col-2'
              type='text'
              value={txtDiscountPercent}
              name='txtDiscountPercent'
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Max Amount: </label>
            <br />
            <input
              className='input col-2'
              type='text'
              value={txtMaxAmount}
              name='txtMaxAmount'
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Quantity: </label>
            <br />
            <input
              className='input col-2'
              type='text'
              value={txtRemain}
              name='txtRemain'
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Starting Date: </label>
            <br />
            <input
              className='input col-2'
              type='date'
              value={dateStart}
              name='dateStart'
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>End Date: </label>
            <br />
            <input
              className='input col-2'
              type='date'
              value={dateEnd}
              name='dateEnd'
              onChange={this.onChange}
            />
          </div>
          <button className='btn-create' type='submit'>
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
