import { Router } from 'express';

export interface RouterModel {
  contextPath: string;
  router: Router;
}
