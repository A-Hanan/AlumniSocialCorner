const express = require("express");
const User = require("../models/User");
const UserData = require("../models/UserData");
const UserVerification = require("../models/UserVerification");

const nodemailer = require("nodemailer");
//for unique string
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const CryptoJS = require("crypto-js");
var path = require("path");
const { serialize } = require("v8");

require("dotenv").config();

//nodemailer stuff
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});
console.log(process.env.AUTH_EMAIL, process.env.AUTH_PASS);
//testing nodemailer stuff
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready for sending mails");
    console.log(success);
  }
});

const sendVerificationEmail = ({ _id, email }) => {
  //url to use in the email
  const currentUrl = "http://www.iamluckyticket.com/";

  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your Email",
    html: `<p>Verify your email address in order to
     use AlumniSocialCorner.</p><p>This link <b>expires in
      6 hours</b>.</p><p>Press <a href=${
        currentUrl + "user/verify/" + _id + "/" + uniqueString
      }>here</a> to proceed.</p>`,
  };
  //hash the uniqueString
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      const newVerification = new UserVerification({
        userid: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });
      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              //email sent and verification record saved
              res.status(200).send("Verification email sent successfully");
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send("Verification email failed");
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Could not save email verification data");
        });
    })
    .catch(() => {
      res.status(500).send("error while hashing email data");
    });
};
//send verif email
router.post("/send-verify-email", (req, res) => {
  console.log("sending verification email");

  const { _id, email } = req.body;
  const currentUrl = "http://localhost:3000/";

  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your Email",
    html: `<p>Verify your email address in order to
     use Alumni Social Corner site.</p><p>This link <b>expires in
      6 hours</b>.</p><p>Press <a href=${
        currentUrl + "email-verification/" + _id + "/" + uniqueString
      }>here</a> to proceed.</p>`,
  };
  //hash the uniqueString
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });
      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              //email sent and verification record saved
              res.status(200).send("Verification email sent successfully");
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send("Verification email failed");
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Could not save email verification data");
        });
    })
    .catch(() => {
      res.status(500).send("error while hashing email data");
    });
});
//verify email
router.get("/verify/:userId/:uniqueString", (req, res) => {
  let { userId, uniqueString } = req.params;
  console.log("user Id at verify: ", userId);
  UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        //user verification records exist so we proceed further
        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;

        //checking expired unique string
        if (expiresAt < Date.now()) {
          //record has expired so we delete it
          UserVerification.deleteOne({ userId })
            .then((res) => {
              let message = "Link has expired. please signup again.";
              res.status(500).json({ message: message });
              // res.redirect(`/user/verified/error=true&message=${message}`);
            })
            .catch((error) => {
              let message =
                "An error occurs while clearing expired user verification record.";
              res.status(500).json({ message: message });
              // res.redirect(`/user/verified/error=true&message=${message}`);
            });
        } else {
          //if validate record exist we validate the user string
          //first compare the hashed unique string
          console.log("uniqueString", uniqueString);
          console.log("hashedUniqueString", hashedUniqueString);
          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              console.log("result at auth vrif> ", result);
              if (result) {
                //strings matches
                User.updateOne({ _id: userId }, { verified: true }).then(() => {
                  UserVerification.deleteOne({ userId })
                    .then((result) => {
                      let message = "Verified successfully.";
                      res.status(200).json({ message: message });
                      // res.redirect(
                      //   `/user/verified/error=true&message=${message}`
                      // );
                    })
                    .catch((error) => {
                      let message =
                        "An error occurs while finalyzing successful verification.";
                      res.status(500).json({ message: message });
                      // res.redirect(
                      //   `/user/verified/error=true&message=${message}`
                      // );
                    });
                });
              } else {
                //existing record but incorrect verifications detailed passed
                let message =
                  "Incorrect verification details passed. check inbox";
                res.status(500).json({ message: message });
                // res.redirect(`/user/verified/error=true&message=${message}`);
              }
            })
            .catch((error) => {
              console.log(error);
              let message = "An error occurs while comparing uniquestring.";
              res.status(500).json({ message: message });
              // res.redirect(`/user/verified/error=true&message=${message}`);
            });
        }
      } else {
        let message =
          "Account record does not exist or has been verified already. Please signup or login.";
        res.status(500).json({ message: message });
        // res.redirect(`/user/verified/error=true&message=${message}`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message =
        "An error occured while checking for existing user verification record.";
      res.status(500).json({ message: message });
      // res.redirect(`/user/verified/error=true&message=${message}`);
    });
});

//////////////////////////////
//////////////////////////////// sending forgot password link program //////////////////////////////
router.post("/send-change-password-link", (req, res) => {
  console.log("sending verification email");

  const { email, id } = req.body;
  const currentUrl = "http://localhost:3000/";

  const uniqueString = uuidv4() + id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Recover your password",
    html: `<p>This link <b>expires in
      6 hours</b>.</p><p>Press <a href=${
        currentUrl + "recover-password/" + id + "/" + uniqueString
      }>here</a> to recover your account.</p>`,
  };
  //hash the uniqueString
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      const newVerification = new UserVerification({
        userId: id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });
      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              //email sent and verification record saved
              res.status(200).send("recovery email sent successfully");
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send("recovery email failed");
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Could not save accout recovery data");
        });
    })
    .catch(() => {
      res.status(500).send("error while hashing email data");
    });
});

