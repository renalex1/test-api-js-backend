const { Router } = require("express");
const { NotFound } = require("../constants/errors");
const { isAuthorized } = require("../middleware/request-auth.middleware");

module.exports = Router()
  .use(require("./readme"))
  .use(require("./users"))
  .use(isAuthorized)
  .use(require("./companies"))
  .use(require("./contacts"))
  .use(require("./contracts"))
  .use(() => {
    throw new NotFound();
  });
