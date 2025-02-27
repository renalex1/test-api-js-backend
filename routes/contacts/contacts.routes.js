const { Router } = require("express");
const actions = require("./contacts.actions");
const validator = require("./contacts.validator");

module.exports = Router()
  .get("/contacts/:id", ...validator.getOne, actions.getOne)
  .patch("/contacts/:id", ...validator.editOne, actions.editOne);
