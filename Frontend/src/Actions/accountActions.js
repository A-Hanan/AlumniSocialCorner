import api from "../utils/api";
import AES from "crypto-js/aes";
import { logoutUser } from "./userActions";

export const accountUpdateAction = async (
  oldPassword,
  newPassword,
  navigate,
  currentUser
) => {
  console.log("account update action");

  oldPassword = AES.encrypt(oldPassword, "alumnisocialcorner").toString();
  newPassword = AES.encrypt(newPassword, "alumnisocialcorner").toString();
  const userData = {
    old_password: oldPassword,
    password: newPassword,
  };
  console.log("userData", userData);
  api
    .post("/auth/update", userData)
    .then((res) => {
      console.log("res.data>>>", res.data);
      if (res.data.userData) {
        window.location.href = "/login";
      } else {
        alert("account updation failed");
      }
    })
    .catch((err) => alert("account updation failed"));
};
