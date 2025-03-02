const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../companies.methods");
const usersMethods = require("../../users/users.methods");
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
async function addOne(req, res) {
  logger.init("add company");
  const data = req.body;

    const user = await usersMethods.getOne(data.userId)
  
    if (!user) {
      logger.error("User dos not exists");
      throw new NotFound("User dos not exists");
    }

  const company = await companyMethods.getByNameOrEntity(data.name, data.businessEntity);
  if (company) {
    throw new NotFound("Company or businessEntity is exist");
  }

  const create = await companyMethods.addOne(data);

  const photoUrl = getUrlForRequest(req);
  res.status(OK).json(parseOne(create, photoUrl));
  logger.success();
}

module.exports = {
  addOne,
};
