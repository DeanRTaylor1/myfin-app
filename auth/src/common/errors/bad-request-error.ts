import { CustomError } from './custom-error';

//Generic error

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    console.log(this.message);
    return [{ message: this.message }];
  }
}
