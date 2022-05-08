import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Question from "./Question";
import api from "../../utils/api";
import ReactPaginate from "react-paginate";

function Items({ currentItems, setQ, setCurrentItems }) {
  useEffect(() => {
    console.log("current  items to check>>> ", currentItems);

    setCurrentItems([]);
  }, []);

  return (
    <>
      <div className="container feeds">
        {currentItems &&
          currentItems.map((item) => <Question question={item} setQ={setQ} />)}
      </div>
    </>
  );
}

export const Feeds = ({ setQ }) => {
  const [questions, setQuestions] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    api
      .get("/questions")
      .then((res) => {
        setQuestions(res.data);
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
        // setQuestions(array);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    console.log(questions);
  }, [questions]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(questions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(questions.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, questions]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % questions.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <>
      {/* <div className="container feeds">
        {questions.length > 0 &&
          questions.map((q) => <Question question={q} setQ={setQ} />)}
      </div> */}
      <Items
        currentItems={currentItems}
        setCurrentItems={setCurrentItems}
        setQ={setQ}
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

      <Link to="/newsfeed/usernewsfeed">
        <button className="btn mt-5 mb-3">Check Your Question</button>{" "}
      </Link>
    </>
  );
};
