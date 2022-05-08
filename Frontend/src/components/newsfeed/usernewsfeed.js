import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import Question from "./Question";

export const Usernewsfeed = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    api
      .get(`/questions/get-my-questions/${currentUser?.id}`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Header />
      <Menunav />
      <div className="row">
        <div className="col-md-2 col-0">
          <Sidebar />
        </div>
        <div className="col-md-10 col-12">
          <div className="container feeds">
            {questions.length > 0 ? (
              questions.map((q) => <Question question={q} />)
            ) : (
              <h4>No Questions asked.</h4>
            )}
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <div className="container">
    //     <div className="row pt-3 mb-3 border-bottom border-dark pb-3">
    //       {/* <div className="col-lg-6 col-md-6 col-12">
    //             <h6 className="post-name">
    //               <strong>Muneeb Idress</strong>
    //             </h6>
    //           </div>
    //           <div className="col-lg-6 col-md-6 col-12">
    //             <h6 className="post-date">
    //               Posted: <strong>2/3/4</strong>
    //             </h6>
    //           </div> */}
    //       <div className="col-12">
    //         <h6>
    //           <strong>question</strong>
    //         </h6>
    //       </div>
    //       <div className="col-12">{/* <img src={questionImage}/> */}</div>

    //       <div className="col-12">
    //         <p>url</p>
    //       </div>

    //       <div className="language">
    //         <button className="tags">tags</button>
    //       </div>
    //       <div className="answer row m-0 mt-3">
    //         <div className="col-6 answer-status">
    //           {/* modal is in the feedback component */}
    //           <button
    //             className="answers-status-btn  answer-btn"
    //             data-bs-toggle="modal"
    //             data-bs-target="#exampleModal"
    //           >
    //             <span className="fa fa-comment"></span> Answer
    //           </button>
    //         </div>
    //         <div className="col-6">
    //           <Link className="float-right answer-btn" to="/newsfeed/answers">
    //             5 Answer
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};
