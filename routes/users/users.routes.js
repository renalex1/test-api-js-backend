const { Router } = require("express");
const actions = require("./users.actions");
const validator = require("./users.validator");
const { parseJson } = require("../../middleware/query-parser.middleware");
const { isAuthorized } = require("../../middleware/request-auth.middleware");

const router = Router();

router.get(
  "/users/auth",
  parseJson("user"),
  ...validator.getAuth,
  actions.getAuth
);

router.post(
  "/users",
  parseJson("user"),
  ...validator.postCreateUser,
  actions.postCreateUser
);

router.post(
  "/users/login",
  parseJson("user"),
  ...validator.postLoginUser,
  actions.postLoginUser
);

router.post(
  "/users/logout",
  actions.postLogoutUser
);

module.exports = router;