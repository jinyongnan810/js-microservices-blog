import Axios from "axios";
import React from "react";
import { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("http://posts.com/posts/create", { title });
    setTitle("");
  };
  return (
    <div>
      <h1>Create Post</h1>
      <form className="form-group" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
