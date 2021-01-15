import Module from './module';
import BaseExpressRoute from '../../routes/base-express-route';

export default class CompositeModule implements Module {
  constructor(private modules: Module[]) {}

  getExpressRoutes(): BaseExpressRoute[] {
    return this.modules.flatMap((module: Module) => module.getExpressRoutes());
  }
}
