// import Container from 'typedi';
// import BaseExpressRoute from '../../routers/base-express-route';
//
// type Class<T> = new (...args: any[]) => T;
//
// interface TypediBaseModuleConfig {
//   expressRouteClasses?: Class<BaseExpressRoute>[];
// }
//
// export default abstract class TypediBaseModule implements TypediBaseModule {
//   private expressRouteClasses: Class<BaseExpressRoute>[];
//
//   constructor({ expressRouteClasses = [] }: TypediBaseModuleConfig) {
//     this.expressRouteClasses = expressRouteClasses;
//   }
//
//   getExpressRoutes(): BaseExpressRoute[] {
//     return this.expressRouteClasses.map((clazz) => Container.get(clazz));
//   }
// }
