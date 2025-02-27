const logger = require("../../services/logger.service")(module);
const { BadRequest } = require("../../constants/errors");

module.exports = {
  parseJson,
};

function parseJson(fieldName) {
  return (req, res, next) => {
    if (typeof req.query[`${fieldName}`] !== "string") {
      return next();
    }
    try {
      req.query[`${fieldName}`] = JSON.parse(req.query[`${fieldName}`]);
    } catch (error) {
      logger.error(`Incorrect JSON in request query field: ${fieldName}`);
      return next(new BadRequest());
    }
    return next();
  };
}
