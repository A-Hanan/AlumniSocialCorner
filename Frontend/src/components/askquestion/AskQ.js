import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom'
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AskQ.css";
import api from "../../utils/api";
export const AskQ = (props) => {
  let navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsText, setTagsText] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("current user>>>", currentUser);
  }, [currentUser]);
  useEffect(() => {
    console.log("tags text");
    if (tagsText) {
      const Array = tagsText?.split(" ");
      let Array2 = Array.filter((arr) => arr !== "");
      setTags(Array2);
    }
  }, [tagsText]);
  const uploadPhoto = async (e) => {
    console.log("e.target", e.target);
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
    setImage(file?.secure_url);
    let e2 = { target: { name: "image", value: file.secure_url } };

    // console.log("file profie image>>> ", file);
  };

  const handleFormSubmit = () => {
    console.log("question>", question);
    console.log("description>", description);
    console.log("image>", image);
    console.log("tags>", tagsText);
    let errs = {};
    if (!question) {
      errs.question = "question is required";
    }
    if (!description) {
      errs.description = "description is required";
    } else if (description.length < 100) {
      errs.description = "atleast 100 chrachters required";
    }
    if (!image) {
      errs.image = "image is required";
    }
    if (!tagsText) {
      errs.tags = "tags are required";
    }
    if (tags.length < 2 || tags.length > 5) {
      errs.tags = "atleast 2 tags are required , atmost 5";
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0 && errs.constructor === Object) {
      console.log("submitting form");
      const body = {
        userId: currentUser.id,
        user: currentUser,
        question,
        description,
        image,
        tags,
      };
      api
        .post("/questions", body)
        .then((res) => {
          if (res.data) {
            let notifBody = {
              userId: currentUser?.id,
              text: `${currentUser?.name} asked a question`,
            };
            api
              .post("/notifications", notifBody)
              .then((re) => console.log("notif", re.data));
            window.location.href = "/newsfeed";
          }
        })
        .catch((err) => {
          alert("question post failed");
        });
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
            <h3 className="my-3">Ask a Question</h3>
            <h6>Cancel</h6>
            <div className="form" onSubmit={handleFormSubmit}>
              <div className="row">
                <textarea
                  className="p_of_askquestion p-2 border border-dark rounded my-2"
                  placeholder=" Write Question Here!"
                  id="question"
                  name="question"
                  required
                  onChange={(e) => setQuestion(e.target.value)}
                />
                {errors.question && (
                  <h6 className="signup__error__message">{errors.question}</h6>
                )}
                <textarea
                  className="textarea_url_of_askquestion  border border-dark rounded my-2 p-2"
                  placeholder="Description"
                  id="url"
                  name="url"
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                  <h6 className="signup__error__message">
                    {errors.description}
                  </h6>
                )}

                <input
                  type="file"
                  id="file"
                  name="file"
                  className="border border-dark rounded my-2 p-2"
                  onChange={(e) => uploadPhoto(e)}
                />
                {errors.image && (
                  <h6 className="signup__error__message">{errors.image}</h6>
                )}
                {image && (
                  <div className="image__container">
                    <img src={image} />
                  </div>
                )}

                <textarea
                  className="textarea_tags_of_askquestion  border border-dark rounded my-2 p-2"
                  placeholder="Tags"
                  id="tags"
                  name="tags"
                  required
                  onChange={(e) => setTagsText(e.target.value)}
                />
                {errors.tags && (
                  <h6 className="signup__error__message">{errors.tags}</h6>
                )}
                <p>Tags : </p>
                {tags && (
                  <div className="tags__container">
                    {tags.map((tag) => (
                      <span>{tag} </span>
                    ))}
                  </div>
                )}

                <button className="btn mt-3" onClick={() => handleFormSubmit()}>
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
