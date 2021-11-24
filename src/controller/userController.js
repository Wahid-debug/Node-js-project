const userModel = require("../models/users");
const validateSchema = require("../validator/validation");
const transporter = require("../nodemailer/nodemailer");
const otpModel = require("../models/otp");
const hashPassword = require("../hashingPassword/hashingPassword");

const getUser = async (req, res) => {
  // const userSchema = await validateSchema.userValidation(req);
  // if(userSchema && userSchema.error !== undefined){
  //     return res.status(400).json({status:false, message: userSchema.error.details[0].message})
  // }
  try {
    const userData = await userModel
      .findOne({ _id: req.user._id })
      .select("-password -updatedAt -__v");
    console.log(req.user._id, "req.user._id, ");
    if (!userData) {
      return res.json({ status: false, message: "User not found" });
    }
    console.log(userData);
    return res.status(200).json({ status: true, data: userData });
  } catch (error) {
    console.log(error);
  }
};

const forgetPassword = async (req, res) => {
  const userSchema = await validateSchema.userValidation(req);
  if (userSchema && userSchema.error !== undefined) {
    return res
      .status(400)
      .json({ status: false, message: userSchema.error.details[0].message });
  }
  try {
    const user = await userModel({ $where: { email: req.body.email } });
    if (!user) {
      return res.status(402).json({ message: "No user found with this email" });
    }
    let otpCode = Math.floor(100000 + Math.random() * 900000); //Generate random 6 digit code.
    const mailData = {
      from: "'Technical Wahid' <wahid.siddiqui2021@gmail.com>", // sender address
      to: "wahid.zamal@gmail.com", //list of receivers
      subject: "Sending Email using node js",
      text: "That was easy",
      html: `<!DOCTYPE> 
            <html>
              <body>
                <p>Your authentication code is : </p> <b>${otpCode}</b>
              </body>
            </html>`,
    };
    const info = await transporter.main(mailData, otpCode);
    console.log(info, "info");
    if (info !== undefined) {
      return res.json({
        status: false,
        message: "could not send mail , please try again later",
      });
    }

    const otpData = new otpModel({
      email: req.body.email,
      code: otpCode,
      expiryIn: new Date().getTime() + 300 * 1000,
    });
    const otpResponse = await otpData.save();
    return res.json({
      status: true,
      Message: "We will send you email for reset password",
      data: otpResponse,
    });
  } catch (err) {
    console.log(err, "err");
    return res.json({
      status: false,
      message: "something went wrong, i could not send email",
    });
  }
};

const resetPassword = async (req, res) => {
  const userSchema = await validateSchema.resetValidation(req);
  if (userSchema && userSchema.error !== undefined) {
    return res
      .status(400)
      .json({ status: false, message: userSchema.error.details[0].message });
  }
  try {
    const data = await otpModel.findOne({
      email: req.body.email,
      code: req.body.code,
    });
    if (!data) {
      return res
        .status(401)
        .json({ status: false, message: "This email is not dataBase" });
    }
    let currentTime = new Date().getTime();
    let diff = data.expiryIn - currentTime;
    if (diff < 0) {
      return res.json({
        status: false,
        message: "Password reset token is invalid or has expired.",
      });
    }
    let hashed = await hashPassword.hashingPassword(req.body.password, 10);
    const user = await userModel.findOne({ email: req.body.email });
    console.log(user, "user");
    user.password = hashed;
    //console.log(user, "user");
    const passwordChanged = await user.save();
    console.log(passwordChanged, "user");
    return res.json({
      status: true,
      message: "password Changed successfully ",
      data: passwordChanged,
    });
  } catch (err) {
    console.log(err, "reset error");
    return res.json({
      status: false,
      message: "Opps! Password did not chnage",
    });
  }
};

module.exports = { getUser, forgetPassword, resetPassword };
