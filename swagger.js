const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'TO-DO API',
        description: 'Project 2',
    },
    host: 'cse341-todo-list.herokuapp.com',
    schemes: ['https'],
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js'); // Your project's root file
});