import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Feeds } from "./Feeds";
import "./Feedback.css";
import api from "../../utils/api";

export const Feedback = () => {
  const [question, setQ] = useState({});
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  const submitAnswer = (e) => {
    e.preventDefault();

    if (!answer) {
      setError("required");
    } else if (answer.length < 50) {
      setError("your answer should be 50 chrachters long atleast.");
    } else {
      console.log("question", question);
      console.log("answer", answer);
      const body = {
        userId: currentUser.id,
        user: currentUser,
        questionId: question?._id,
        question: question,
        answer: answer,
      };
      api
        .post("/questions/answer", body)
        .then((res) => {
          if (res.data) {
            window.location.reload();
          }
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
          <Feeds setQ={setQ} />
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Write your answer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="form">
              <div>
                <div className="modal-body">
                  <textarea
                    className="form-control"
                    name="comment"
                    id="comment"
                    placeholder="Comment"
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  {error && <p className="error__para">{error}</p>}
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => submitAnswer(e)}
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feedback;
