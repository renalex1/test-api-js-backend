const { Router } = require("express");
const actions = require("./users.actions");
const validator = require("./users.validator");
const { parseJson } = require("../../middleware/query-parser.middleware");

module.exports = Router().get(
  "/users/auth",
  parseJson("user"),
  ...validator.getAuth,
  actions.getAuth
);
