import swaggerAutogen from 'swagger-autogen';

const outputFile = './src/docs/swagger-output.json'; // This will generate the output Swagger JSON
const endpointsFiles = ['./src/routes/labour.route.ts'];   // Path to your route files

const doc = {
  info: {
    title: 'User Management API',
    description: 'API for managing users',
  },
  host: 'localhost:4000',
  schemes: ['http'],
};

// Synchronous call - no .then() needed
swaggerAutogen()(outputFile, endpointsFiles, doc);
console.log('Swagger JSON generated');
