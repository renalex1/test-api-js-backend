const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../contracts.methods");
const { NotFound, Unauthorized, BadRequest } = require("../../../constants/errors");
const usersMethods = require("../../users/users.methods");
const companiesMethods = require("../../companies/companies.methods");

/**
 * POST /contacts
 * Эндпоинт создания данных контракта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function addOne(req, res) {
  logger.init("create contract");
  const { id } = req.params;
  const data = req.body;

  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const company = await companiesMethods.getOne(data.companyId)
  if (!company) {
    logger.error("Company dos not exists");
    throw new NotFound("Company dos not exists");
  }

  const contract = await contactMethods.addOne(data);

  res.status(OK).json(contract);
  logger.success();
}

module.exports = {
  addOne,
};
