const { Router } = require("express");
const actions = require("./contacts.actions");
const validator = require("./contacts.validator");

module.exports = Router()
  .post("/contacts",
    ...validator.createContact,
    actions.addOne)
  .get("/contacts/:id",
    ...validator.getOne,
    actions.getOne)
  .patch("/contacts/:id",
    ...validator.editOne,
    actions.editOne)
  .delete("/contacts/:id",
    ...validator.deleteOne,
    actions.removeContact)
