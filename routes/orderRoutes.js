const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/userController");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authController");
const {
  orderProduct,
  viewOrder,
  viewOrderAdmin,
} = require("../controllers/orderController");

router.param("user_id", getUserById);

router.post("/order/:user_id", isSignedIn, isAuthenticated, orderProduct);
router.get("/order/view/:user_id", isSignedIn, isAuthenticated, viewOrder);
router.get(
  "/order/admin/view/:user_id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  viewOrderAdmin
);

module.exports = router;
