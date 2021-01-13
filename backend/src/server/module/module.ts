import BaseExpressRoute from '../../routers/base-express-route';

export default interface Module {
  getExpressRoutes(): BaseExpressRoute[];
}
