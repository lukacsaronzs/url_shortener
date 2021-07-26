import {Url} from '../../../models/url';
import { UrlService } from '../../../services/url-service';
import { NextFunction, Request, Response } from 'express';
import { CrudController } from '../../crud-controller';
import {errors} from '../../../constants';
import {PagerQueryParams} from '../../../middleware/pager';

export class UrlController extends CrudController<UrlService, Url> {

    constructor() {
        super(new UrlService());
    }

    public list = async (req: Request<{}, {}, {},  PagerQueryParams>,
        res: Response<{total: number, data: Url[]}>, next: NextFunction) => {
        try {
            const match = {};
            const data = await this.service.listAll(req.filter, match);
            return res.status(200).json(data || { total: 0, data: [] });
        } catch (e) {
            return next(e);
        }
    }

    public create = async (req: Request<{}, {}, { url: string}>,
        res: Response<Url>, next: NextFunction) => {
        try {
            const {url} = req.body;

            if(!url){
                throw errors.invalidParameter("url");
            }
          
            const data = await this.service.addUrl(url);
            return res.status(200).json(data);
        } catch (e) {
             return next(e);
        }
    }

    public getShortened = async (req: Request<{shortUrl: string}, {}, {}>,
        res: Response<Url | null>, next: NextFunction) => {
        try {

            const {shortUrl} = req.params;
            if(!shortUrl){
                throw errors.invalidParameter("shortUrl");
            }
            console.log(shortUrl)

            const data = await this.service.getByShortUrl(shortUrl);
            console.log(data)
            return res.status(200).json(data);
        } catch (e) {
             return next(e);
        }
    }   
   
}
export default new UrlController();
