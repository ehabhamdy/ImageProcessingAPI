import Server from '../server/server';
import request from 'supertest';
import path from 'path';

describe('Image Processing Module', function () {
  it('fetch all stored image successfully', async function () {
    Server.bootstrap().then((server: Server) => {
      const app = server.getExpressApplication();

      request(app)
        .get('/api/images')
        .expect(200)
        .then((response) => {
          expect(response.body.message).toMatch('succeeded');
        });
    });
  });

  it('fetch all stored image successfully', async function () {
    Server.bootstrap().then((server: Server) => {
      const app = server.getExpressApplication();

      const file = path.join(__dirname, '../../src/spec/Chuchu.png');

      request(app)
        .put('/api/images/uploadImage')
        .field('Content-Type', 'multipart/form-data')
        .attach('image', file)
        .expect(300)
        .then((response) => {
          expect(response.body.message).toMatch('/images/resized/Chuchu.png');
        });
    });
  });
});
