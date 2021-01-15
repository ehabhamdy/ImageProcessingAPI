import { ServerConfig } from '../server.config';
import { http } from '../values/http.config';

const serverConfig: ServerConfig = {
  http,
  nodeEnv: 'development',
};

export default serverConfig;
