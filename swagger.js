const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Soccer World Cup 2022 Qatar :)',
    description: 'World Cup 2022 API'
  },
  host: 'carlosworldcup2022.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);