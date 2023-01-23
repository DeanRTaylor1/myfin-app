export abstract class CustomError extends Error {
  //abstract classes are not instantiatable i.e. they can not be called they are templates
  abstract statusCode: number; //sets mandatory fields
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
