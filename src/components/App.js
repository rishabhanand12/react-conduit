import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import MainArticles from "./Mainarticles";
import Tags from "./Tags";
import Userprofile from "./Userprofile";
import Article from "./Article"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      activeTab: "",
      tagList: null,
      articleTag: null,
      articlesToRender: null,
      pageOffset: 0,
    };
  }

  componentDidMount() {
    let articlesUrl =
      "https://conduit.productionready.io/api/articles?limit=10&offset=0";
    fetch(articlesUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        this.setState(
          {
            articlesToRender: data.articles,
            dataFetched: true,
            activeTab: null,
          },
          () => {
            sessionStorage.setItem(
              "articlesToRender",
              this.state.articlesToRender
            );
          }
        );
      });
    let tagsUrl = "https://conduit.productionready.io/api/tags";
    fetch(tagsUrl)
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        this.setState(
          {
            tagList: data.tags,
          },
          () => {
            sessionStorage.setItem("tagList", this.state.tagList);
          }
        );
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
        <Header />
        <Hero />
        <Switch>
        <Route exact path="/">
            <div className="main-section container">
              <MainArticles
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
          <Route path = "/profile/:id">
            <Userprofile />
          </Route>
          <Route path = "/article/:id">
            <Article />
          </Route>
          
        </Switch>
      </>
    );
  }
}
