import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import renderHTML from "react-render-html";
import { toast } from 'react-toastify';
import "./SinglePost.css";

const SinglePost = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => setPost(response.data))
      .catch((error) => toast.error("An error occured"));
  }, []);

  const showSinglePost = () => (
    <div className="row single">
      <div className="col-md-8 offset-md-2 pt-3 pb-2">
        <h1 className="post-title">{post.title}</h1>
        <div className="lead pt-3">{renderHTML(post.content)}</div>
        <p>
          Author <span className="badge">{post.user}</span> Published on{" "}
          <span className="badge">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="container pb-5">
      <Nav />
      {post && showSinglePost()}
    </div>
  );
};

export default SinglePost;
