import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import alumnisocialcorner from "../images/Yellow Line Art People Logo (1).png";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  loginUserByGoogle,
  loginUserByFacebook,
} from "../../Actions/userActions";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFbLoginClicked, setIsFbLoginClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const updatedData = Object.assign(data, {
      [e.target.name]: e.target.value,
    });
    setData(updatedData);
    document.getElementById(e.target.name).value = e.target.value;
  };
  const login = () => {
    let errs = {};

    if (!data.password) {
      errs.password = "Password is required";
    } else if (data.password.length < 5) {
      errs.password = "Password needs to be 6 characters or more";
    }
    if (!data.email) {
      errs.email = "Email is required";
    } else if (!validateEmail(data.email)) {
      errs.email = "Please enter a valid email";
    }
    setErrors(errs);
    console.log("errors>>>", errs);
    console.log("data>>", data);
    if (Object.keys(errs).length === 0 && errs.constructor === Object) {
      console.log("signup errors while dispatching,", errors);

      let user;

      user = {
        email: data.email,
        password: data.password,
      };

      dispatch(loginUser(user, navigate));
    }
  };
  const googleSuccess = async (res) => {
    console.log("res from google> ", res);
    dispatch(loginUserByGoogle(res));
  };

  const googleError = (err) => {
    console.log("err> ", err);
    swalWithBootstrapButtons.fire(
      "Google Sign In unsuccessful!",
      "Try again later",
      "error"
    );
    console.log("Google Sign In was unsuccessful. Try again later");
  };
  const responseFacebook = (res) => {
    console.log("response from facebook>", res);
    if (res.id && isFbLoginClicked) {
      dispatch(loginUserByFacebook(res));

      setIsFbLoginClicked(false);
    } else {
      console.log("err");
      swalWithBootstrapButtons.fire(
        "Facebook Sign In unsuccessful!",
        "Try again later",
        "error"
      );
    }
  };

  return (
    <>
      <div className="container-fluid p-0 ">
        <div className="row">
          <div className="sidebar-login col-lg-3 col-md-2 d-lg-inline d-none"></div>
          <div className="col-lg-9 col-md-10 col-12">
            <div className="col-2 m-auto">
              <img src={alumnisocialcorner} alt="logo" />
            </div>
            <div className="login-title col-12 mt-2">
              <h3 className="text-center">Welcome to our system</h3>
            </div>
            <div>
              <div className="container form">
                <div className="col-lg-5 col-md-6 col-12 m-auto mt-5">
                  <input
                    type="email"
                    placeholder="Email*"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="col-lg-5 col-md-6 col-12 m-auto mt-3">
                  <input
                    type="password"
                    placeholder="Password*"
                    id="password"
                    name="password"
                    className="w-full bg-gray-100 bg-opacity-50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="col-lg-5 col-md-6 col-12 m-auto mt-3">
                  <button className="btn" onClick={() => login()}>
                    Login
                  </button>
                </div>
                <div className="forgot-password mt-3">
                  <p className="text-center">
                    <span>
                      <button onClick={() => navigate("/forgot-password")}>
                        Forgot Password
                      </button>
                    </span>
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-center">
                    <span>
                      Don't have an account?<Link to="/signup">Sign Up</Link>
                    </span>
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-center">
                    <span className="or-span">OR</span>
                  </p>
                </div>
                <div className="col-lg-6 col-md-8 col-12 m-auto row">
                  <div className="col-md-6 col-12">
                    {/* <a
                      // href="/"
                      className="fb-btn"
                      onClick={() => {
                        setIsFbLoginClicked(true);
                      }}
                    >
                      {isFbLoginClicked && (
                        <FacebookLogin
                          appId="1045349893066180"
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={responseFacebook}
                          cssClass="btnFacebook"
                        />
                      )}
                      <i className="fa fa-facebook fa-fw"></i> Login with
                      Facebook
                    </a> */}
                    <button
                      href="#"
                      style={{ color: "white", backgroundColor: "#3498db" }}
                      onClick={() => {
                        setIsFbLoginClicked(true);
                      }}
                      className="fb-btn"
                    >
                      <i className="fa fa-facebook fa-fw"></i> Login with
                      Facebook
                      {isFbLoginClicked && (
                        <FacebookLogin
                          appId="362107689224548"
                          autoLoad={true}
                          fields="name,email,picture"
                          callback={responseFacebook}
                          cssClass="btnFacebook facebook__login__btn"
                        />
                      )}
                    </button>
                  </div>
                  <div className="col-md-6 col-12">
                    <GoogleLogin
                      clientId="397548666254-aifv81uplfldiejuvi1id8cgfnvumabk.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <a
                          href="/"
                          className="google-btn googleButton"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          <i className="fa fa-google fa-fw"></i> Login with
                          Google+
                        </a>
                      )}
                      onSuccess={googleSuccess}
                      onFailure={googleError}
                      cookiePolicy="single_host_origin"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
{
  /* <input type="text" placeholder="Password" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/> */
}
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
