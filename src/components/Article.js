import React from "react";
import { withRouter } from "react-router-dom";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: null,
      commentData: null,
    };
  }

  componentDidMount() {
    console.log(this.props);
    let articleSlug = this.props.match.params.id;
    let articleUrl = `https://conduit.productionready.io/api/articles/${articleSlug}`;
    fetch(articleUrl)
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({
          articleData: data.article,
        });
      });
    let commentUrl = `https://conduit.productionready.io/api/articles/${articleSlug}/comments`;
    fetch(commentUrl)
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          commentData: data,
        });
      });
  }

  render() {
    var article = this.state.articleData;
    if (!article) {
      return null;
    }
    return (
      <>
        <section className="article">
          <article className="article-box">
            <h2>{article.title}</h2>
            <img src={article.author.image} alt="" />
            <h3>{article.author.username}</h3>
            <h4>{new Date(article.createdAt).toDateString()}</h4>
            <p>{article.description}</p>
          </article>
        </section>
      </>
    );
  }
}

export default withRouter(Article);
