
export {}

declare global {

    interface FilterParams {
        pageOffset: number;
        pageLength: number;
        search?: string;
        sort?: {
            field: string;
            direction: 1 | -1;
        };
        summary?: { [key: string]: 0 | 1 };
        ids?: string[], // a list of id's to be retrieved
    }

    namespace Express {

        /**
         * Overrides Express.Request.
         * Adds some new properties.
         */
        interface Request {
            // adds extra params, besides those which come from the client in the request query|prams|body
            options?: any;

            // default search params
            filter: FilterParams;
        }
    }
}
