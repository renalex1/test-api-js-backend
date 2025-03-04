const path = require("path");
const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const imagesConfig = require("../../../config").images;
const imageService = require("../../../services/image.service");
const { NotFound, BadRequest } = require("../../../constants/errors");
const companyMethods = require("../companies.methods")

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
    logger.error("Company not found");
    throw new NotFound("Company not found");
  }

  const file = await companyMethods.getFileByName(fileName);

  if (!file) {
    logger.error("File not exist");
    throw new BadRequest("File not exist");
  }
  if (file.deletedAt) {
    logger.error("File already deleted");
    throw new BadRequest("File already deleted");
  }

  const filePath = path.resolve(
    `${imagesConfig.imagesDir}/${userId}/${file.name}`
  );

  console.log('file', file);
  console.log('filePath', filePath);
  await imageService.removeImage(filePath);

  const thumbPath = path.resolve(`${imagesConfig.imagesDir}${userId}/${file.thumbPath}`)

  console.log('thumbPath', thumbPath);
  await imageService.removeImage(thumbPath);

  companyMethods.removeFile(file.id)



  res.status(OK).json();
  logger.success();
}

module.exports = {
  removeImage,
};
