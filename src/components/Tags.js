import React from "react";

export default function Tags(props) {
  var tags = props.tagList;
  if (!tags) {
    return null;
  }
  return (
    <>
      <aside className="tags-div">
        <h3>Popular Tags</h3>
        <div className="tags">
          {tags.map((elem) => {
            return <span onClick = {() => props.clicked(elem)}>{elem}</span>;
          })}
        </div>
      </aside>
    </>
  );
}
