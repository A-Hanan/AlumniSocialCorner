import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import "./Search.css";
import firebase from "firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const SearchResult = () => {
  return (
    <>
      <div className="container">
        <div className="row border-bottom border-dark p-3">
          <div className="col-lg-1 col-md-2 col-12">
            <img
              className="search-res-img"
              src="https://cdn.pixabay.com/photo/2020/05/08/20/44/kid-5147309_960_720.jpg"
              alt="pic"
            />
          </div>
          <div className="col-lg-11 col-md-10 col-12">
            <h5>James posted a new Hostel</h5>
          </div>
        </div>
        <div className="row border-bottom border-dark p-3">
          <div className="col-lg-1 col-md-2 col-12">
            <img
              className="search-res-img"
              src="https://cdn.pixabay.com/photo/2020/05/08/20/44/kid-5147309_960_720.jpg"
              alt="pic"
            />
          </div>
          <div className="col-lg-11 col-md-10 col-12">
            <h5>James posted a new Hostel</h5>
          </div>
        </div>{" "}
        <div className="row border-bottom border-dark p-3">
          <div className="col-lg-1 col-md-2 col-12">
            <img
              className="search-res-img"
              src="https://cdn.pixabay.com/photo/2020/05/08/20/44/kid-5147309_960_720.jpg"
              alt="pic"
            />
          </div>
          <div className="col-lg-11 col-md-10 col-12">
            <h5>James posted a new Hostel</h5>
          </div>
        </div>{" "}
        <div className="row border-bottom border-dark p-3">
          <div className="col-lg-1 col-md-2 col-12">
            <img
              className="search-res-img"
              src="https://cdn.pixabay.com/photo/2020/05/08/20/44/kid-5147309_960_720.jpg"
              alt="pic"
            />
          </div>
          <div className="col-lg-11 col-md-10 col-12">
            <h5>James posted a new Hostel</h5>
          </div>
        </div>
      </div>
    </>
  );
};
