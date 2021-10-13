import React, { Component } from "react";
import callApi from "../../utils/apiCaller";

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOwner: [],
      apiURL: "",
    };
  }

  componentDidMount() {
    callApi("owners?page=1", "GET", null).then((res) => {
      this.setState({
        listOwner: res.data.data,
      });
    });
  }
  render() {
    const { listOwner } = this.state;

    console.log(listOwner);
    return (
      <div>
        <h2 className='page-header'>Owners</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <td>Name</td>
                      <td>Phone Number</td>
                      <td>Address</td>
                      <td>Number Of Bike</td>
                      <td>Rating</td>
                      <td>Number Of Rating</td>
                      <td>Area</td>
                    </thead>
                    <tbody>
                      {listOwner.map((item) => (
                        <tr key={item.id}>
                          <td>{item.fullname}</td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            {item.address === null ? "Done have" : item.address}
                          </td>
                          <td>{item.numberOfBikes}</td>
                          <td>{item.rating}</td>
                          <td>{item.numberOfRatings}</td>
                          <td>Area name</td>
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

export default Owner;
