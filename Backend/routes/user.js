const express = require("express");
const User = require("../models/User");
const UserData = require("../models/UserData");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

router.get("/", async (req, res) => {
  try {
    //console.log("User>>>> ", User.find({}).select("-password"));
    const user = await User.find().select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getUserById/:userId", fetchuser, async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);
  try {
    const user = await User.findOne({ id: userId });
    console.log("user>>> ", user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
router.get("/getUserBy", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    //console.log("user id = ", userId);
    //console.log("user name = ", username);
    //console.log("User>>> ", User);
    const users = userId
      ? await User.findOne({ _id: userId })
      : await User.findOne({ name: username });
    // const { password, updatedAt, ...other } = user._doc;
    //console.log("user>>>> ", users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put("/updateProfileImage", async (req, res) => {
  try {
    const requiredUserId = req.body.userId ?? "";
    const requiredUserImageUrl = req.body.imgUrl ?? "";
    //console.log(requiredUserId, requiredUserImageUrl);
    const user = await UserData.updateOne(
      { userId: requiredUserId },
      { $set: { profile: requiredUserImageUrl } }
    );
    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/updateUsername", async (req, res) => {
  try {
    const requiredUserId = req.body.userId ?? "";
    const requiredUsername = req.body.username ?? "";
    console.log(requiredUserId, requiredUsername);
    const user =
      requiredUsername &&
      (await User.updateOne(
        { _id: requiredUserId },
        { $set: { name: requiredUsername } }
      ));
    // console.log(user);

    res.status(200).json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.delete("/deleteAll", (req, res) => {
  try {
    User.deleteMany({}).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});
router.delete("/deleteUser/:userId", (req, res) => {
  try {
    User.deleteOne({ _id: req.params.userId }).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
