import CustomAPIError from "./custom_api.js";

export default class UnauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, 401);
  }
}
