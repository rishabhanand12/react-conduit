import React from "react";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null,
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify({user:this.state}))
    let reqUrl = "https://conduit.productionready.io/api/users";
    fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: this.state }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.user.token);
      })
      .catch(err=>console.log(err));
  };
  
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInput}
            type="text"
            name="username"
            placeholder="eg.RickJones"
            value={this.state.username}
          />
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
            name="password"
            placeholder="Password"
            value={this.state.password}
          />
          <input onSubmit={this.handleSubmit} type="submit" value="Signup" />
        </form>
      </>
    );
  }
}
