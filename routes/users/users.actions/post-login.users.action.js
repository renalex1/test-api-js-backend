const logger = require("../../../services/logger.service")(module);
const { OK, BAD_REQUEST, UNAUTHORIZED } = require("../../../constants/http-codes");
const JwtService = require("../../../services/jwt.service");
const jwtConfig = require("../../../config").jwt;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verify } = require('argon2');

/**
 * @todo: Предполагается к удалению по факту реализации требований тестового задания.
 * POST /users/login
 * Служебный эндпоинт для входа в систему.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function postLoginUser(req, res) {
  logger.init("post login user");

  const { email, password } = req.body;

  if (!email || !password) {
    logger.error("Missing email or password");
    return res.status(BAD_REQUEST).json({ message: "Missing email or password" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });


  if (!existingUser) {
    logger.error("Invalid credentials");
    return res.status(UNAUTHORIZED).json({ message: "Invalid credentials" });
  }

  const isValidPassword = await verify(existingUser.password, password);

  if (!isValidPassword) {
    logger.error("Invalid credentials");
    return res.status(UNAUTHORIZED).json({ message: "Invalid credentials" });
  }

  const jwtService = new JwtService(jwtConfig);
  const token = jwtService.encode(existingUser).data;

  delete existingUser.password;

  res.header("Authorization", `Bearer ${token}`);
  logger.success("User logged in successfully");

  return res.status(OK).json({
    message: "User login successfully",
    user: existingUser,
    accessToken: token
  });
}

module.exports = {
  postLoginUser,
};
