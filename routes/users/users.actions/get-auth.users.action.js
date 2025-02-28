const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const JwtService = require("../../../services/jwt.service");
const jwtConfig = require("../../../config").jwt;

/**
 * @todo: Предполагается к удалению по факту реализации требований тестового задания.
 * GET /users/auth
 * Служебный эндпоинт для получения токена авторизации произвольного пользователя.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getAuth(req, res) {
  logger.init("get user auth");
  const { user } = req.query;

  const token = new JwtService(jwtConfig).encode(user).data;
  
  res.header("Authorization", `Bearer ${token}`);
  logger.success();
  return res.status(OK).json(user);
}

module.exports = {
  getAuth,
};
