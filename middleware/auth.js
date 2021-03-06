const jwt = require("jsonwebtoken");

const authenticating = (req, res, next) => {
  // verify token
  // - thành công : return next() -> được quyền đi tiếp phía sau
  // - thất bại: res.json(err)
  const token = req.header("Authorization"); // gửi kèm token theo header
  const fingerprint = req.header("fingerprint");
  console.log("TCL: authenticating -> fingerprint", fingerprint);
  
  const KEY = "Cybersoft" + fingerprint;
  try {
    const decoded = jwt.verify(token, KEY);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ error: "Ko the vao. Token hoac Fingerprint ko hop le" });
  }
};
// User: passenger, driver, admin
const authorizing = userTypeArray => {
  // trả ra một middleware
  return (req, res, next) => {
    const { userType } = req.user;
    // userTypeArray : danh sach các loại người dùng có thể truy cập
    // userType: loại người dùng hiện tại ( lấy từ decoded của token)
    // nếu UserTypeArray có chứa userType ==> next()
    if (userTypeArray.indexOf(userType) > -1) {
      // indexOf trả về vị trí trong mảng
      return next();
    } else {
      res
        .status(403)
        .json({ errors: "Ban da dang nhap, nhung khong co quyen xem" });
    }
  };
};
module.exports = {
  authenticating,
  authorizing
};
