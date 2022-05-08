import React, { useState, useEffect } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
// import {Link } from 'react-router-dom';
import "../projects/projects.css";

function onlyLettersAndSpaces(str) {
  return /^[A-Za-z\s]*$/.test(str);
}

function onlyNumber(str) {
  return /^\d+$/.test(str);
}
export const Posthostel = () => {
  let navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const [hostelImage, setHostelImage] = useState("");
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
  const uploadHostelImage = async (e) => {
    console.log(e.target);
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
    setHostelImage(file?.secure_url);

    let e2 = { target: { name: "hostelImage", value: file?.secure_url } };
    onChange(e2);

    // console.log("file profie image>>> ", file);
  };
  const submitData = (e) => {
    e.preventDefault();

    let errs = {};
    if (!data.hostelName) {
      errs.hostelName = "required";
    } else if (!onlyLettersAndSpaces(data.hostelName)) {
      errs.hostelName = "must contain letters only";
    }
    if (!data.location) {
      errs.location = "required";
    }
    if (!data.price) {
      errs.price = "required";
    } else if (!onlyNumber(data.price)) {
      errs.price = "must contain number only";
    }
    if (!data.contact) {
      errs.contact = "required";
    }
    if (!data.hostelImage) {
      errs.hostelImage = "image is required";
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
        contact: data?.contact,
        hostelImage: data?.hostelImage,
        hostelName: data?.hostelName,
        location: data?.location,
        price: data?.price,
        tags: tags,
        description: data?.description,
      };
      console.log("submitting data", body);
      api
        .post("/hostels", body)
        .then((res) => {
          console.log(res.data);
          let notifBody = {
            userId: currentUser?.id,
            text: `${currentUser?.name} post new Hostel.`,
          };
          api
            .post("/notifications", notifBody)
            .then((re) => console.log("notif", re.data));
          window.location.href = "/hostels";
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
            <h3>Add New Hostel:</h3>
            <div className="form">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    id="name_of_hostel"
                    placeholder="Name*"
                    name="hostelName"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.hostelName && (
                    <p className="error__para">{errors.hostelName}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    id="location_of_hostel"
                    placeholder="Location*"
                    name="location"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.location && (
                    <p className="error__para">{errors.location}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    id="price_of_hostel"
                    placeholder="Price Per head*"
                    name="price"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.price && (
                    <p className="error__para">{errors.price}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="text-feild firstdiv_of_projects"
                    id="contact_of_hostel"
                    placeholder="Contact Detail*"
                    name="contact"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  {errors.contact && (
                    <p className="error__para">{errors.contact}</p>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <input
                  className="text-feild firstdiv_of_projects"
                  type="file"
                  onClick={(e) => uploadHostelImage(e)}
                />
                {hostelImage && (
                  <img
                    src={hostelImage}
                    style={{ margin: "3vh 3vw", width: "auto", height: "30vh" }}
                  />
                )}
                {errors.hostelImage && (
                  <p className="error__para">{errors.hostelImage}</p>
                )}
              </div>
              <input
                className="text-feild"
                id="tags_of_hostel"
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
