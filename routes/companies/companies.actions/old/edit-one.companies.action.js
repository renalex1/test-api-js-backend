const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");
const { parseOne } = require("../companies.service");
const { getUrlForRequest } = require("../../../helpers/url.helper");
const { NotFound } = require("../../../constants/errors");

/**
 * PATCH /companies/:id
 * Эндпоинт редактирования данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function editOne(req, res) {
  logger.init("edit company");
  const { id } = req.params;
  const data = req.body;

  const company = companyMethods.getOne(id);
  if (!company) {
    throw new NotFound("Company not found");
  }

  const updated = companyMethods.editOne(id, data);

  const photoUrl = getUrlForRequest(req);
  res.status(OK).json(parseOne(updated, photoUrl));
  logger.success();
}

module.exports = {
  editOne,
};