router.get(
  "/recovery/update-password/:userId/:uniqueString/:newPassword",
  async (req, res) => {
    let { uniqueString, userId, newPassword } = req.params;
    /***creating new password */
    var bytes = CryptoJS.AES.decrypt(newPassword, "CONNECTLEGAL");
    var password = bytes.toString(CryptoJS.enc.Utf8);
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(password, salt);
    /*** */
    console.log("user Id at verify: ", userId);
    UserVerification.find({ userId })
      .then((result) => {
        if (result.length > 0) {
          //user verification records exist so we proceed further
          const { expiresAt } = result[0];
          const hashedUniqueString = result[0].uniqueString;

          //checking expired unique string
          if (expiresAt < Date.now()) {
            //record has expired so we delete it
            UserVerification.deleteOne({ userId })
              .then((res) => {
                let message = "Link has expired. please signup again.";
                res.status(500).json({ message: message });
                // res.redirect(`/user/verified/error=true&message=${message}`);
              })
              .catch((error) => {
                let message =
                  "An error occurs while clearing expired user verification record.";
                res.status(500).json({ message: message });
                // res.redirect(`/user/verified/error=true&message=${message}`);
              });
          } else {
            //if validate record exist we validate the user string
            //first compare the hashed unique string
            console.log("uniqueString", uniqueString);
            console.log("hashedUniqueString", hashedUniqueString);

            bcrypt
              .compare(uniqueString, hashedUniqueString)
              .then((result) => {
                console.log("result at auth vrif> ", result);
                if (result) {
                  //strings matches
                  console.log("everything matches");

                  User.updateOne({ _id: userId }, { password: secPass }).then(
                    () => {
                      UserVerification.deleteOne({ userId })
                        .then((result) => {
                          let message = "recovered successfully.";
                          res.status(200).json({ message: message });
                        })
                        .catch((error) => {
                          let message =
                            "An error occurs while finalyzing successful recovery.";
                          res.status(500).json({ message: message });
                        });
                    }
                  );
                } else {
                  //existing record but incorrect verifications detailed passed
                  let message =
                    "Incorrect recovery details passed. check inbox";
                  res.status(500).json({ message: message });
                  // res.redirect(`/user/verified/error=true&message=${message}`);
                }
              })
              .catch((error) => {
                console.log(error);
                let message = "An error occurs while comparing uniquestring.";
                res.status(500).json({ message: message });
                // res.redirect(`/user/verified/error=true&message=${message}`);
              });
          }
        } else {
          let message =
            "Account record does not exist . Please signup or login.";
          res.status(500).json({ message: message });
          // res.redirect(`/user/verified/error=true&message=${message}`);
        }
      })
      .catch((err) => {
        console.log(err);
        let message =
          "An error occured while checking for existing user verification record.";
        res.status(500).json({ message: message });
        // res.redirect(`/user/verified/error=true&message=${message}`);
      });
  }
);

///////////////////////////////////////////////////////////////////////////////////////////////////

const JWT_SECRET = "alumnisocialcorner";
var checkNull = true;
// Route 1: Create a user using: POST "/api/auth/createuser", No login required
router.post("/createuser", async (req, res) => {
  let success = false;

  // If there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  // Check Weather the user with this email exits already
  console.log("req>", req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success, error: "Sorry a user with email already exits" });
    }

    var bytes = CryptoJS.AES.decrypt(req.body.pass, "alumnisocialcorner");
    var password = bytes.toString(CryptoJS.enc.Utf8);
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(password, salt);
    console.log("password>>", secPass);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    let userData = await UserData.create({
      name: req.body.name,
      userId: user.id,
      status: req.body?.status,
      gender: req.body?.gender,
      university: req.body?.university,
      phone: req.body?.phone,
      address: req.body?.address,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    //res.json(user)
    success = true;
    res.json({ success, authtoken, data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});

// Route 2: Authenticate a user using: POST "/api/auth/login", No login required
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password cant be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("login req>", req.body);
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct information" });
      }

      //decrypt here
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct information",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // const dataFp = await UserData.findOne({ userId: user.id });
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        verified: user.verified,
        // profile: dataFp.profile,
      };
      success = true;
      res.json({ success, authtoken, userData });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
