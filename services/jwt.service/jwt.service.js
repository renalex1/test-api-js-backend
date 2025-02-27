const JwtConfig = require("./jwt.service.config");
const {
  EncodedAndSignedToken,
  DecodedAndVerifiedToken,
} = require("./jwt.service.token");
const logger = require("../logger.service")(module);

/**
 * API JWT service
 */
class JwtService {
  #config;

  constructor(config) {
    this.#config = new JwtConfig(config);
  }

  /**
   * Returns an encoded API JWT token object
   * @param {Object} user
   * @return {EncodedAndSignedToken}
   */
  encode(user) {
    logger.info(`Encode API JWT token for user: ${user.id}`);
    const token = new EncodedAndSignedToken(this.#config, {
      pld: user,
      sub: user.id,
    });
    logger.success();
    return token;
  }

  /**
   * Returns a decoded API JWT token object
   * @param {String|EncodedAndSignedToken} authToken
   * @return {DecodedAndVerifiedToken}
   */
  decode(authToken) {
    logger.info("Decode API JWT token");
    const token = new DecodedAndVerifiedToken(this.#config, authToken);
    logger.success();
    return token;
  }
}

module.exports = JwtService;
