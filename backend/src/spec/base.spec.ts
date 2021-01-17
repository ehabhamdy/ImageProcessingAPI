import Server from '../server/server';
import request from 'supertest';

describe('Base Route Test', function () {
  it('should ask user to run the Angular App', async function () {
    Server.bootstrap().then((server: Server) => {
      const app = server.getExpressApplication();

      request(app)
        .get('/api/base')
        .expect(200)
        .then((response) => {
          expect(response.body.message).toMatch(
            'Please run the Angular frontend application for full functionality'
          );
        });
    });
  });
});
