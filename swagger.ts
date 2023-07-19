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
    User: 'Mike Johnson',
    Tag: { $name: 'Outdoors' },
    Comment: {
      $comment: 'This was great info. Thank you!',
      $author: { $ref: '#/definitions/User' },
      $postTitle: '3 Day Backpacking List',
    },
    Post: {
      $title: '3 Day Backpacking List',
      $author: { $ref: '#/definitions/User' },
      $content: "In this post, I'm going to go over the best things to pack for a 3 day backpacking trip in southern Utah...",
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAG0C...',
      tags: [{ $ref: '#/definitions/Tag' }],
    },
    UserResponse: {
      githubId: '123456',
      $displayName: 'Steve Allen',
      oAuthProvider: 'GitHub',
      createdAt: '2023-06-24T01:45:43.197Z',
    },
    TagResponse: {
      $name: 'Outdoors',
      createdAt: '2023-06-24T01:45:43.197Z',
      updatedAt: '2023-06-25T01:45:43.197Z',
    },
    CommentResponse: {
      post: '64aa1682d201360c4e2c7978',
      author: { $ref: '#/definitions/UserResponse' },
      comment: 'I love this!',
      createdAt: '2023-06-24T01:45:43.197Z',
      updatedAt: '2023-06-25T01:45:43.197Z',
    },
    PostResponse: {
      $title: '3 Day Backpacking List',
      $author: { $ref: '#/definitions/UserResponse' },
      $content: "In this post, I'm going to go over the best things to pack for a 3 day backpacking trip in southern Utah...",
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAG0C...',
      comments: [{ $ref: '#/definitions/CommentResponse' }],
      tags: [{ $ref: '#/definitions/TagResponse' }],
    },
  },
};

const endpointsFiles = ['./src/app.ts'];
let outputFile = './src/swagger-dev.json';

if (process.env.NODE_ENV === 'prod') {
  doc.host = process.env.HOST || '';
  doc.schemes = ['https'];
  outputFile = './src/swagger.json';
}

swaggerAutogen(outputFile, endpointsFiles, doc);
