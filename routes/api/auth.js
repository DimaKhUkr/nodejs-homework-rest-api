const express = require("express");

const {
  register,
  login,
  logout,
  current,
  updateSubscription,
} = require("../../controllers/auth");

const {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
} = require("../../schemas/users");

const { validateData, unauthorized } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateData(userRegisterSchema), register);

router.post("/login", validateData(userLoginSchema), login);

router.post("/logout", unauthorized, logout);

router.get("/current", unauthorized, current);

router.patch(
  "/",
  unauthorized,
  validateData(userSubscriptionSchema),
  updateSubscription
);

module.exports = router;
