import React, { useState } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

import "../projects/projects.css";

export const Addalready = () => {
  let navigate = useNavigate();
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
    if (!data.projectType) {
      errs.projectType = "required";
    }
    if (!data.projectLink) {
      errs.projectLink = "required";
    }
    if (!data.description) {
      errs.description = "required";
    }
    if (!data.completionDate) {
      errs.completionDate = "required";
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0 && errs.constructor === Object) {
      let body = Object.assign(data, {
        userId: currentUser?.id,
        isAlreadyCreated: true,
      });
      console.log("submitting data", body);
      api
        .post("/FYPs", body)
        .then((res) => {
          console.log(res.data);
          let notifBody = {
            userId: currentUser?.id,
            text: `${currentUser?.name} added an already created FYP.`,
          };
          api
            .post("/notifications", notifBody)
            .then((re) => console.log("notif", re.data));
          window.location.href = "/fyp/seealready";
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
          <div className="container">
            <h3 className="my-4">Add Already Created Idea:</h3>
            <div className="form">
              <div className="col-lg-8 col-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <input
                      className="p-2 border border-dark rounded my-2 w-full text-feild"
                      name="title"
                      placeholder="title"
                      type={"text"}
                      id="title"
                      required
                      onChange={(e) => onChange(e)}
                    ></input>
                    {errors.title && (
                      <p className="error__para">{errors.title}</p>
                    )}
                  </div>
                  <div className="col-lg-6 col-12">
                    <input
                      className="p-2 border border-dark rounded my-2 w-full text-feild"
                      name="projectType"
                      placeholder="Project Type*"
                      type="text"
                      id="projectType"
                      required
                      onChange={(e) => onChange(e)}
                    ></input>
                    {errors.projectType && (
                      <p className="error__para">{errors.projectType}</p>
                    )}
                  </div>
                </div>
                <textarea
                  className="p-2 border border-dark rounded my-2 w-full text-area"
                  name="description"
                  placeholder="Description"
                  type={"text"}
                  id="description"
                  required
                  onChange={(e) => onChange(e)}
                ></textarea>
                {errors.description && (
                  <p className="error__para">{errors.description}</p>
                )}
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <input
                      className="p-2 border border-dark rounded my-2 w-full text-feild"
                      name="completionDate"
                      placeholder="Date of Completion*"
                      type={"date"}
                      id="completiondate"
                      required
                      onChange={(e) => onChange(e)}
                    ></input>
                    {errors.completionDate && (
                      <p className="error__para">{errors.completionDate}</p>
                    )}
                  </div>
                  <div className="col-lg-6 col-12">
                    <input
                      className="p-2 border border-dark rounded my-2 w-full text-feild"
                      name="projectLink"
                      placeholder="Project Link"
                      type={"text"}
                      id="projectlink"
                      required
                      onChange={(e) => onChange(e)}
                    ></input>
                    {errors.projectLink && (
                      <p className="error__para">{errors.projectLink}</p>
                    )}
                  </div>
                </div>
                <button className="btn mt-3" onClick={(e) => submitData(e)}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
