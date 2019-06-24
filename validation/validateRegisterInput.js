const validator = require("validator");
const _ = require("lodash");
const { User } = require("../models/user");

validateRegisterInput = async data => {
  let errors = {};

  // kiem tra input co bi bo trong hay khong ?
  // neu input trong thi input = ""
  //   data.email = data.email ? data.email : ""; cách viết khác khi không dùng lodash
  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.fullName = _.get(data, "fullName", "");
  data.DOB = _.get(data, "DOB", "");
  data.userType = _.get(data, "userType", "");
  data.phone = _.get(data, "phone", "");

  //validate
  //email
  if (validator.isEmpty(data.email)) {
    // true: "", false: co gia tri
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    // true: email valid, false: email invalid
    errors.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "Email exists";
  }

  //password
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password has at least 6 characters";
  }
  // password2
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password is not match";
  }
  //phone
  if (validator.isEmpty(data.phone)) {
    errors.phone = "Phone is required";
  } else {
    const user = await User.findOne({ phone: data.phone });
    if (user) errors.phone = "Phone exists";
  }
  //   //fullname
  //   if (validator.isEmpty(data.fullName)) {
  //     errors.fullName = "Full Name is required";
  //   } else if (!validator.isLength(data.fullName, { min: 2, max: 30 })){
  //       errors.fullName = "Full Name has at at least 2 character min & 30 character max"
  //   }
  //   // userType
  //   if(validator.isEmpty(data.userType)){
  //       errors.userType = "UserType is required"
  //   }
  //   else if(["Passenger","Driver","Admin"].indexOf(data.userType)){
  //       if()
  //   }
  // DOB, fullname , userType tự làm theo yêu cầu trong slide
  return {
    // isValid: true neu errors la {}; isValid: false neu errors co thuoc tinh
    isValid: _.isEmpty(errors),
    errors
  };
};
module.exports = validateRegisterInput;
