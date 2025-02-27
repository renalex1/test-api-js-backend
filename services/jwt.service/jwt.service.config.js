const { InternalError } = require("../../constants/errors");
const logger = require("../logger.service")(module);

/**
 * API JWT configuration
 */
class JwtConfig {
  config;

  constructor(config) {
    if (!config) {
      logger.error("Configuration params required to be set");
      throw new InternalError();
    }
    if (!config?.secretKey) {
      logger.error("Configuration param `jwt.secretKey` required to be set");
      throw new InternalError();
    }
    if (!config?.sign) {
      logger.error("Configuration param `jwt.sign` required to be set");
      throw new InternalError();
    }
    if (!config?.verify) {
      logger.error("Configuration param `jwt.verify` required to be set");
      throw new InternalError();
    }
    this.config = config;
  }

  /**
   * Returns the value of the secret key from the configuration.
   * @return {string}
   */
  get secretKey() {
    return this.config.secretKey;
  }

  /**
   * Returns the value of the signature and encoding options.
   * @return {Object}
   */
  get signOptions() {
    return this.config.sign;
  }

  /**
   * Returns the value of the check and decode options.
   * @return {Object}
   */
  get verifyOptions() {
    return { ...this.config.sign, ...this.config.verify };
  }
}

module.exports = JwtConfig;
