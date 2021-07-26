import mongoose from 'mongoose';

/**
 * Provides simple handlers for CRUD operations.
 */
export abstract class CrudService<T extends mongoose.Document> {

    /**
     * Protected constructor, not meant to be instantiated directly.
     *
     * @param model - this generic model will handle CRUD operations
     */
    protected constructor(
        protected model: mongoose.Model<T>,
    ) { }

    public async list(query: FilterParams, options: any = {}): Promise<T[] | null> {
        return this.model.aggregate(
            this.buildAggregations(query, options),
        );
    }

    public async addOne(data: T): Promise<T> {
        return this.model.create<any>(data);
    }

    // conversion to any --> make compiler happy (didn't found other way)
    public async getById(id: string ): Promise<T | null> {
        return this.model.findOne({ _id: id as any });
    }

    public async updateOne(id: string , updates: Partial<T>) {
        return this.model
            .findOneAndUpdate(
                {_id: id as any},
                {...updates , updatedTs: new Date()} as any ,
                {new: true},
            );
    }

    public async removeOne(id: string ) {
        return this.model.findOneAndRemove({ _id: id as any });
    }

    // TODO: create adminBuildAggregations and adminList ?

    /**
     * This method is meant to be overridden in child services to provide the appropriate aggregation stages in get
     * requests like get list or get by id.
     *
     * This implementation should handle basic aggregation stages like $sort, $skip, $limit.
     *
     * Some implementation may want to include particular fields with $lookup, or exclude others. Use the options
     * parameter to specify such preferences, check their presence and push the stages.
     *
     * @param query - a filter to be applied
     * @param options
     */
    protected buildAggregations(query: FilterParams, options: any = {}): any[] {
        const { pageOffset, pageLength } = query;
        const aggregations = [];

        aggregations.push(
            { $skip: pageOffset * pageLength },
            { $limit: pageLength },
        );

        return aggregations;
    }
}
