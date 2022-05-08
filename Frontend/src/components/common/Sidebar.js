import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const getColor = (curr) => {
    if (location.pathname.match(curr)) {
      return "#f11946";
    }
  };

  return (
    <div className="sidebar" style={{ overflow: "hidden" }}>
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
            <Link to="/scholarship" style={{ color: getColor("/scholarship") }}>
              Scholarship
            </Link>
          </p>
        </div>
        <div className="col-12">
          <p className="text-center">
            <Link to="/internship" style={{ color: getColor("/internship") }}>
              Internships
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
