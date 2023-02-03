import CustomAPIError from "./custom_api.js";

export default class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, 404);
  }
}
