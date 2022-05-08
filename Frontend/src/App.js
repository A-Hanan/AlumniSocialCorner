import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { Feedback } from "./components/newsfeed/Feedback";
import { Search } from "./components/menunav_compo/Search";
import { Profile } from "./components/menunav_compo/Profile";
import { Notification } from "./components/menunav_compo/Notification";
import { AskQ } from "./components/askquestion/AskQ";
import NotFound from "./components/common/NotFound";
import { CompleteProfile } from "./components/auth/CompleteProfile";
import { Addnewidea } from "./components/fyp/Addnewidea";
import { Projects } from "./components/projects/Projects";
import { Postproject } from "./components/projects/Postproject";
import { Scholarship } from "./components/scholarships/Scholarship";
import { PostScholarships } from "./components/scholarships/PostScholarships";
import { Internship } from "./components/internships/Internship";
import { Postinternship } from "./components/internships/Postinternship";
import { Userinternship } from "./components/internships/Userinternship";
import { Hostels } from "./components/hostel/Hostels";
import { Posthostel } from "./components/hostel/Posthostel";
import { Fyps } from "./components/fyp/Fyps";
import { Addalready } from "./components/fyp/Addalready";
import { Seealready } from "./components/fyp/Seealready";
import { Listnew } from "./components/fyp/Listnew";
// import {useState} from 'react'
import LoadingBar from "react-top-loading-bar";
import { Settings } from "./components/menunav_compo/Settings";
import { Answers } from "./components/newsfeed/Answers";
import { Deletenewfyp } from "./components/fyp/Deletenewfyp";
import { Usernewsfeed } from "./components/newsfeed/usernewsfeed";
import { Deletealreadyfyp } from "./components/fyp/Deletealreadyfyp";
import { Userhostels } from "./components/hostel/userhostel";
import { Userprojects } from "./components/projects/userprojects";
import { Userscholarship } from "./components/scholarships/userscholarships";
import VerifyEmail from "./components/verifications/VerifyEmail";
import ForgotPassword from "./components/verifications/ForgotPassword";
import RecoverPassword from "./components/verifications/RecoverPassword";

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <BrowserRouter>
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/newsfeed" element={<Feedback />} />
          <Route path="/newsfeed/usernewsfeed" element={<Usernewsfeed />} />
          <Route path="/newsfeed/answers/:questionId" element={<Answers />} />
          <Route
            path="/askquestion"
            element={<AskQ setProgress={setProgress} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/fyp" element={<Fyps />} />
          <Route path="/fyp/addnew" element={<Addnewidea />} />
          <Route path="/fyp/addalready" element={<Addalready />} />
          <Route path="/fyp/seealready" element={<Seealready />} />
          <Route path="/fyp/listnew" element={<Listnew />} />
          <Route path="/fyp/deletenewfyp" element={<Deletenewfyp />} />
          <Route path="/fyp/deletealreadyfyp" element={<Deletealreadyfyp />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/post" element={<Postproject />} />
          <Route path="/projects/userprojects" element={<Userprojects />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route
            path="/scholarship/userscholarship"
            element={<Userscholarship />}
          />
          <Route path="/scholarship/post" element={<PostScholarships />} />
          <Route path="/internship" element={<Internship />} />
          <Route
            path="/internship/userinternship"
            element={<Userinternship />}
          />
          <Route path="/internship/post" element={<Postinternship />} />
          <Route path="/hostels" element={<Hostels />} />
          <Route path="/hostels/post" element={<Posthostel />} />
          <Route path="/hostels/userhostels" element={<Userhostels />} />
          <Route
            path="/email-verification/:userId/:uniqueString"
            exact
            element={<VerifyEmail />}
          />
          <Route path="/verify-your-account" exact element={<VerifyEmail />} />
          <Route
            path="/recover-password/:userId/:uniqueString"
            exact
            element={<RecoverPassword />}
          />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
