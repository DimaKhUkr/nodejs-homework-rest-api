const Joi = require("joi");

const { emailRegexp, userSubscription } = require("../constants/users");

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...userSubscription),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...userSubscription),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...userSubscription),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
};
