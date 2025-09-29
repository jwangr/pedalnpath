export class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default class ValidationError extends ApiError {
    constructor(message) {
        super(401, message);
    }
}