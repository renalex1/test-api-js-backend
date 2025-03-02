const { OK, CREATED, BAD_REQUEST, NOT_FOUND } = require("../../../constants/http-codes");

module.exports = {
    "/companies/{id}": {
        get: {
            summary: "Get company details by ID",
            description: "Retrieve details of a company by its ID.",
            tags: ["Companies"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "The ID of the company to retrieve",
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
            ],
            responses: {
                [OK]: {
                    description: "Company details retrieved successfully",
                    content: {
                        "application/json": {
                            example: {
                                id: 12,
                                contactId: 16,
                                name: "ООО Фирма «Перспективные захоронения»",
                                shortName: "Перспективные захоронения",
                                businessEntity: "ООО",
                                contract: {
                                    no: "12345",
                                    issue_date: "2015-03-12T00:00:00Z",
                                },
                                type: ["agent", "contractor"],
                                status: "active",
                                photos: [
                                    {
                                        name: "http://localhost:2114/static/0b8fc462dcabf7610a91.png",
                                        filepath: "0b8fc462dcabf7610a91.png",
                                        thumbpath: "http://localhost:2114/static/0b8fc462dcabf7610a91_160x160.png",
                                    },
                                ],
                                createdAt: "2020-11-21T08:03:00Z",
                                updatedAt: "2020-11-23T09:30:00Z",
                            },
                        },
                    },
                },
                [BAD_REQUEST]: {
                    description: "Invalid company ID",
                    content: {
                        "application/json": {
                            example: {
                                message: "Invalid request parameters. Company ID must be an integer.",
                            },
                        },
                    },
                },
                [NOT_FOUND]: {
                    description: "Company not found",
                    content: {
                        "application/json": {
                            example: {
                                message: "Company with the given ID not found.",
                            },
                        },
                    },
                },
            },
        },
        patch: {
            summary: "Edit company details",
            description: "Update details of an existing company by its ID.",
            tags: ["Companies"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "The ID of the company to update",
                    schema: {
                        type: "integer",
                        example: 12,
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
                                name: { type: "string", example: "ООО Новая Фирма" },
                                shortName: { type: "string", example: "Новая Фирма" },
                                businessEntity: { type: "string", example: "ООО" },
                                contract: {
                                    type: "object",
                                    properties: {
                                        no: { type: "string", example: "67890" },
                                        issue_date: { type: "string", format: "date-time", example: "2021-06-15T00:00:00Z" },
                                    },
                                },
                                type: {
                                    type: "array",
                                    items: { type: "string" },
                                    example: ["partner", "supplier"],
                                },
                                status: { type: "string", example: "inactive" },
                            },
                        },
                    },
                },
            },
            responses: {
                [OK]: {
                    description: "Company details updated successfully",
                    content: {
                        "application/json": {
                            example: {
                                id: 12,
                                name: "ООО Новая Фирма",
                                shortName: "Новая Фирма",
                                businessEntity: "ООО",
                                contract: {
                                    no: "67890",
                                    issue_date: "2021-06-15T00:00:00Z",
                                },
                                type: ["partner", "supplier"],
                                status: "inactive",
                                updatedAt: "2025-03-02T10:00:00Z",
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
                    description: "Company not found",
                    content: {
                        "application/json": {
                            example: {
                                message: "Company with the given ID not found.",
                            },
                        },
                    },
                },
            },
        },
    },
};
