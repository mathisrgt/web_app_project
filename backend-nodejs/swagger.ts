import swaggerJSDoc from 'swagger-jsdoc';
import './swagger-annotations'; // Import the file with Swagger annotations

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'StudyFlash',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Update with your server URL
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer'},
                        username: {type: 'string'},
                        password: {type: 'string'},
                    },
                },
                Card: {  // Add this Card schema
                    type: 'object',
                    properties: {
                        id: {type: 'integer'},
                        title: {type: 'string'},
                        question: {type: 'string'},
                        answer: {type: 'string'},
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {type: 'boolean'},
                        error: {type: 'string'},
                    },
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                    },
                },
            },
        },
    },
    apis: ['./index.ts', './swagger-annotations.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
