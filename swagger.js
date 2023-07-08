const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Blogging App API',
    description: 'CSE 341 Blogging App API',
  },
  host: `localhost:${process.env.PORT}`,
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    User: {
      $displayName: 'Mike Johnson',
    },
    Tag: {
      $name: 'Outdoors',
    },
    Comment: {
      $comment: 'This was great info. Thank you!',
      author: { $ref: '#/definitions/User' },
    },
    Post: {
      $title: '3 Day Backpacking List',
      $author: { $ref: '#/definitions/User' },
      $content: "In this post, I'm going to go over the best things to pack for a 3 day backpacking trip in southern Utah...",
      image: '',
      comments: [{ $ref: '#/definitions/Comment' }],
      tags: [{ $ref: '#/definitions/Tag' }],
    },
  },
};

const endpointsFiles = ['./src/app.ts'];
let outputFile = './src/swagger-dev.json';

if (process.env.NODE_ENV === 'prod') {
  doc.host = process.env.HOST;
  doc.schemes = ['https'];
  outputFile = './src/swagger.json';
}

swaggerAutogen(outputFile, endpointsFiles, doc);
