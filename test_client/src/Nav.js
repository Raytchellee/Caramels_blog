import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "./helpers";
import "./Nav.css";
import { toast } from "react-toastify";

const Nav = ({ history }) => (
  <div className="nav-container">
    <h1 className="title">Caramel's blog</h1>
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link className="link" to="/create">
            Create a Blog Post
          </Link>
        </li>

        {!getUser() && (
          <li className="nav-item ml-auto pr-3 pt-3 pb-3">
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
        )}

        {getUser() && (
          <li
            onClick={() =>
              logout(
                () => history.push("/"),
                toast.success("You have been logged out")
              )
            }
            className="nav-item ml-auto pr-3 pt-3 pb-3"
            style={{ cursor: "pointer" }}
          >
            Logout
          </li>
        )}
      </ul>
    </nav>
  </div>
);

export default withRouter(Nav);
