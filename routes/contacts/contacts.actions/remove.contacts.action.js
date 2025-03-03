const path = require("path");
const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const { NotFound, BadRequest, Unauthorized } = require("../../../constants/errors");
const contactMethods = require("../contacts.methods");
const usersMethods = require("../../users/users.methods");

/**
 * DELETE /contacts/:id
 * Эндпоинт удаления контакт.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function removeContact(req, res) {
  logger.init("remove contact");
  const { id } = req.params;
  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const contact = await contactMethods.getOne(id);
  if (!contact) {
    logger.error("Contact not found");
    throw new NotFound("Contact not found");
  }

  if (contact.companies.userId !== userId) {
    logger.error("Unauthorized access");
    throw new Unauthorized("Unauthorized access");
  }

  if (contact.deletedAt) {
    logger.error("Contact already deleted");
    throw new BadRequest("Contact already deleted");
  }

  contactMethods.removeOne(contact.id);

  res.status(OK).json('Contact seccsessuly deleted');
  logger.success();
}

module.exports = {
  removeContact,
};
