import { Router } from 'express';
import urlRouter from './urls/url-router';


const router = Router();
router.use('/urls', urlRouter);
// router.use('/web', webRouter);

export default router;
