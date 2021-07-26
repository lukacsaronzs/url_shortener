import { Router } from 'express';
import { parseQueryParams } from '../../../middleware/pager';
import urlController from './url-controller';

const urlRouter = Router();

urlRouter.get('/', parseQueryParams, urlController.list);
urlRouter.get('/:shortUrl', urlController.getShortened);
urlRouter.post('/', urlController.create);


export default urlRouter;
