const path = require("path");
const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const imagesConfig = require("../../../config").images;
const imageService = require("../../../services/image.service");
const { NotFound } = require("../../../constants/errors");
const companyMethods = require("../../../DB/sample-db/methods/company");

/**
 * DELETE /companies/:id/image
 * Эндпоинт удаления изображения компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function removeImage(req, res) {
  logger.init("remove company image");
  const { id } = req.params;
  const { id: userId } = req.payload;
  const { image_name: fileName } = req.query;

  const company = companyMethods.getOne(id);
  if (!company) {
    throw new NotFound("Company not found");
  }

  const filePath = path.resolve(
    `${imagesConfig.imagesDir}/${userId}/${fileName}`
  );
  await imageService.removeImage(filePath);

  const fileExtension = path.extname(fileName).toLowerCase();
  const _fileName = fileName.split(".").slice(0, -1).join(".");
  const thumbName = `${_fileName}_${imagesConfig.thumbSize}x${imagesConfig.thumbSize}${fileExtension}`;
  const thumbPath = path.resolve(
    `${imagesConfig.imagesDir}${userId}/${thumbName}`
  );
  await imageService.removeImage(thumbPath);

  res.status(OK).json();
  logger.success();
}

module.exports = {
  removeImage,
};
