import React, { useState, useEffect } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
// import {Link } from 'react-router-dom';
import "./Search.css";

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    api
      .get("notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.log);
  }, []);
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
            {notifications?.map((notif) => (
              <div className="row border-bottom border-dark p-3">
                {/* <div className="col-lg-1 col-md-2 col-12">
                <img
                  className="search-res-img"
                  src="https://cdn.pixabay.com/photo/2020/05/08/20/44/kid-5147309_960_720.jpg"
                  alt="pic"
                />
              </div> */}
                <div className="col-lg-11 col-md-10 col-10">
                  <h4>{notif?.text}</h4>
                </div>
                <div className="col-lg-11 col-md-10 col-2">
                  <p>{new Date(notif?.createdAt).toDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
