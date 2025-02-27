const { OK, INTERNAL_ERROR } = require("../../../constants/http-codes");
const { internalError } = require("../../../config/swagger/common-errors");

module.exports = {
  "/": {
    get: {
      description: "Get README html",
      tags: ["Readme"],
      responses: {
        [OK]: {
          description: "README html page",
          content: {
            "text/html": {},
          },
        },
        [INTERNAL_ERROR]: internalError,
      },
    },
  },
};
