import Axios from "axios";
import React from "react";
import { useState } from "react";

export const CreateComment = ({ postId }) => {
  const [content, setContent] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await Axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };
  return (
    <div className="border border-black ">
      <h5>Add a comment</h5>
      <form className="form-group" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={content}
            placeholder="comment"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
