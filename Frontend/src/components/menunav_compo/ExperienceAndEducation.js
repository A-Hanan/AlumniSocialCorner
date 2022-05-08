import React, { useState, useEffect } from "react";
import YearPicker from "react-year-picker";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "./ExperienceAndEducation.css";

const ExperienceAndEducation = ({ currentUser, userData, api }) => {
  const [exps, setExp] = useState([]);
  const [edus, setEdu] = useState([]);
  const [experiencesEdit, showExperiencesEdit] = useState(false);
  const [educationsEdit, showEducationsEdit] = useState(false);
  useEffect(() => {
    setExp(userData?.workExperiences);
    setEdu(userData?.educations);
    console.log(
      "firstly>>>>>>>>>>>>>>>>>>",
      userData?.workExperiences,
      userData?.educations,
      userData
    );
  }, [userData]);
  /*****   education portion */
  const [eduErrors, setEduErrors] = useState([]);
  const [expErrors, setExpErrors] = useState([]);
  const educationTemplate = {
    title: "",
    institution: "",
    startYear: "",
    endYear: "",
  };
  const [educations, setEducations] = useState([]);
  const addEducation = () => {
    setEducations([...educations, educationTemplate]);
  };

  const onChangeForEdu = (e, idx) => {
    console.log("running onchange");
    console.log("index:", idx);
    console.log("e.target.value:", e.target.value);
    const updatedEducations = educations.map((edu, i) =>
      i == idx ? Object.assign(edu, { [e.target.name]: e.target.value }) : edu
    );
    setEducations(updatedEducations);
    console.log("updatedEducations>> ", updatedEducations);
  };
  const handleEduStartYear = (date, idx) => {
    console.log("testing ............", typeof date);
    let e = {
      target: {
        name: "startYear",
        value: date,
      },
    };
    onChangeForEdu(e, idx);
  };
  const handleEduEndYear = (date, idx) => {
    let e = {
      target: {
        name: "endYear",
        value: date,
      },
    };
    onChangeForEdu(e, idx);
  };
  const removeEducation = (idx) => {
    console.log("running remove education");
    const filteredEducations = [...educations];
    filteredEducations.splice(idx, 1);
    setEducations(filteredEducations);
  };
  /*************************************/
  /************ Experience portion */
  const experienceTemplate = {
    title: "",
    firm: "",
    startYear: "",
    endYear: "",
  };
  const [experiences, setExperiences] = useState([]);
  const addExperience = () => {
    setExperiences([...experiences, experienceTemplate]);
  };

  const onChangeForExp = (e, idx) => {
    const updatedExperiences = experiences.map((edu, i) =>
      i == idx ? Object.assign(edu, { [e.target.name]: e.target.value }) : edu
    );
    setExperiences(updatedExperiences);
    console.log("updatedExperiences>> ", updatedExperiences);
  };
  const handleExpStartYear = (date, idx) => {
    let e = {
      target: {
        name: "startYear",
        value: date,
      },
    };
    onChangeForExp(e, idx);
  };
  const handleExpEndYear = (date, idx) => {
    let e = {
      target: {
        name: "endYear",
        value: date,
      },
    };
    onChangeForExp(e, idx);
  };
  const removeExperience = (idx) => {
    console.log("running remove experience");
    const filteredExperiences = [...experiences];
    filteredExperiences.splice(idx, 1);
    setExperiences(filteredExperiences);
  };

  function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }
  const checkEduErrors = () => {
    let data = educations;
    let errors = [];
    data.forEach((i) => errors.push({}));

    data.map((edu, idx) => {
      if (edu.title.length < 1) {
        Object.assign(errors[idx], { title: "this field must be filled" });
      } else if (!onlyLettersAndSpaces(edu.title)) {
        Object.assign(errors[idx], {
          title: "this field must contain letters only",
        });
      }
      if (edu.institution.length < 1) {
        Object.assign(errors[idx], {
          institution: "this field must be filled",
        });
      } else if (!onlyLettersAndSpaces(edu.institution)) {
        Object.assign(errors[idx], {
          institution: "this field must contain letters only",
        });
      }
      if (edu.startYear.length < 1) {
        Object.assign(errors[idx], { startYear: "this field must be filled" });
      }
      if (edu.endYear.length < 1) {
        Object.assign(errors[idx], { endYear: "this field must be filled" });
      } else if (parseInt(edu.startYear) - parseInt(edu.endYear) > 0) {
        Object.assign(errors[idx], {
          endYear: "end date must be larger than start date",
        });
        console.log(
          "parseInt(edu.startYear) - parseInt(edu.endYear) < 0",
          parseInt(edu.startYear) - parseInt(edu.endYear) < 0
        );
      }
    });
    console.log("edu errors>>>", errors);
    setEduErrors(errors);
    return errors;
  };
  const checkExpErrors = () => {
    let data = experiences;
    let errors = [];
    data.forEach((i) => errors.push({}));

    data.map((edu, idx) => {
      if (edu.title.length < 1) {
        Object.assign(errors[idx], { title: "this field must be filled" });
      } else if (!onlyLettersAndSpaces(edu.title)) {
        Object.assign(errors[idx], {
          title: "this field must contain letters only",
        });
      }
      if (edu.firm.length < 1) {
        Object.assign(errors[idx], {
          firm: "this field must be filled",
        });
      } else if (!onlyLettersAndSpaces(edu.firm)) {
        Object.assign(errors[idx], {
          firm: "this field must contain letters only",
        });
      }
      if (edu.startYear.length < 1) {
        Object.assign(errors[idx], { startYear: "this field must be filled" });
      }
      if (edu.endYear.length < 1) {
        Object.assign(errors[idx], { endYear: "this field must be filled" });
      } else if (parseInt(edu.startYear) - parseInt(edu.endYear) > 0) {
        Object.assign(errors[idx], {
          endYear: "end date must be larger than start date",
        });
        console.log(
          "parseInt(edu.startYear) - parseInt(edu.endYear) < 0",
          parseInt(edu.startYear) - parseInt(edu.endYear) < 0
        );
      }
    });
    console.log("exp errors>>>", errors);
    setExpErrors(errors);
    return errors;
  };
  const saveNewEducations = (e) => {
    e.preventDefault();
    /*** check errors */
    let e1 = checkEduErrors();

    /************** */
    let isErrorFound = false;
    console.log("is errror found >>>>>>>>>>>", isErrorFound);
    e1.map((x) => (Object.keys(x).length > 0 ? (isErrorFound = true) : x));
    console.log("is errror found >>>>>>>>>>>", isErrorFound);
    if (!isErrorFound) {
      //save data here
      console.log("saving educations", educations);
      api
        .post("/auth/complete-profile/educations", { educations })
        .then((res) => {
          console.log(res.data);
          setEdu(res.data?.educations);
        })
        .catch((err) => alert("not saved!"));
    }
    window.location.reload();
  };
  const saveNewExperiences = (e) => {
    e.preventDefault();
    /*** check errors */
    let e2 = checkExpErrors();

    /************** */
    let isErrorFound = false;
    console.log("is errror found >>>>>>>>>>>", isErrorFound);
    e2.map((x) => (Object.keys(x).length > 0 ? (isErrorFound = true) : x));
    console.log("is errror found >>>>>>>>>>>", isErrorFound);
    if (!isErrorFound) {
      //save data here
      console.log("saving experiences", experiences);
      api
        .post("/auth/complete-profile/workExperiences", { experiences })
        .then((res) => {
          console.log(res.data);
          setExp(res.data?.workExperiences);
        })
        .catch((err) => alert("not saved!"));
    }
    window.location.reload();
  };
  useEffect(() => {
    if (userData?.workExperiences?.length > 0) {
      setExperiences([...experiences, userData.workExperiences]);
      let data = experiences;
      userData?.workExperiences.forEach((s) => data.push(s));
      setExperiences(data);
    }
    if (userData?.educations?.length > 0) {
      setEducations([...educations, userData.educations]);
      let data = educations;
      userData?.educations.forEach((s) => data.push(s));
      setEducations(data);
    }
  }, [userData]);
  useEffect(() => {
    console.log("experiences>>>", experiences);
    console.log("educations>>>", educations);
  }, [experiences, educations]);
  return (
    <div className="experience__and__education">
      <section className="row my-2 p-3">
        <div className="row">
          <div className="col-6">
            <h5 className="my-4">Work Experience:</h5>
          </div>
          <div className="col-6">
            <span
              className="fa fa-edit edit-icon cursor-pointer"
              onClick={() => showExperiencesEdit(!experiencesEdit)}
            ></span>
          </div>
        </div>
        {exps?.length > 0 ? (
          <>
            {exps.map((exp, i) => (
              <>
                <>
                  <strong>{exp.title}</strong>
                  <span>{exp.firm}</span>
                  <span>
                    {exp.startYear} - {exp.endYear}
                  </span>
                </>
                <br />
                <br />
              </>
            ))}
          </>
        ) : (
          <p>No Experience</p>
        )}
        {experiencesEdit && (
          <>
            {experiences.map((experience, idx) => (
              <div className="dynamic__subgroup" key={idx}>
                <span
                  className="delete__subgroup__btn"
                  onClick={() => removeExperience(idx)}
                >
                  {/* <RemoveCircleOutlineIcon /> */}remove
                </span>
                <div className="group">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Full Stack Developer"
                    name="title"
                    onChange={(e) => onChangeForExp(e, idx)}
                    value={experience.title}
                  />
                  {expErrors[idx]?.title && (
                    <p className="error__para">{expErrors[idx].title}</p>
                  )}
                </div>
                <div className="group">
                  <label>Firm Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Netsol"
                    name="firm"
                    onChange={(e) => onChangeForExp(e, idx)}
                    value={experience.firm}
                  />
                  {expErrors[idx]?.firm && (
                    <p className="error__para">{expErrors[idx].firm}</p>
                  )}
                </div>
                <div className="degree__span__group">
                  <div className="group">
                    <label>Tenure Start Year</label>
                    <div>
                      <YearPicker
                        onChange={(val) => handleExpStartYear(val, idx)}
                        name="startYear"
                        value={experience.startYear}
                      />
                    </div>
                    {expErrors[idx]?.startYear && (
                      <p className="error__para">{expErrors[idx].startYear}</p>
                    )}
                  </div>
                  <div className="group">
                    <label>Tenure End Year</label>
                    <div>
                      <YearPicker
                        onChange={(val) => handleExpEndYear(val, idx)}
                        name="endYear"
                        value={experience.endYear}
                      />
                    </div>
                    {expErrors[idx]?.endYear && (
                      <p className="error__para">{expErrors[idx].endYear}</p>
                    )}
                  </div>
                </div>
                <p>
                  {experience.startYear} - {experience.endYear}
                </p>
              </div>
            ))}
            <button className="add__more__btn" onClick={(e) => addExperience()}>
              +Add More
            </button>
            <div className="col-lg-5 col-md-6 col-12 m-auto mt-3">
              <button className="btn" onClick={(e) => saveNewExperiences(e)}>
                Save
              </button>
            </div>
          </>
        )}
      </section>
      <hr />
      <section className="row my-2 p-3">
        <div className="row">
          <div className="col-6">
            <h5 className="my-4">Education History:</h5>
          </div>
          <div className="col-6">
            <span
              className="fa fa-edit edit-icon cursor-pointer"
              onClick={() => showEducationsEdit(!educationsEdit)}
            ></span>
          </div>
        </div>

        {edus?.length > 0 ? (
          <>
            {edus.map((edu) => (
              <>
                <>
                  <strong>{edu?.title}</strong>
                  <span>{edu?.institution}</span>
                  <span>
                    {edu?.startYear} - {edu?.endYear}
                  </span>
                </>
                <br />
                <br />
              </>
            ))}
          </>
        ) : (
          <p>No Education Data Given</p>
        )}
        {educationsEdit && (
          <>
            {" "}
            {educations.map((education, idx) => (
              <div className="dynamic__subgroup" key={idx}>
                <span
                  className="delete__subgroup__btn"
                  onClick={() => removeEducation(idx)}
                >
                  {/* <RemoveCircleOutlineIcon /> */}remove
                </span>

                <div className="group">
                  <label>Title of Degree</label>
                  <input
                    type="text"
                    placeholder="e.g. BSCS"
                    name="title"
                    onChange={(e) => onChangeForEdu(e, idx)}
                    value={education.title}
                  />
                  {eduErrors[idx]?.title && (
                    <p className="error__para">{eduErrors[idx].title}</p>
                  )}
                </div>
                <div className="group">
                  <label>Name of Institution</label>
                  <input
                    type="text"
                    placeholder="e.g. Comsats"
                    name="institution"
                    onChange={(e) => onChangeForEdu(e, idx)}
                    value={education.institution}
                  />
                  {eduErrors[idx]?.institution && (
                    <p className="error__para">{eduErrors[idx].institution}</p>
                  )}
                </div>
                <div className="degree__span__group">
                  <div className="group">
                    <label>Start Year</label>
                    {/* <input type="text" placeholder="2020" /> */}
                    <div>
                      <YearPicker
                        onChange={(val) => handleEduStartYear(val, idx)}
                        name="startYear"
                        value={education.startYear}
                      />
                    </div>
                    {eduErrors[idx]?.startYear && (
                      <p className="error__para">{eduErrors[idx].startYear}</p>
                    )}
                  </div>
                  <div className="group">
                    <label>End Year</label>
                    {/* <input type="text" placeholder="2022" /> */}
                    <div>
                      <YearPicker
                        onChange={(val) => handleEduEndYear(val, idx)}
                        name="endYear"
                        value={education.endYear}
                      />
                    </div>
                    {eduErrors[idx]?.endYear && (
                      <p className="error__para">{eduErrors[idx].endYear}</p>
                    )}
                  </div>
                  <p>
                    {education.startYear} - {education.endYear}
                  </p>
                </div>
              </div>
            ))}
            <button className="add__more__btn" onClick={(e) => addEducation()}>
              +Add More
            </button>
            <div className="col-lg-5 col-md-6 col-12 m-auto mt-3">
              <button className="btn" onClick={(e) => saveNewEducations(e)}>
                Save
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ExperienceAndEducation;
