
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Course Eligibility Portal API",
        version: "1.0.0",
        description: "API documentation for student eligibility checking and submission history.",
    },
    servers: [
        {
            url: "http://localhost:5000/api",
            description: "Local development server",
        },
    ],
    paths: {
        "/students/check-eligibility": {
            post: {
                summary: "Check student eligibility",
                tags: ["Students"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: [
                                    "studentName",
                                    "age",
                                    "gender",
                                    "subjects",
                                    "courseCategory",
                                    "desiredCourse",
                                ],
                                properties: {
                                    studentName: { type: "string", example: "Rahul Sharma" },
                                    age: { type: "integer", example: 20 },
                                    gender: {
                                        type: "string",
                                        enum: ["Male", "Female", "Other"],
                                    },
                                    subjects: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                subject: { type: "string", example: "Physics" },
                                                marks: { type: "number", example: 90 },
                                            },
                                        },
                                    },
                                    jeeQualified: { type: "boolean", nullable: true },
                                    neetQualified: { type: "boolean", nullable: true },
                                    courseCategory: {
                                        type: "string",
                                        enum: ["Engineering", "Medicine", "Commerce", "Humanities"],
                                    },
                                    desiredCourse: {
                                        type: "string",
                                        example: "Computer Science Engineering",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Eligibility checked successfully",
                    },
                    "400": {
                        description: "Validation error",
                    },
                    "500": {
                        description: "Internal server error",
                    },
                },
            },
        },
        "/students/history": {
            get: {
                summary: "Get student submission history",
                tags: ["Students"],
                responses: {
                    "200": {
                        description: "Student history fetched successfully",
                    },
                    "500": {
                        description: "Internal server error",
                    },
                },
            },
        },
    },
};

export default swaggerDocument;
