import React, { useEffect, useState } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";

// import {Link } from 'react-router-dom';
import "../projects/projects.css";

export const Deletenewfyp = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Menunav />
      <div className="row">
        <div className="col-md-2 col-0">
          <Sidebar />
        </div>
        <div className="col-md-10 col-12">
          <div className="conainer my-4">
            <h3>List of New Projects:</h3>
          </div>
          <div className="container-fluid">
            <table className="table">
              <thead>
                <th>SR.NO</th>
                <th>Title delete</th>
                <th>Project Type</th>
                <th>Description</th>
                <th>Date Posted</th>
                <th>View</th>
              </thead>
              <tbody>
                <tr>
                  <td>{1}</td>
                  <td> Title </td>
                  <td>Project Type</td>
                  <td>Description</td>
                  <td>Date</td>
                  <td>
                    <button className="fa fa-eye"></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
