const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../contracts.methods");
const { NotFound } = require("../../../constants/errors");
const usersMethods = require("../../users/users.methods");

/**
 * GET /contacts/:id
 * Эндпоинт получения данных контракта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getOne(req, res) {
  logger.init("get contract");
  const { id } = req.params;

  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const contract = await contactMethods.getOne(id);

  if (!contract || contract.deletedAt) {
    logger.error("Contract not found");
    throw new NotFound("Contract not found");
  }

  res.status(OK).json(contract);
  logger.success();
}

module.exports = {
  getOne,
};
