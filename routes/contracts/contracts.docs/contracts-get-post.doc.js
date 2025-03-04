const { OK, CREATED, BAD_REQUEST, NO_CONTENT } = require("../../../constants/http-codes");

module.exports = {
    "/contracts": {
        post: {
            summary: "Create a new contract",
            description: "Add a new contract to the system.",
            tags: ["Contracts"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                companyId: { type: "integer", example: 10 },
                                no: { type: "string", example: "12345" },
                                issueDate: { type: "string", format: "date-time", example: "2015-03-12T00:00:00Z" }
                            },
                            required: ["companyId", "no", "issueDate"]
                        }
                    }
                }
            },
            responses: {
                [CREATED]: {
                    description: "Contract created successfully",
                    content: {
                        "application/json": {
                            example: {
                                id: 1,
                                companyId: 10,
                                no: "12345",
                                issueDate: "2015-03-12T00:00:00Z",
                                updatedAt: "2025-03-02T23:00:00Z"
                            }
                        }
                    }
                },
                [BAD_REQUEST]: {
                    description: "Invalid request parameters",
                    content: {
                        "application/json": {
                            example: {
                                message: "Invalid input. 'companyId' is required."
                            }
                        }
                    }
                }
            }
        }
    },
};
