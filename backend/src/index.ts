import Server from './server/server';
import * as http from 'http';

let httpServer: http.Server;

Server.bootstrap().then((server: Server) => {
  httpServer = http.createServer(server.getExpressApplication());
  httpServer.listen(server.getConfig().http.port);
  httpServer.on('listening', () => {
    console.info(`
    The application was started on port 
    ${server.getConfig().http.port}! Kill it using Ctrl + C`);
  });
});
