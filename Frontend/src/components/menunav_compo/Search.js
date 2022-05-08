import React, { useState, useEffect } from "react";
import { Header } from "../common/Header";
import { Menunav } from "../common/Menunav";
import { Sidebar } from "../common/Sidebar";
import api from "../../utils/api";

// import {Link } from 'react-router-dom';
import "./Search.css";
import SearchedData from "./SearchedData";

export const Search = () => {
  const [searchType, setSearchType] = useState("Questions");
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    // console.log("searchType", searchType);
    if (searchType == "Questions") {
      api
        .get("/questions")
        .then((res) => {
          // console.log("questions", res.data);
          setData(res.data);
        })
        .catch((err) => console.log);
    }
    if (searchType == "Projects") {
      api
        .get("/projects")
        .then((res) => {
          // console.log("projects", res.data);
          setData(res.data);
        })
        .catch((err) => console.log);
    }
    if (searchType == "Scholarships") {
      api
        .get("/scholarships")
        .then((res) => {
          // console.log("scholarships", res.data);
          setData(res.data);
        })
        .catch((err) => console.log);
    }
    if (searchType == "Internships") {
      api
        .get("/internships")
        .then((res) => {
          // console.log("internships", res.data);
          setData(res.data);
        })
        .catch((err) => console.log);
    }
    if (searchType == "Hostels") {
      api
        .get("/hostels")
        .then((res) => {
          // console.log("hostels", res.data);
          setData(res.data);
        })
        .catch((err) => console.log);
    }
    if (searchType == "New FYPs") {
      console.log("running");
      api
        .get("/FYPs/new")
        .then((res) => {
          // console.log("new FYPs", res.data);
          setData(res.data);
        })
        .catch((err) => console.log);
    }
    if (searchType == "Already Created FYPs") {
      api
        .get("/FYPs/already-created")
        .then((res) => {
          // console.log("already created fyps", res.data);
          setData(res.data);
        })
        .catch((err) => console.log);
    }
  }, [searchType]);
  useEffect(() => {
    // console.log("searchText", searchText);
    let array = [];
    if (data?.length > 0) {
      if (searchType == "Questions") {
        data.map((d) => {
          let flag = false;
          if (d?.question.toLowerCase().search(searchText) != -1) {
            flag = true;
          }
          if (d.tags.length > 0) {
            d.tags.forEach((t) => {
              if (t.toLowerCase().search(searchText) != -1) {
                flag = true;
              }
            });
          }
          if (flag == true) {
            array.push(d);
          }
        });
      }
      if (searchType == "Projects") {
        data.map((d) => {
          let flag = false;
          if (d?.title.toLowerCase().search(searchText) != -1) {
            flag = true;
          }
          if (d?.projectType.toLowerCase().search(searchText) != -1) {
            flag = true;
          }
          if (d.tags.length > 0) {
            d.tags.forEach((t) => {
              if (t.toLowerCase().search(searchText) != -1) {
                flag = true;
              }
            });
          }
          if (flag == true) {
            array.push(d);
          }
        });
      }
      if (searchType == "Scholarships") {
        data.map((d) => {
          let flag = false;
          if (d?.title.toLowerCase().search(searchText) != -1) {
            flag = true;
          }

          if (flag == true) {
            array.push(d);
          }
        });
      }
      if (searchType == "Internships") {
        data.map((d) => {
          let flag = false;
          if (d?.companyName.toLowerCase().search(searchText) != -1) {
            flag = true;
          }

          if (flag == true) {
            array.push(d);
          }
        });
      }
      if (searchType == "Hostels") {
        data.map((d) => {
          let flag = false;
          if (d?.hostelName.toLowerCase().search(searchText) != -1) {
            flag = true;
          }
          if (d?.description.toLowerCase().search(searchText) != -1) {
            flag = true;
          }
          if (d.tags.length > 0) {
            d.tags.forEach((t) => {
              if (t.toLowerCase().search(searchText) != -1) {
                flag = true;
              }
            });
          }
          if (flag == true) {
            array.push(d);
          }
        });
      }
      if (searchType == "New FYPs") {
        data.map((d) => {
          let flag = false;
          if (d?.title.toLowerCase().search(searchText) != -1) {
            flag = true;
          }

          if (flag == true) {
            array.push(d);
          }
        });
      }
      if (searchType == "Already Created FYPs") {
        data.map((d) => {
          let flag = false;
          if (d?.title.toLowerCase().search(searchText) != -1) {
            flag = true;
          }

          if (flag == true) {
            array.push(d);
          }
        });
      }
    }
    setSearchedData(array);
    // console.log("searched data=>", array);
  }, [searchText]);
  useEffect(() => {
    // console.log("searched data=>", searchedData);
  }, [searchedData]);
  return (
    <div>
      <Header />
      <Menunav />
      <div className="row">
        <div className="col-md-2 col-0">
          <Sidebar />
        </div>
        <div className="col-md-10 col-12">
          <div className="container mt-5 mb-3">
            <div className="row search-box col-lg-6 col-md-8 col-12 m-auto bg-gray-100 bg-opacity-50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out">
              <div className="col-1 text-center">
                <span className="fa fa-search"></span>
              </div>
              <div className="col-11">
                <input
                  type="text"
                  placeholder="Search"
                  name="name"
                  onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                  className=" bg-gray-100 bg-opacity-50  text-base w-full outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="sorting__area mt-3   flex justify-right">
              <h6>Search DataType</h6>
              <select
                className="border border-gray ml-4"
                name="sortingOptions"
                id="sortingOptions"
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="Questions">Questions</option>
                <option value="Projects">Projects</option>
                <option value="New FYPs">New FYPs</option>
                <option value="Already Created FYPs">
                  Already Created FYPs
                </option>
                <option value="Hostels">Hostels</option>
                <option value="Scholarships">Scholarships</option>

                <option value="Internships">Internships</option>
              </select>
            </div>
            <SearchedData
              searchType={searchType}
              searchText={searchText}
              searchedData={searchedData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
