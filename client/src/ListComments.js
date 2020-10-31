import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const ListComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const getComments = async () => {
    const res = await Axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };
  useEffect(() => {
    getComments();
    console.log(comments);
    // eslint-disable-next-line
  }, []);
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
