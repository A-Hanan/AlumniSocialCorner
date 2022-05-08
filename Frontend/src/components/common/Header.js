import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <div className="row">
              {/* <div className="col-3">
                          {/* Resize logo width and height from App.css 
                          <img src="https://www.tailorbrands.com/wp-content/uploads/2020/07/twitter-logo.jpg" className="logo-home" alt="logo"/>
                        </div> */}
              <div className="col-6">Alumni Social Corner</div>
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                    </li> */}
            </ul>
            <div>
              <button
                className="btn btn-danger"
                role={"button"}
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
