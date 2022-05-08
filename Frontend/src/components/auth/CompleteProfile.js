import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alumnisocialcorner from "../images/Yellow Line Art People Logo (1).png";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { submitCompleteProfile } from "../../Actions/userActions";
import { Link } from "react-router-dom";

export const CompleteProfile = () => {
  const dispatch = useDispatch();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  useEffect(() => {
    console.log("current user>>>", currentUser);
  }, [currentUser]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    status: "",
    gender: "",
    university: "",
    phone: "",
    address: "",
  });
  const onChange = (e) => {
    const updatedData = Object.assign(data, {
      [e.target.name]: e.target.value,
    });
    setData(updatedData);
    document.getElementById(e.target.name).value = e.target.value;
  };

  const submitData = () => {
    let errs = {};

    if (!data.phone) {
      errs.phone = "phone is required";
    }
    if (!data.address) {
      errs.address = "address is required";
    }
    if (!data.university) {
      errs.university = "university name is required";
    } else if (!onlyLettersAndSpaces(data.university)) {
      errs.university = "enter appropriate university name";
    }
    if (!data.gender) {
      errs.gender = "gender is required";
    } else if (
      data.gender.toLocaleLowerCase() != "male" &&
      data.gender.toLocaleLowerCase() != "female" &&
      data.gender
    ) {
      errs.gender = "Enter appropriate gender e.g. Male or Female";
    }
    if (
      data.status.toLocaleLowerCase() != "student" &&
      data.status.toLocaleLowerCase() != "alumni" &&
      data.status
    ) {
      errs.status = "Enter appropriate status e.g. Status or Alumni";
    }
    if (!onlyLettersAndSpaces(data.university) && data.university) {
      errs.university = "enter appropriate university name";
    }
    setErrors(errs);
    console.log("errors>>>", errs);
    console.log("data>>", data);
    if (Object.keys(errs).length === 0 && errs.constructor === Object) {
      console.log("signup errors while dispatching,", errors);

      let userData;

      userData = {
        userId: currentUser.id,
        status: data.status.toLocaleLowerCase(),
        gender: data.gender.toLocaleLowerCase(),
        univeristy: data.university,
        phone: data.phone,
        address: data.address,
      };

      dispatch(submitCompleteProfile(userData, navigate));
    }
  };

  return (
    <>
      <div className="container-fluid p-0 row">
        <div className="sidebar-login col-lg-3 d-lg-inline d-none"></div>
        <div className="col-lg-9 col-md-10 col-12">
          <div className="col-2 m-auto">
            <img src={alumnisocialcorner} alt="logo" />
          </div>
          <div className="login-title col-12 mt-2">
            <h3 className="text-center">Almost Complete!</h3>
          </div>
          <div>
            <div className="container form">
              <div className="row">
                <div className="col-lg-6 col-md-12 ">
                  <input
                    placeholder="Status [Student or Alumni]"
                    id="status"
                    name="status"
                    className="my-3 w-full bg-gray-100 bg-opacity-50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.status && (
                    <h6 className="signup__error__message">{errors.status}</h6>
                  )}
                </div>
                <div className="col-lg-6 col-md-12 ">
                  <input
                    placeholder="Gender (Male/Female) *"
                    id="gender"
                    name="gender"
                    className="my-3 w-full bg-gray-100 bg-opacity-50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.gender && (
                    <h6 className="signup__error__message">{errors.gender}</h6>
                  )}
                </div>

                <div className="col-lg-6 col-md-12">
                  <input
                    type="text"
                    placeholder="Univeristy/Company*"
                    id="university"
                    name="university"
                    className="my-3 w-full bg-gray-100 bg-opacity-50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.university && (
                    <h6 className="signup__error__message">
                      {errors.university}
                    </h6>
                  )}
                </div>
                <div className="col-lg-6 col-md-12">
                  <input
                    type="text"
                    placeholder="Phone Number*"
                    id="phone"
                    name="phone"
                    className="my-3 w-full bg-gray-100 bg-opacity-50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => onChange(e)}
                  />

                  {errors.phone && (
                    <h6 className="signup__error__message">{errors.phone}</h6>
                  )}
                </div>
                <div className="col-lg-6 col-md-12">
                  <input
                    type="text"
                    placeholder="address *"
                    id="address"
                    name="address"
                    className="my-3 w-full bg-gray-100 bg-opacity-50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.address && (
                    <h6 className="signup__error__message">{errors.address}</h6>
                  )}
                </div>
                <div className="mt-3">
                  <button className="btn" onClick={() => submitData()}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
var validator = require("email-validator");
const validateEmail = (email) => {
  console.log("validating email>>>> ", email);
  let test;
  let length = email.length;
  let demail = email.slice(length - 4, length);
  console.log("demail>>>", demail);
  if (demail !== ".com") {
    return false;
  }
  let count = 0;
  let email2 = email.slice(0, length - 4);
  if (email2.includes(".com")) {
    return false;
  }
  if (
    !email.includes("@gmail.com") &&
    !email.includes("@yahoo.com") &&
    !email.includes("@hotmail.com") &&
    !email.includes("@outlook.com")
  ) {
    return false;
  }
  if (!validator.validate(email)) {
    return false;
  }
  return true;
};
function onlyLettersAndSpaces(str) {
  return /^[A-Za-z\s]*$/.test(str);
}
