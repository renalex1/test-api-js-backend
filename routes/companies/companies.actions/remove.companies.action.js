const path = require("path");
const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const { NotFound, BadRequest, Unauthorized } = require("../../../constants/errors");
const companyMethods = require("../companies.methods");
const usersMethods = require("../../users/users.methods");

/**
 * DELETE /companies/:id
 * Эндпоинт удаления компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function removeCompany(req, res) {
  logger.init("remove company");
  const { id } = req.params;
  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const company = await companyMethods.getOne(id);
  if (!company) {
    logger.error("Company not found");
    throw new NotFound("Company not found");
  }

  if (company.userId !== userId) {
    logger.error("Unauthorized access");
    throw new Unauthorized("Unauthorized access");
  }

  if (company.deletedAt) {
    logger.error("Company already deleted");
    throw new BadRequest("Company already deleted");
  }

  companyMethods.removeOne(company.id);

  res.status(OK).json('Company seccsessuly  deleted');
  logger.success();
}

module.exports = {
  removeCompany,
};
