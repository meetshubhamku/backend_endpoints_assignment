const express = require("express");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authController");
const {
  addProduct,
  getAllProduct,
} = require("../controllers/productController");
const { getUserById } = require("../controllers/userController");

const router = express.Router();

router.param("user_id", getUserById);

router.post(
  "/product/add/:user_id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  addProduct
);

router.get("/product/all/:user_id", isSignedIn, isAuthenticated, getAllProduct);

module.exports = router;
