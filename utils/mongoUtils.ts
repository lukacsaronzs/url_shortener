import mongoose from 'mongoose';

export class MongoUtils {
    public static ObjectId(id: string) {
        return mongoose.Types.ObjectId(id);
    }

    /**
     * This method is meant to be applied as the last stages of an aggregation pipeline for an admin list request
     *
     * It applies a group stage that returns the total number of documents found, and handles pagination by
     * slicing the resulting data array of documents.
     *
     * @param query - an object that contains information about pagination and sort
     */
    public static buildPaginationStages(query: FilterParams) {
        const { pageOffset, pageLength, sort, summary } = query;

        let $sort: { [key: string]: number } = { _id: - 1 };
        if (sort) {
            $sort = {};
            $sort[sort.field] = sort.direction;
        }

        let dataProject: any = 1;
        if (pageOffset != null && pageLength != null) {
            dataProject = {
                $slice: ['$data', pageOffset * pageLength, pageLength]
            }
        }

        const pipeline: any[] = [{ $sort }];
        if (summary) pipeline.push({ $project: summary });

        return [
            ...pipeline,
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    data: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    _id: 0,
                    total: 1,
                    data: dataProject
                }
            }
        ];
    }

    public static buildLookup(from: string, localField: string, foreignField: string, as: string) {
        return [
            {$lookup: {from, localField, foreignField, as}},
            {
                $unwind: {
                    path: `$${as}`,
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];
    }
}
