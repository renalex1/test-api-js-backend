const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../companies.methods");
const { parseOne } = require("../companies.service");
const { getUrlForRequest } = require("../../../helpers/url.helper");
const { NotFound, Unauthorized } = require("../../../constants/errors");
const usersMethods = require("../../users/users.methods");


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

  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  const companyUniq = await companyMethods.getByNameOrEntity(data.name, data.businessEntity);
  if (companyUniq) {
    throw new NotFound("Company or businessEntity is exist");
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


  const updated = await companyMethods.editOne(id, data);

  const photoUrl = getUrlForRequest(req);
  res.status(OK).json(parseOne(updated, photoUrl));
  logger.success();
}

module.exports = {
  editOne,
};
