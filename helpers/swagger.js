const swaggerJSDoc = require("swagger-jsdoc");

const swaggerJSDocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant RESTFul API",
      version: "1.0.6",
      description: "A RESTful API for carrot institute",
      termsOfService: "https://example.com",
      contact: {
        name: "FRIEDRICH MEREDITH SAM",
        email: "churchillmerediths@gmail.com",
        url: "https://example.com",
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: "http://127.0.0.1:8888",
        description: "Local development server",
      },
      {
        url: "https://example.com",
        description: "Test server",
      },
      {
        url: "https://example.com",
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "HOME",
        description: "",
        externalDocs: {
          description: "",
          url: "",
        },
        deprecated: false,
      },
      {
        name: "AUTH",
        description: "",
        externalDocs: {
          description: "",
          url: "",
        },
        deprecated: false,
      },
      {
        name: "RESTAURANTS",
        description: "",
        externalDocs: {
          description: "",
          url: "",
        },
        deprecated: false,
      },
      {
        name: "MENU",
        description: "",
        externalDocs: {
          description: "",
          url: "",
        },
        deprecated: false,
      },
      {
        name: "ORDERS",
        description: "",
        externalDocs: {
          description: "",
          url: "",
        },
        deprecated: false,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./controllers/*.js"],
  swaggerDefinition: null,
  apisSorter: "alpha",
  operationsSorter: "alpha",
  basePath: "/api/v1",
  security: [
    {
      bearerAuth: [],
    },
  ],
  schemes: ["http", "https"],
  host: "localhost:8888",
};

const swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);

const swaggerUiExpressOptions = {
  customSiteTitle: "Restaurant API - Carrot Institute", // Set your custom title here
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
    requestTimeout: 5000,
  },
};

module.exports = { swaggerSpec, swaggerUiExpressOptions };
