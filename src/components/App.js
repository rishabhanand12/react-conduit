import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import MainArticles from "./Mainarticles";
import Tags from "./Tags";
import Userprofile from "./Userprofile";
import Article from "./Article";
import Login from "./Login";
import Signup from "./Signup";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      activeTab: "",
      tagList: null,
      articlesToRender: null,
      pageOffset: 0,
      isLoggedIn: false,
      loggedInUser: null,
      userArticles: null,
    };
  }

  componentDidMount() {
    var authToken = localStorage.getItem("token");
    if (authToken) {
      this.setState({
        isLoggedIn: true,
      });
      fetch("https://conduit.productionready.io/api/user", {
        headers: {
          authorization: `Token ${authToken}`,
        },
      })
        .then((Response) => Response.json())
        .then((data) => {
          this.setState({
            loggedInUser: data.user,
          });
        })
        .catch((err) => console.err(err));
    }

    let articlesUrl =
      "https://conduit.productionready.io/api/articles?limit=10&offset=0";
    fetch(articlesUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          articlesToRender: data.articles,
          dataFetched: true,
          activeTab: null,
        });
      });

    let tagsUrl = "https://conduit.productionready.io/api/tags";
    fetch(tagsUrl)
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          tagList: data.tags,
        });
      });
  }

  handleTagChange = (tag) => {
    fetch(
      `https://conduit.productionready.io/api/articles?tag=${tag}&limit=10&offset=0`
    )
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          activeTab: tag,
          articlesToRender: data.articles,
        });
      })
      .catch((err) => console.error(err));
  };

  handleGlobalClicked = () => {
    let articlesUrl =
      "https://conduit.productionready.io/api/articles?limit=10&offset=0";
    fetch(articlesUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          articlesToRender: data.articles,
          activeTab: null,
        });
      });
  };
  render() {
    if (!this.state.dataFetched) {
      return (
        <>
          <div className="page-loading">
            <img src="../images/page-loading.gif" alt=""></img>
          </div>
        </>
      );
    }
    return (
      <>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          loggedInUser={this.state.loggedInUser}
        />
        <Hero />
        <Switch>
          <Route exact path="/">
            <div className="main-section container">
              <MainArticles
                defaultTab="Global feed"
                clicked={() => this.handleGlobalClicked()}
                active={this.state.activeTab}
                articles={this.state.articlesToRender}
              />
              <Tags
                tagList={this.state.tagList}
                clicked={(tag) => this.handleTagChange(tag)}
              />
            </div>
          </Route>
          <Route path="/profile/:id">
            <div className="container">
              <Userprofile />
            </div>
          </Route>
          <Route path="/article/:id">
            <div className="container">
              <Article />
            </div>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </>
    );
  }
}
