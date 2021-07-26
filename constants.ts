import { Exception } from './models/exception';

/* eslint-disable */
export const errors = {
    unknown: new Exception(400, 'Unknown', 'An unknown error occurred. Please try again later.'),
    unauthorized: new Exception(401, 'Unauthorized', 'You are not authorized to access this resource.'),
    notFound: (resource: string) => new Exception(404, 'NotFound', `The requested ${resource} was not found.`),
    invalidParameter: (param: string) => new Exception(422, 'InvalidParameter', `Missing or invalid parameter ${param}.`),
};
/* eslint-enable */
