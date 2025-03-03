const { OK, BAD_REQUEST, NOT_FOUND } = require("../../../constants/http-codes");

module.exports = {
    "/contacts/{id}": {
        get: {
            summary: "Get contacts detail by ID",
            description: "Retrieve details of a contact by its ID.",
            tags: ["Contacts"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "The ID of the contact to retrieve",
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
            ],
            responses: {
                [OK]: {
                    description: "Contract details retrieved successfully",
                    content: {
                        "application/json": {
                            example: {
                                id: 1,
                                lastName: "Григорьев",
                                firstName: "Сергей",
                                patronymic: "Петрович",
                                phone: "+79162165588",
                                email: "grigoriev@funeral.com",
                                createdAt: "2025-03-02T22:18:09.615Z",
                                updatedAt: "2025-03-02T22:18:09.615Z",
                                companyId: 1,
                            },
                        },
                    },
                },
                [BAD_REQUEST]: {
                    description: "Invalid contact ID",
                    content: {
                        "application/json": {
                            example: {
                                message: "Invalid request parameters. Contract ID must be an integer.",
                            },
                        },
                    },
                },
                [NOT_FOUND]: {
                    description: "Contract not found",
                    content: {
                        "application/json": {
                            example: {
                                message: "Contract with the given ID not found.",
                            },
                        },
                    },
                },
            },
        },
        patch: {
            summary: "Edit contact details",
            description: "Update details of an existing contact by its ID.",
            tags: ["Contacts"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "The ID of the contact to update",
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                lastName: { type: "string", example: "Иванов" },
                                firstName: { type: "string", example: "Иван" },
                                patronymic: { type: "string", example: "Иванович" },
                                phone: { type: "string", example: "+79261234567" },
                                email: { type: "string", format: "email", example: "ivanov@example.com" },
                            },
                        },
                    },
                },
            },
            responses: {
                [OK]: {
                    description: "Contract details updated successfully",
                    content: {
                        "application/json": {
                            example: {
                                id: 1,
                                lastName: "Иванов",
                                firstName: "Иван",
                                patronymic: "Иванович",
                                phone: "+79261234567",
                                email: "ivanov@example.com",
                                updatedAt: "2025-03-02T23:00:00Z",
                                companyId: 2,
                            },
                        },
                    },
                },
                [BAD_REQUEST]: {
                    description: "Invalid request parameters",
                    content: {
                        "application/json": {
                            example: {
                                message: "Invalid request parameters. Please check the input data.",
                            },
                        },
                    },
                },
                [NOT_FOUND]: {
                    description: "Contract not found",
                    content: {
                        "application/json": {
                            example: {
                                message: "Contract with the given ID not found.",
                            },
                        },
                    },
                },
            },
        },
        delete: {
            summary: "Delete a contact",
            description: "Remove a contact by its ID. Only authorized users can perform this action.",
            tags: ["Contacts"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "The ID of the contact to delete",
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
            ],
            responses: {
                [OK]: {
                    description: "Contract deleted successfully",
                    content: {
                        "application/json": {
                            example: {
                                message: "Contract deleted successfully",
                            },
                        },
                    },
                },
                [NOT_FOUND]: {
                    description: "Contract not found",
                    content: {
                        "application/json": {
                            example: {
                                message: "Contract not found",
                            },
                        },
                    },
                },
                [BAD_REQUEST]: {
                    description: "Invalid request parameters",
                    content: {
                        "application/json": {
                            example: {
                                message: "Invalid contact ID",
                            },
                        },
                    },
                },
            },
        },
    },
};