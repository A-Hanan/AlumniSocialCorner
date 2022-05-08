import React, { useState, useEffect } from "react";
import Project from "../projects/Project";
import Hostel from "../hostel/Hostel";
import Question from "../newsfeed/Question";

const SearchedData = ({ searchText, searchedData, searchType }) => {
  useEffect(() => {
    console.log("i searched data compoent");
    console.log("searchText", searchText);
    console.log("searchedData", searchedData);
    console.log("searchType", searchType);
  });
  return (
    <div>
      {" "}
      {searchText.length == 0 ? (
        <div className="row mt-5">
          <h5 className="text-center">
            Search anything on this website. You can search posts, questions,
            FYPs, hostels, projects, scholarships, internships etc
          </h5>
        </div>
      ) : (
        <div>
          {searchType == "Projects" &&
            searchedData.map((project) => <Project project={project} />)}
          {searchType == "Hostels" &&
            searchedData.map((hostel) => <Hostel hostel={hostel} />)}
          {searchType == "Questions" &&
            searchedData.map((question) => (
              <Question question={question} isSearchedData={true} />
            ))}
          {searchType == "New FYPs" && (
            <>
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
                  {searchedData.map((f, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{f?.title}</td>
                      <td>{f?.projectType}</td>
                      <td>{f?.description}</td>
                      <td>{new Date(f?.createdAt).toDateString()}</td>
                      <td>
                        <a href={f?.projectLink}>
                          <i className="fa fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {searchType == "Already Created FYPs" && (
            <>
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
                  {searchedData.map((f, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{f?.title}</td>
                      <td>{f?.projectType}</td>
                      <td>{f?.description}</td>
                      <td>{f?.completionDate}</td>
                      <td>
                        <a href={f?.projectLink}>
                          <i className="fa fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {searchType == "Scholarships" &&
            searchedData.map((sch) => (
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
          {searchType == "Internships" &&
            searchedData.map((inte) => (
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
      )}
    </div>
  );
};

export default SearchedData;
