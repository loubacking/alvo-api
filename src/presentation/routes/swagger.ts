const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/presentation/config/swagger_output.json'
const endpointsFiles = [
  './src/presentation/routes/authRoutes.ts',
  './src/presentation/routes/songsRoutes.ts',
  './src/presentation/routes/artistsRoutes.ts',
]

const doc = {
  info: {
    version: '',      // by default: '1.0.0'
    title: 'Alvo Cifras API',        // by default: 'REST API'
    description: '',  // by default: ''
  },
  host: '',      // by default: 'localhost:3000'
  basePath: '',  // by default: '/'
  schemes: [],   // by default: ['http']
  consumes: [],  // by default: ['application/json']
  produces: [],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
      name: '',         // Tag name
      description: '',  // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {
    Auth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'X-ACCESS-TOKEN', // name of the header, query parameter or cookie
      description: 'JWT provided on login'
    }
  },  // by default: empty object
  definitions: {},          // by default: empty object (Swagger 2.0)
  components: {}            // by default: empty object (OpenAPI 3.x)
};

swaggerAutogen(outputFile, endpointsFiles, doc)