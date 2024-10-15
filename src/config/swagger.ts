import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerConfig: swaggerJSDoc.OAS3Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Reforça o Bem API',
      description: 'Documentação da API do projeto Reforça o Bem.',
      version: '1.0.0'
    },
    host: 'localhost:4444',
    // Não obrigatório, serve apenas para definir a ordem das categorias
    tags: [],
    externalDocs: {
      description: 'View swagger.json',
      url: '../swagger.json'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          in: 'header',
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  },
  apis: ['src/controller/*.ts', 'controller/*.js', 'src/routes/routes.ts']
};