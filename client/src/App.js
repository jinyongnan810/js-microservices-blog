import React from "react";
import CreatePost from "./CreatePost";
import { ListPosts } from "./ListPosts";

export default () => {
  return (
    <div className="container">
      <CreatePost />
      <hr />
      <ListPosts />
    </div>
  );
};
