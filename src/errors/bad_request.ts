import  CustomAPIError  from "./custom_api.js";

export default class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, 400);
  }
}
