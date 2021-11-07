import React, { Component } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import callApi from "../../utils/apiCaller";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = async (e) => {
    const { username, password } = this.state;
    try {
      e.preventDefault();
      callApi("admins", "POST", {
        username: username,
        password: password,
      }).then((res) => {
        if (res) {
          localStorage.setItem("token", res.data);
          window.location.reload();
        } else {
          this.setState({
            errorMessage: "Login Error !!!",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // async onDelete(e) {
  //   // POST request using fetch with async/await
  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(id),
  //   };
  //   const response = await fetch(
  //     "http://52.74.12.123/api/v2/vouchers",
  //     requestOptions
  //   );
  //   const res = await response.json();

  //   if (res === true) {
  //     window.location.reload();
  //   }
  // }

  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <div>
        <h2
          className='page-header'
          style={{ textAlign: `center`, marginTop: `100px` }}
        >
          Login
        </h2>
        {errorMessage && (
          <h4 style={{ textAlign: `center`, marginTop: `50px`, color: `red` }}>
            {errorMessage}
          </h4>
        )}
        <form
          className='col-6'
          style={{ margin: `auto` }}
          onSubmit={this.onSubmit}
        >
          <div className='form-group'>
            <label style={{ width: `150px` }}>Username</label>
            <div className='Input'>
              <input
                placeholder='username'
                name='username'
                type='text'
                value={username}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label style={{ width: `150px` }}>Password</label>
            <div className='Input'>
              <input
                placeholder='password'
                name='password'
                type='password'
                value={password}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='buttonContainer' style={{ justifyContent: `center` }}>
            <div className='SaveContainer'>
              <div className='buttonSave'>
                <div>Register</div>
              </div>
              <div className='buttonSave'>
                <div onClick={this.onSubmit}>Login</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
