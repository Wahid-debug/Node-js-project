const express = require("express");
const router = express.Router();
const {
  CreatePostData,
  getPostData,
  searchData,
} = require("../controller/postController");
const auth = require("../middleware/auth");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/posts", auth, upload.single("image"), CreatePostData);
router.get("/getposts", auth, getPostData);
router.get("/search/:title", auth, searchData);

module.exports = router;
