import { Router } from 'express';
import apiRouter from './api';


const router = Router();
router.use('/api', apiRouter);
// router.use('/web', webRouter);

export default router;
