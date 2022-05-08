import api from "../utils/api";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});
const sendVerificationEmail = (currentUser) => {
  console.log("running");

  const body = {
    _id: currentUser.id,
    email: currentUser.email,
  };
  console.log(body);
  api
    .post("/auth/send-verify-email", body)
    .then((res) => {
      console.log("res from sending verif email>>", res);
      window.location.href("/verify-your-account");
    })
    .catch((err) => console.log(err));
};

export const registerUser = (user, navigate) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  console.log("user at userActions >>> ", user);
  try {
    const response = await api.post("/auth/createUser", user);
    console.log("response>>>", response.data);
    let currentUser = {
      id: response.data.data.user.id,
      email: user?.email,
    };
    sendVerificationEmail(currentUser);
    Swal.fire("Registered Successfully!", "", "success");
    navigate("/verify-your-account");
    window.location.reload();
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
    console.log("error at register>>>", error);
    swalWithBootstrapButtons.fire(
      "Registeration Unsuccessful!",
      "Something goes wrong",
      "error"
    );
  }
};
export const submitCompleteProfile =
  (userData, navigate) => async (dispatch) => {
    console.log("userData at userActions >>> ", userData);
    try {
      const response = await api.post("/auth/complete-profile-data", userData);
      console.log("response>>>", response.data);
      Swal.fire("Profile Completed Successfully!", "", "success");
      navigate("/askquestion");
      window.location.reload();
    } catch (error) {
      console.log("error at complete profile>>>", error);
      swalWithBootstrapButtons.fire(
        "Profile Completion Unsuccessful!",
        "Something goes wrong",
        "error"
      );
    }
  };

export const loginUser = (user, navigate) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  console.log("user request at loginUserAction>>> ", user);
  try {
    const response = await api.post("/auth/login", user);
    const userData = response.data.userData;
    console.log("userdata at login>>>", userData);

    if (userData?.verified) {
      localStorage.setItem("token", response.data.authtoken);
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: userData });
      localStorage.setItem("currentUser", JSON.stringify(userData));
      Swal.fire("Logged in Successfully!", "", "success");
      navigate("/askquestion");
    } else {
      navigate("/verify-your-account");
    }
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
    swalWithBootstrapButtons.fire(
      "login Unsuccessful!",
      "incorrect information",
      "error"
    );
  }
};

export const loginUserByGoogle = (data) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  let user = {
    id: data?.googleId,
    name: data?.profileObj.name,
    email: data?.profileObj.email,
    // profile: data?.profileObj.imageUrl,
  };
  let token = data?.tokenId;

  try {
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", token);
    /************* setting up get extra info page */
    api
      .get(`/auth/check-userdata-exists/${user.id}`)
      .then((res) => {
        if (res.data) {
          console.log("res.data>>>", res.data);
          window.location.href = "/askquestion";
        }
      })
      .catch((err) => {
        console.log("err>>>", err);
        window.location.href = "/complete-profile";
      });

    /******************************************** */
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};
export const loginUserByFacebook = (data) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  let user = {
    id: data?.id,
    name: data?.name,
    email: data?.email,
    // profile: data?.picture.data.url,
  };
  /* let token = data?.signedRequest;*/
  let token;
  try {
    token = await api
      .post("/auth/get-auth-token-fb-user", {
        userID: data.userID,
      })
      .then((res) => res.data);
  } catch (err) {
    console.log(err);
    dispatch({ type: "USER_LOGIN_FAILED", payload: err });
    return;
  }
  console.log("action fb data>>> ", user);

  try {
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", token);
    /************* setting up get extra info page */
    api
      .get(`/auth/check-userdata-exists/${user.id}`)
      .then((res) => {
        if (res.data) {
          console.log("res.data>>>", res.data);
          window.location.href = "/askquestion";
        }
      })
      .catch((err) => {
        console.log("err>>>", err);
        window.location.href = "/complete-profile";
      });

    /******************************************** */
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  localStorage.clear();
  window.location.href = "/login";
};
/*
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });

  try {
    const response = await axios.get("/api/users/getallusers");
    console.log(response);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("/api/users/deleteuser", { userid });
    alert("User deleted successfully!!!");
    window.location.reload();
  } catch (error) {
    alert("Something went wrong!!!");
    console.log(error);
  }
};
*/
