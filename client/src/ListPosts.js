import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CreateComment } from "./CreateComment";
import { ListComments } from "./ListComments";

export const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const res = await Axios.get("http://posts.com/posts");
    setPosts(res.data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const rendered = posts.map((post) => (
    <div className="card col-3 m-1" key={post.id}>
      <div className="card-body">
        <h3>{post.title}</h3>
        <ListComments comments={post.comments} />
        <hr />
        <CreateComment postId={post.id} />
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-wrap justify-content-around">{rendered}</div>
  );
};
