import { useState, useEffect, React } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "../projects/projects.css";
import { StarIcon } from "@material-ui/icons/Star";
import Hostel from "./Hostel";
import ReactPaginate from "react-paginate";

export const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  useEffect(() => {
    api
      .get("/hostels")
      .then((res) => {
        console.log("hostels>", res.data);
        setHostels(res.data);
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
        // setHostels(array);
      })
      .catch((err) => console.log(err));
  }, []);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(hostels.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(hostels.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, hostels]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % hostels.length;
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
              <h3>Hostels:</h3>
            </div>
            <div className="col-6">
              <Link to="/hostels/post" className="btn-link">
                Add Hostel
              </Link>
            </div>
          </div>
          <div className="container">
            {/* second first */}
            {/* {hostels?.length > 0 ? (
              hostels.map((hostel) => <Hostel hostel={hostel} />)
            ) : (
              <h1>No hostels added</h1>
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
          </div>{" "}
          {/*div of container*/}
          <Link to="/hostels/userhostels">
            <button className="btn mt-5 mb-3">User Hostel</button>
          </Link>
        </div>{" "}
        {/* div of line 40*/}
      </div>{" "}
      {/*//class name row  */}
    </div> //main div after return
  ); //return ends here
};

function Items({ currentItems, setQ, setCurrentItems }) {
  useEffect(() => {
    console.log("current  items to check>>> ", currentItems);

    setCurrentItems([]);
  }, []);

  return (
    <>
      <div className="container feeds">
        {currentItems &&
          currentItems.map((hostel) => <Hostel hostel={hostel} />)}
      </div>
    </>
  );
}
