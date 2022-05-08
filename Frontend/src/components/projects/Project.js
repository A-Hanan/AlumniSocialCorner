import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
const Project = ({ project }) => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [err, setErr] = useState("");
  const [projectComments, setProjectComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const submitComment = (id) => {
    console.log("comment", comment);
    if (comment.length > 10) {
      const body = {
        userId: currentUser?.id,
        projectId: project?._id,
        comment: comment,
        user: currentUser,
      };
      api
        .post("/projects/submit-comment", body)
        .then((res) => {
          console.log("res>", res.data);
          window.location.reload();
        })
        .catch((err) => console.log(err));
      setComment("");
    } else {
      setErr("your comment is too short");
    }
  };
  useEffect(() => {
    api
      .get(`/projects/comments/${project?._id}`)
      .then((res) => {
        console.log("project comments", res.data);
        if (res.data.length > 0) {
          setProjectComments(res.data);
          setCommentCount(res.data.length);
        }
      })
      .catch((err) => console.log);
  }, []);
  return (
    <div className="row border-bottom border-dark pb-3">
      <div className="col-lg-6 col-md-6 col-12">
        <h5 className="title">
          <strong>{project?.title}</strong>
        </h5>
      </div>
      <div className="col-lg-6 col-md-6 col-12">
        <p>
          Posted:{" "}
          <strong className="date">
            {new Date(project?.createdAt).toDateString()}
          </strong>
        </p>
      </div>
      <div className="price">
        <p>
          <strong>Price: </strong>
          {project?.price} PKR
        </p>
      </div>
      <div className="deadline">
        <p>
          <strong>Deadline: </strong> {project?.deadline}
        </p>
      </div>
      <div className="type">
        <p>
          <strong>Project type : </strong> {project?.projectType}
        </p>
      </div>
      <div className="desc">
        {project?.description ? (
          <p>{project?.description}</p>
        ) : (
          <p>no description</p>
        )}
      </div>
      {project?.projectImage && (
        <div style={{ marginBottom: "3vh" }}>
          <img
            src={project?.projectImage}
            style={{
              maxWidth: "20vw",
              height: "auto",
              width: "auto",
              maxHeight: "30vh",
            }}
          />
        </div>
      )}
      <div className="tags">
        {project?.tags.map((t) => (
          <span className="tag-span">{t}</span>
        ))}
      </div>
      <div className="col-lg-6 col-12 row mt-4">
        <h6 className="mb-1 mt-3"> Comments ({commentCount}) </h6>
        <span
          className="underline inline mb-3 pointer"
          onClick={() => setShowComments(!showComments)}
        >
          {" "}
          {!showComments ? "show" : "hide"}
        </span>

        {showComments && (
          <>
            {projectComments.length > 0 ? (
              projectComments.map((comment) => (
                <div className="show-comments mt-0 mb-0">
                  <p>
                    <strong>{comment?.user.name}</strong>
                  </p>
                  <p>{comment?.comment}</p>
                  <br />
                </div>
              ))
            ) : (
              <p>no comments</p>
            )}
          </>
        )}
      </div>
      <div className="comments row">
        <h5 className="my-3">Comment:</h5>
        <div className="col-lg-6 col-12">
          <textarea
            placeholder="Comment"
            className="border border-dark rounded text-area w-full"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {err && <p className="error__para">{err}</p>}
          <button className="btn" onClick={(e) => submitComment(e)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
