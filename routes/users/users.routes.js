const { Router } = require("express");
const actions = require("./users.actions");
const validator = require("./users.validator");
const { parseJson } = require("../../middleware/query-parser.middleware");

const router = Router();

// Route for authentication (GET /users/auth)
router.get(
  "/users/auth",
  parseJson("user"),
  ...validator.getAuth,
  actions.getAuth
);

router.post(
  "/users",
  parseJson("user"),
  ...validator.createUser,
  actions.createUser
);

module.exports = router;