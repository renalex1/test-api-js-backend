const { check } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const getOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const editOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

module.exports = { getOne, editOne };
