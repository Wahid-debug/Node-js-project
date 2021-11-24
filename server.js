const express = require("express");
const app = express();
const { port } = require("./config");
const api = require("./src/router/index");
require("./src/db/conn");
const path = require("path");
const cors = require("cors");
// const corsOption = {
//   origin: "*",
//   methods: "GET,PUT,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };
app.use(cors());

app.use(express.static(path.dirname("./public/uploads")));
app.use(express.json());
app.use("/api", api);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
