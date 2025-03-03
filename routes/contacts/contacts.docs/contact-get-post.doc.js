const { OK, CREATED, BAD_REQUEST } = require("../../../constants/http-codes");

module.exports = {
    "/contacts": {
        post: {
            summary: "Create a new contact",
            description: "Add a new contact to the system.",
            tags: ["Contacts"],
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
                                companyId: { type: "number", example: 1 },
                            },
                            required: ["lastName", "firstName", "phone", "email", "companyId"],
                        },
                    },
                },
            },
            responses: {
                [CREATED]: {
                    description: "Contact created successfully",
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
                                message: "Invalid input. 'companyId' is required and must be a number.",
                            },
                        },
                    },
                },
            },
        },
    },
};