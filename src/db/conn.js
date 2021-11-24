const mongoose = require("mongoose");
const { db_url } = require("../../config");

mongoose
  .connect(db_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connection Successfully.....");
  })
  .catch((error) => {
    console.log(error, "Database not connected");
  });
