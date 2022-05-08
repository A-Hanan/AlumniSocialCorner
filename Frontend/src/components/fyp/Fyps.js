import React from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../projects/projects.css";

export const Fyps = () => {
  return (
    <div>
      <Header />
      <Menunav />
      <div className="row">
        <div className="col-md-2 col-0">
          <Sidebar />
        </div>
        <div className="col-md-10 col-12">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 container-col col-md-6 col-12">
                <Link to="/fyp/addnew">
                  <div className="icon">
                    <span className="icons-fyps fa fa-plus-circle"></span>
                  </div>
                  <div className="title-fyps">
                    <h5>Add New</h5>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6 container-col col-md-6 col-12">
                <Link to="/fyp/addalready">
                  <div className="icon">
                    <span className="icons-fyps fa fa-check"></span>
                  </div>
                  <div className="title-fyps">
                    <h5>Add Already Created</h5>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6 container-col col-md-6 col-12">
                <Link to="/fyp/seealready">
                  <div className="icon">
                    <span className="icons-fyps fa fa-eye"></span>
                  </div>
                  <div className="title-fyps">
                    <h5>See Already Created</h5>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6 container-col col-md-6 col-12">
                <Link to="/fyp/listnew">
                  <div className="icon">
                    <span className="icons-fyps fa fa-list"></span>
                  </div>
                  <div className="title-fyps">
                    <h5>See List of New Projects</h5>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row mt-4">
              <h5 className="text-center">
                How to select FYPs in COMSATS?{" "}
                <a
                  id="click-to-see"
                  href="https://lahore.comsats.edu.pk/cs/fyp/"
                  target="_blank"
                >
                  Click now to see
                </a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
