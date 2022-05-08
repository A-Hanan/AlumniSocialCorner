import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import StarIcon from "@material-ui/icons/Star";
import "./Hostels.css";
import { useDispatch, useSelector } from "react-redux";

const Hostel = ({ hostel }) => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [hostelRating, setHostelRating] = useState(0);
  const [hostelRatingCount, setHostelRatingCount] = useState(0);
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);
  const [rating, setRating] = useState(0);
  const submitRating = (id) => {
    console.log("rating>", rating, id);
    if (rating !== 0) {
      const body = {
        userId: currentUser?.id,
        hostelId: hostel?._id,
        rating: rating,
      };
      api
        .post("/hostels/submit-rating", body)
        .then((res) => {
          console.log("res>", res.data);
          window.location.reload();
        })
        .catch((err) => console.log(err));
      setRating(0);
    }
  };
  useEffect(() => {
    api
      .get(`/hostels/ratings/${hostel?._id}`)
      .then((res) => {
        console.log("hostel ratings", res.data);
        console.log("user id>", currentUser?.id);
        if (res.data.length > 0) {
          let total = 0;
          let count = 0;
          res.data.map((r) => {
            console.log("not equal");
            if (r.userId == currentUser?.id) {
              console.log("are equal");
              setIsAlreadyReviewed(true);
            }
            total = total + r.rating;
            count++;
          });
          setHostelRating(total / count);
          console.log("hostel rating", total);
          setHostelRatingCount(count);
        }
      })
      .catch((err) => console.log);
  }, []);
  useEffect(() => {
    console.log("isAlreday review", isAlreadyReviewed);
  }, [isAlreadyReviewed]);

  return (
    <div
      className="row border-bottom border-dark pb-3 mt-3"
      style={{ width: "50vw" }}
    >
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
          <strong>Price per head: </strong>
          {hostel?.price} PKR
        </p>
      </div>
      <div className="amount">
        <p>
          <strong>Contact: </strong> {hostel?.contact}
        </p>
      </div>
      <div className="applydeadline">
        <p>
          <strong>Ratings: </strong>{" "}
          {hostelRating === 0 ? (
            "no rating"
          ) : (
            <>
              {" "}
              {Array(parseInt(hostelRating))
                .fill()
                .map((_, i) => (
                  <span>
                    <StarIcon style={{ color: "gold" }} />
                  </span>
                ))}
              <span>{parseInt(hostelRating)}</span>
              &nbsp;
              <span>({hostelRatingCount})</span>
            </>
          )}
        </p>
      </div>
      <div className="desc">
        <p>{hostel?.description ? hostel?.description : "no description"}</p>
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
      {/**rating box */}
      {hostel?.userId !== currentUser?.id && (
        <>
          {isAlreadyReviewed ? (
            <p className="answer row m-0 mt-3 justify-center">rating given</p>
          ) : (
            <div className="answer row m-0 mt-3">
              <div className={"col-6 rating__wrapper"}>
                <label>Give Rating: </label>
                <div className="rating__stars">
                  <span
                    onClick={() => setRating(1)}
                    className={
                      (rating === 1 && "shine") ||
                      (rating === 2 && "shine") ||
                      (rating === 3 && "shine") ||
                      (rating === 4 && "shine") ||
                      (rating === 5 && "shine")
                    }
                  >
                    <StarIcon />
                  </span>
                  <span
                    onClick={() => setRating(2)}
                    className={
                      (rating === 2 && "shine") ||
                      (rating === 3 && "shine") ||
                      (rating === 4 && "shine") ||
                      (rating === 5 && "shine")
                    }
                  >
                    <StarIcon />
                  </span>
                  <span
                    onClick={() => setRating(3)}
                    className={
                      (rating === 3 && "shine") ||
                      (rating === 4 && "shine") ||
                      (rating === 5 && "shine")
                    }
                  >
                    <StarIcon />
                  </span>
                  <span
                    onClick={() => setRating(4)}
                    className={
                      (rating === 4 && "shine") || (rating === 5 && "shine")
                    }
                  >
                    <StarIcon />
                  </span>
                  <span
                    onClick={() => setRating(5)}
                    className={rating === 5 && "shine"}
                  >
                    <StarIcon />
                  </span>
                </div>
              </div>
              <div
                className="col-6 answer-status "
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {/* modal is in the feedback component */}
                <button
                  className="answers-status-btn  answer-btn"
                  onClick={() => submitRating(hostel?._id)}
                >
                  <span className="fa fa-send"></span> submit rating
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hostel;
