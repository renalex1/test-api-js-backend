const { OK, UNAUTHORIZED } = require("../../../constants/http-codes");

module.exports = {
  "/users/logout": {
    post: {
      summary: "User Logout",
      description: "Logs out the user by invalidating the authentication token or session.",
      tags: ["Users"],
      responses: {
        [OK]: {
          description: "User successfully logged out",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Logged out successfully",
                  },
                },
              },
            },
          },
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized, missing or invalid token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