router.post("/get-auth-token-fb-user", (req, res) => {
  const { id } = req.body.userID;
  const data = {
    user: {
      id: id,
    },
  };
  try {
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.status(200).json(authtoken);
  } catch (err) {
    res.status(500).send("error in generating auth token for fb user");
  }
});
router.get("/check-userdata-exists/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    let user = await UserData.findOne({ userId });
    if (!user) {
      res
        .status(400)
        .json({ error: "Please try to login with correct information" });
    } else {
      res.status(200).send("ok");
    }
  } catch (err) {
    res.status(404).json({ error: "not found" });
  }
});
router.post("/complete-profile-data", async (req, res) => {
  const userData = req.body;
  console.log("user data>", userData);
  try {
    let user = await UserData.create(userData);
    res.status(200).send("user data saved successfully");
  } catch (err) {
    console.log("err>", err);
    res.status(500).send("internal server error");
  }
});
router.get("/get-user-data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let userData = await UserData.findOne({ userId: id });
    if (UserData) {
      res.status(200).json(userData);
    } else {
      res.status(404).send("not found");
    }
  } catch (err) {
    console.log("err>", err);
    res.status(500).send("internal server error");
  }
});
// //verify fb user
// router.post("/verify-fb-user", async (req, res) => {
//   const { name, email, profile, fbId } = req.body;
//   try {
//     const fbUser = await FbUser.create({
//       name: name,
//       email: email,
//       profile: profile,
//       fbId: fbId,
//       verified: true,
//     });
//     res.status(200).json(fbUser);
//   } catch (err) {
//     res.status(500).send("cannot verify fb user");
//   }
// });
// //login Fb User
// router.post("/login-fb-user", async (req, res) => {
//   const { fbId } = req.body;
//   try {
//     const fbUser = await FbUser.find({ fbId: fbId });
//     if (fbUser.length > 0) {
//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const authtoken = jwt.sign(data, JWT_SECRET);
//       const userData = {
//         id: fbUser.id,
//         name: fbUser.name,
//         email: fbUser.email,
//         verified: fbUser.verified,
//       };
//       const success = true;
//       res.status(200).json(success, userData, authtoken);
//     } else {
//       res.status(404).send("fbUser not found");
//     }
//   } catch (err) {
//     re.status(500).send("error while finding fb user");
//   }
// });

// Route 3: Get logged in users detail using: POST "/api/auth/getuser", login required
router.post("/getuser", fetchuser, async (req, res) => {
  //this will not work incase of google or facebook user

  try {
    userId = req.userId;
    console.log("userId", userId);
    const user = await User.findById(userId).select("-password");
    return res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});
//get user by id in url
router.get("/getUserById/:userId", async (req, res) => {
  //this will not work incase of google or facebook user

  try {
    userId = req.params.userId;
    console.log("userId", userId);
    const user = await User.findById(userId).select("-password");
    return res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 *  @desc Update Login User
 *
 *  @param name
 *  @param qualification
 *  @param password
 */
router.post("/update", fetchuser, async (req, res) => {
  try {
    const { password, old_password } = req.body;
    const userId = req.userId;

    //console.log("old password", old_password);
    if (old_password) {
      let oldPasswordBytes = CryptoJS.AES.decrypt(
        old_password,
        "alumnisocialcorner"
      );
      let oldPassword = oldPasswordBytes.toString(CryptoJS.enc.Utf8);
      let user = await User.findOne({ _id: userId });
      //console.log(user);
      const passwordCompare = await bcrypt.compare(oldPassword, user.password);
      //console.log("password compare>>>>", passwordCompare);
      if (!passwordCompare) {
        return res.status(500).send("wrong information sent");
      }
    }

    const updatedData = {};

    if (password) {
      let bytes = CryptoJS.AES.decrypt(password, "alumnisocialcorner");
      let pass = bytes.toString(CryptoJS.enc.Utf8);
      const salt = await bcrypt.genSaltSync(10);
      updatedData.password = await bcrypt.hash(pass, salt);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedData },
      {
        new: true,
        upsert: true,
      }
    );
    //console.log("updation true");
    const userData = {
      name: updatedUser.name,
    };
    res.status(200).json({
      success: true,
      userData,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.post(
  "/complete-profile/workExperiences",
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.userId;
      console.log("req", req.body);

      const workExperiences = req.body.experiences;
      // let temp = await UserData.findOne({ userId });
      // temp?.workExperiences.forEach((t) => workExperiences.push(t));

      const filter = { userId: userId };
      const option = { $set: { workExperiences: workExperiences } };
      const updatedUser = await UserData.findOneAndUpdate(filter, option);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);
router.post("/complete-profile/educations", fetchuser, async (req, res) => {
  try {
    const userId = req.userId;
    const { educations } = req.body;
    // let temp = await UserData.findOne({ userId });
    // temp?.educations.forEach((t) => educations.push(t));
    const filter = { userId: userId };
    const option = { $set: { educations: educations } };
    const updatedUser = await UserData.findOneAndUpdate(filter, option);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
router.get("/check-user-by-email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.find({ email });
    console.log("finding user by email >>> ", user);
    const response = {
      success: true,
      id: user[0]._id,
    };
    console.log("response>>>>>>>>", response);
    if (user.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).send("user with this email not found");
    }
  } catch (err) {
    res.status(404).send("error in finding email");
  }
});

module.exports = router;
