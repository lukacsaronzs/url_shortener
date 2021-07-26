export class Exception extends Error {

    constructor(
        public status: number,
        public code: string,
        public message: string,
    ) {
        super(message);
    }
}
