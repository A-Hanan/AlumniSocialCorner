import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import "./projects.css";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import UserProject from "./UserProject";

export const Userprojects = () => {
  const [projects, setProjects] = useState([]);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    api
      .get(`/projects/get-my-projects/${currentUser?.id}`)
      .then((res) => {
        console.log("projects>", res.data);
        setProjects(res.data);
      })
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
          <div className="row mt-3">
            <div className="col-6">
              <h3>Projects</h3>
            </div>
            <div className="col-6 stickbtn">
              <Link to="/projects/post" className="btn-link ">
                Post a Project
              </Link>
            </div>
          </div>

          <div className="container">
            {projects.length > 0 ? (
              projects.map((project) => <UserProject project={project} />)
            ) : (
              <h5>No Projects Uploaded</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
