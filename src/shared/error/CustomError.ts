type ErrorType =
  | 'BadRequestError'
  | 'AuthenticationError'
  | 'UnauthorizedError'
  | 'ForbiddenError'
  | 'NotFoundError'
  | 'EMAIL_SEND_ERROR';

export class CustomError extends Error {
  status: number;
  errorType: ErrorType;

  constructor({
    message,
    errorType,
    status,
    name = 'CustomError',
  }: {
    message: string;
    errorType: ErrorType;
    status: number;
    name?: string;
  }) {
    super(message);
    this.status = status;
    this.name = name;
    this.errorType = errorType;
    Error.captureStackTrace(this, this.constructor);
  }
}
