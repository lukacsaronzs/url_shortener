import {CrudService} from './crud-service';
import UrlModel, {Url} from '../models/url';
import { MongoUtils } from '../utils/mongoUtils';
import { v4 as uuidv4 } from 'uuid';

export class UrlService extends CrudService<Url> {

    constructor() {
        super(UrlModel);
    }
    public async listAll(query: FilterParams, match: Partial<Url>) {
        const {search, ids} = query;
        const $match: any = match || {};

        if (ids) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            $match._id = {$in: ids.map((id: string) => ObjectId(id))}
        }

        if (search) {
            $match.$or = [
                {firstName: {$regex: search, $options: 'i'}},
                {lastName: {$regex: search, $options: 'i'}},
                {email: {$regex: search, $options: 'i'}}
            ];
        }

        const aggregationPipeline: any[] = [
            {$match},
            ...MongoUtils.buildPaginationStages(query)
        ];

        const [data] = await this.model.aggregate(aggregationPipeline);
        return data;
    }

    async addUrl(toShorten: string) {
        const inDb = await this.getByUrl(toShorten);
        if (!inDb){
            let shortened: Partial<Url> = {
                url: toShorten,
                shortUrl: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            }
            return UrlModel.create<Partial<Url>>(shortened);
        }
        inDb.used += 1;
        return inDb.save();
    }

    getByUrl(url: string) {
        return UrlModel.findOne({ url});
    }

    getByShortUrl(shortUrl: string) {
        return UrlModel.findOneAndUpdate({ shortUrl: "fb92e328-d976-4395-9440-678908c3469e" }, { $inc: { used: 1 }});
    }




   
}
