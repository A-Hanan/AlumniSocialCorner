import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { useDispatch, useSelector } from "react-redux";
// import {Link } from 'react-router-dom';
import "../projects/projects.css";
import { Userscholarship } from "./userscholarships";

export const PostScholarships = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    let temp = Object.assign(data, { [e.target.name]: e.target.value });
    setData(temp);
    console.log("updated data>> ", temp);
  };
  const submitData = (e) => {
    e.preventDefault();
    let errs = {};
    if (!data.title) {
      errs.title = "required";
    }
    if (!data.deadline) {
      errs.deadline = "required";
    }
    if (!data.scholarshipFor) {
      errs.scholarshipFor = "required";
    }
    if (!data.url) {
      errs.url = "required";
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0 && errs.constructor === Object) {
      let body = Object.assign(data, { userId: currentUser?.id });
      console.log("submitting data", body);
      api
        .post("/scholarships", body)
        .then((res) => {
          console.log(res.data);
          let notifBody = {
            userId: currentUser?.id,
            text: `${currentUser?.name} post new scholarship.`,
          };
          api
            .post("/notifications", notifBody)
            .then((re) => console.log("notif", re.data));
          window.location.href = "/scholarship";
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <Header />
      <Menunav />
      <div className="row">
        <div className="col-md-2 col-0">
          <Sidebar />
        </div>
        <div className="col-md-10 col-12">
          <div className="container p-4">
            <h3>Post a Scholarship</h3>
            <div className="form">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Title*"
                    name="title"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.title && (
                    <p className="error__para">{errors.title}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Country"
                    name="country"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.country && (
                    <p className="error__para">{errors.country}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Duration"
                    name="duration"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.duration && (
                    <p className="error__para">{errors.duration}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Amount"
                    name="amount"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.amount && (
                    <p className="error__para">{errors.amount}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Apply Deadline*"
                    type="date"
                    name="deadline"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.deadline && (
                    <p className="error__para">{errors.deadline}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Scholarship For*"
                    name="scholarshipFor"
                    onChange={(e) => onChange(e)}
                  />
                  {errors.scholarshipFor && (
                    <p className="error__para">{errors.scholarshipFor}</p>
                  )}
                </div>
              </div>
              <input
                className="text-feild"
                id="url_of_projects"
                placeholder="Url*"
                name="url"
                required
                onChange={(e) => onChange(e)}
              />
              {errors.url && <p className="error__para">{errors.url}</p>}
              <textarea
                className="text-feild"
                id="description_of_projects"
                placeholder="Description"
                name="description"
                required
                onChange={(e) => onChange(e)}
              />
              {errors.description && (
                <p className="error__para">{errors.description}</p>
              )}
              <button
                className="btn mt-3"
                id="submitbutton_of_projects"
                onClick={(e) => submitData(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
