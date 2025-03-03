const { check } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const createContact = [
  check("lastName").notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "lastName is required",
  }),
  check("firstName").notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "firstName is required",
  }),
  check("phone").matches(/^\+?\d{10,15}$/).withMessage({
    code: UnprocessableEntity,
    message: "phone must be a valid number with country code",
  }),
  check("email").isEmail().withMessage({
    code: UnprocessableEntity,
    message: "email must be a valid email address",
  }),
  check("companyId").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "companyId must be a number",
  }),
  validate,
];

const getOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id parameter has incorrect format",
  }),
  validate,
];

const editOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id parameter has incorrect format",
  }),
  check("lastName").optional().notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "lastName cannot be empty",
  }),
  check("firstName").optional().notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "firstName cannot be empty",
  }),
  check("phone").optional().matches(/^\+?\d{10,15}$/).withMessage({
    code: UnprocessableEntity,
    message: "phone must be a valid number with country code",
  }),
  check("email").optional().isEmail().withMessage({
    code: UnprocessableEntity,
    message: "email must be a valid email address",
  }),
  validate,
];

const deleteOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id parameter has incorrect format",
  }),
  validate,
];

module.exports = { createContact, getOne, editOne, deleteOne };