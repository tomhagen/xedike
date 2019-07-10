// 3rd package
const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config()
// my package

// connect to db

// set STAGE $env:STAGE="development", node, process.env.STAGE để kiểm tra

let mongouri = "";
if(process.env.STAGE === "development"){
  mongouri = process.env.MONGO_URI_DEV
}
else if(process.env.STAGE === "production"){
  mongouri = process.env.MONGO_URI_PROD
}
//  .connect("mongodb://localhost:27017/xedike", 
mongoose
  .connect(mongouri, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

const app = express();

// middleware
// parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CÁCH 2: ENABLE CORS PHÍA SERVER
// Vị trí để: để phía trên api
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, fingerprint"
  );
  next();
});

// static
// upload đầu tiên là đường dẫn url, upload thứ 2 là tên hình
// http://localhost:5000/uploads/avatar-1560862590861.jpg
app.use("/uploads", express.static("uploads"));

// Trước khi tách file cấu hình routes
// app.use("/api/users", require("./routes/api/user"));

// Sau khi tách file cấu hình routes
app.use("/api/users", require("./routes/api/users"));

//router
app.use("/api/trips", require("./routes/api/trips"));

app.use("/", express.static("public"));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// CÁCH ENABLE CORS
// CÁCH 1: Dùng extension - cho dev test
// CÁCH 2: Kích hoạt bên phía server
// Search nodejs enable cors
// Vị trí để: để phía trên api
// Cách 3: Dùng proxy, tạo file proxy và follow theo cài đặt
