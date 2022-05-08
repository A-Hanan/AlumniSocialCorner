import React, { useState, useEffect } from "react";
import ReplyIcon from "@material-ui/icons/Reply";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";

const Answer = ({ ans }) => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  useEffect(() => {
    api
      .get(`/questions/replies-of-particular-answer/${ans?._id}`)
      .then((res) => {
        console.log("replies respnse", res.data);
        setReplies(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const submitReply = (e) => {
    e.preventDefault();

    if (!reply) {
      setError("required");
    } else if (reply.length < 30) {
      setError("your reply should be 30 chrachters long atleast.");
    } else {
      console.log("answer", ans);
      console.log("reply", reply);
      const body = {
        userId: currentUser.id,
        user: currentUser,
        answerId: ans?._id,
        reply: reply,
      };
      api
        .post("/questions/reply-the-answer", body)
        .then((res) => {
          if (res.data) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="row border-bottom border-dark pb-3">
        <div className="col-lg-6 col-md-6 col-12">
          <h6 className="title">
            <strong>{ans.user.name}</strong>
          </h6>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <p>
            Posted:{" "}
            <strong className="date">
              {new Date(ans?.createdAt).toDateString()}
            </strong>
          </p>
        </div>

        <div className="desc">
          <p>{ans.answer}</p>
        </div>
        <button
          className="view__reply__btn"
          onClick={() => setShowReplies(!showReplies)}
        >
          {!showReplies ? <VisibilityIcon /> : <VisibilityOffIcon />}
          {/* {showReplies ? "hide" : "show"}*/}
          Replies ({replies?.length})
        </button>
        <button
          className=" reply__btn"
          data-bs-toggle="modal"
          data-bs-target="#replyModal"
        >
          <ReplyIcon />
          Reply
        </button>

        {showReplies && (
          <div className="replies__container pl-5 mt-3">
            {/* <h6>Replies</h6> */}
            {replies.map((r) => (
              <div className="reply row border-top border-gray   pb-3 pl-9">
                <div className="col-lg-6 col-md-6 col-12">
                  <p className="title">
                    <strong>{r.user.name}</strong>
                  </p>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <p>
                    Posted:{" "}
                    <strong className="date">
                      {new Date(r?.createdAt).toDateString()}
                    </strong>
                  </p>
                </div>

                <div className="desc">
                  <p>{r.reply}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="modal fade"
        id="replyModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="replyModalLabel">
                Write your Reply
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
                    name="reply"
                    id="reply"
                    placeholder="reply"
                    onChange={(e) => setReply(e.target.value)}
                  />
                  {error && <p className="error__para">{error}</p>}
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => submitReply(e)}
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Answer;
