import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const UserProject = ({ project }) => {
  const [projectComments, setProjectComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
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
  const deleteProject = (id) => {
    api
      .delete(`/projects/${id}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
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
      <button
        className="delete__scholarship__btn"
        onClick={(e) => deleteProject(project?._id)}
      >
        Delete Project
      </button>
    </div>
  );
};

export default UserProject;
