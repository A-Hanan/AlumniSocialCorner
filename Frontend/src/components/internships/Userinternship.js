import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import "../projects/projects.css";

export const Userinternship = () => {
  const [internships, setInternships] = useState([]);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  useEffect(() => {
    api
      .get(`/internships/get-my-internships/${currentUser?.id}`)
      .then((res) => {
        console.log("internships>", res.data);
        setInternships(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteInternship = (id) => {
    api
      .delete(`/internships/${id}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
          <div className="row mt-3">
            <div className="col-6">
              <h3>Internships:</h3>
            </div>
          </div>
          <div className="col-6">
            <Link to="/internship/post" className="btn-link">
              Post an Internship
            </Link>
          </div>
          <div className="container">
            {internships.length > 0 ? (
              internships.map((inte) => (
                <div className="row border-bottom border-dark pb-3">
                  <div className="col-lg-6 col-md-6 col-12">
                    <h5 className="title">
                      <strong>{inte?.companyName}</strong>
                    </h5>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <p>
                      Posted:{" "}
                      <strong className="date">
                        {new Date(inte?.createdAt).toDateString()}
                      </strong>
                    </p>
                  </div>
                  <div className="country">
                    <p>
                      <strong>Location: </strong>
                      {inte?.location}
                    </p>
                  </div>
                  <div className="duration">
                    <p>
                      <strong>Duration: </strong> {inte?.duration}
                    </p>
                  </div>
                  <div className="Paid/Stipend">
                    <p>
                      <strong>Paid/Stipend: </strong> {inte?.pay}
                    </p>
                  </div>

                  <div className="desc">
                    <p>
                      <strong>Description: </strong>
                      {inte?.description}
                    </p>
                  </div>

                  <div className="visitlink">
                    <h5 className="my-3">Visit Link</h5>
                    <a href={inte?.url}>{inte?.url}</a>
                  </div>
                  <button
                    className="delete__scholarship__btn"
                    onClick={(e) => deleteInternship(inte?._id)}
                  >
                    Delete Internship
                  </button>
                </div>
              ))
            ) : (
              <h5>No internship posted</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
