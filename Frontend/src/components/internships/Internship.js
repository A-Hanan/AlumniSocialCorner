import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import "../projects/projects.css";
import api from "../../utils/api";
import ReactPaginate from "react-paginate";

export const Internship = () => {
  const [internships, setInternships] = useState([]);
  useEffect(() => {
    api
      .get("/internships")
      .then((res) => {
        console.log("internships>", res.data);
        setInternships(res.data);
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
        // setInternships(array);
      })
      .catch((err) => console.log(err));
  }, []);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(internships.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(internships.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, internships]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % internships.length;
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
              <h3>Internships:</h3>
            </div>
            <div className="col-6">
              <Link to="/internship/post" className="btn-link">
                Post an Internship
              </Link>
            </div>
          </div>
          <div className="container">
            {/* {internships.length > 0 && internships.map((inte) => <></>)} */}
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
          </div>
          <Link to="/internship/userinternship">
            <button
              className="btn"
              style={{ marginTop: "5vh", marginBottom: "5vh" }}
            >
              User Internships
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

function Items({ currentItems, setCurrentItems }) {
  useEffect(() => {
    console.log("current  items to check>>> ", currentItems);
    setCurrentItems([]);
  }, []);

  return (
    <>
      <div className="container feeds">
        {currentItems &&
          currentItems.map((inte) => (
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
            </div>
          ))}
      </div>
    </>
  );
}
