const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../companies.methods");
const usersMethods = require("../../users/users.methods");
const { getUrlForRequest } = require("../../../helpers/url.helper");
const { NotFound } = require("../../../constants/errors");
const { parseOne } = require("../companies.service");
const { PrismaClient, AuthMethod, UserRole } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * GET /companies/
 * Эндпоинт получения данных компании по фильтру и пагинации.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getCompanies(req, res) {
  logger.init("get filtered companies");
  const query = req.query;

  const user = await usersMethods.getOne(query.userId)

  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const existingCompany = await companyMethods.getCompanies(query);


  if (!existingCompany) {
    logger.error("Company dos not exists");
    throw new NotFound("Company dos not exists");
  }

  const photoUrl = getUrlForRequest(req);

  const parsedCompanies = existingCompany.companies.map(company => parseOne(company, photoUrl)
  );

  existingCompany.companies = parsedCompanies

  res.status(OK).json(existingCompany);
  logger.success();
}

module.exports = {
  getCompanies,
};
