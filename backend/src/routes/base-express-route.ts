import { Router } from 'express';

export default abstract class BaseExpressRoute {
  abstract getRouter(): Router;
}
