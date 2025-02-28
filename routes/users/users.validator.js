const { check } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const getAuth = [
  check("user")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "user: parameter is required",
    })
    .bail()
    .custom((value) => value.id)
    .withMessage({
      code: UnprocessableEntity,
      message: "user.id: parameter is required",
    }),
  validate,
];


const createUser = [
  check("email")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "email: parameter is required",
    })
    .isEmail()
    .withMessage({
      code: UnprocessableEntity,
      message: "email: invalid email format",
    }),
  check("password")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter is required",
    })
    .isLength({ min: 6 })
    .withMessage({
      code: UnprocessableEntity,
      message: "password: must be at least 6 characters",
    }),
  check("full_name")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "full_name: parameter is required",
    }),
  validate,
];

module.exports = { getAuth, createUser };
