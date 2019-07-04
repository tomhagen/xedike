const express = require("express");
const userController = require("./user");
const router = express.Router();
const { authenticating, authorizing } = require("../../../middleware/auth");
const { User } = require("../../../models/user");
const upload = require("../../../middleware/uploadImages");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get(
  "/test-private",
  authenticating,
  authorizing(["passenger", "admin"]),
  userController.testPrivate
);
router.post(
  "/upload-avatar",
  authenticating,
  upload.single("avatar"), // single do upload 1 tấm hình
  userController.uploadAvatar
);
router.get("/:id", authenticating, userController.getUserById);

router.delete("/delete", userController.deleteUser)
module.exports = router;

// Cách test Postman upload hình
// Body -> form data
// Key : avatar , chọn file
// Value upload hình
