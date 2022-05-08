import React, { useState, useEffect } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accountUpdateAction } from "../../Actions/accountActions";
import "./Settings.css";

// import {Link } from 'react-router-dom';

export const Settings = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  const updatePassword = () => {
    setErrors({
      oldPassword: "",
      confirmPassword: "",
      newPassword: "",
    });

    if (oldPassword == "") {
      setErrors({ oldPassword: "field must be filled out!" });
    } else if (confirmPassword == "") {
      setErrors({ confirmPassword: "field must be filled out!" });
    } else if (newPassword == "") {
      setErrors({ newPassword: "field must be filled out!" });
    } else if (!confirmPassword === newPassword) {
      setErrors({ confirmPassword: "Password do not match!" });
    } else if (newPassword.length < 6) {
      setErrors({
        newPassword: "Password should be minimum 6 chrachters long!",
      });
    } else {
      console.log(errors);
      accountUpdateAction(oldPassword, newPassword, navigate, currentUser);
    }
    console.log(errors);
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
          <div
            style={{
              borderBottom: "2px solid lightgray",
              paddingBottom: "5vh",
            }}
          >
            <div className="container">
              <h3 className="my-4 h1 underline ">Settings</h3>
            </div>
          </div>
          <div className="account__settings" style={{ padding: "20px" }}>
            <h1 className="">Account Settings</h1>
            <p
              style={{
                fontSize: "1.6rem",
                cursor: "pointer",
                width: "max-content",
              }}
            >
              Edit Password
            </p>
            <div className="change__password__container">
              <input
                type="password"
                name="old_password"
                placeholder="Current Password (required)"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {errors?.oldPassword && (
                <p className="error__para">{errors?.oldPassword}</p>
              )}
              <input
                type="password"
                name="password"
                placeholder="Enter a new password "
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errors?.newPassword && (
                <p className="error__para">{errors?.newPassword}</p>
              )}
              {/* <label className="label">New Password </label> */}
              <input
                type="password"
                name="password"
                placeholder="confirm new password "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors?.newPassword && (
                <p className="error__para">{errors?.confirmPassword}</p>
              )}

              {/* <label className="label">Current Password (required) </label> */}

              <button
                type="submit"
                className="btn"
                onClick={() => updatePassword()}
              >
                Update
              </button>
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
