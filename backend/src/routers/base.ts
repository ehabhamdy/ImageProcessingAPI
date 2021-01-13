import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

// Application routing
router.use('/', (_: Request, res: Response) => {
  res.status(200).send({ message: 'Success updated' });
});

export default router;
