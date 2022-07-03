import swaggerAutogen from 'swagger-autogen';
import { SERVER_BASE_URL, SERVER_PORT} from './config.js';

const doc = {
  info: {
    title: 'La Granja API',
    description: 'La Granja API documentation',
  },
  host: `${SERVER_BASE_URL}:${SERVER_PORT}`,
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
    await import('./index.js');           // Your project's root file
}); 
