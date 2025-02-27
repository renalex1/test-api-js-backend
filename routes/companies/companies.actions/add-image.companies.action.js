const crypto = require("crypto");
const path = require("path");
const logger = require("../../../services/logger.service")(module);
const { getFileUrl } = require("../../../helpers/url.helper");
const { OK } = require("../../../constants/http-codes");
const imagesConfig = require("../../../config").images;
const imageService = require("../../../services/image.service");
const companyMethods = require("../../../DB/sample-db/methods/company");
const { NotFound } = require("../../../constants/errors");

/**
 * POST /companies/:id/image
 * Эндпоинт добавления изображения компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function addImage(req, res) {
  logger.init("add company image");
  const { id } = req.params;
  const file = req.files.file[0];
  const { id: userId } = req.payload;

  const company = companyMethods.getOne(id);
  if (!company) {
    throw new NotFound("Company not found");
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  const fileName = crypto.randomBytes(10).toString("hex");

  const uploadedFileName = fileName + fileExtension;
  const uploadedFileThumbName = `${fileName}_${imagesConfig.thumbSize}x${imagesConfig.thumbSize}${fileExtension}`;

  const tempFilePath = file.path;
  const targetFilePath = path.resolve(
    `${imagesConfig.imagesDir}${userId}/${uploadedFileName}`
  );
  const targetThumbPath = path.resolve(
    `${imagesConfig.imagesDir}${userId}/${uploadedFileThumbName}`
  );

  await imageService.resizeImage(tempFilePath, targetThumbPath);
  await imageService.renameImage(tempFilePath, targetFilePath);

  const uploadedImage = {
    name: uploadedFileName,
    filepath: getFileUrl(req, uploadedFileName),
    thumbpath: getFileUrl(req, uploadedFileThumbName),
  };

  res.status(OK).json(uploadedImage);
  logger.success();
}

module.exports = {
  addImage,
};
