import React, { Component } from "react";
import callApi from "../utils/apiCaller";
import { Link } from "react-router-dom";

const customerTableHead = [
  //   "",
  //   "name",
  //   "email",
  //   "phone",
  //   "total orders",
  //   "total spend",
  //   "location",

  "Postal Code",
  "Area name",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.postalCode}</td>
    <td>{item.name}</td>
  </tr>
);

class Areas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArea: [],
      apiURL: "",
    };
  }

  componentDidMount() {
    callApi("areas", "GET", null).then((res) => {
      this.setState({
        listArea: res.data,
      });
    });
  }

  render() {
    const { listArea } = this.state;

    console.log(listArea);
    return (
      <div>
        <h2 className='page-header'>Areas</h2>
        <Link to="/createArea">
          <button className="btn-create">Create Area</button>
        </Link>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <div className='table-wrapper'>
                  <table>
                    <thead>
                      <td>Postal Code</td>
                      <td>Name</td>
                    </thead>
                    <tbody>
                      {listArea.map((item) => (
                        <tr key={item.id}>
                          <td>{item.postalCode}</td>
                          <td>{item.name}</td>
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

export default Areas;
