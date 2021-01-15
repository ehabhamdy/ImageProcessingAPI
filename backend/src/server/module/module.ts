import BaseExpressRoute from '../../routes/base-express-route';

export default interface Module {
  getExpressRoutes(): BaseExpressRoute[];
}
