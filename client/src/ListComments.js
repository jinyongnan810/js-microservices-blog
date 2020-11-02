import React from "react";

export const ListComments = ({ comments }) => {
  comments = Object.values(comments);
  const renderedComments = comments.map((comment) => {
    switch (comment.status) {
      case "approved":
        return <li key={comment.id}>{comment.content}</li>;
      case "denied":
        return <li key={comment.id}>The commment is not approved.</li>;
      case "pending":
        return <li key={comment.id}>The commment is being reviewed.</li>;
      default:
        return <li key={comment.id}>The commment is not approved.</li>;
    }
  });
  return (
    <div>
      <h5>{comments.length} comments:</h5>
      <ul>{renderedComments}</ul>
    </div>
  );
};
