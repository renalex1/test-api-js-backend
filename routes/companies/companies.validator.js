const path = require("path");
const { body, check, query } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");
const logger = require("../../services/logger.service")(module);
const imageService = require("../../services/image.service");

const getOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const editOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const addImage = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  body()
    .custom((_, { req }) => req.files?.file[0])
    .withMessage({
      code: UnprocessableEntity,
      message: "file: parameter is required",
    })
    .bail()
    .custom(async (_, { req }) => {
      const file = req.files.file[0];
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const tempFilePath = file.path;

      const isAllowedExtension = [".png", ".jpg", ".jpeg", ".gif"].includes(
        fileExtension
      );
      if (!isAllowedExtension) {
        await imageService
          .removeImage(tempFilePath)
          .catch((err) => logger.error(err));
      }
      return isAllowedExtension;
    })
    .withMessage({
      code: UnprocessableEntity,
      message: "files.file: only image files are allowed to upload",
    }),
  validate,
];

const removeImage = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  check("image_name")
    .notEmpty()
    .withMessage((_, { path }) => ({
      code: UnprocessableEntity,
      message: `${path}: parameter is required`,
    })),
  validate,
];

const addCompany = [
  check("userId")
    .isInt()
    .withMessage({
      code: UnprocessableEntity,
      message: "userId: must be an integer",
    }),

  check("name")
    .isString()
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "name: must be a non-empty string",
    }),

  check("businessEntity")
    .isString()
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "businessEntity: must be a non-empty string",
    }),

  check("status")
    .isString()
    .isIn(["active", "inactive", "pending"])
    .withMessage({
      code: UnprocessableEntity,
      message: "status: must be one of ['active', 'inactive', 'pending']",
    }),

  check("contract.no")
    .optional()
    .isString()
    .withMessage({
      code: UnprocessableEntity,
      message: "contract.no: must be a string",
    }),

  check("contract.issue_date")
    .optional()
    .isISO8601()
    .withMessage({
      code: UnprocessableEntity,
      message: "contract.issue_date: must be a valid ISO 8601 date",
    }),

  check("type")
    .optional()
    .isArray()
    .withMessage({
      code: UnprocessableEntity,
      message: "type: must be an array of strings",
    }),

  check("type.*")
    .optional()
    .isString()
    .withMessage({
      code: UnprocessableEntity,
      message: "type: all elements must be strings",
    }),

  check("photos")
    .optional()
    .isArray()
    .withMessage({
      code: UnprocessableEntity,
      message: "photos: must be an array",
    }),

  check("photos.*.name")
    .optional()
    .isString()
    .withMessage({
      code: UnprocessableEntity,
      message: "photos.name: must be a string",
    }),

  check("photos.*.filepath")
    .optional()
    .isString()
    .withMessage({
      code: UnprocessableEntity,
      message: "photos.filepath: must be a string",
    }),

  check("photos.*.thumbpath")
    .optional()
    .isString()
    .withMessage({
      code: UnprocessableEntity,
      message: "photos.thumbpath: must be a string",
    }),

  validate,
];

const getCompanies = [
  query("userId")
    .isNumeric()
    .withMessage({ code: UnprocessableEntity, message: "userId must be a numeric value" }),

  query("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage({ code: UnprocessableEntity, message: "Invalid status value. Allowed: 'active', 'inactive'" }),

  query("type")
    .optional()
    .isIn(["supplier", "contractor", "partner"])
    .withMessage({ code: UnprocessableEntity, message: "Invalid type value. Allowed: 'supplier', 'contractor', 'partner'" }),

  query("sortBy")
    .optional()
    .isIn(["name", "createdAt"])
    .withMessage({ code: UnprocessableEntity, message: "Invalid sortBy value. Allowed: 'name', 'createdAt'" }),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage({ code: UnprocessableEntity, message: "Invalid sortOrder value. Allowed: 'asc', 'desc'" }),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage({ code: UnprocessableEntity, message: "page must be an integer greater than 0" }),

  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage({ code: UnprocessableEntity, message: "pageSize must be an integer greater than 0" }),

  validate,
];

module.exports = { getOne, editOne, addImage, removeImage, addCompany, getCompanies };
