const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Express API',
        version: '1.0.0',
        description: 'API documentation with Swagger UI',
    },
    paths: {},
    components: {
        securitySchemes: {
            oauth2: {
                type: 'oauth2',
                flows: {
                    authorizationCode: {
                        authorizationUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
                        tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
                        scopes: {
                            'openid': 'OpenID Connect scope',
                            'profile': 'User profile',
                            'email': 'User email',
                        },
                    },
                },
            },
        },
    },
    security: [
        {
            oauth2: ['openid', 'profile', 'email']
        }
    ],
};
const favicon = require('serve-favicon');
const path = require('path');
const utils = require('./utils');

// fn to create express server
const create = async () => {
    const app = express();
    app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
    // Swagger UI route with OAuth config and custom redirect URL
    app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument, false, {
        oauth: {
            clientId: 'a81a583b-9276-4c34-bbc5-23717231e67f',
            scopes: ['openid', 'profile', 'email'],
            usePkceWithAuthorizationCodeGrant: true,
        },
        oauth2RedirectUrl: 'http://localhost:3001/swagger-ui/oauth2-redirect.html',
    }));

    // Log request
    app.use(utils.appLogger);

    // root route - serve static file
    app.get('/hello', (req, res) => {
        res.json({ hello: 'Hello' });
        res.end();
    });

    // root route - serve static file
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/client.html')));

    // Catch errors
    app.use(utils.logErrors);
    app.use(utils.clientError404Handler);
    app.use(utils.clientError500Handler);
    app.use(utils.errorHandler);

    return app;
};

module.exports = {
    create
};
