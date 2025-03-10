const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../contacts.methods");
const { NotFound, Unauthorized, BadRequest } = require("../../../constants/errors");
const usersMethods = require("../../users/users.methods");

/**
 * PATCH /contacts/:id
 * Эндпоинт редактирования данных контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function editOne(req, res) {
  logger.init("edit contact");
  const { id } = req.params;
  const data = req.body;

  const { id: userId } = req.payload;

  const isEmailFree = await contactMethods.checkEmailExist(data.email)
  if (isEmailFree) {
    logger.error("This email is in used");
    throw new BadRequest("This email is in used");
  }

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const contact = await contactMethods.getOne(id);
  if (!contact) {
    logger.error("Contact not found")
    throw new NotFound("Contact not found");
  }

  if (contact.companies.userId !== userId) {
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
