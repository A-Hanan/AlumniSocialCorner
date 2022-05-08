import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import "./Scholarships.css";
import api from "../../utils/api";
import ReactPaginate from "react-paginate";

export const Scholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => {
    api
      .get("/scholarships")
      .then((res) => {
        console.log("scholarships>", res.data);
        setScholarships(res.data);
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
        // setScholarships(array);
      })
      .catch((err) => console.log(err));
  }, []);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(scholarships.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(scholarships.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, scholarships]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % scholarships.length;
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
              <h3>Scholarships:</h3>
            </div>
            <div className="col-6">
              <Link to="/scholarship/post" className="btn-link">
                Post a Scholarship
              </Link>
            </div>
          </div>
          <div className="container">
            {/* {scholarships.length > 0 ? (
              scholarships.map((sch) =>(<h1>M</h1>) )
            ) : (
              <h5>No Scholarship Added</h5>
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
            <Link to="/scholarship/userscholarship">
              <button className=" btn">User Scholarships</button>
            </Link>
          </div>
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
          currentItems.map((sch) => (
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
            </div>
          ))}
      </div>
    </>
  );
}
