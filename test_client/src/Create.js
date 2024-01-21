import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import ReactQuill from "react-quill";
import { getUser, getToken } from "./helpers";
import "react-quill/dist/quill.snow.css";
import "./Create.css";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};
const Create = () => {
  // state
  const [state, setState] = useState({
    title: "",
    user: getUser(),
  });
  const [content, setContent] = useState("");
  const history = useHistory();

  // rich text editor handle change
  const handleContent = (event) => {
    console.log(event);
    setContent(event);
  };

  // destructure values from state
  const { title, user } = state;

  // onchange event handler
  const handleChange = (name) => (event) => {
    // console.log('name', name, 'event', event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.table({ title, content, user });
    axios
      .post(
        `${process.env.REACT_APP_API}/post`,
        { title, content, user },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        // empty state
        setState({ ...state, title: "", user: "" });
        setContent("");
        // show success alert
        // alert(`${response.data.title} blog post is created`);
        toast.success(`${response.data.title} blog post is created`);
        history.push('/');
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>CREATE POST</h1>
      <br />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            onChange={handleChange("title")}
            value={title}
            type="text"
            className="form-control"
            placeholder="Post title"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Content</label>
          <ReactQuill
            modules={modules}
            onChange={handleContent}
            value={content}
            theme="snow"
            className=""
            placeholder="Write something.."
            style={{ border: "1px solid #D6A0E3" }}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">User</label>
          <input
            onChange={handleChange("user")}
            value={user}
            type="text"
            className="form-control"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <button className="btn btn-sm btn-outline-warning">Create</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
