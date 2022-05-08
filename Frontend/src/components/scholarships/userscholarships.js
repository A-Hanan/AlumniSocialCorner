import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import "./Scholarships.css";
import api from "../../utils/api";

export const Userscholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  useEffect(() => {
    api
      .get(`/scholarships/get-my-scholarships/${currentUser?.id}`)
      .then((res) => {
        console.log("scholarships>", res.data);
        setScholarships(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteScholarship = (id) => {
    api
      .delete(`/scholarships/${id}`)
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
              <h3>Scholarships:</h3>
            </div>
            <div className="col-6">
              <Link to="/scholarship/post" className="btn-link">
                Post a Scholarship
              </Link>
            </div>
          </div>
          <div className="container">
            {scholarships.length > 0 ? (
              scholarships.map((sch) => (
                <div className="row border-bottom border-dark pb-3 mb-8 mt-8">
                  <div className="col-lg-6 col-md-6 col-12">
                    <h5 className="title">
                      <strong>{sch?.title}</strong>
                    </h5>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <p>
                      Posted:{" "}
                      <strong className="date">
                        {new Date(sch?.createdAt).toDateString()}
                      </strong>
                    </p>
                  </div>
                  <div className="country">
                    <p>
                      <strong>Country: </strong> {sch?.country}
                    </p>
                  </div>
                  <div className="duration">
                    <p>
                      <strong>Duration: </strong> {sch?.duration}
                    </p>
                  </div>
                  <div className="amount">
                    <p>
                      <strong>Amount: </strong> {sch?.amount}
                    </p>
                  </div>
                  <div className="applydeadline">
                    <p>
                      <strong>Apply Deadline: </strong> {sch?.deadline}
                    </p>
                  </div>
                  <div className="scholarshipfor">
                    <p>
                      <strong>Scholarship for: </strong> {sch?.scholarshipFor}
                    </p>
                  </div>

                  <div className="desc">
                    <p>
                      <strong>Description</strong> {sch?.description}
                    </p>
                  </div>
                  {/* <div className="container-fluid p-0">
                    <button className="btn-projects">Web</button>
                    <button className="btn-projects">Web Designs</button>
                  </div> */}
                  <div className="visitlink">
                    <h5 className="my-3">Visit Link</h5>
                    <a href={sch?.url}>{sch?.url}</a>
                  </div>

                  <button
                    className="delete__scholarship__btn"
                    onClick={(e) => deleteScholarship(sch?._id)}
                  >
                    Delete Scholarship
                  </button>
                </div>
              ))
            ) : (
              <h5>No Scholarship Added</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
