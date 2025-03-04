const path = require("path");
const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const { NotFound, BadRequest, Unauthorized } = require("../../../constants/errors");
const contactMethods = require("../contracts.methods");
const usersMethods = require("../../users/users.methods");

/**
 * DELETE /contacts/:id
 * Эндпоинт удаления контракта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function removeContact(req, res) {
  logger.init("remove contract");
  const { id } = req.params;
  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const contract = await contactMethods.getOne(id);
  if (!contract) {
    logger.error("Contract not found");
    throw new NotFound("Contract not found");
  }

  if (contract.companies.userId !== userId) {
    logger.error("Unauthorized access");
    throw new Unauthorized("Unauthorized access");
  }

  if (contract.deletedAt) {
    logger.error("Contract already deleted");
    throw new BadRequest("Contract already deleted");
  }

  contactMethods.removeOne(contract.id);

  res.status(OK).json('Contract seccsessuly deleted');
  logger.success();
}

module.exports = {
  removeContact,
};
