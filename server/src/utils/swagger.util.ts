import swaggerJsdoc from 'swagger-jsdoc';
import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Commodity Request API',
            version: "v1",
            description: 'API for managing commodity requests between CHWs and CHAs',
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        servers: [
            {
                url: `${process.env.API_BASE_URL}/api`,
                description: `${process.env.NODE_ENV} server`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Commodity: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'Malaria Drugs',
                        },
                        description: {
                            type: 'string',
                            example: 'Antimalarial medication',
                        },
                    },
                },
            },
        },
    },
    apis: [
        path.join(__dirname, '../routes/*.ts'),
        path.join(__dirname, '../controllers/*.ts'),
        path.join(__dirname, '../interfaces/*.ts'),
    ],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Application): void => {
    // Serve Swagger JSON
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });

    // Serve Swagger UI
    app.use(
        process.env.API_DOCS_PATH || '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(specs, {
            explorer: true,
            customSiteTitle: 'Commodity Request API',
            customCss: '.swagger-ui .topbar { background-color: #1976d2; }',
            customfavIcon: '/public/favicon.ico',
        })
    );
};