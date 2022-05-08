import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import "./projects.css";
import Project from "./Project";
import ReactPaginate from "react-paginate";

function Items({ currentItems, setQ, setCurrentItems }) {
  useEffect(() => {
    console.log("current  items to check>>> ", currentItems);
    setCurrentItems([]);
  }, []);

  return (
    <>
      <div className="container feeds">
        {currentItems && currentItems.map((item) => <Project project={item} />)}
      </div>
    </>
  );
}
export const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api
      .get("/projects")
      .then((res) => {
        console.log("hostels>", res.data);
        setProjects(res.data);
        // let array = res.data;
        // let temp = res.data;
        // var n = array.length;
        // var j = 0;
        // for (var i = 0; i < 40; i++) {
        //   if (j === n) {
        //     i = 0;
        //   }
        //   array.push(temp[j]);
        //   j++;
        // }
        // setProjects(array);
      })
      .catch((err) => console.log(err));
  }, []);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(projects.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(projects.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, projects]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % projects.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
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
              <h3>Projects</h3>
            </div>
            <div className="col-6 stickbtn">
              <Link to="/projects/post" className="btn-link ">
                Post a Project
              </Link>
            </div>
          </div>

          <div className="container">
            {/* {projects.length > 0 ? (
              projects.map((p) => <Project project={p} />)
            ) : (
              <h5>No Projects Uploaded</h5>
            )} */}
            <Items
              currentItems={currentItems}
              setCurrentItems={setCurrentItems}
            />

            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
            <Link to="/projects/userprojects">
              <button className="btn mt-5 mb-3">User Projects</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
