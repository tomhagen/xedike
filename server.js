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

// middleware
// parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// static
// upload đầu tiên là đường dẫn url, upload thứ 2 là tên folder
app.use("/uploads", express.static("uploads"))



// Trước khi tách file cấu hình routes
// app.use("/api/users", require("./routes/api/user"));

// Sau khi tách file cấu hình routes
app.use("/api/users", require("./routes/api/users"));


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



