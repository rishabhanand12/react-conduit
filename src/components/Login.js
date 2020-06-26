import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventdefault();
  };

  render() {
    return (
      <>
        <form>
          <input
            onChange={this.handleInput}
            type="email"
            name="email"
            placeholder="eg.RickJones@gmail.com"
            value={this.state.email}
          />
          <input
            onChange={this.handleInput}
            type="password"
            name="passsword"
            placeholder="Password"
            value={this.state.password}
          />
          <input onSubmit={this.handleSubmit} type="submit" value="Login" />
        </form>
      </>
    );
  }
}
