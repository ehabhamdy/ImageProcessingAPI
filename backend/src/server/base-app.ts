import express, { Router } from 'express';
import bodyParser from 'body-parser';
import AppConfig from './config/app-config';
import * as path from 'path';
import baseRouter from '../routes/base';
import imagesRouter from '../routes/images';
import morgan from 'morgan';

export default abstract class BaseApp {
  protected app: express.Application = express();

  public async start(): Promise<void> {
    const { port } = this.getConfig().http;
    this.app.set('port', port);

    this.applyExpressMiddleWare(this.app);

    this.getExpressRoutes().forEach(({ contextPath, router }) => {
      this.app?.use(contextPath, router);
    });
  }

  protected applyExpressMiddleWare(app: express.Application): void {
    if (this.getConfig().nodeEnv == 'development') {
      app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/images', express.static(path.join(__dirname, '../images')));
    // console.log(path.join(__dirname, '../images'));

    app.use((_, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, C-Requested-With, Content-Type, Accept, Authorization'
      );
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
      );
      next();
    });
  }

  public getExpressRoutes(): Array<{ contextPath: string; router: Router }> {
    return [
      { contextPath: '/api/base', router: baseRouter },
      { contextPath: '/api/images', router: imagesRouter },
    ];
  }

  public abstract getConfig(): AppConfig;
}
