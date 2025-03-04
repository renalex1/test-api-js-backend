const { OK, CREATED, BAD_REQUEST, NOT_FOUND } = require("../../../constants/http-codes");

module.exports = {
    "/companies/{id}/image": {
        post: {
            summary: "Upload company image",
            description: "Allows uploading an image for a specific company.",
            tags: ["Companies"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "The ID of the company to which the image will be uploaded",
                    schema: {
                        type: "integer",
                        example: 12
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                file: {
                                    type: "string",
                                    format: "binary",
                                    description: "Image file to be uploaded"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Image uploaded successfully",
                    content: {
                        "application/json": {
                            example: {
                                name: "image.png",
                                filepath: "http://localhost:2114/static/image.png",
                                thumbPath: "http://localhost:2114/static/image_160x160.png"
                            }
                        }
                    }
                },
                "400": {
                    description: "Invalid request parameters",
                    content: {
                        "application/json": {
                            example: {
                                message: "Invalid request parameters."
                            }
                        }
                    }
                },
                "404": {
                    description: "Company not found",
                    content: {
                        "application/json": {
                            example: {
                                message: "Company with the given ID not found."
                            }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Remove company image",
            description: "Deletes an image associated with a specific company.",
            tags: ["Companies"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "The ID of the company whose image will be deleted",
                    schema: {
                        type: "integer",
                        example: 12
                    }
                },
                {
                    in: "query",
                    name: "image_name",
                    required: true,
                    description: "The name of the image file to be deleted",
                    schema: {
                        type: "string",
                        example: "company_logo.png"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Image deleted successfully",
                    content: {
                        "application/json": {
                            example: {
                                message: "Image deleted successfully."
                            }
                        }
                    }
                },
                "400": {
                    description: "Invalid request parameters",
                    content: {
                        "application/json": {
                            example: {
                                message: "Invalid request parameters."
                            }
                        }
                    }
                },
                "404": {
                    description: "Company or image not found",
                    content: {
                        "application/json": {
                            example: {
                                message: "Company with the given ID or image not found."
                            }
                        }
                    }
                }
            }
        }
    }
};
