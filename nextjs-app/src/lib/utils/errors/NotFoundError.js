export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default class NotFoundError extends ApiError {
  constructor(message) {
    super(404, message);
  }
}
