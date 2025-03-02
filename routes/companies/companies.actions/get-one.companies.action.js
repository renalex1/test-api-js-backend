const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../companies.methods");
const { getUrlForRequest } = require("../../../helpers/url.helper");
const { NotFound } = require("../../../constants/errors");
const { parseOne } = require("../companies.service");
const { PrismaClient, AuthMethod, UserRole } = require('@prisma/client');
const prisma = new PrismaClient();

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

  const existingCompany = await companyMethods.getOne(id);

  if (!existingCompany) {
    logger.error("Company dos not exists");
    throw new NotFound("Company dos not exists");
  }

  const photoUrl = getUrlForRequest(req);

  res.status(OK).json(parseOne(existingCompany, photoUrl));
  logger.success();
}

module.exports = {
  getOne,
};
