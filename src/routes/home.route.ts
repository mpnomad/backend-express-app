import { Request, Response, NextFunction, Router } from 'express';

const homeRouter = Router();

/* GET home page. */
homeRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Homepage!');
});

export default homeRouter;
