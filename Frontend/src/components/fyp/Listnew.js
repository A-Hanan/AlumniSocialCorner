import React, { useEffect, useState } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
// import {Link } from 'react-router-dom';
import "../projects/projects.css";
import ReactPaginate from "react-paginate";

export const Listnew = () => {
  const [FYPs, setFYPs] = useState([]);
  useEffect(() => {
    api
      .get("/FYPs/new")
      .then((res) => {
        setFYPs(res.data);
        console.log("res>", res.data);
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
        // setFYPs(array);
      })
      .catch((err) => console.log);
  }, []);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(FYPs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(FYPs.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, FYPs]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % FYPs.length;
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
          <div className="conainer my-4">
            <h3>List of New Projects:</h3>
          </div>
          <div className="container-fluid">
            <table className="table">
              <thead>
                <th>SR.NO</th>
                <th>Title</th>
                <th>Project Type</th>
                <th>Description</th>
                <th>Date Posted</th>
                <th>View</th>
              </thead>
              <tbody>
                {/* {FYPs.length > 0 &&
                  FYPs.map((f, i) => <></>)}  */}
                <Items
                  currentItems={currentItems}
                  setCurrentItems={setCurrentItems}
                />
              </tbody>
            </table>

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
      <>
        {currentItems &&
          currentItems.map((f, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{f?.title}</td>
              <td>{f?.projectType}</td>
              <td>{f?.description}</td>
              <td>{new Date(f?.createdAt).toDateString()}</td>
              <td>
                {/* <Link to="/fyp/deletenewfyp">
                  <i className="fa fa-eye"></i>
                </Link> */}
                <a href={f?.projectLink}>
                  <i className="fa fa-eye"></i>
                </a>
              </td>
            </tr>
          ))}
      </>
    </>
  );
}
