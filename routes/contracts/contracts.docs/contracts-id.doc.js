const { OK, CREATED, BAD_REQUEST, NO_CONTENT } = require("../../../constants/http-codes");

module.exports = {
    "/contracts/{id}": {
        get: {
            summary: "Get contract details",
            description: "Retrieve details of a specific contract by ID.",
            tags: ["Contracts"],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" }
            }],
            responses: {
                [OK]: {
                    description: "Contract retrieved successfully",
                    content: {
                        "application/json": {
                            example: {
                                id: 1,
                                contract: {
                                    no: "12345",
                                    issueDate: "2015-03-12T00:00:00Z"
                                },
                                updatedAt: "2025-03-02T23:00:00Z"
                            }
                        }
                    }
                }
            }
        },
        patch: {
            summary: "Update contract details",
            description: "Modify details of a specific contract.",
            tags: ["Contracts"],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" }
            }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                no: { type: "string", example: "12345" },
                                issueDate: { type: "string", format: "date-time", example: "2015-03-12T00:00:00Z" }
                            }
                        }
                    }
                }
            },
            responses: {
                [OK]: {
                    description: "Contract updated successfully",
                    content: {
                        "application/json": {
                            example: {
                                id: 1,
                                contract: {
                                    no: "12345",
                                    issueDate: "2015-03-12T00:00:00Z"
                                },
                                updatedAt: "2025-03-02T23:00:00Z"
                            }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Delete a contract",
            description: "Remove a contract from the system.",
            tags: ["Contracts"],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" }
            }],
            responses: {
                [NO_CONTENT]: {
                    description: "Contract deleted successfully"
                }
            }
        }
    }
};