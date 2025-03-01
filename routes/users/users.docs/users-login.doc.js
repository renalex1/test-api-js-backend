const { OK, BAD_REQUEST, UNAUTHORIZED } = require("../../../constants/http-codes");

module.exports = {
  "/users/login": {
    post: {
      summary: "User Login",
      description: "This endpoint allows a user to log in using email and password.",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "The email address of the user",
                  example: "john.doe@example.com",
                },
                password: {
                  type: "string",
                  description: "The password of the user",
                  example: "password123",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "User successfully logged in",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accessToken: {
                    type: "string",
                    description: "JWT access token for authentication",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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
        },
        [BAD_REQUEST]: {
          description: "Bad request, missing or invalid parameters",
          content: {
            "application/json": {
              schema: {
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
        [UNAUTHORIZED]: {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Invalid email or password",
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
