const { OK, CREATED, BAD_REQUEST } = require("../../../constants/http-codes");

module.exports = {
    "/companies": {
        get: {
            summary: "Get a list of companies",
            description: "Retrieve a list of companies with optional filtering, sorting, and pagination.",
            tags: ["Companies"],
            parameters: [
                {
                    in: "query",
                    name: "status",
                    required: false,
                    description: "Filter companies by status (e.g., 'active', 'inactive').",
                    schema: {
                        type: "string",
                        enum: ["active", "inactive"],
                        example: "active",
                    },
                },
                {
                    in: "query",
                    name: "type",
                    required: false,
                    description: "Filter companies by type (e.g., 'supplier', 'contractor').",
                    schema: {
                        type: "string",
                        enum: ["supplier", "contractor", "partner"],
                        example: "supplier",
                    },
                },
                {
                    in: "query",
                    name: "sortBy",
                    required: false,
                    description: "Field to sort by (e.g., 'name', 'createdAt'). Default is 'name'.",
                    schema: {
                        type: "string",
                        enum: ["name", "createdAt"],
                        default: "name",
                        example: "name",
                    },
                },
                {
                    in: "query",
                    name: "sortOrder",
                    required: false,
                    description: "Sort order: 'asc' or 'desc'. Default is 'asc'.",
                    schema: {
                        type: "string",
                        enum: ["asc", "desc"],
                        default: "asc",
                        example: "asc",
                    },
                },
                {
                    in: "query",
                    name: "page",
                    required: false,
                    description: "The page number for pagination (default is 1).",
                    schema: {
                        type: "integer",
                        default: 1,
                        example: 1,
                    },
                },
                {
                    in: "query",
                    name: "pageSize",
                    required: false,
                    description: "The number of companies per page (default is 10).",
                    schema: {
                        type: "integer",
                        default: 10,
                        example: 10,
                    },
                },
            ],
            responses: {
                [OK]: {
                    description: "List of companies successfully retrieved",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    companies: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: { type: "integer" },
                                                name: { type: "string" },
                                                shortName: { type: "string" },
                                                businessEntity: { type: "string" },
                                                type: {
                                                    type: "array",
                                                    items: { type: "string" },
                                                },
                                                status: { type: "string" },
                                                address: { type: "string", nullable: true },
                                                userId: { type: "integer" },
                                                createdAt: { type: "string", format: "date-time" },
                                                updatedAt: { type: "string", format: "date-time" },
                                                photos: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            name: { type: "string" },
                                                            filepath: { type: "string" },
                                                            thumbpath: { type: "string" },
                                                        },
                                                    },
                                                    nullable: true,
                                                },
                                                contacts: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            name: { type: "string" },
                                                            email: { type: "string" },
                                                        },
                                                    },
                                                    nullable: true,
                                                },
                                                contracts: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            no: { type: "string" },
                                                            issueDate: { type: "string", format: "date-time" },
                                                        },
                                                    },
                                                    nullable: true,
                                                },
                                            },
                                        },
                                    },
                                    totalCompanies: { type: "integer" },
                                    totalPages: { type: "integer" },
                                    currentPage: { type: "integer" },
                                },
                            },
                            example: {
                                companies: [
                                    {
                                        id: 1,
                                        name: "ООО Новая Компания",
                                        shortName: "Новая Компания",
                                        businessEntity: "ООО",
                                        type: ["supplier", "contractor"],
                                        status: "active",
                                        address: "Some address",
                                        userId: 42,
                                        createdAt: "2025-03-02T10:00:00Z",
                                        updatedAt: "2025-03-02T10:00:00Z",
                                        photos: [
                                            {
                                                name: "company_logo.png",
                                                filepath: "uploads/company_logo.png",
                                                thumbpath: "uploads/thumbnails/company_logo_160x160.png",
                                            },
                                        ],
                                        contacts: [
                                            {
                                                name: "John Doe",
                                                email: "john@example.com",
                                            },
                                        ],
                                        contracts: [
                                            {
                                                no: "123456",
                                                issueDate: "2025-03-01T00:00:00Z",
                                            },
                                        ],
                                    },
                                ],
                                totalCompanies: 100,
                                totalPages: 10,
                                currentPage: 1,
                            },
                        },
                    },
                },
                [BAD_REQUEST]: {
                    description: "Invalid request parameters",
                    content: {
                        "application/json": {
                            example: {
                                message: "Invalid input. Status should be one of 'active', 'inactive'.",
                            },
                        },
                    },
                },
            },
        },
        post: {
            summary: "Create a new company",
            description: "Add a new company to the system. A user ID is required to associate the company with a specific user.",
            tags: ["Companies"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "ООО Новая Компания" },
                                shortName: { type: "string", example: "Новая Компания" },
                                businessEntity: { type: "string", example: "ООО" },
                                contract: {
                                    type: "object",
                                    properties: {
                                        no: { type: "string", example: "123456" },
                                        issue_date: { type: "string", format: "date-time", example: "2023-08-10T00:00:00Z" },
                                    },
                                },
                                type: {
                                    type: "array",
                                    items: { type: "string" },
                                    example: ["supplier", "contractor"],
                                },
                                status: { type: "string", example: "active" },
                                photos: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            name: { type: "string", example: "company_logo.png" },
                                            filepath: { type: "string", example: "uploads/company_logo.png" },
                                            thumbpath: { type: "string", example: "uploads/thumbnails/company_logo_160x160.png" },
                                        },
                                    },
                                },
                            },
                            required: ["name", "businessEntity", "status"],
                        },
                    },
                },
            },
            responses: {
                [CREATED]: {
                    description: "Company created successfully",
                    content: {
                        "application/json": {
                            example: {
                                id: 15,
                                userId: 42,
                                name: "ООО Новая Компания",
                                shortName: "Новая Компания",
                                businessEntity: "ООО",
                                contract: {
                                    no: "123456",
                                    issue_date: "2023-08-10T00:00:00Z",
                                },
                                type: ["supplier", "contractor"],
                                status: "active",
                                photos: [
                                    {
                                        name: "company_logo.png",
                                        filepath: "uploads/company_logo.png",
                                        thumbpath: "uploads/thumbnails/company_logo_160x160.png",
                                    },
                                ],
                                createdAt: "2025-03-02T10:00:00Z",
                            },
                        },
                    },
                },
                [BAD_REQUEST]: {
                    description: "Invalid request parameters",
                    content: {
                        "application/json": {
                            example: {
                                message: "Invalid input. userId is required and must be an integer.",
                            },
                        },
                    },
                },
            },
        },
    },
};
