const express = require("express");

const { User } = require("../../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateInput = require("../../../validation/validateInput");

// route    POST/api/users/register
// desc     register new user
// access   PUBLIC

// Trước khi tách file cấu hình route
// router.post("/register", (req, res) => {

// Sau khi tách file cấu hình route
const register = async (req, res, next) => {
  const { isValid, errors } = await validateInput(req.body, "register");
  if (!isValid) return res.status(400).json(errors);

  const { email, password, fullName, userType, phone, DOB } = req.body;

  const newUser = new User({
    email,
    password,
    fullName,
    userType,
    phone,
    DOB
  });
  // ===========XÂY DỰNG CHỨC NĂNG ĐĂNG KÝ===========
  // giả định: input valid
  // User.findOne({ $or: [{ email }, { phone }] })
  //   .then(user => {
  //     if (user) return Promise.reject({ errors: " Email exists " });
  //     const newUser = new User({
  //       email,
  //       password,
  //       fullName,
  //       userType,
  //       phone,
  //       DOB
  //     });

  bcrypt.genSalt(10, (err, salt) => {
    console.log(salt);
    if (err) return Promise.reject(err);
    bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash);
      if (err) return Promise.reject(err);
      console.log(newUser);
      newUser.password = hash;
      return newUser
        .save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
    });
  });
};

// ==========CHỨC NĂNG ĐĂNG NHẬP============
// route    POST/api/users/login
// desc     login
// access   PUBLIC
const login = async (req, res, next) => {
  const { isValid, errors } = await validateInput(req.body);
  
  if (!isValid) return status(400).json(errors);

  const { email, password, fingerprint } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject({ errors: "User doesnt exists" });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) return res.status(400).json({ errors: "Wrong password" });

        const payload = {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          userType: user.userType,
          DOB: user.DOB,
          phone: user.phone
        };
        const KEY = process.env.SECRETE_KEY + fingerprint;
        jwt.sign(payload, KEY, { expiresIn: "1h" }, (err, token) => {
          if (err) return res.status(400).json(err);

          return res.status(200).json({
            message: "success",
            token
          });
        });
      });
    })
    .catch(err => res.status(400).json(err));
};

// ========== TEST HOẠT ĐỘNG CỦA API ==========
// route    POST/api/users/test-private
// desc     test private
// access   PRIVATE ( chỉ cho user đã login vào hệ thống )

const testPrivate = (req, res, next) => {
  res.status(200).json({ message: "Ban da vao duoc he thong" });
};

const uploadAvatar = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then(user => {
      if (!user) return Promise.reject({ errors: "User does not exists" });
      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};

const getUserById = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};

const deleteUser = async (req, res, next) => {
  const { id } = req.user;
  await User.findByIdAndDelete(id, (err, res) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({message: "delete success", res});
  });
};

module.exports = {
  register,
  login,
  testPrivate,
  uploadAvatar,
  getUserById,
  deleteUser
};
// ========== kiến thức bổ sung ============
// // midlleware có 3 thành phần: req ( gửi dữ liệu đi kèm ) , res ( kết thúc), next ( nhảy qua middleware khác)
// router.get("/abc", (req, res, next) => {
//     console.log("MDW 1")
//     next()

// }, (req, res, next) => {
//     console.log("MDW 2")
//     next()
// }, (req, res) => {
//     res.send("Hello world")
// });

// Trước khi tách file cấu hình route
// module.exports = router;

// Sau khi tách file

// ========LOGIC LÀM PROJECT ===========
// Register:
// 1. Lấy thông tin
// 2. Validate - Sai thông tin - Unique
// 3. hashpassword và lưu DB
// npm i bcryptjs

// Login
// 1. Lấy data
// 2 . Validate
// 3. Success -> trả ra token npm i jsonwebtoken --save
// Auth: Authentication & Authorization

//Logout
// 1.logout
// 2. currentTime > exp
