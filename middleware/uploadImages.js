

//UPLOAD HÌNH ẢNH
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    // trường hợp upload hình không có đuôi thì tự render ra minetype: 'application/octet-stream'
    let type = "";
    if (file.minetype === "application/octet-stream" || !file.minetype)
      console.log(file.minetype);

    type = ".jpg";
    cb(null, file.fieldname + "-" + Date.now() + type);
  }
});

const upload = multer({storage});
module.exports = upload;