import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  console.log("not found");
  return (
    <div className={"notfound"}>
      <div>
        <h1 className="notfound-text">Page Not Found</h1>
        <p className="notfound-text">Sorry, this page does not exist</p>
        {/* <Link to="/askquestion" className="link-btn">
          Home
        </Link> */}
      </div>
    </div>
  );
};

export default NotFound;
