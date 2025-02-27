/* eslint-disable max-classes-per-file */
const jwt = require("jsonwebtoken");

/**
 * JWT token base class
 */
class JwtToken {
  #data;

  constructor(data) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }
}

/**
 * API JWT encoded and signed token
 */
class EncodedAndSignedToken extends JwtToken {
  /**
   * Generates an encoded value for the specified data.
   * When determining the value, signature and coding occurs.
   * @param {JwtConfig} config
   * @param {Object} payload
   */
  constructor(config, payload) {
    super(jwt.sign(payload, config.secretKey, config.signOptions, null));
  }
}

/**
 * API decoded and verified JWT token
 */
class DecodedAndVerifiedToken extends JwtToken {
  /**
   * Generates a decoded value for the specified data.
   * When determining the value, verification and decoding occurs.
   * @param {JwtConfig} config
   * @param {String|EncodedAndSignedToken} token
   */
  constructor(config, token) {
    super(
      jwt.verify(
        token instanceof EncodedAndSignedToken ? token.data : token,
        config.secretKey,
        config.verifyOptions,
        null
      )
    );
  }

  /**
   * Returns the `payload` value of the JWT token
   * @return {Object}
   */
  get payload() {
    return this.data?.pld ?? {};
  }
}

module.exports = { EncodedAndSignedToken, DecodedAndVerifiedToken };
