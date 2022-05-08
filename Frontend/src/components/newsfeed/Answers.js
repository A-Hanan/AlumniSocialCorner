import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";

import Answer from "./Answer";

export const Answers = () => {
  const { questionId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState({});
  useEffect(() => {
    api
      .get(`/questions/get-question-by-id/${questionId}`)
      .then((res) => {
        console.log("question", res.data);
        setQuestion(res.data);
      })
      .catch((err) => console.log(err));
    api
      .get(`/questions/answers-of-particular-question/${questionId}`)
      .then((res) => {
        console.log("answers", res.data);
        setAnswers(res.data);
      })
      .catch((err) => console.log(err));
  }, [questionId]);
  return (
    <div>
      <Header />
      <Menunav />
      <div className="row answers">
        <div className="col-md-2 col-0">
          <Sidebar />
        </div>

        <div className="col-md-10 col-12">
          <div className="container row">
            <div className="row pt-3 mb-3 border-bottom border-dark pb-3 question__container">
              <div className="col-lg-6 col-md-6 col-12">
                <h6 className="post-name">
                  <strong>{question?.user?.name}</strong>
                </h6>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <h6 className="post-date">
                  Posted:{" "}
                  <strong>
                    {new Date(question?.createdAt).toDateString()}
                  </strong>
                </h6>
              </div>
              <div className="col-12">
                <h6 className="question">{question?.question}</h6>
              </div>
              <div className="col-12">{/* <img src={questionImage}/> */}</div>
              <div className="col-12">
                <p className="description">{question?.description}</p>
              </div>
              {question?.image && (
                <div className="col-lg-6 col-md-6 col-12 question__image__container">
                  <img src={question.image} />
                </div>
              )}
              <div className="language">
                <div className="tags">
                  {question?.tags?.map((t) => (
                    <span className="tag-span">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="container ">
              <h5>Answers</h5>
              <div className="answer__container">
                {answers.length > 0 &&
                  answers.map((ans) => (
                    // <div className="ans">
                    //   <h1>{ans.user.name}</h1>
                    //   <p>{ans.answer}</p>
                    // </div>
                    <Answer ans={ans} />
                  ))}
              </div>
              {/* answer */}
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};
