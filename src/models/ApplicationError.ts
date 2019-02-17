
export enum ErrorCode {
    DATABASE_CONNECTION_ERROR,
    BOOK_ALREADY_EXISTS,
    BOOK_NOT_FOUND_BY_ID,
};

export class ApplicationError extends Error {
    status: number;
    code: ErrorCode;

    constructor(code: ErrorCode) {
        const info = ErrorInfo.find(errInfo => errInfo.code === code);
        super(info.message);
        this.status = info.status;
        this.code = info.code;
    };
};

// TODO improvement: use a hash
const ErrorInfo = [
    {
        code: ErrorCode.DATABASE_CONNECTION_ERROR,
        message: 'Error while trying to connect to database',
        status: 503
    },
    {
        code: ErrorCode.BOOK_ALREADY_EXISTS,
        message: 'A book with this ISBN is already registered in the database',
        status: 409
    },
    {
        code: ErrorCode.BOOK_NOT_FOUND_BY_ID,
        message: 'No book where found with the provided id',
        status: 404
    },
];
