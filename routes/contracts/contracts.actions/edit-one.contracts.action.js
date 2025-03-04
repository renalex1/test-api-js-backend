const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../contracts.methods");
const { NotFound, Unauthorized, BadRequest } = require("../../../constants/errors");
const usersMethods = require("../../users/users.methods");

/**
 * PATCH /contacts/:id
 * Эндпоинт редактирования данных контракта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function editOne(req, res) {
  logger.init("edit contract");
  const { id } = req.params;
  const data = req.body;

  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const contract = await contactMethods.getOne(id);
  if (!contract) {
    logger.error("Contract not found")
    throw new NotFound("Contract not found");
  }

  if (contract.companies.userId !== userId) {
    logger.error("Unauthorized access");
    throw new Unauthorized("Unauthorized access");
  }

  const updated = await contactMethods.editOne(id, data);

  res.status(OK).json(updated);
  logger.success();
}

module.exports = {
  editOne,
};
