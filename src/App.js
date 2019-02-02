import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    checked: false,
    messageOnSend: "",

    errors: {
      username: false,
      email: false,
      password: false,
      checked: false
    }
  };

  messagesOnError = {
    invalidUsername:
      "Your username must be longer than 10 characters and no include space",
    invalidEmail: "Your email must include @ sign",
    invalidPassword: "Your password must include 8 characters",
    invalidChecked: "Please confirm agreement"
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "email" || type === "password") {
      this.setState({
        [name]: value
      });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        checked
      });
    }
  };

  validateForm = () => {
    let usernameValid = false;
    let emailValid = false;
    let passwordValid = false;
    let checkedValid = false;
    let correctValid = false;
    const { username, email, password, checked } = this.state;
    if (username.length > 10 && username.indexOf(" ") === -1) {
      usernameValid = true;
    }
    if (email.indexOf("@") !== -1) {
      emailValid = true;
    }
    if (password.length === 8) {
      passwordValid = true;
    }
    if (checked) {
      checkedValid = true;
    }
    if (usernameValid && emailValid && passwordValid && checkedValid) {
      correctValid = true;
    }
    return {
      usernameValid,
      emailValid,
      passwordValid,
      checkedValid,
      correctValid
    };
  };

  handleSubmit = e => {
    e.preventDefault();

    const validation = this.validateForm();

    if (validation.correctValid) {
      this.setState({
        username: "",
        email: "",
        password: "",
        checked: false,
        messageOnSend: "Accept ! Form was send successful !",

        errors: {
          username: false,
          email: false,
          password: false,
          checked: false
        }
      });
    } else {
      this.setState({
        errors: {
          username: !validation.usernameValid,
          email: !validation.emailValid,
          password: !validation.passwordValid,
          checked: !validation.checkedValid
        }
      });
    }
  };

  componentDidUpdate() {
    if (this.state.messageOnSend !== "") {
      setTimeout(
        () =>
          this.setState({
            messageOnSend: ""
          }),
        3000
      );
    }
  }

  render() {
    const {
      username,
      email,
      password,
      checked,
      errors,
      messageOnSend
    } = this.state;
    const {
      invalidUsername,
      invalidEmail,
      invalidPassword,
      invalidChecked
    } = this.messagesOnError;
    return (
      <div>
        <h1 className="header">Form submit test App</h1>
        <form className="form" noValidate>
          <label className="form__label" htmlFor="username">
            Your username:
            <input
              className="form__input"
              id="username"
              type="text"
              name="username"
              onChange={this.handleChange}
              value={username}
            />
            {errors.username && (
              <span className="form__span">{invalidUsername}</span>
            )}
          </label>
          <label className="form__label" htmlFor="email">
            Your email:
            <input
              className="form__input"
              id="email"
              type="email"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
            {errors.email && <span className="form__span">{invalidEmail}</span>}
          </label>
          <label className="form__label" htmlFor="password">
            Your password:
            <input
              className="form__input"
              id="password"
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password}
            />
            {errors.password && (
              <span className="form__span">{invalidPassword}</span>
            )}
          </label>
          <label className="form__label" htmlFor="checkbox">
            Data processing agreement:
            <input
              className="form__input"
              id="checkbox"
              type="checkbox"
              name="checkbox"
              onChange={this.handleChange}
              checked={checked}
            />
            {errors.checked && (
              <span className="form__span">{invalidChecked}</span>
            )}
          </label>
          <button className="form__btn" onClick={this.handleSubmit}>
            Submit
          </button>
          {messageOnSend && <strong>{messageOnSend}</strong>}
        </form>
      </div>
    );
  }
}

export default App;
