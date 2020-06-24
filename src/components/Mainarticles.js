import React from "react";
import { Link } from "react-router-dom";

export default function MainArticles(props) {
  var article = props.articles;
  if (!article) {
    return null;
  }
  var tagtab = props.active;
  return (
    <>
      <section className="main-articles">
        <div className="articles">
          <span onClick={() => props.clicked()}>Global Feed</span>
          <span>{tagtab}</span>
          {props.articles.map((elem) => {
            return (
              <>
                <li className="article-list">
                  <div>
                    <div>
                      <img
                        className="article-avatar"
                        src={elem.author.image}
                        alt=""
                      ></img>
                      <Link to={`/profile/${elem.author.username}`}>
                        <h4>{elem.author.username}</h4>
                      </Link>
                      <time>{new Date(elem.createdAt).toDateString()}</time>
                    </div>
                    <span>{elem.favoritesCount}</span>
                  </div>
                  <Link to={`/article/${elem.slug}`}>
                    <div id={elem.slug}>
                      <p>{elem.title}</p>
                      <p>{elem.description}</p>
                    </div>
                    <button>Read More</button>
                  </Link>
                </li>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}
