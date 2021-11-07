import React, { Component } from "react";
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
      this.setState({
        listCampaign: res.data.data,
      });
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
    var { history } = this.props;

    callApi("vouchers", "POST", {
      name: txtVoucherName,
      description: txtDescription,
      discountPercent: txtDiscountPercent,
      discountAmount: txtMaxAmount,
      startingDate: dateStart,
      expiredDate: dateEnd,
      voucherItemsRemain: txtRemain,
      campaignId: campaignId,
    }).then((res) => {
      if (res) {
        this.setState({
          isShowSuccessful: 1,
        });
        this.timer = setTimeout(() => {
          if (this.state.isShowSuccessful === 1)
            this.setState({ isShowSuccessful: -1 });
        }, 3 * 1000); // 3s
      }
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
          <div className='form-group'>
            <label style={{ width: `150px` }}>For Campaign</label>
            <div className='Input'>
              <input disabled='true' type='text' value={campaignDescription} />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Voucher Name</label>
            <div className='Input'>
              <input
                type='text'
                value={txtVoucherName}
                name='txtVoucherName'
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Description</label>
            <div className='Input'>
              <input
                type='text'
                value={txtDescription}
                name='txtDescription'
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Discount Percent</label>
            <div className='Input'>
              <input
                type='text'
                value={txtDiscountPercent}
                name='txtDiscountPercent'
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Max Amount</label>
            <div className='Input'>
              <input
                type='text'
                value={txtMaxAmount}
                name='txtMaxAmount'
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Quantity</label>
            <div className='Input'>
              <input
                type='text'
                value={txtRemain}
                name='txtRemain'
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Starting Date</label>
            <div className='Input'>
              <input
                type='date'
                value={dateStart}
                name='dateStart'
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>End Date</label>
            <div className='Input'>
              <input
                type='date'
                value={dateEnd}
                name='dateEnd'
                onChange={this.onChange}
              />
            </div>
          </div>
          <button className='btn-create li' type='submit'>
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
