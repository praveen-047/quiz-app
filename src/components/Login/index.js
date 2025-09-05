import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class Login extends Component {
  state = {
    userName: "",
    password: "",
    showPassword: false,
    showErrorMsg: false,
    errorMsg: "",
  };

  onClickShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  onChangeUsername = (event) => {
    this.setState({ userName: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  loginSuccess = (jwt_token) => {
    Cookies.set("jwt_token", jwt_token, { expires: 30 });
    const { history } = this.props;
    history.replace("/");
  };

  loginFailure = (errorMsg) => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { userName, password } = this.state;
    const userData = {
      username: userName,
      password,
    };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      this.loginSuccess(data.jwt_token);
    } else {
      console.log(data);
      this.loginFailure(data.error_msg);
    }
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    const { showPassword, showErrorMsg, errorMsg } = this.state
    const passwordInputType = showPassword ? "text" : "password";
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <div className="login-logo-container">
            <img
              src="https://res.cloudinary.com/dcmfpzh01/image/upload/v1753874751/Frame_8004_pvbvvb.png"
              alt="login website logo"
              className="login-logo"
            />
          </div>
          <div className="login-form-container">
            <form className="login-form" onSubmit={this.submitForm}>
              <label htmlFor="username" className="login-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="login-input"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />

              <label htmlFor="password" className="login-label">
                PASSWORD
              </label>
              <input
                type={passwordInputType}
                id="password"
                className="login-input"
                placeholder="Password"
                onChange={this.onChangePassword}
              />

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={this.onClickShowPassword}
                  className="checkbox-input"
                />
                <label htmlFor="show-password" className="checkbox-label">
                  Show Password
                </label>
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
