import React, { useEffect, useState } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {Link } from 'react-router-dom';
import "./Profile.css";
import api from "../../utils/api";
import ExperienceAndEducation from "./ExperienceAndEducation";

export const Profile = () => {
  const [userData, setUserData] = useState({});
  const [showUploadProfile, setShowUploadProfile] = useState(false);
  const [files, setFiles] = useState();
  const [profileImage, setProfileImage] = useState("");
  let navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [totalPosts, setTotalPosts] = useState(0);
  useEffect(() => {
    api
      .get(`/questions/get-my-questions/${currentUser?.id}`)
      .then((res) => setTotalPosts(res.data.length))
      .catch((err) => console.log(err));
  }, []);
  // useEffect(() => {
  //   console.log("current user>>>", currentUser);
  //   if (currentUser?.profile) {
  //     setProfileImage(currentUser.profile);
  //   }
  // }, [currentUser]);
  console.log("profile image", profileImage);
  useEffect(() => {
    api
      .get(`/auth/get-user-data/${currentUser.id}`)
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
          console.log("user data>", res.data);
          setProfileImage(res.data?.profile);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const uploadPhoto = async (e) => {
    console.log(e.target);
    console.log("running upload file ");
    let files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "pauhtddz");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbjdalghs/image/upload",

      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log("response from cloudinary>>>", file);
    setProfileImage(file?.secure_url);
    let e2 = { target: { name: "image", value: file.secure_url } };
    // handleChange(e2);
    console.log("file profie image>>> ", file);
  };
  const saveProfile = (e) => {
    e.preventDefault();
    console.log("running ");
    if (profileImage !== "") {
      api
        .put("/user/updateProfileImage", {
          userId: currentUser?.id,
          imgUrl: profileImage,
        })
        .then((res) => {
          console.log("res from uload profile", res.data);
          var currentObject = Object.assign(currentUser, {
            profile: profileImage,
          });
          console.log("profile ", currentObject);
          localStorage.setItem("currentUser", JSON.stringify(currentObject));
          setShowUploadProfile(false);
          window.location.reload();
        })
        .catch((err) => console.log("error from uploading profile", err));
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
        <div className="col-md-10 col-12 mb-3">
          <section className="row my-4">
            <div className="col-lg-2 col-md-3 col-12">
              <img
                className="profile-image"
                src={
                  profileImage
                    ? profileImage
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                alt="image"
              />
              <div className="photo__updation__form">
                <label
                  for="select-profile"
                  onClick={(e) => setShowUploadProfile(!showUploadProfile)}
                >
                  Change Profile
                </label>
                {showUploadProfile && (
                  <div>
                    <input
                      type="file"
                      name="select-profile"
                      id="updateProfileImageInput"
                      onChange={(e) => uploadPhoto(e)}
                      //value={user.picture}
                    />
                    <button
                      className="updateInfoBtn btn"
                      onClick={(e) => saveProfile(e)}
                    >
                      upload
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-10 col-md-9 col-12">
              <h5 className="mt-4"> {currentUser?.name} </h5>
            </div>
          </section>
          <hr />

          <div>
            <section className="row my-4 p-3">
              <h5 className="my-4">About:</h5>
              <div className="row about-row">
                <div className="col-lg-3 col-md-6 col-12">
                  <strong>
                    <span className="icon-about-profile fa fa-user"> </span>{" "}
                    {/* gender */}
                    {userData?.gender ? userData?.gender : "not mentioned"}
                  </strong>
                  <tr />
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <strong>
                    <span className="icon-about-profile fa fa-graduation-cap">
                      {" "}
                    </span>
                    {userData?.status ? userData?.status : "not mentioned"}
                  </strong>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <strong>
                    <span className="icon-about-profile fa fa-envelope"> </span>{" "}
                    {currentUser?.email ? currentUser?.email : "not mentioned"}
                  </strong>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <strong>
                    <span className="icon-about-profile fa fa-briefcase"></span>
                  </strong>{" "}
                  <strong>
                    {" "}
                    {userData?.university
                      ? userData?.university
                      : "not mentioned"}{" "}
                  </strong>
                </div>
              </div>
            </section>
            <hr />
            <ExperienceAndEducation
              currentUser={currentUser}
              userData={userData}
              api={api}
            />
            <hr />
            <div className="row">
              <h5 className="text-center">Number Of Posts</h5>
              <h1 className="text-center">{totalPosts}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
