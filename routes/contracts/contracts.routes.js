const { Router } = require("express");
const actions = require("./contracts.actions");
const validator = require("./contracts.validator");

module.exports = Router()
  .post("/contracts",
    // ...validator.createContact,
    actions.addOne)
  .get("/contracts/:id",
    // ...validator.getOne,
    actions.getOne)
  .patch("/contracts/:id",
    // ...validator.editOne,
    actions.editOne)
  .delete("/contracts/:id",
    // ...validator.deleteOne,
    actions.removeContact)
