const { OK, BAD_REQUEST } = require("../../../constants/http-codes");

module.exports = {
  "/users": {
    post: {
      summary: "Creates a new user",
      description: "This endpoint allows creating a new user with the required data (email, password, full name, and role).",
      tags: ["Users"],
      parameters: [
        {
          in: "query",
          name: "email",
          required: true,
          description: "The email address of the new user",
          schema: {
            type: "string",
            example: "john.doe@example.com",
          },
        },
        {
          in: "query",
          name: "password",
          required: true,
          description: "The password of the new user",
          schema: {
            type: "string",
            example: "password123",
          },
        },
        {
          in: "query",
          name: "full_name",
          required: true,
          description: "The full name of the new user",
          schema: {
            type: "string",
            example: "John Doe",
          },
        },
        {
          in: "query",
          name: "role",
          required: true,
          description: "The role of the new user",
          schema: {
            type: "string",
            enum: ["REGULAR", "ADMIN"],
            example: "REGULAR",
          },
        },
      ],
      responses: {
        [OK]: {
          description: "User successfully created",
          content: {
            "application/json": {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "User created successfully",
                },
                user: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      description: "User identifier",
                      example: 1,
                    },
                    email: {
                      type: "string",
                      description: "User email",
                      example: "john.doe@example.com",
                    },
                    fullName: {
                      type: "string",
                      description: "User full name",
                      example: "John Doe",
                    },
                    role: {
                      type: "string",
                      description: "User role",
                      example: "REGULAR",
                    },
                    isVerified: {
                      type: "boolean",
                      description: "Verification status of the user",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
        [BAD_REQUEST]: {
          description: "Bad request, missing or invalid parameters",
          content: {
            "application/json": {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Invalid request parameters",
                },
              },
            },
          },
        },
      },
    },
  },
};
