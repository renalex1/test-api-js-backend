const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../companies.methods");
const { getUrlForRequest } = require("../../../helpers/url.helper");
const { NotFound, Unauthorized } = require("../../../constants/errors");
const { parseOne } = require("../companies.service");
const usersMethods = require("../../users/users.methods");

/**
 * GET /companies/:id
 * Эндпоинт получения данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getOne(req, res) {
  logger.init("get company");
  const { id } = req.params;

  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const existingCompany = await companyMethods.getOne(id);

  if (!existingCompany) {
    logger.error("Company dos not exists");
    throw new NotFound("Company dos not exists");
  }

  if (existingCompany.userId !== userId) {
    logger.error("Unauthorized access");
    throw new Unauthorized("Unauthorized access");
  }

  const photoUrl = getUrlForRequest(req);

  res.status(OK).json(parseOne(existingCompany, photoUrl));
  logger.success();
}

module.exports = {
  getOne,
};
