const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const logger = require("../../../services/logger.service")(module);
const { getFileUrl } = require("../../../helpers/url.helper");
const { OK, BAD_REQUEST, NOT_FOUND } = require("../../../constants/http-codes");
const imagesConfig = require("../../../config").images;
const imageService = require("../../../services/image.service");
const companyMethods = require("../companies.methods");
const { NotFound, BadRequest } = require("../../../constants/errors");
const usersMethods = require("../../users/users.methods");

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
  const { id: userId } = req.payload;

  const user = await usersMethods.getOne(userId)
  if (!user) {
    logger.error("User dos not exists");
    throw new NotFound("User dos not exists");
  }

  if (!req.files || !req.files.file || req.files.file.length === 0) {
    logger.error("No file uploaded.");
    throw new BadRequest("No file uploaded.");
  }

  const file = req.files.file[0];

  const company = await companyMethods.getOne(id);
  if (!company) {
    logger.error("Company not found");
    throw new NotFound("Company not found");
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  const fileName = crypto.randomBytes(10).toString("hex");
  const uploadedFileName = fileName + fileExtension;
  const uploadedFileThumbName = `${fileName}_${imagesConfig.thumbSize}x${imagesConfig.thumbSize}${fileExtension}`;

  const userImageDir = path.resolve(`${imagesConfig.imagesDir}${userId}`);
  if (!fs.existsSync(userImageDir)) {
    fs.mkdirSync(userImageDir, { recursive: true });
  }

  const tempFilePath = file.path;
  const targetFilePath = path.join(userImageDir, uploadedFileName);
  const targetThumbPath = path.join(userImageDir, 'thumbnails', uploadedFileThumbName);

  await imageService.renameImage(tempFilePath, targetFilePath);
  await imageService.resizeImage(targetFilePath, targetThumbPath);

  console.log('targetFilePath', targetFilePath);
  console.log('targetThumbPath', targetThumbPath);
  console.log('3', `${imagesConfig.imagesDir}${userId}`);


  const uploadedImage = {
    name: uploadedFileName,
    filepath: getFileUrl(req, uploadedFileName),
    thumbPath: getFileUrl(req, path.join('thumbnails', uploadedFileThumbName)),
  };
  const uploadedImageInfo = {
    name: uploadedFileName,
    filepath: uploadedFileName,
    thumbPath: path.join('thumbnails', uploadedFileThumbName),
    companyId: Number(id)
  };

  await companyMethods.addFile(id, uploadedImageInfo)

  res.status(OK).json(uploadedImage);
  logger.success();
}

module.exports = {
  addImage,
};
