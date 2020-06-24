import React from "react";
import { withRouter } from "react-router-dom";
import MainArticles from "./Mainarticles";

class Userprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userArticles: null,
      favoriteArticles: null,
    };
  }
  componentDidMount() {
    var user = this.props.match.params.id;
    fetch(
      `https://conduit.productionready.io/api/articles?author=${user}&limit=5&offset=0`
    )
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({
          userArticles: data.articles,
        });
      });
    fetch(
      `https://conduit.productionready.io/api/articles?favorited=${user}&limit=5&offset=0`
    )
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          favoriteArticles: data.articles,
        });
      });
  }
  render() {
    return (
      <>
        <MainArticles articles={this.state.userArticles} />
      </>
    );
  }
}

export default withRouter(Userprofile);
