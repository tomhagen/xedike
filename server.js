// 3rd package
const express = require("express");
const mongoose = require("mongoose");

// my package

// connect to db
mongoose
  .connect("mongodb://localhost:27017/xedike", {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
