const logger = require("../../../services/logger.service")(module);
const { OK, UNAUTHORIZED } = require("../../../constants/http-codes");
const JwtService = require("../../../services/jwt.service");
const jwtConfig = require("../../../config").jwt;

/**
 * POST /users/logout
 * Logs out the user by invalidating the authentication token.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function postLogoutUser(req, res) {
  logger.init("post logout user");

  const authHeader = req.headers.authorization;

  console.log(authHeader);
  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.error("Missing or invalid token");
    return res.status(UNAUTHORIZED).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  const jwtService = new JwtService(jwtConfig);

  try {
    jwtService.decode(token);

  } catch (error) {
    logger.error("Invalid token");
    return res.status(UNAUTHORIZED).json({ message: "Invalid token" });
  }

  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  });

  logger.success("User logged out successfully");
  return res.status(OK).json({ message: "User logged out successfully" });
}

module.exports = {
  postLogoutUser,
};
