const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../contacts.methods");
const { NotFound } = require("../../../constants/errors");
const usersMethods = require("../../users/users.methods");

/**
 * GET /contacts/:id
 * Эндпоинт получения данных контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getOne(req, res) {
  logger.init("get contact");
  const { id } = req.params;

  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const contact = await contactMethods.getOne(id);

  if (!contact || contact.deletedAt) {
    logger.error("Contact not found");
    throw new NotFound("Contact not found");
  }

  res.status(OK).json(contact);
  logger.success();
}

module.exports = {
  getOne,
};
