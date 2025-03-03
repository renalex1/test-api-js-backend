const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");
const { NotFound } = require("../../../constants/errors");

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

  const contact = contactMethods.getOne(id);
  if (!contact) {
    throw new NotFound("Contact not found");
  }

  const updated = contactMethods.editOne(id, data);

  res.status(OK).json(updated);
  logger.success();
}

module.exports = {
  editOne,
};
