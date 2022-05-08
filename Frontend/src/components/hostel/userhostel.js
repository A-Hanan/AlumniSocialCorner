import { useState, useEffect, React } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import "../projects/projects.css";

export const Userhostels = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [hostels, setHostels] = useState([]);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  useEffect(() => {
    api
      .get(`/hostels/get-my-hostels/${currentUser?.id}`)
      .then((res) => {
        console.log("hsotels>", res.data);
        setHostels(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteHostel = (id) => {
    api
      .delete(`/hostels/${id}`)
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
            {hostels?.length > 0 ? (
              hostels.map((hostel) => (
                <div className="row border-bottom border-dark pb-3 mt-3">
                  <div className="col-lg-6 col-md-6 col-12">
                    <h5 className="title">
                      <strong> {hostel?.hostelName} </strong>
                    </h5>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <p>
                      Posted:{" "}
                      <strong className="date">
                        {new Date(hostel?.createdAt).toDateString()}
                      </strong>
                    </p>
                  </div>
                  <div className="country">
                    <p>
                      <strong>Location: </strong>
                      {hostel?.location}
                    </p>
                  </div>
                  <div className="duration">
                    <p>
                      <strong>Price: </strong>
                      {hostel?.price}
                    </p>
                  </div>
                  <div className="amount">
                    <p>
                      <strong>Contact: </strong> {hostel?.contact}
                    </p>
                  </div>
                  <div className="applydeadline">
                    <p>
                      <strong>Ratings: </strong> 29 May, 21
                    </p>
                  </div>
                  <div className="desc">
                    <p>
                      {hostel?.description
                        ? hostel?.description
                        : "no description"}
                    </p>
                  </div>
                  {hostel?.hostelImage && (
                    <div style={{ marginBottom: "3vh" }}>
                      <img
                        src={hostel?.hostelImage}
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
                    {hostel?.tags.map((t) => (
                      <span className="tag-span">{t}</span>
                    ))}
                  </div>
                  <button
                    className="delete__scholarship__btn"
                    onClick={(e) => deleteHostel(hostel?._id)}
                  >
                    Delete Hostel
                  </button>
                </div>
              ))
            ) : (
              <h1>No hostels added</h1>
            )}
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
