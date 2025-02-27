const { OK } = require("../../../constants/http-codes");

module.exports = {
  "/users/auth": {
    get: {
      summary: "Retrieves authorization token",
      description:
        "Used to retrive authorization token for the defined user data",
      tags: ["Users"],
      parameters: [
        {
          in: "query",
          name: "user",
          required: true,
          description: "User data",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    description: "User identifier",
                    example: 1,
                  },
                  full_name: {
                    type: "string",
                    description: "User full name",
                    example: "Rick Grimes",
                  },
                },
              },
            },
          },
        },
      ],
      responses: {
        [OK]: {
          description: "User data",
          headers: {
            Authorization: {
              schema: {
                type: "string",
              },
              description: "Bearer authorization token",
            },
          },
          content: {
            "application/json": {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "User identifier",
                  example: 1,
                },
                full_name: {
                  type: "string",
                  description: "User full name",
                  example: "Rick Grimes",
                },
              },
            },
          },
        },
      },
    },
  },
};
