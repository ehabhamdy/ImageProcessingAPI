import BaseApp from './base-app';
import AppConfig from './config/app-config';
import serverConfig from './config/values/server.config';

export default class Server extends BaseApp {
  constructor() {
    super();
  }

  public static async bootstrap(): Promise<Server> {
    const server = new Server();
    await server.start();
    return server;
  }

  public getExpressApplication() {
    return this.app;
  }

  getConfig(): AppConfig {
    return serverConfig;
  }
}
