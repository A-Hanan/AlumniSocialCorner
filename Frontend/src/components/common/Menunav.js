import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Menunav = (props) => {
  const location = useLocation();
  const getColor = (curr) => {
    if (location.pathname.match(curr)) {
      return "#f11946";
    }
  };

  return (
    <div className="container-fluid p-0" style={{ overflow: "hidden" }}>
      <div className="row border-bottom border-dark menu-nav p-2 shadow">
        <div className="col-2 toggle-side">
          <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <span className="fa fa-bars"></span>
          </button>
        </div>
        <div className="col-2 m-auto">
          <Link to="/newsfeed">
            <span className="fa fa-home"></span>
          </Link>
        </div>
        <div className="col-2 m-auto">
          <Link to="/search">
            <span className="fa fa-search"></span>
          </Link>
        </div>
        <div className="col-2 m-auto">
          <Link to="/notification">
            <span className="fa fa-bell"></span>
          </Link>
        </div>
        <div className="col-2 m-auto">
          <Link to="/settings">
            <span className="fa fa-gear"></span>
          </Link>
        </div>
        <div className="col-2 m-auto">
          <Link to="/profile">
            <span className="fa fa-user-o"></span>
          </Link>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body sidebar-responsive">
          <div>
            <div className="row">
              <div className="col-md-10 col-12 m-auto mt-3">
                <Link to="/askquestion" className="btn text-white">
                  Ask a Question
                </Link>
              </div>
              <div className="mt-4 col-12">
                <p className="text-center">
                  <Link to="/newsfeed" style={{ color: getColor("/newsfeed") }}>
                    News Feed
                  </Link>
                </p>
              </div>
              <div className="col-12">
                <p className="text-center">
                  <Link to="/fyp" style={{ color: getColor("/fyp") }}>
                    FYPs
                  </Link>
                </p>
              </div>
              <div className="col-12">
                <p className="text-center">
                  <Link to="/hostels" style={{ color: getColor("/hostels") }}>
                    Hostels
                  </Link>
                </p>
              </div>
              <div className="col-12">
                <p className="text-center">
                  <Link to="/projects" style={{ color: getColor("/projects") }}>
                    Projects
                  </Link>
                </p>
              </div>
              <div className="col-12">
                <p className="text-center">
                  <Link
                    to="/scholarship"
                    style={{ color: getColor("/scholarship") }}
                  >
                    Scholarship
                  </Link>
                </p>
              </div>
              <div className="col-12">
                <p className="text-center">
                  <Link
                    to="/internship"
                    style={{ color: getColor("/internship") }}
                  >
                    Internships
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
