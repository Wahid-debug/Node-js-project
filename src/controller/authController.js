const bcrypt = require("bcrypt");
const userModel = require("../models/users");
const transporter = require("../nodemailer/nodemailer");
const validationSchema = require("../validator/validation");
const hashPassword = require("../hashingPassword/hashingPassword");
const JwtService = require("../../services/jwtService");

const registration = async (req, res, next) => {
  const validateSchema = await validationSchema.registerValidation(req);
  //console.log("validateSchema.error", validateSchema)
  if (validateSchema && validateSchema.error !== undefined) {
    return res.status(400).json({
      status: false,
      message: validateSchema.error.details[0].message,
    });
  }
  //console.log(validateSchema.error, "schema")
  try {
    const exists = await userModel.exists({ email: req.body.email });
    if (exists) {
      console.log(" sorry! this email is already been taken");
      return res.status(400).json({
        status: false,
        message: "sorry! this email is already been taken",
      });
    } else {
      const { fname, lname, phone, email, password } = req.body;
      const hashed = await hashPassword.hashingPassword(password);
      const userRegister = new userModel({
        fname,
        lname,
        phone,
        email,
        password: hashed,
      });
      const createUser = await userRegister.save();
      console.log(createUser, "create user ");
      const mailData = {
        from: "'Technical Wahid' <wahid.siddiqui2021@gmail.com>", // sender address
        to: createUser.email, //list of receivers
        subject: "Sending Email using node js",
        text: "That was easy",
        html: `<b>Hey There !</b>, <h1> Hello ${createUser.fname} you are register successully </h1>`,
      };
      const info = await transporter.main(mailData);
      console.log(info, "info");
      return res
        .status(200)
        .json({ status: true, message: "You are registed", data: createUser });
    }
  } catch (e) {
    console.log(e, "error page");
    return { status: false, error: "not registered" };
  }
};

const login = async (req, res) => {
  //console.log(req.headers, "headers");
  const validateSchema = await validationSchema.loginValidation(req);
  //console.log("validateSchema ", validateSchema);
  if (validateSchema.error !== undefined) {
    return res.status(400).json({
      status: false,
      message: validateSchema.error.details[0].message,
    });
  }
  try {
    const { email, password } = req.body;
    const userLogin = await userModel.findOne({ email: email });
    if (!userLogin) {
      return res
        .status(500)
        .json({ status: false, message: "Email is not exists" });
    }
    const isMatch = await hashPassword.comparePassword(
      password,
      userLogin.password
    );
    console.log(password, "password");
    console.log(userLogin.password, "userLogin.password");
    if (!isMatch) {
      return res.json({ status: false, message: "Password is wrong" });
    }

    //token
    const access_token = await JwtService.sign({ _id: userLogin._id });
    console.log(userLogin._id, "userLogin");
    return res.status(200).json({
      status: true,
      message: "You are logged in successfully",
      access_token: access_token,
    });
  } catch (error) {
    console.log("error", error);
    res.json({ status: false, message: "Wrong Credential" });
  }
};

module.exports = { registration, login };
