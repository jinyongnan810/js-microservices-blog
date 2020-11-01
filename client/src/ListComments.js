import React from "react";

export const ListComments = ({ comments }) => {
  const renderedComments = comments.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ));
  return (
    <div>
      <h5>{comments.length} comments:</h5>
      <ul>{renderedComments}</ul>
    </div>
  );
};
