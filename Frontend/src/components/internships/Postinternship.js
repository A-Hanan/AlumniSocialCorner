import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
// import {Link } from 'react-router-dom';
import "../projects/projects.css";

export const Postinternship = () => {
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
    console.log("submitting", data);
    e.preventDefault();
    let errs = {};
    if (!data.companyName) {
      errs.companyName = "required";
    }
    if (!data.location) {
      errs.location = "required";
    }
    console.log("errs", errs);
    setErrors(errs);
    if (Object.keys(errs).length === 0 && errs.constructor === Object) {
      let body = Object.assign(data, { userId: currentUser?.id });
      console.log("submitting data", body);
      api
        .post("/internships", body)
        .then((res) => {
          console.log(res.data);
          let notifBody = {
            userId: currentUser?.id,
            text: `${currentUser?.name} post new internship.`,
          };
          api
            .post("/notifications", notifBody)
            .then((re) => console.log("notif", re.data));
          window.location.href = "/internship";
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
            <h3>Post an Internship</h3>
            <form autoComplete="off">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Company Name*"
                    name="companyName"
                    onChange={(e) => onChange(e)}
                  />
                  {errors.companyName && (
                    <p className="error__para">{errors.companyName}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Location*"
                    name="location"
                    onChange={(e) => onChange(e)}
                  />
                  {errors.location && (
                    <p className="error__para">{errors.location}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Duration"
                    name="duration"
                    onChange={(e) => onChange(e)}
                  />
                  {errors.duration && (
                    <p className="error__para">{errors.duration}</p>
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    placeholder="Paid/Stipend"
                    name="pay"
                    onChange={(e) => onChange(e)}
                  />
                  {errors.pay && <p className="error__para">{errors.pay}</p>}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <input
                    className="text-feild"
                    id="url_of_projects"
                    placeholder="Url"
                    name="url"
                    onChange={(e) => onChange(e)}
                  />
                  {errors.url && <p className="error__para">{errors.url}</p>}
                </div>
              </div>
              <textarea
                className="text-feild"
                id="description_of_projects"
                placeholder="Description"
                name="description"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
