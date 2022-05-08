import React, { useState } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

export const Addnewidea = () => {
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
    setErrors(errs);
    if (Object.keys(errs).length === 0 && errs.constructor === Object) {
      let body = Object.assign(data, {
        userId: currentUser?.id,
        isAlreadyCreated: false,
      });
      console.log("submitting data", body);
      api
        .post("/FYPs", body)
        .then((res) => {
          console.log(res.data);
          let notifBody = {
            userId: currentUser?.id,
            text: `${currentUser?.name} added new FYP.`,
          };
          api
            .post("/notifications", notifBody)
            .then((re) => console.log("notif", re.data));
          window.location.href = "/fyp/listnew";
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
            <h3 className="my-4">Add New Idea</h3>
            <div className="form">
              <div className="col-lg-8 col-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <input
                      className="p-2 border border-dark rounded my-2 w-full text-feild"
                      name="title"
                      placeholder="Title"
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
                      placeholder="Project Type"
                      id="projectType"
                      required
                      onChange={(e) => onChange(e)}
                    ></input>
                    {errors.projectType && (
                      <p className="error__para">{errors.projectType}</p>
                    )}
                  </div>
                </div>

                <input
                  className="p-2 border border-dark rounded my-2 w-full text-area"
                  name="projectLink"
                  placeholder="Project Link"
                  id="projectlink"
                  required
                  onChange={(e) => onChange(e)}
                ></input>
                {errors.projectLink && (
                  <p className="error__para">{errors.projectLink}</p>
                )}

                <textarea
                  className="p-2 border border-dark rounded my-2 w-full text-area"
                  name="description"
                  placeholder="Description"
                  id="description"
                  required
                  onChange={(e) => onChange(e)}
                ></textarea>
                {errors.description && (
                  <p className="error__para">{errors.description}</p>
                )}

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
