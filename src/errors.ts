export class EmailsDoneError extends Error {
  readonly statusCode: number;
  readonly errorCode: string;
  readonly responseBody: string;

  constructor(statusCode: number, errorCode: string, message: string, responseBody: string) {
    super(message);
    this.name = "EmailsDoneError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.responseBody = responseBody;
  }
}
