import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

const Question = ({ question, setQ, isSearchedData }) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState([]);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  useEffect(() => {
    api
      .get(`/questions/answers-of-particular-question/${question._id}`)
      .then((res) => {
        console.log("answers", res.data);
        setAnswers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="row pt-3 mb-3 border-bottom border-dark pb-3 question__container">
      <div className="col-lg-6 col-md-6 col-12">
        <h6 className="post-name">
          <strong>{question?.user?.name}</strong>
        </h6>
      </div>
      <div className="col-lg-6 col-md-6 col-12">
        <h6 className="post-date">
          Posted:{" "}
          <strong>{new Date(question?.createdAt).toDateString()}</strong>
        </h6>
      </div>
      <div className="col-12">
        <h6 className="question">{question?.question}</h6>
      </div>
      <div className="col-12">{/* <img src={questionImage}/> */}</div>
      <div className="col-12">
        <p className="description">{question?.description}</p>
      </div>
      <div className="language">
        <div className="tags">
          {question?.tags.map((t) => (
            <span className="tag-span">{t}</span>
          ))}
        </div>
      </div>
      <div className="answer row m-0 mt-3">
        {currentUser?.id !== question.userId && (
          <>
            {!isSearchedData && (
              <div className="col-6 answer-status">
                {/* modal is in the feedback component */}
                <button
                  className="answers-status-btn  answer-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setQ(question)}
                >
                  <span className="fa fa-comment"></span> Answer
                </button>
              </div>
            )}
          </>
        )}
        <div
          className={currentUser?.id == question.userId ? "col-12" : "col-6"}
        >
          <Link
            className="float-right answer-btn"
            to={`/newsfeed/answers/${question._id}`}
          >
            {answers.length} Answer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Question;
