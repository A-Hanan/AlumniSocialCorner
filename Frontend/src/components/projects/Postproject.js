import React, { useState, useEffect } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
// import {Link } from 'react-router-dom';
import "./projects.css";

function onlyLettersAndSpaces(str) {
  return /^[A-Za-z\s]*$/.test(str);
}

function onlyNumber(str) {
  return /^\d+$/.test(str);
}
export const Postproject = () => {
  let navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const [projectImage, setProjectImage] = useState("");
  const { currentUser } = userstate;
  const [data, setData] = useState({});
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    let temp = Object.assign(data, { [e.target.name]: e.target.value });
    setData(temp);
    console.log("updated data>> ", temp);
    if (e.target.name == "tagsText") {
      const Array = e.target.value?.split(" ");
      let Array2 = Array.filter((arr) => arr !== "");
      setTags(Array2);
    }
  };
  const uploadProjectImage = async (e) => {
    console.log("e.targte", e.target);
    console.log("running upload file ");
    let files = e.target.files;
    const dataa = new FormData();
    dataa.append("file", files[0]);
    dataa.append("upload_preset", "pauhtddz");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbjdalghs/image/upload",

      {
        method: "POST",
        body: dataa,
      }
    );
    const file = await res.json();
    console.log("response from cloudinary>>>", file);
    setProjectImage(file?.secure_url);

    let e2 = { target: { name: "projectImage", value: file?.secure_url } };
    onChange(e2);

    // console.log("file profie image>>> ", file);
  };
  const submitData = (e) => {
    e.preventDefault();

    let errs = {};
    if (!data.title) {
      errs.title = "required";
    } else if (!onlyLettersAndSpaces(data.title)) {
      errs.title = "must contain letters only";
    }
    if (!data.deadline) {
      errs.deadline = "required";
    }

    if (!data.price) {
      errs.price = "required";
    } else if (!onlyNumber(data.price)) {
      errs.price = "must contain number only";
    }
    if (!data.projectType) {
      errs.projectType = "required";
    }
    if (!data.projectImage) {
      errs.projectImage = "image is required";
    }
    if (!data.tagsText) {
      errs.tags = "tags are required";
    }
    if (tags.length < 2 || tags.length > 5) {
      errs.tags = "atleast 2 tags are required , atmost 5";
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0 && errs.constructor === Object) {
      // let body = Object.assign(data, { userId: currentUser?.id });
      let body = {
        userId: currentUser?.id,
        title: data?.title,
        projectImage: data?.projectImage,
        projectType: data?.projectType,
        deadline: data?.deadline,
        price: data?.price,
        tags: tags,
        description: data?.description,
      };
      console.log("submitting data", body);
      api
        .post("/projects", body)
        .then((res) => {
          console.log(res.data);
          let notifBody = {
            userId: currentUser?.id,
            text: `${currentUser?.name} post new project.`,
          };
          api
            .post("/notifications", notifBody)
            .then((re) => console.log("notif", re.data));
          window.location.href = "/projects";
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
            <h3>Post a Project:</h3>
            <div className="form">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    id="title"
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
                    id="price"
                    placeholder="Price*"
                    name="price"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.price && (
                    <p className="error__para">{errors.price}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    id="deadline"
                    placeholder="Deadline*"
                    name="deadline"
                    required
                    type="date"
                    onChange={(e) => onChange(e)}
                  />
                  {errors.deadline && (
                    <p className="error__para">{errors.deadline}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    id="projectType"
                    placeholder="Project Type"
                    name="projectType"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.projectType && (
                    <p className="error__para">{errors.projectType}</p>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <input
                  className="text-feild firstdiv_of_projects"
                  type="file"
                  onClick={(e) => uploadProjectImage(e)}
                />
                {projectImage && (
                  <img
                    src={projectImage}
                    style={{ margin: "3vh 3vw", width: "auto", height: "30vh" }}
                  />
                )}
                {errors.projectImage && (
                  <p className="error__para">{errors.projectImage}</p>
                )}
              </div>

              <textarea
                className="text-feild"
                id="description_of_hostel"
                placeholder="Description"
                name="description"
                required
                onChange={(e) => onChange(e)}
              />
              {errors.description && (
                <p className="error__para">{errors.description}</p>
              )}
              <input
                className="text-feild"
                id="tags_of_project"
                placeholder="Tags"
                name="tagsText"
                required
                onChange={(e) => onChange(e)}
              />
              {errors.tags && <p className="error__para">{errors.tags}</p>}
              <p>Tags : </p>
              {tags && (
                <div className="tags__container">
                  {tags.map((tag) => (
                    <span>{tag} </span>
                  ))}
                </div>
              )}
              <div name="date" id="date" required />
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
