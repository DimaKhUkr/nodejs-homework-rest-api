const express = require("express");

const {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");

const {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
  emailSchema,
} = require("../../schemas/users");

const { validateData, unauthorized, upload } = require("../../middlewares");

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

router.patch("/avatars", unauthorized, upload.single("avatars"), updateAvatar);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validateData(emailSchema), resendVerifyEmail);

module.exports = router;
